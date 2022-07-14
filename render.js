/* global CustomEvent */
/** @typedef {typeof import("./elements.js").Vnode} Vnode */
/** @typedef {typeof import("./elements.js").ChildNodes} ChildNodes */
/** @typedef {typeof import("./elements.js").ChildNode} ChildNode */
/** @typedef {typeof import("./elements.js").SkruvIterableType} SkruvIterableType */

/**
 * @typedef {Object} SkruvAdditionalProperties
 * @property {Set<Vnode>} [skruvActiveAttributeGenerators]
 * @property {Set<SkruvIterableType>} [renderWaiting]
 * @property {Set<SkruvIterableType>} [skruvActiveGenerators]
 * @property {Object<[String], Function>} [skruvListeners]
 * @property {Object | null} [skruvkey]
 * @property {String} [data]
 * @property {Function} [append]
 * @property {Function} [removeAttribute]
 * @property {Function} [getAttribute]
 * @property {Function} [setAttribute]
 * @property {Function} [skruvRenderFinished]
 * @property {Function} [checkRender]
 *
 * @typedef {Node & SkruvAdditionalProperties} SkruvDomType
 */

const keyMap = new WeakMap()

/**
 * Update the attributes on a node
 * @param {Vnode} vNode
 * @param {SkruvDomType} node
 * @param {SkruvDomType} parent
 * @param {Boolean} hydrating
 * @param {SkruvDomType} root
 */
const updateAttributes = (vNode, node, parent, hydrating, root) => {
  node.skruvActiveAttributeGenerators = new Set()
  // @ts-ignore
  node.getAttributeNames && node.getAttributeNames().filter(name => !Object.keys(vNode.attributes).includes(name) && name !== 'data-css-scope').forEach(key => node.removeAttribute(key))
  for (const [key, value] of Object.entries(vNode.attributes)) {
    // Node keys do not get added to the DOM
    if (key === 'key') {
      !hydrating && (node.skruvkey = value)
      continue
    }
    if (key === 'data-css-for-scope') {
      const old = (parent?.getAttribute?.('data-css-scope') || '').split(' ')
      old.push(value)
      !hydrating && parent?.setAttribute?.('data-css-scope', Array.from(new Set(old)).join(' ').trim())
      continue
    }
    // SHAME 🔔 SHAME 🔔 SHAME 🔔
    // SHAME 🔔 SHAME 🔔 SHAME 🔔
    // SHAME 🔔 SHAME 🔔 SHAME 🔔
    // TODO: unshame
    if (
      // @ts-ignore
      value?.[Symbol.asyncIterator] ||
      (value instanceof Function && value?.prototype?.toString?.() === '[object AsyncGenerator]')
    ) {
      // @ts-ignore
      node.skruvActiveAttributeGenerators.add(value)
      // @ts-ignore
      if (!value.booted) {
        // @ts-ignore
        root?.renderWaiting?.add(value)
        // @ts-ignore
        value.booted = true
        const rerender = () => {
          // If this generator did not participate in the last renderloop cancel it. It means that it should no longer be allowed to update the parent
          // @ts-ignore
          if (!node.skruvActiveAttributeGenerators?.has(value)) { return false }
          if (key === 'key') {
            !hydrating && (node.skruvkey = value)
            return true
          }
          if (key === 'data-css-for-scope') {
            const old = (parent?.getAttribute?.('data-css-scope') || '').split(' ')
            old.push(value)
            !hydrating && parent?.setAttribute?.('data-css-scope', Array.from(new Set(old)).join(' '))
            return true
          }
          // @ts-ignore
          if (value.result === false && node.getAttribute?.(key)) {
            !hydrating && node.removeAttribute && node.removeAttribute(key)
          } else {
            if (key === 'value' || key === 'checked' || key === 'selected') {
              // @ts-ignore
              !hydrating && (node[key] = value.result)
            }
            // @ts-ignore
            !hydrating && node.setAttribute && node.setAttribute(key, value.result)
            // @ts-ignore
            root?.renderWaiting?.delete(value)
            root?.checkRender?.()
          }
          return true
        }
        // @ts-ignore
        updateOnChange(value, rerender)
      }
      return vNode.result
    } else if (key.slice(0, 2) === 'on' && value instanceof Function) {
      if (!node.skruvListeners) {
        node.skruvListeners = {}
      }
      if (node.skruvListeners[key] && node.skruvListeners[key].toString() !== value.toString()) {
        node.removeEventListener(key.slice(2), node.skruvListeners[key])
        node.skruvListeners[key] = null
      }
      if (!node.skruvListeners[key]) {
        node.skruvListeners[key] = value
        node.addEventListener(key.slice(2), node.skruvListeners[key])
      }
    } else {
      if (value !== false && node.getAttribute?.(key) !== value && !hydrating) {
        // These need to be set directly to have the desired effect.
        if (key === 'value' || key === 'checked' || key === 'selected') {
          // @ts-ignore
          node[key] = value
        }
        node.setAttribute && node.setAttribute(key, value)
      }
      if (value === false && node.getAttribute?.(key) && !hydrating) {
        node.removeAttribute && node.removeAttribute(key)
      }
    }
  }
}

