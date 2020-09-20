/* global HTMLElement SVGElement Text performance */

/**
 * @typedef Vnode
 * @prop {String} nodeName
 * @prop {String} [data]
 * @prop {Object<[String], [String | Boolean]>} attributes
 * @prop {Array<Vnode>} childNodes
 */

/** @type WeakMap<HTMLElement | SVGElement, Object.<String, EventListener>> */
const listenerMap = new WeakMap()
/** @type WeakMap<HTMLElement | SVGElement | Text, Vnode> */
const renderNodeMap = new WeakMap()
/** @type WeakMap<Object, HTMLElement | SVGElement | Text> */
const keyMap = new WeakMap()
/** @type WeakMap<HTMLElement | SVGElement | Text, Vnode> */
export const vDomMap = new WeakMap()

/** @type Vnode */
const emptyNode = {
  nodeName: '',
  attributes: {},
  childNodes: []
}

/**
 * Update the attributes on a node
 * @param {Vnode} oldVnode
 * @param {Vnode} vNode
 * @param {HTMLElement | SVGElement} node
 */
const updateAttributes = (oldVnode, vNode, node) => {
  for (const key in vNode.attributes) {
    // Node keys do not get added to the DOM
    if (key === 'key' || key === 'opaque' || key === 'oncreate' || key === 'onremove') continue
    if (key.slice(0, 2) === 'on' && typeof vNode.attributes[key] === 'function') {
      let listeners = listenerMap.get(node)
      if (listeners && listeners[key.slice(2)]) {
        node.removeEventListener(key.slice(2), listeners[key.slice(2)])
      }
      if (!listeners) {
        listeners = {
          [key.slice(2)]: vNode.attributes[key]
        }
        listenerMap.set(node, listeners)
      } else {
        listeners[key.slice(2)] = vNode.attributes[key]
      }
      node.addEventListener(key.slice(2), listeners[key.slice(2)])
    } else {
      if (!oldVnode.attributes[key] || oldVnode.attributes[key] !== vNode.attributes[key]) {
        if (key === 'value' || key === 'selected' || key === 'checked') {
          // These need to be set directly to have the desired effect
          // @ts-ignore
          node[key] = vNode.attributes[key]
        }
        if (vNode.attributes[key] === false) {
          node.removeAttribute(key)
          continue
        }
        node.setAttribute(key, vNode.attributes[key])
      }
    }
  }
}

/**
 * Modify an existing node
 * @param {HTMLElement | SVGElement} parent
 * @param {Vnode} vNode
 * @param {HTMLElement | SVGElement | Text} node
 * @returns {HTMLElement | SVGElement | Text}
 */
const modifyNode = (parent, vNode, node) => {
  const oldVnode = vDomMap.get(node) || emptyNode
  const key = vNode.attributes.key
  const keyChanged = vNode.attributes.key && oldVnode.attributes.key !== vNode.attributes.key
  if (key && keyChanged) {
    const keyedNode = keyMap.get(key)
    if (keyedNode) {
      oldVnode.attributes.onremove && oldVnode.attributes.onremove(node)
      parent.replaceChild(keyedNode, node)
      return keyedNode
    }
  }

  if (vNode.nodeName === '#text') {
    // Text node overwriting a general node or new text
    if (oldVnode.nodeName !== vNode.nodeName || vNode.data !== oldVnode.data) {
      const oldNode = node
      node = document.createTextNode(vNode.data || '')
      oldVnode.attributes.onremove && oldVnode.attributes.onremove(oldNode)
      parent.replaceChild(node, oldNode)
      vDomMap.set(node, vNode)
    }

    return node
  }

  if (oldVnode.nodeName !== vNode.nodeName || keyChanged || vNode.attributes.oncreate || oldVnode.attributes.onremove) {
    // General node overwriting other non text node or keyed change
    // We need to create a new node since changing node types is not stable/supported
    const oldNode = node
    node = document.createElement(vNode.nodeName)
    // Change/Add attributes
    updateAttributes(oldVnode, vNode, node)
    // Reuse the old children in case this is just changing the current node
    for (const child of oldNode.childNodes) { node.appendChild(child) }
    oldVnode.attributes.onremove && oldVnode.attributes.onremove(oldNode)
    parent.replaceChild(node, oldNode)
    vNode.attributes.oncreate && vNode.attributes.oncreate(node)
    vDomMap.set(node, vNode)
  } else if (node instanceof HTMLElement) {
    // Same as oldnode, but changed
    // Remove all older attributes not defined on vNode
    for (const key in oldVnode.attributes) { vNode.attributes[key] === undefined && node.removeAttribute(key) }
    let changed = false
    for (const key in vNode.attributes) { if (oldVnode.attributes[key] !== vNode.attributes[key]) changed = true }
    // Change/Add attributes
    if (changed) { updateAttributes(oldVnode, vNode, node) }
    vDomMap.set(node, vNode)
  }
  if (!vNode.attributes.opaque) {
    // Remove childNodes after the length of vNode childNodes
    Array.from(node.childNodes).slice(vNode.childNodes.length).forEach(child => {
      // We need to recursively check for onremoves on grandchildren too (expensive but nessecary)
      // @ts-ignore
      const oldVnode = vDomMap.get(child)
      if (oldVnode) {
        oldVnode.attributes.onremove && oldVnode.attributes.onremove(child)
        /** @param {ChildNode} node */
        const callOnremoves = (node) => Array.from(node.childNodes).forEach(childNode => {
          // @ts-ignore
          const oldVnode = vDomMap.get(childNode)
          if (oldVnode) {
            oldVnode.attributes.onremove && oldVnode.attributes.onremove(childNode)
          }
          callOnremoves(childNode)
        })
        callOnremoves(child)
      }
      node.removeChild(child)
    })
  }

  return node
}

