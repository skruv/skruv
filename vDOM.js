/**
 * @typedef Vnode
 * @prop {String} nodeName
 * @prop {String} [data]
 * @prop {Object<[String], [String | Boolean]>} attributes
 * @prop {Array<Vnode>} childNodes
 */

/**
 * Update the attributes on a node
 * @param {Vnode} vNode
 * @param {HTMLElement | SVGElement} node
 */
 const updateAttributes = (vNode, node) => {
  node.skruvActiveAttributeGenerators = new Set()
  for (const [key, value] of Object.entries(vNode.attributes)) {
    // Node keys do not get added to the DOM
    if (key === 'key' || key === 'opaque') continue
    if (value?.[Symbol.asyncIterator]) {
      // TODO: Create a random key here if we failed to get a useful one
      node.skruvActiveAttributeGenerators.add(vNode)
      if (!value.booted) {
        value.booted = true
        const rerender = () => {
          // If this generator did not participate in the last renderloop cancel it. It means that it should no longer be allowed to update the parent
          if (!node.skruvActiveAttributeGenerators.has(vNode)) return false
          if (value.result === false && node.getAttribute(key)) {
            node.removeAttribute(key)
          } else {
            if (key === 'value' || key === 'checked' || key === 'selected') {
              node[key] = value.result
            }
            node.setAttribute(key, value.result)
          }
          return true
        }
        updateOnChange(value, rerender)
      }
      return vNode.result
    } else if (key.slice(0, 2) === 'on' && value instanceof Function) {
      if (!node.skruvListeners) {
        node.skruvListeners = {}
      }
      if (node.skruvListeners[key]) {
        node.removeEventListener(key.slice(2), node.skruvListeners[key])
      }
      // TODO: don't remove/readd event listeners all the time, check how to diff the functions
      node.skruvListeners[key.slice(2)] = value
      node.addEventListener(key.slice(2), node.skruvListeners[key.slice(2)])
    } else {
      if (value !== false && node.getAttribute(key) !== value) {
        // These need to be set directly to have the desired effect.
        if (key === 'value' || key === 'checked' || key === 'selected') {
          node[key] = value
        }
        node.setAttribute(key, value)
      }
      if (value === false && node.getAttribute(key)) {
        node.removeAttribute(key)
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
 * @param {Vnode} vNode
 * @param {HTMLElement | SVGElement | Text} _node
 */
// TODO: How to handle onremove of children. This approach was extremely expensive, to the point of crashing firefox
// const wireOnRemove = (node) => {
//   node.addEventListener('remove', e => {
//     Array.from(e.currentTarget.childNodes).forEach(elem => {
//       const event = new CustomEvent('remove')
//       elem.dispatchEvent(event)
//     })
//   })
// }

const generatorCache = new Map()

const updateOnChange = async (gen, rerender) => {
  for await (const result of (gen?.[Symbol.asyncIterator] ? gen : gen())) {
    gen.result = result
    if (!rerender()) break
  }
}

/**
 * @param {Array<Vnode>} vNodeArray
 * @param {HTMLElement | SVGElement | ShadowRoot | Document} parent
 * @param {Boolean} isSvg
 * @param {HTMLElement | SVGElement | ShadowRoot | Document} root
 */
const sanitizeTypes = (vNodeArray, parent, isSvg, root, actualVNodeArray = vNodeArray) => {
  const retVal = vNodeArray.map((vNode) => {
    if (typeof vNode === 'boolean' || typeof vNode === 'undefined') {
      return false
    } else if (typeof vNode === 'string' || typeof vNode === 'number') {
      return {
        nodeName: '#text',
        attributes: {},
        childNodes: [],
        data: vNode.toString()
      }
    } else if (vNode?.[Symbol.asyncIterator] || (vNode instanceof Function && vNode?.prototype?.toString?.() === '[object AsyncGenerator]')) {
      // TODO: Create a random key here if we failed to get a useful one
      parent.skruvActiveGenerators.add(vNode)
      if (!vNode.booted) {
        vNode.booted = true
        const rerender = () => {
          // If this generator did not participate in the last renderloop cancel it. It means that it should no longer be allowed to update the parent
          if (!parent.skruvActiveGenerators.has(vNode)) return false
          renderArray(actualVNodeArray, parent, isSvg, root)
          return true
        }
        updateOnChange(vNode, rerender)
      }
      return vNode.result
    } else if (typeof vNode === 'function') {
      return vNode()
    } else if (vNode.nodeName || Array.isArray(vNode)) {
      return vNode
    }
    // Unkown type passed
    console.log('unkown type in render: ', vNode)
    return false
  }).flat(Infinity).filter(vNode => !!vNode)

  // TODO: can this go into an infinite loop?
  // Handle results from generators returning generators, functions returning functions, etc.
  return retVal.find(vNode => !vNode?.nodeName) ? sanitizeTypes(retVal, parent, isSvg, root, actualVNodeArray) : retVal
}

/**
 * @param {Array<Vnode>} vNodeArray
 * @param {HTMLElement | SVGElement | ShadowRoot | Document} parent
 * @param {Boolean} isSvg
 * @param {HTMLElement | SVGElement | ShadowRoot | Document} root
 */
const renderArray = (vNodeArray, parent, isSvg, root) => {
  if (!Array.isArray(vNodeArray)) return
  parent.skruvActiveGenerators = new Set()
  const nodes = Array.from(parent.childNodes)
  const newNodes = sanitizeTypes(vNodeArray, parent, isSvg, root)
  nodes.slice(newNodes.length).forEach(elem => elem.parentNode.removeChild(elem))
  newNodes.forEach((vNode, index) => {
    const node = nodes[index]
    renderSingle(vNode, node, parent, isSvg, root)
  })
}

/**
 * @param {Vnode} vNode
 * @param {HTMLElement | SVGElement | Text} _node
 * @param {HTMLElement | SVGElement | ShadowRoot | Document} parent
 * @param {Boolean} isSvg
 * @param {HTMLElement | SVGElement | ShadowRoot | Document} root
 * @returns {HTMLElement | SVGElement | Text}
 */
const renderSingle = (vNode, _node, parent, isSvg, root) => {
  if (!vNode.nodeName) {
    return
  }
  // Create node if it does not exist
  let node
  if (!_node) {
    node = createNode(vNode, isSvg)
    parent.append(node)
    const event = new CustomEvent('create')
    node.dispatchEvent(event)
  } else if (_node.nodeName.toLowerCase() !== vNode.nodeName.toLowerCase()) {
    // const event = new CustomEvent('remove')
    // _node.dispatchEvent(event)
    node = createNode(vNode, isSvg)
    parent.replaceChild(node, _node)
  } else if (_node.data !== vNode.data) {
    _node.data = vNode.data
    node = _node
  } else {
    node = _node
  }
  // Diff node attributes
  updateAttributes(vNode, node)
  // wireOnRemove(node)
  //call renderArray with children
  if (!vNode?.attributes?.opaque && (vNode.childNodes.length || node.childNodes.length)) {
    renderArray(vNode.childNodes, node, isSvg, root)
  }
}

/**
 * @param {Vnode} vNode
 * @param {HTMLElement | SVGElement | ShadowRoot | Document} node
 * @param {HTMLElement | SVGElement | ShadowRoot | Document} parent
 * @param {Boolean} isSvg
 * @param {HTMLElement | SVGElement | ShadowRoot | Document} root
 */
export const render = (
  vNode,
  node = document.documentElement,
  parent = node.parentNode,
  isSvg = false,
  root = node
) => {
  // render the single first root node
  renderSingle(vNode, node, parent, isSvg, root)
}