/**
 * @param {Vnode} vNode
 * @param {Boolean} isSvg
 * @returns {HTMLElement | SVGElement | Text | Comment}
 */
const createNode = (vNode, isSvg) => {
  if (vNode.nodeName === '#comment') {
    // TODO: get the current document from the root node, don't rely on the global document
    return document.createComment(vNode.data || '')
  }
  if (vNode.nodeName === '#text') {
    return document.createTextNode(vNode.data || '')
  }
  if (isSvg) {
    return document.createElementNS('http://www.w3.org/2000/svg', vNode.nodeName)
  }
  return document.createElement(vNode.nodeName)
}

/**
 * @param {SkruvIterableType} gen
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
 * @param {ChildNodes} vNodeArray
 * @param {SkruvDomType} parent
 * @param {Boolean} isSvg
 * @param {Boolean} hydrating
 * @param {SkruvDomType} root
 * @param {ChildNodes} actualVNodeArray
 * @returns {Array<Vnode>}
 */
const sanitizeTypes = (vNodeArray, parent, isSvg, hydrating, root, actualVNodeArray = vNodeArray) => {
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
      /** @type {SkruvIterableType} */
      // @ts-ignore
      const vNodeIterator = vNode
      parent.skruvActiveGenerators && parent.skruvActiveGenerators.add(vNodeIterator)
      vNodeIterator.hydrating = hydrating
      if (!vNodeIterator.booted) {
        root?.renderWaiting?.add(vNodeIterator)
        vNodeIterator.booted = true
        const rerender = () => {
          // If this generator did not participate in the last renderloop cancel it. It means that it should no longer be allowed to update the parent
          if (
            !parent.skruvActiveGenerators ||
            (parent.skruvActiveGenerators && !parent.skruvActiveGenerators.has(vNodeIterator))
          ) {
            root?.renderWaiting?.delete(vNodeIterator)
            return false
          }
          renderArray(actualVNodeArray, parent, isSvg, !!vNodeIterator.hydrating, root)
          // @ts-ignore
          if (vNodeIterator?.result?.attributes?.['data-skruv-finished'] !== false) root?.renderWaiting?.delete(vNodeIterator)
          root?.checkRender?.()
          return true
        }
        updateOnChange(vNodeIterator, rerender)
      }
      return vNodeIterator.result
    } else if (typeof vNode === 'function') {
      return vNode()
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
  return retVal.find(vNode => !vNode?.nodeName) ? sanitizeTypes(retVal, parent, isSvg, hydrating, root, actualVNodeArray) : retVal
}

/**
 * @param {ChildNodes} vNodeArray
 * @param {SkruvDomType} parent
 * @param {Boolean} isSvg
 * @param {Boolean} hydrating
 * @param {SkruvDomType} root
 */