/**
 * Create a new node
 * @param {HTMLElement | SVGElement} parent
 * @param {Vnode} vNode
 * @param {Boolean} isSvg
 * @returns {HTMLElement | SVGElement | Text}
 */
const createNode = (parent, vNode, isSvg) => {
  // If this is a keyed node and we have it in the map we can just use it directly
  if (vNode.attributes.key && keyMap.has(vNode.attributes.key)) {
    const keyedNode = keyMap.get(vNode.attributes.key)
    if (keyedNode) {
      parent.appendChild(keyedNode)
      return keyedNode
    }
  }

  // New text node
  if (vNode.nodeName === '#text') {
    const node = document.createTextNode(vNode.data || '')
    parent.appendChild(node)
    vDomMap.set(node, vNode)
    return node
  }

  // New general node
  const node = !isSvg
    ? document.createElement(vNode.nodeName)
    : document.createElementNS('http://www.w3.org/2000/svg', vNode.nodeName)
  // Change/Add attributes
  updateAttributes(emptyNode, vNode, node)
  parent.appendChild(node)
  vNode.attributes.oncreate && vNode.attributes.oncreate(node)
  vDomMap.set(node, vNode)
  if (vNode.attributes.key) {
    keyMap.set(vNode.attributes.key, node)
  }
  return node
}

/**
 * Render a vDOM recursively
 * @param {Vnode | function(): Vnode} vNode
 * @param {HTMLElement | SVGElement | Text} node
 * @param {(Node & ParentNode) | null | HTMLElement | SVGElement | Text} parent
 * @param {Boolean} isSvg
 * @param {Number} startRender
 * @returns {HTMLElement | SVGElement | Text} The updated root
 */
export const renderNode = (vNode, node, parent = node.parentNode, isSvg = false, startRender = performance.now()) => {
  if (parent === null || !(parent instanceof HTMLElement || parent instanceof SVGElement)) {
    throw new Error('No parent to render to!')
  }
  if (typeof vNode === 'function') {
    vNode = vNode()
  }
  if (vNode.nodeName === 'svg') {
    isSvg = true
  }
  if (node) {
    // If old node exists, try to patch or replace it
    node = modifyNode(parent, vNode, node)
  } else {
    // Create a new node
    node = createNode(parent, vNode, isSvg)
  }
  // If we have taken too much time to render we should wait until the next tick to continue
  if (performance.now() - startRender > 10 && !vNode.attributes.opaque) {
    if (!renderNodeMap.has(node)) {
      // Ideally this would be requestIdleCallback, but that is not available in safari
      setTimeout(() => {
        if (node instanceof HTMLElement || node instanceof SVGElement) {
          const vNode = renderNodeMap.get(node)
          if (!vNode) return
          vNode.childNodes.forEach((vNode, index) => {
            const child = node.childNodes[index]
            if (child instanceof HTMLElement || child instanceof SVGElement || child instanceof Text || child === undefined) {
              // Calling renderNode without startRender will start a new timer
              !!vNode && renderNode(vNode, child, node, isSvg)
            }
          })
        }
        renderNodeMap.delete(node)
      }, 0)
    }
    // Update the vNode to set on this node in case it has changed while waiting
    renderNodeMap.set(node, vNode)
    return node
  }
  // Iterate over and render each child recursively
  if ((node instanceof HTMLElement || node instanceof SVGElement) && !vNode.attributes.opaque) {
    const parent = node
    vNode.childNodes.forEach((vNode, index) => {
      const child = node.childNodes[index]
      if (child instanceof HTMLElement || child instanceof SVGElement || child instanceof Text || child === undefined) {
        !!vNode && renderNode(vNode, child, parent, isSvg, startRender)
      }
    })
  }
  return node
}
