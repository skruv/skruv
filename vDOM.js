/* global HTMLElement SVGElement HTMLOptionElement HTMLInputElement HTMLButtonElement HTMLTextAreaElement ShadowRoot Text CustomEvent */

/**
 * @typedef Vnode
 * @prop {String} nodeName
 * @prop {String} [data]
 * @prop {Object<[String], [String | Boolean]>} attributes
 * @prop {Array<Vnode>} childNodes
 */

/** @type WeakMap<HTMLElement | SVGElement, Object.<String, EventListener>> */
const listenerMap = new WeakMap()
/** @type WeakMap<Object, HTMLElement | SVGElement | Text> */
const keyMapObj = new WeakMap()
const keyMapScalar = new Map()
/** @type WeakMap<HTMLElement | SVGElement | Text | ChildNode, Vnode> */
export const vDomMap = new WeakMap()
/** @type WeakMap<HTMLElement | SVGElement | Text | ChildNode, Vnode> */
export const asyncMap = new WeakMap()
export const iterMap = new WeakMap()

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
    if (key.slice(0, 2) === 'on' && vNode.attributes[key] instanceof Function) {
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
        // These need to be set directly to have the desired effect. All these ifs could be grouped, but doing so does not seem to please TS
        if (key === 'value' && (node instanceof HTMLInputElement || node instanceof HTMLTextAreaElement || node instanceof HTMLButtonElement)) {
          node[key] = vNode.attributes[key]
        }
        if (key === 'checked' && node instanceof HTMLInputElement) {
          node[key] = vNode.attributes[key]
        }
        if (key === 'selected' && node instanceof HTMLOptionElement) {
          node[key] = vNode.attributes[key]
        }
        if (key === 'initState' && node.nodeName.includes('-')) {
          node[key] = vNode.attributes[key]
          continue
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
 * @param {HTMLElement | SVGElement | ShadowRoot} parent
 * @param {Vnode} vNode
 * @param {HTMLElement | SVGElement | Text} node
 * @returns {HTMLElement | SVGElement | Text}
 */
const modifyNode = (parent, vNode, node, isSvg) => {
  const oldVnode = vDomMap.get(node) || emptyNode
  const key = vNode.attributes.key
  const keyChanged = vNode.attributes.key && oldVnode.attributes.key !== vNode.attributes.key
  if (key && keyChanged) {
    const keyedNode = keyMapObj.get(key) || keyMapScalar.get(key)
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

  if (vNode.nodeName === '#comment') {
    // Text node overwriting a general node or new text
    if (oldVnode.nodeName !== vNode.nodeName || vNode.data !== oldVnode.data) {
      const oldNode = node
      node = document.createComment(vNode.data || '')
      oldVnode.attributes.onremove && oldVnode.attributes.onremove(oldNode)
      parent.replaceChild(node, oldNode)
      vDomMap.set(node, vNode)
    }

    return node
  }

  if (oldVnode.nodeName !== vNode.nodeName || keyChanged) {
    // General node overwriting other non text node or keyed change
    // We need to create a new node since changing node types is not stable/supported
    const oldNode = node
    node = !isSvg
      ? document.createElement(vNode.nodeName)
      : document.createElementNS('http://www.w3.org/2000/svg', vNode.nodeName)
    // Change/Add attributes
    updateAttributes(oldVnode, vNode, node)
    oldVnode.attributes.onremove && oldVnode.attributes.onremove(oldNode)
    parent.replaceChild(node, oldNode)
    vNode.attributes.oncreate && vNode.attributes.oncreate(node)
    vDomMap.set(node, vNode)
  } else if (node instanceof HTMLElement || node instanceof SVGElement) {
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
      const oldVnode = vDomMap.get(child)
      if (oldVnode) {
        oldVnode.attributes.onremove && oldVnode.attributes.onremove(child)
        /** @param {ChildNode} node */
        const callOnremoves = (node) => Array.from(node.childNodes).forEach(childNode => {
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
 * @param {HTMLElement | SVGElement | ShadowRoot} parent
 * @param {Vnode} vNode
 * @param {Boolean} isSvg
 * @returns {HTMLElement | SVGElement | Text}
 */
const createNode = (parent, vNode, isSvg) => {
  // If this is a keyed node and we have it in the map we can just use it directly
  if (vNode.attributes.key && (keyMapObj.has(vNode.attributes.key) || keyMapScalar.has(vNode.attributes.key))) {
    const keyedNode = keyMapObj.get(vNode.attributes.key) || keyMapScalar.get(vNode.attributes.key)
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

  // New comment node
  if (vNode.nodeName === '#comment') {
    const node = document.createComment(vNode.data || '')
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
    if (typeof vNode.attributes.key === 'object') {
      keyMapObj.set(vNode.attributes.key, node)
    } else {
      keyMapScalar.set(vNode.attributes.key, node)
    }
  }
  return node
}

/**
 * Render a vDOM recursively
 * @param {Vnode | Promise<Vnode>} vNode
 * @param {HTMLElement | SVGElement | Text} node
 * @param {(Node & ParentNode) | null | HTMLElement | SVGElement | Text} parent
 * @param {Boolean} isSvg
 * @returns {Promise<HTMLElement | SVGElement | Text>} The updated root
 */
export const renderNode = (
  vNode,
  node,
  parent = node.parentNode,
  isSvg = false,
  root = true
) => {
  try {
  // TODO: breakout these into something to handle async rendering
    if (vNode instanceof Promise) {
      if (!node) {
        node = createNode(parent, {
          nodeName: 'slot',
          attributes: {},
          childNodes: []
        }, isSvg)
      }
      asyncMap.set(node, vNode)
      ;(async () => {
        const resolved = await vNode
        if (!root.contains(node) || asyncMap.get(node) !== vNode) {
          return
        }
        node = renderNode(resolved, node, parent, isSvg, root)
      })()
      return node
    }

    if (vNode instanceof Function && vNode.prototype.toString() === '[object AsyncGenerator]') {
      if (iterMap.get(node) === vNode.toString()) {
        return node
      }
      if (!node) {
        node = createNode(parent, {
          nodeName: 'slot',
          attributes: {},
          childNodes: []
        }, isSvg)
      }
      iterMap.set(node, vNode.toString())
      ;(async () => {
        for await (const value of vNode()) {
          if (!root.contains(node)) {
            break
          }
          node = renderNode(value, node, parent, isSvg, root)
          iterMap.set(node, vNode.toString())
        }
      })()
      return node
    }

    if (parent === null || !(parent instanceof HTMLElement || parent instanceof SVGElement || parent instanceof ShadowRoot)) {
      throw new Error('No parent to render to!')
    }

    if (!vNode.nodeName) {
      throw new Error(`Non-vNode Object passed to render: ${JSON.stringify(vNode)}`)
    }

    // Get the old vDOM and if they are equal we can assume the DOM is not dirty
    const oldVnode = vDomMap.get(node)
    if (vNode === oldVnode) {
      return node
    }

    // If we are doing SVG we assume all child nodes are SVG namespaced too
    if (vNode.nodeName === 'svg') {
      isSvg = true
    }

    if (node) {
      // If old node exists, try to patch or replace it
      node = modifyNode(parent, vNode, node, isSvg)
    } else {
      // Create a new node
      node = createNode(parent, vNode, isSvg)
    }

    // Childnodes of foreignObject are no longer in the SVG namespace
    if (vNode.nodeName === 'foreignObject') {
      isSvg = false
    }

    if (root === true) {
      // Update the root reference to make sure that generators can break
      root = node
    }

    // This is to trigger webcomponents to update their own DOM
    if (node._update instanceof Function) {
      node._update()
    }

    // Iterate over and render each child recursively
    if (!vNode.attributes.opaque) {
      const parent = node
      for (let index = 0; index < vNode.childNodes.length; index++) {
        const vChild = vNode.childNodes[index]
        const child = node.childNodes[index]
        if (child instanceof HTMLElement || child instanceof SVGElement || child instanceof Text || child === undefined) {
          !!vChild && renderNode(vChild, child, parent, isSvg, root)
        }
      }
    }
  } catch (e) {
    const event = new CustomEvent('skruverror', {
      cancelable: true,
      bubbles: true,
      detail: { error: e, vNode, node }
    })
    if (parent instanceof HTMLElement || parent instanceof SVGElement || parent instanceof ShadowRoot) parent.dispatchEvent(event)
  }
  return node
}