const renderArray = (vNodeArray, parent, isSvg, hydrating, root) => {
  if (!Array.isArray(vNodeArray)) { return }
  parent.skruvActiveGenerators = new Set()
  const nodes = Array.from(parent.childNodes)
  const newNodes = sanitizeTypes(vNodeArray, parent, isSvg, hydrating, root)
  nodes.slice(newNodes.length).forEach(elem => {
    !hydrating && elem.parentNode && elem.parentNode.removeChild && elem.parentNode.removeChild(elem)
    // @ts-ignore
    !root?.isSkruvSSR && elem.dispatchEvent(new CustomEvent('remove'))
  })
  newNodes.forEach((vNode, index) => {
    const node = nodes[index]
    renderSingle(vNode, node, parent, isSvg, hydrating, root)
  })
}

/**
 * @param {Vnode} vNode
 * @param {SkruvDomType} _node
 * @param {SkruvDomType} parent
 * @param {Boolean} isSvg
 * @param {Boolean} hydrating
 * @param {SkruvDomType} root
 */
const renderSingle = (vNode, _node, parent, isSvg, hydrating, root) => {
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
    updateAttributes(vNode, keyedNode, parent, hydrating, root)
    // Call renderArray with children
    if (!vNode?.attributes?.opaque && (vNode.childNodes.length || keyedNode.childNodes.length)) {
      renderArray(vNode.childNodes, keyedNode, isSvg, hydrating, root)
    }
    return
  }

  // Create node if it does not exist
  if (!_node) {
    node = createNode(vNode, isSvg)
    !hydrating && parent.append && parent.append(node)
    vNode.attributes?.oncreate && vNode.attributes.oncreate(node)
  } else if (
    _node.nodeName.toLowerCase() !== vNode.nodeName.toLowerCase() ||
    vNode.attributes?.key !== _node.skruvkey
  ) {
    node = createNode(vNode, isSvg)
    !hydrating && parent.replaceChild(node, _node)
    vNode.attributes?.oncreate && vNode.attributes.oncreate(node)
    // @ts-ignore
    !root?.isSkruvSSR && _node.dispatchEvent(new CustomEvent('remove', {
      detail: {
        newNode: node
      }
    }))
  } else if (_node.data !== vNode.data) {
    _node.data = vNode.data
    node = _node
  } else {
    node = _node
  }

  if (vNode.attributes?.key) {
    keyMap.set(vNode.attributes?.key, node)
  }
  // Diff node attributes
  // TODO: below this should only be done for SVG/HTML, not for Comment/Text
  updateAttributes(vNode, node, parent, hydrating, root)
  // Call renderArray with children
  if (!vNode?.attributes?.opaque && (vNode.childNodes.length || node.childNodes.length)) {
    renderArray(vNode.childNodes, node, isSvg, hydrating, root)
  }
}

/**
 * @param {Vnode} vNode
 * @param {SkruvDomType} node
 * @param {SkruvDomType|null} parent
 * @param {Boolean} isSvg
 */
const render = (
  vNode,
  node = document.documentElement,
  parent = node.parentNode,
  isSvg = false
) => {
  node.checkRender = () => {
    // @ts-ignore
    if (node.renderWaiting.size === 0 && typeof node.skruvRenderFinished === 'function') {
      // Microsleep to enable the rendering to finish
      // @ts-ignore
      setTimeout(() => node.skruvRenderFinished(), 0)
    }
  }
  if (!node.renderWaiting) node.renderWaiting = new Set()
  if (!parent) {
    // TODO: create error classes for skruv, inherit from one single error class
    throw new Error('Skruv: No parent to render to')
  }
  if (!!node?.getAttribute?.('data-ssr-rendered')) {
    node.skruvRenderFinished = () => {
      renderSingle(vNode, node, parent, isSvg, false, node)
    }
    renderSingle(vNode, node, parent, isSvg, true, node)
    node.checkRender()
    return
  }
  // render the single first root node
  renderSingle(vNode, node, parent, isSvg, false, node)
  node.checkRender()
}

export default render
