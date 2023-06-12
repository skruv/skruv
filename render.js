/* eslint-disable no-unused-expressions */
/* global CustomEvent HTMLInputElement HTMLOptionElement HTMLElement SVGElement Text Comment Document */
/** @typedef {typeof import("./elements.js").Vnode} Vnode */
/** @typedef {typeof import("./elements.js").ChildNodes} ChildNodes */
/** @typedef {typeof import("./elements.js").SkruvIterableType} SkruvIterableType */
/** @typedef {typeof import("./elements.js").VnodeAtrributeGenerator} VnodeAtrributeGenerator */

const skruvActiveGenerators = new WeakMap()
const skruvActiveAttributeGenerators = new WeakMap()
const skruvListeners = new WeakMap()
const skruvKeys = new WeakMap()
const keyMap = new WeakMap()

/**
 * @typedef {Object} RenderConfig
 * @property {Set<VnodeAtrributeGenerator | SkruvIterableType>} renderWaiting
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
    vNode.attributes?.oncreate && vNode.attributes.oncreate(node)
  } else if (
    _node.nodeName.toLowerCase() !== vNode.nodeName.toLowerCase() ||
    vNode.attributes?.key !== skruvKeys.get(_node)
  ) {
    node = createNode(parent, vNode, isSvg || vNode.nodeName === 'svg')
    !hydrating && parent.replaceChild(node, _node)
    vNode.attributes?.oncreate && vNode.attributes.oncreate(node)
    !config.isSkruvSSR && _node.dispatchEvent(new CustomEvent('remove', {
      detail: {
        newNode: node
      }
    }))
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
  node = self.document.documentElement,
  parent = node.parentNode,
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
  // @ts-ignore
  const isSkruvSSR = self?.isSkruvSSR
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
