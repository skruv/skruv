/* global HTMLDocument HTMLElement SVGElement HTMLOptionElement HTMLInputElement HTMLButtonElement HTMLTextAreaElement ShadowRoot Text CustomEvent */

/**
 * @typedef Vnode
 * @prop {String} nodeName
 * @prop {String} [data]
 * @prop {Object<[String], [String | Boolean]>} attributes
 * @prop {Array<Vnode>} childNodes
 */

/**
 * @typedef LooseVnode
 * @type {Boolean | String | Number | Vnode | Vnode[] | function(): LooseVnode | function(): LooseVnode[]}
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
      if (!oldVnode.attributes[key] || oldVnode.attributes[key] !== vNode.attributes[key] || (vNode.attributes[key] !== false && node.getAttribute(key) !== vNode.attributes[key])) {
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
        if (key === 'data-shadowed' && vNode.attributes[key] && !node.shadowRoot) {
          node.attachShadow({ mode: 'open' })
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
 * @param {HTMLElement | SVGElement | ShadowRoot | HTMLDocument} parent
 * @param {Vnode} vNode
 * @param {HTMLElement | SVGElement | Text} node
 * @param {Boolean} isSvg
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
      ;(parent?.attributes?.['data-shadowed'] ? parent.shadowRoot : parent).replaceChild(keyedNode, node)
      updateAttributes(emptyNode, vNode, keyedNode)
      return keyedNode
    }
  }

  if (vNode.nodeName === '#text') {
    // Text node overwriting a general node or new text
    if (oldVnode.nodeName !== vNode.nodeName || vNode.data !== oldVnode.data) {
      const oldNode = node
      node = document.createTextNode(vNode.data || '')
      oldVnode.attributes.onremove && oldVnode.attributes.onremove(oldNode)
      ;(parent?.attributes?.['data-shadowed'] ? parent.shadowRoot : parent).replaceChild(node, oldNode)
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
      ;(parent?.attributes?.['data-shadowed'] ? parent.shadowRoot : parent).replaceChild(node, oldNode)
      vDomMap.set(node, vNode)
    }

    return node
  }

  if (oldVnode.nodeName !== vNode.nodeName || keyChanged || oldVnode.attributes['data-shadowed'] !== vNode.attributes['data-shadowed']) {
    // General node overwriting other non text node or keyed change or when doing shadow dom changes
    // We need to create a new node since changing node types is not stable/supported
    const oldNode = node
    node = !isSvg
      ? document.createElement(vNode.nodeName)
      : document.createElementNS('http://www.w3.org/2000/svg', vNode.nodeName)
    // Change/Add attributes
    updateAttributes(oldVnode, vNode, node)
    oldVnode.attributes.onremove && oldVnode.attributes.onremove(oldNode)
    ;(parent?.attributes?.['data-shadowed'] ? parent.shadowRoot : parent).replaceChild(node, oldNode)
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
    Array.from(node.childNodes).slice(recursiveFlattenFilter(vNode.childNodes).length).forEach(child => {
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
 * @param {HTMLElement | SVGElement | ShadowRoot | HTMLDocument} parent
 * @param {Vnode} vNode
 * @param {Boolean} isSvg
 * @returns {HTMLElement | SVGElement | Text}
 */
