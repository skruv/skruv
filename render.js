/* eslint-disable no-unused-expressions */
/* global CustomEvent HTMLInputElement HTMLOptionElement HTMLElement SVGElement Text Comment Document CSSMediaRule CSSStyleRule CSSOM */
/** @typedef {typeof import("./elements.js").Vnode} Vnode */
/** @typedef {typeof import("./elements.js").ChildNodes} ChildNodes */
/** @typedef {typeof import("./elements.js").SkruvIterableType} SkruvIterableType */
/** @typedef {typeof import("./elements.js").SkruvPromiseOrAsyncFunctionType} SkruvPromiseOrAsyncFunctionType */
/** @typedef {typeof import("./elements.js").VnodeAtrributeGenerator} VnodeAtrributeGenerator */

const styleMap = new Map()

// TODO: replace with native hash
/**
 * @param {String} str
 * @returns {Number}
 */
const hash = str => {
  let hash = 0
  if (str.length === 0) { return hash }
  for (let i = 0; i < str.length; i++) {
    hash = ((hash << 5) - hash) + str.charCodeAt(i)
    hash |= 0 // Convert to 32bit integer
  }
  return hash
}

// Scoped CSS helper
/**
 * @param {Vnode} styleElement
 * @returns {Vnode}
 */
const scoped = styleElement => {
  if (styleElement.attributes['data-skruv-css-for-scope']) {
    return styleElement
  }
  // The implementation of this is lifted from https://github.com/samthor/scoped with some modifications
  const attrRe = /^\[.*?(?:(["'])(?:.|\\\1)*\1.*)*\]/
  const walkSelectorRe = /([([,]|:scope\b)/ // "interesting" setups
  const scopeRe = /^:scope\b/
  const stylesheet = styleElement.childNodes.join('')

  /**
   * Consumes a single selector from candidate selector text, which may contain many.
   *
   * @param {string} raw selector text
   * @param {string} prefix prefix to apply
   * @return {?{selector: string, rest: string}}
   */
  function consumeSelector (raw, prefix) {
    let i = raw.search(walkSelectorRe)
    if (i === -1) {
      // found literally nothing interesting, success
      return {
        selector: `${prefix} ${raw}`,
        rest: ''
      }
    } else if (raw[i] === ',') {
      // found comma without anything interesting, yield rest
      return {
        selector: `${prefix} ${raw.substring(0, i)}`,
        rest: raw.substring(i + 1)
      }
    }

    let leftmost = true // whether we're past a descendant or similar selector
    let scope = false // whether :scope has been found + replaced
    i = raw.search(/\S/) // place i after initial whitespace only

    let depth = 0
    // eslint-disable-next-line no-labels
    outer:
    for (; i < raw.length; ++i) {
      const char = raw[i]
      switch (char) {
        case '[': {
          const match = attrRe.exec(raw.substring(i))
          i += (match ? match[0].length : 1) - 1 // we add 1 every loop
          continue
        }
        case '(':
          ++depth
          continue
        case ':':
          if (!leftmost) {
            continue // doesn't matter if :scope is here, it'll always be ignored
          } else if (!scopeRe.test(raw.substring(i))) {
            continue // not ':scope', ignore
          } else if (depth) {
            return null
          }
          // Replace ':scope' with our prefix. This can happen many times; ':scope:scope' is valid.
          // It will never apply to a descendant selector (e.g., ".foo :scope") as this is ignored
          // by browsers anyway (invalid).
          raw = raw.substring(0, i) + prefix + raw.substring(i + 6)
          i += prefix.length
          scope = true
          --i // we'd skip over next character otherwise
          continue // run loop again
        case ')':
          if (depth) {
            --depth
          }
          continue
      }
      if (depth) {
        continue
      }

      switch (char) {
        case ',':
          // eslint-disable-next-line no-labels
          break outer
        case ' ':
        case '>':
        case '~':
        case '+':
          if (!leftmost) {
            continue
          }
          leftmost = false
      }
    }

    const selector = (scope ? '' : `${prefix} `) + raw.substring(0, i)
    return { selector, rest: raw.substring(i + 1) }
  }

  /**
   * @param {string} selectorText
   * @param {string} prefix to apply
   */
  function updateSelectorText (selectorText, prefix) {
    const found = []

    while (selectorText) {
      const consumed = consumeSelector(selectorText, prefix)
      if (consumed === null) {
        return ':not(*)'
      }
      found.push(consumed.selector)
      selectorText = consumed.rest
    }

    return found.join(', ')
  }

  /**
   * Upgrades a specific CSSRule.
   *
   * @param {!CSSRule} rule
   * @param {string} prefix to apply
   */
  function upgradeRule (rule, prefix) {
    if (rule instanceof CSSMediaRule) {
      // upgrade children
      const l = rule.cssRules.length
      for (let j = 0; j < l; ++j) {
        upgradeRule(rule.cssRules[j], prefix)
      }
      return
    }

    if (!(rule instanceof CSSStyleRule)) {
      return // unknown rule type, ignore
    }

    rule.selectorText = updateSelectorText(rule.selectorText, prefix)
  }
  const scope = `scope${hash(stylesheet)}`
  const prefix = `[data-skruv-css-scope~=${scope}]`

  if (styleMap.has(scope)) {
    styleElement.attributes['data-skruv-css-for-scope'] = scope
    styleElement.childNodes = [styleMap.get(scope)]
    return styleElement
  }
  let sheet
  // @ts-ignore
  if (self?.CSSOM) {
    // @ts-ignore
    sheet = CSSOM.parse(stylesheet)
  } else {
    // In FF/Chrome we could create the sheet with new CSSStyleSheet(), but that does not work in safari (supported from 16.4 (Released 2023-03-27))
    const styleDoc = self.document.implementation.createHTMLDocument('')
    const styleElem = styleDoc.createElement('style')
    styleElem.innerText = stylesheet
    styleDoc.body.append(styleElem)
    sheet = styleElem.sheet
    styleDoc.body.removeChild(styleElem)
  }
  Array.from(sheet.cssRules).forEach(e => upgradeRule(e, prefix))
  const upgradedStyles = Array.from(sheet.cssRules).map(e => e.cssText || '')
    .join('')
  styleMap.set(scope, upgradedStyles)
  styleElement.attributes['data-skruv-css-for-scope'] = scope
  styleElement.childNodes = [upgradedStyles]
  return styleElement
}

const skruvActiveGenerators = new WeakMap()
const skruvActiveAttributeGenerators = new WeakMap()
const skruvListeners = new WeakMap()
const skruvKeys = new WeakMap()
const keyMap = new WeakMap()

/**
 * @typedef {Object} RenderConfig
 * @property {Set<VnodeAtrributeGenerator | SkruvIterableType | SkruvPromiseOrAsyncFunctionType>} renderWaiting
 * @property {Function} checkRender
 * @property {Boolean} isSkruvSSR
 */

/**
 * Update the attributes on a node
 * @param {HTMLElement | SVGElement} node
 * @param {String} key
 * @param {Boolean | String | Number} result
 */
const handleSpecialAttributes = (node, key, result) => {
  if (
    key === 'value' &&
    (typeof result === 'number' || typeof result === 'string') &&
    node instanceof HTMLInputElement
  ) {
    node[key] = result.toString()
  }
  if (
    key === 'checked' &&
    typeof result === 'boolean' &&
    node instanceof HTMLInputElement
  ) {
    node[key] = result
  }
  if (
    key === 'selected' &&
    typeof result === 'boolean' &&
    node instanceof HTMLOptionElement
  ) {
    node[key] = result
  }
}

/**
 * Update the attributes on a node
 * @param {Vnode} vNode
 * @param {HTMLElement | SVGElement} node
 * @param {HTMLElement | SVGElement | Document} parent
 * @param {Boolean} hydrating
 * @param {RenderConfig} config
 */
const updateAttributes = (vNode, node, parent, hydrating, config) => {
  skruvActiveAttributeGenerators.set(node, new Set())
  node.getAttributeNames && node.getAttributeNames().filter(name => !Object.keys(vNode.attributes).includes(name) && name !== 'data-skruv-css-scope')
    .forEach(key => node?.removeAttribute?.(key))
  for (const [key, value] of Object.entries(vNode.attributes)) {
    // Node keys do not get added to the DOM
    if (key === 'key') {
      !hydrating && skruvKeys.set(node, value)
      continue
    }
    if (key === 'data-skruv-css-for-scope' && typeof value === 'string' && (parent instanceof HTMLElement || parent instanceof SVGElement)) {
      const old = (parent?.getAttribute?.('data-skruv-css-scope') || '').split(' ')
      old.push(value)
      !hydrating && parent?.setAttribute?.('data-skruv-css-scope', Array.from(new Set(old)).join(' ')
        .trim())
      continue
    }
    // TODO: Add promise support
    if (
      // @ts-ignore
      value?.[Symbol.asyncIterator] ||
      (value instanceof Function && value?.prototype?.toString?.() === '[object AsyncGenerator]')
    ) {
      const val = (/** @type {VnodeAtrributeGenerator} */ (value))
      skruvActiveAttributeGenerators.get(node).add(val)
      val.hydrating = hydrating
      if (!val.booted) {
        config?.renderWaiting?.add(val)
        val.booted = true
        const rerender = () => {
          // If this generator did not participate in the last renderloop cancel it. It means that it should no longer be allowed to update the parent
          if (!skruvActiveAttributeGenerators.get(node).has(val)) { return false }
          if (key === 'key') {
            !val.hydrating && skruvKeys.set(node, val)
            return true
          }
          if (key === 'data-skruv-css-for-scope' && (parent instanceof HTMLElement || parent instanceof SVGElement)) {
            const old = (parent?.getAttribute?.('data-skruv-css-scope') || '').split(' ')
            // @ts-ignore
            old.push(val)
            !val.hydrating && parent?.setAttribute?.('data-skruv-css-scope', Array.from(new Set(old)).join(' '))
            return true
          }
          if (val.result === false && node.getAttribute?.(key)) {
            !val.hydrating && node.removeAttribute && node.removeAttribute(key)
          } else {
            !val.hydrating && !!val.result && typeof val.result !== 'function' && handleSpecialAttributes(node, key, val.result)
            !val.hydrating && node.setAttribute && node.setAttribute(key, val.result?.toString() || '')
            // Support complex data passing for custom elements
            // @ts-ignore
            if (typeof val.result === 'object') { node[key] = val.result }
            config?.renderWaiting?.delete(val)
            config?.checkRender?.()
          }
          // In SSR we want to break immediately to prevent memory leaks of running generators
          if (config.isSkruvSSR) { return false }
          return true
        }
        updateOnChange(val, rerender)
      }
      continue
    } else if (key.slice(0, 2) === 'on' && value instanceof Function && !hydrating) {
      if (!skruvListeners.has(node)) {
        skruvListeners.set(node, {})
      }
      if (skruvListeners.get(node)[key] && skruvListeners.get(node)[key].toString() !== value.toString()) {
        node.removeEventListener(key.slice(2), skruvListeners.get(node)[key])
        skruvListeners.get(node)[key] = null
      }
      if (!skruvListeners.get(node)[key]) {
        skruvListeners.get(node)[key] = value
        node.addEventListener(key.slice(2), skruvListeners.get(node)[key])
      }
    } else {
      if (value !== false && node.getAttribute?.(key) !== value && !hydrating) {
        // These need to be set directly to have the desired effect.
        !!value && typeof value !== 'function' && typeof value !== 'object' && handleSpecialAttributes(node, key, value)
        // Support complex data passing for custom elements
        // @ts-ignore
        if (typeof value === 'object') { node[key] = value }
        value && node.setAttribute && node.setAttribute(key, value.toString())
      }
      if (value === false && node.getAttribute?.(key) && !hydrating) {
        node.removeAttribute && node.removeAttribute(key)
      }
    }
  }
}

/**
 * @param {HTMLElement | SVGElement | Document} parent
 * @param {Vnode} vNode
 * @param {Boolean} isSvg
 * @returns {HTMLElement | SVGElement | Text | Comment}
 */
const createNode = (parent, vNode, isSvg) => {
  const ownerDocument = parent.ownerDocument || self?.document
  if (vNode.nodeName === '#comment') {
    return ownerDocument.createComment(vNode.data || '')
  }
  if (vNode.nodeName === '#text') {
    return ownerDocument.createTextNode(vNode.data || '')
  }
  if (isSvg) {
    return ownerDocument.createElementNS('http://www.w3.org/2000/svg', vNode.nodeName)
  }
  return ownerDocument.createElement(vNode.nodeName)
}

/**
 * @param {SkruvIterableType | VnodeAtrributeGenerator} gen
 * @param {Function} rerender
 */
const updateOnChange = async (gen, rerender) => {
  // @ts-ignore
  for await (const result of (gen?.[Symbol.asyncIterator] ? gen : gen())) {
    gen.result = result
    if (!rerender()) { break }
  }
}

/**
 * @param {Vnode} vNodeParent
 * @param {ChildNodes} vNodeArray
 * @param {HTMLElement | SVGElement | Document} parent
 * @param {Boolean} isSvg
 * @param {Boolean} hydrating
 * @param {RenderConfig} config
 * @param {ChildNodes} actualVNodeArray
 * @returns {Array<Vnode>}
 */
const sanitizeTypes = (vNodeParent, vNodeArray, parent, isSvg, hydrating, config, actualVNodeArray = vNodeArray) => {
  const retVal = vNodeArray.map(vNode => {
    if (typeof vNode === 'boolean' || typeof vNode === 'undefined') {
      return false
    } else if (typeof vNode === 'string' || typeof vNode === 'number') {
      return {
        nodeName: '#text',
        attributes: {},
        childNodes: [],
        data: vNode.toString()
      }
    } else if (
        // @ts-ignore
        vNode?.[Symbol.asyncIterator] ||
        (vNode instanceof Function && vNode?.prototype?.toString?.() === '[object AsyncGenerator]')
    ) {
      // TODO: Add error checking and onerror handler support
      const vNodeIterator = (/** @type {SkruvIterableType} */ (vNode))
      skruvActiveGenerators.get(parent) && skruvActiveGenerators.get(parent).add(vNodeIterator)
      vNodeIterator.hydrating = hydrating
      if (!vNodeIterator.booted) {
          config.renderWaiting?.add(vNodeIterator)
          vNodeIterator.booted = true
          const rerender = () => {
            // If this generator did not participate in the last renderloop cancel it. It means that it should no longer be allowed to update the parent
            if (
              !skruvActiveGenerators.get(parent) ||
              (skruvActiveGenerators.get(parent) && !skruvActiveGenerators.get(parent).has(vNodeIterator))
            ) {
              config.renderWaiting?.delete(vNodeIterator)
              config.checkRender?.()
              return false
            }
            renderArray(vNodeParent, actualVNodeArray, parent, isSvg, !!vNodeIterator.hydrating, config)
            // @ts-ignore
            if (vNodeIterator?.result?.attributes?.['data-skruv-skruv-finished'] !== false) { config.renderWaiting?.delete(vNodeIterator) }
            config.checkRender?.()
            // In SSR we want to break immediately to prevent memory leaks of running generators
            if (
              config.isSkruvSSR &&
              // @ts-ignore
              vNodeIterator?.result?.attributes?.['data-skruv-skruv-finished'] !== false
            ) { return false }
            return true
          }
          updateOnChange(vNodeIterator, rerender)
      }
      return vNodeIterator.result
    } else if (
      // @ts-ignore
      (typeof vNode === 'object' && vNode.then instanceof Function) ||
      (typeof vNode === 'function' && vNode.constructor.name === 'AsyncFunction')
    ) {
      const vNodePromiseAsyncFunction = (/** @type {SkruvPromiseOrAsyncFunctionType} */ (vNode))
      skruvActiveGenerators.get(parent) && skruvActiveGenerators.get(parent).add(vNodePromiseAsyncFunction)
      vNodePromiseAsyncFunction.hydrating = hydrating
      if (!vNodePromiseAsyncFunction.booted) {
          config.renderWaiting?.add(vNodePromiseAsyncFunction)
          vNodePromiseAsyncFunction.booted = true
          const rerender = () => {
            // If this generator did not participate in the last renderloop cancel it. It means that it should no longer be allowed to update the parent
            if (
              !skruvActiveGenerators.get(parent) ||
              (skruvActiveGenerators.get(parent) && !skruvActiveGenerators.get(parent).has(vNodePromiseAsyncFunction))
            ) {
              config.renderWaiting?.delete(vNodePromiseAsyncFunction)
              return false
            }
            renderArray(vNodeParent, actualVNodeArray, parent, isSvg, !!vNodePromiseAsyncFunction.hydrating, config)
            // @ts-ignore
            if (vNode?.result?.attributes?.['data-skruv-skruv-finished'] !== false) { config.renderWaiting?.delete(vNode) }
            config.checkRender?.()
          }
          (
            (typeof vNodePromiseAsyncFunction === 'function')
              ? vNodePromiseAsyncFunction()
              : vNodePromiseAsyncFunction
          ).then(res => { vNodePromiseAsyncFunction.result = res; rerender() })
      }
      return vNodePromiseAsyncFunction.result
    } else if (typeof vNode === 'function') {
      return vNode()
      // @ts-ignore
    } else if (vNode?.nodeName === '#fragment') {
      // JSX fragment compat
      // @ts-ignore
      return vNode?.childNodes || []
      // @ts-ignore
    } else if (vNode?.nodeName || Array.isArray(vNode)) {
      return vNode
    }
    // Unkown type passed
    console.log('unkown type in render: ', vNode)
    return false
  }).flat(Infinity)
    .filter(vNode => !!vNode)
    .map(vNode => {
      if (vNode?.nodeName === 'style' && vNode?.attributes?.scoped) {
        return scoped(vNode)
      }
      return vNode
    })

  // Handle results from generators returning generators, functions returning functions, etc.
  return retVal.find(vNode => !vNode?.nodeName) ? sanitizeTypes(vNodeParent, retVal, parent, isSvg, hydrating, config, actualVNodeArray) : retVal
}

/**
 * @param {Vnode} vNodeParent
 * @param {ChildNodes} vNodeArray
 * @param {HTMLElement | SVGElement | Document} parent
 * @param {Boolean} isSvg
 * @param {Boolean} hydrating
 * @param {RenderConfig} config
 */
const renderArray = (vNodeParent, vNodeArray, parent, isSvg, hydrating, config) => {
  if (!Array.isArray(vNodeArray)) { return }
  skruvActiveGenerators.set(parent, new Set())
  const nodes = Array.from(parent.childNodes)
  const newNodes = sanitizeTypes(vNodeParent, vNodeArray, parent, isSvg, hydrating, config)
  const toRemove = nodes.slice(newNodes.length)
  if (newNodes.length || !vNodeParent.attributes['data-skruv-wait-for-not-empty']) {
    for (let i = 0; i < toRemove.length; i++) {
      const elem = toRemove[i]
      !hydrating && elem.parentNode && elem.parentNode.removeChild && elem.parentNode.removeChild(elem)
      !config.isSkruvSSR && elem.dispatchEvent(new CustomEvent('remove'))
    }
  }
  for (let i = 0; i < newNodes.length; i++) {
    const node = nodes[i] || null
    if (node instanceof HTMLElement || node instanceof SVGElement || node instanceof Comment || node instanceof Text || node === null) {
      renderSingle(newNodes[i], node, parent, isSvg, hydrating, config)
    }
  }
}

/**
 * @param {Vnode} vNode
 * @param {HTMLElement | SVGElement | Comment | null} _node
 * @param {HTMLElement | SVGElement | Document} parent
 * @param {Boolean} isSvg
 * @param {Boolean} hydrating
 * @param {RenderConfig} config
 */
const renderSingle = (vNode, _node, parent, isSvg, hydrating, config) => {
  if (!vNode.nodeName) {
    return
  }

  let node
  // Check for keyed nodes
  if (vNode.attributes?.key && keyMap.has(vNode.attributes?.key)) {
    const keyedNode = keyMap.get(vNode.attributes?.key)
    if (_node && keyedNode !== _node) {
      !hydrating && parent.replaceChild && parent.replaceChild(keyedNode, _node)
    }
    if (!_node) {
      !hydrating && parent.append && parent.append(keyedNode)
    }
    // Diff node attributes
    // TODO: below this should only be done for SVG/HTML, not for Comment/Text
    updateAttributes(vNode, keyedNode, parent, hydrating, config)
    // Call renderArray with children
    if (!vNode?.attributes?.opaque && (vNode.childNodes.length || keyedNode.childNodes.length)) {
      renderArray(vNode, vNode.childNodes, keyedNode, isSvg || vNode.nodeName === 'svg', hydrating, config)
    }
    return
  }

  // Create node if it does not exist
  if (!_node) {
    node = createNode(parent, vNode, isSvg || vNode.nodeName === 'svg')
    !hydrating && parent.append && parent.append(node)
    !hydrating && vNode.attributes?.oncreate && vNode.attributes.oncreate(node)
  } else if (
    _node.nodeName.toLowerCase() !== vNode.nodeName.toLowerCase() ||
    vNode.attributes?.key !== skruvKeys.get(_node)
  ) {
    node = createNode(parent, vNode, isSvg || vNode.nodeName === 'svg')
    !hydrating && !config.isSkruvSSR && _node.dispatchEvent(new CustomEvent('remove', {
      detail: {
        newNode: node
      }
    }))
    !hydrating && parent.replaceChild(node, _node)
    !hydrating && vNode.attributes?.oncreate && vNode.attributes.oncreate(node)
  } else if ((_node instanceof Text || _node instanceof Comment) && _node.data !== vNode.data) {
    !hydrating && (_node.data = vNode.data || '')
    node = _node
  } else {
    node = _node
  }

  if (vNode.attributes?.key) {
    keyMap.set(vNode.attributes?.key, node)
  }
  // Diff node attributes
  (node instanceof HTMLElement || node instanceof SVGElement) && updateAttributes(vNode, node, parent, hydrating, config)
  // Call renderArray with children
  if ((node instanceof HTMLElement || node instanceof SVGElement) && !vNode?.attributes?.opaque && (vNode.childNodes.length || node.childNodes.length)) {
    renderArray(vNode, vNode.childNodes, node, isSvg || vNode.nodeName === 'svg', hydrating, config)
  }
}

/**
 * @param {Vnode} vNode
 * @param {HTMLElement | SVGElement} node
 * @param {ParentNode?} parent
 * @param {Boolean} isSvg
 */
const render = (
  vNode,
  node = self?.document?.documentElement,
  parent = node?.parentNode,
  isSvg = false
) => new Promise(resolve => {
  if (!parent) {
    // TODO: create error classes for skruv, inherit from one single error class
    throw new Error('Skruv: No parent to render to')
  }
  if (!(parent instanceof HTMLElement || parent instanceof SVGElement || parent instanceof Document)) {
    // TODO: create error classes for skruv, inherit from one single error class
    throw new Error('Skruv: Parent of wrong type')
  }
  const renderWaiting = new Set()
  const checkRender = () => {
    if (renderWaiting?.size === 0) {
      resolve('finished render')
      renderSingle(vNode, node, parent, isSvg, false, config)
    }
  }

  // Check for nodejs, deno and cf workers
  const isSkruvSSR = typeof process !== 'undefined' || typeof Deno !== 'undefined' || typeof WebSocketPair !== 'undefined'
  const config = {
    renderWaiting,
    checkRender,
    isSkruvSSR
  }
  if (node?.getAttribute?.('data-skruv-ssr-rendered')) {
    renderSingle(vNode, node, parent, isSvg, true, config)
    checkRender()
    return
  }
  // render the single first root node
  renderSingle(vNode, node, parent, isSvg, false, config)
  checkRender()
})

export default render