const createNode = (parent, vNode, isSvg) => {
  // If this is a keyed node and we have it in the map we can just use it directly
  if (vNode.attributes.key && (keyMapObj.has(vNode.attributes.key) || keyMapScalar.has(vNode.attributes.key))) {
    const keyedNode = keyMapObj.get(vNode.attributes.key) || keyMapScalar.get(vNode.attributes.key)
    if (keyedNode) {
      (parent?.attributes?.['data-shadowed'] ? parent.shadowRoot : parent).appendChild(keyedNode)
      updateAttributes(emptyNode, vNode, keyedNode)
      return keyedNode
    }
  }

  // New text node
  if (vNode.nodeName === '#text') {
    const node = document.createTextNode(vNode.data || '')
    ;(parent?.attributes?.['data-shadowed'] ? parent.shadowRoot : parent).appendChild(node)
    vDomMap.set(node, vNode)
    return node
  }

  // New comment node
  if (vNode.nodeName === '#comment') {
    const node = document.createComment(vNode.data || '')
    ;(parent?.attributes?.['data-shadowed'] ? parent.shadowRoot : parent).appendChild(node)
    vDomMap.set(node, vNode)
    return node
  }

  // New general node
  const node = !isSvg
    ? document.createElement(vNode.nodeName)
    : document.createElementNS('http://www.w3.org/2000/svg', vNode.nodeName)
  // Change/Add attributes
  updateAttributes(emptyNode, vNode, node)
  ;(parent?.attributes?.['data-shadowed'] ? parent.shadowRoot : parent).appendChild(node)
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
 * @param {String | Number | Boolean} data
 * @returns {Vnode}
 */
const textNode = (data) => ({
  nodeName: '#text',
  attributes: {},
  childNodes: [],
  data: data.toString()
})

/**
 * @param {LooseVnode[]} childNodes
 * @returns {Vnode[]}
 */
const recursiveFlattenFilter = childNodes => {
  const processed = childNodes
    .map(child => typeof child === 'function' && !(child.prototype && child.prototype.toString() === '[object AsyncGenerator]') ? child() : child)
    .flat(Infinity)
    .filter(child => (typeof child !== 'undefined' && typeof child !== 'boolean'))
    .map(child => typeof child === 'string' || typeof child === 'number' ? textNode(child) : child)

  if (processed.some(child => Array.isArray(child) || (typeof child === 'function' && child.prototype.toString() !== '[object AsyncGenerator]'))) {
    return recursiveFlattenFilter(processed)
  }
  return processed
}

/**
 * Render a vDOM recursively
 * @param {Vnode | Promise<Vnode> | Function} vNode
 * @param {HTMLElement | SVGElement | Text} node
 * @param {(Node & ParentNode) | null | HTMLElement | SVGElement | HTMLDocument | Text} parent
 * @param {Boolean} isSvg
 * @param {Boolean} root
 * @returns {HTMLElement | SVGElement | Text} The updated root
 */
export const renderNode = (
  vNode,
  node,
  parent = node.parentNode,
  isSvg = false,
  root = true
) => {
  try {
    if (vNode instanceof Promise) {
      // Create a random key so that we know if the node has been replaced
      const key = Math.random()
      if (!node) {
        node = createNode(parent, {
          nodeName: 'slot',
          attributes: { key },
          childNodes: []
        }, isSvg)
      }

      const event = new CustomEvent('skruvloading', { bubbles: true })
      node.dispatchEvent(event)
      asyncMap.set(node, vNode)
      ;(async () => {
        const resolved = await vNode
        const shadowHost = node?.getRootNode?.()?.host
        if ((!root.contains(node) && (shadowHost === undefined || !root.contains(shadowHost))) || asyncMap.get(node) !== vNode) {
          return
        }
        node = renderNode(resolved, node, parent, isSvg, root)
        const event = new CustomEvent('skruvfinished', { bubbles: true })
        node.dispatchEvent(event)
      })()
      return node
    }

    if (vNode instanceof Function && vNode.prototype.toString() === '[object AsyncGenerator]') {
      // Create a key based on fuction body and optionally a key set on it
      const key = JSON.stringify(vNode.key) + vNode.toString()
      if (iterMap.get(node) === key) {
        return node
      }
      if (!node) {
        node = createNode(parent, {
          nodeName: 'slot',
          attributes: {},
          childNodes: []
        }, isSvg)
      }

      const event = new CustomEvent('skruvloading', { bubbles: true })
      node.dispatchEvent(event)
      iterMap.set(node, key)
      ;(async () => {
        for await (const value of vNode()) {
          if (!value.nodeName) {
            throw new Error(`Non-vNode Object returned from generator: ${JSON.stringify(vNode)}`)
          }
          const shadowHost = node?.getRootNode?.()?.host
          if (iterMap.get(node) !== key || (!root.contains(node) && (shadowHost === undefined || !root.contains(shadowHost)))) {
            break
          }

          if (!node.getAttribute('data-skruv-finished') || value.attributes['data-skruv-finished'] === true) {
            node = renderNode(value, node, parent, isSvg, root)
          }

          if (value.attributes['data-skruv-finished'] === true) {
            const event = new CustomEvent('skruvfinished', { bubbles: true })
            node.dispatchEvent(event)
          }
          iterMap.set(node, key)
        }
      })()
      return node
    }

    if (parent === null || !(parent instanceof HTMLElement || parent instanceof SVGElement || parent instanceof ShadowRoot || parent instanceof HTMLDocument)) {
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

    // Iterate over and render each child recursively
    if (!vNode?.attributes?.opaque) {
      const children = Array.from(node?.attributes?.['data-shadowed'] ? node.shadowRoot.childNodes : node.childNodes)
      const childNodes = recursiveFlattenFilter(vNode.childNodes)

      // Cleanup extra nodes that might have been injected
      children.slice(childNodes.length).forEach(elem => elem.parentNode.removeChild(elem))

      const parent = node
      childNodes.forEach((vChild, index) => {
        const child = children[index]
        if (child instanceof HTMLElement || child instanceof SVGElement || child instanceof Text || child === undefined) {
          !!vChild && renderNode(vChild, child, parent, isSvg, root)
        }
      })
    }
  } catch (e) {
    const event = new CustomEvent('skruverror', {
      cancelable: true,
      bubbles: true,
      detail: { error: e, vNode, node }
    })
    if (parent instanceof HTMLElement || parent instanceof SVGElement || parent instanceof ShadowRoot) {
      parent.dispatchEvent(event)
    } else {
      console.error(e)
    }
  }
  return node
}
