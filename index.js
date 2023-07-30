// @ts-nocheck
/**
 * @typedef {Vnode|Vnode[]|String|Boolean|Number|Record<string,(string|boolean|Function|number|Object)> & {_r:{_r:() => boolean}?}} SkruvChildNode
 * @typedef {SkruvChildNode[]} SkruvChildNodes
 * @typedef {Record<string,(string|boolean|Function|number|Object)>} VnodeAttributes
 */
/**
 * @typedef {object} Vnode
 * @prop {Symbol} s
 * @prop {String} t
 * @prop {SkruvChildNodes} c
 * @prop {{_r:() => boolean}} [_r]
 */
const s = Symbol.for('skruvDom')
const skruvKey = 'data-skruv-key'
/** @type {WeakMap<Vnode, Node>} */
const keyed = new WeakMap()
/** @type {WeakMap<Vnode, Node>} */
const oldKeys = new WeakMap()
/** @type {WeakMap<Vnode, Record<string, function>>} */
const listenersMap = new WeakMap()
/** @type {Record<string, Node>} */
const domCache = {}
/**
 * @param {Vnode} current
 * @param {Node} currentNode
 * @param {ParentNode?} parentNode
 * @param {boolean} isSvg
 */
export const render = (
  current,
  currentNode = globalThis.document.documentElement,
  parentNode = currentNode.parentNode,
  isSvg = false,
  forceFull = false
) => {
  if (typeof current === 'boolean') {
    if (currentNode) { parentNode.removeChild(currentNode) }
    return
  }
  const txtNode = (typeof current === 'string' || typeof current === 'number')
  if (
    forceFull ||
    !currentNode ||
    (
      txtNode &&
      currentNode?.nodeName !== '#text'
    ) ||
    (
      !txtNode &&
      currentNode?.nodeName.toLowerCase() !== current.t.toLowerCase()
    )
  ) {
    const _currentNode = currentNode
    if (txtNode) {
      currentNode = document.createTextNode(current)
    } else if (isSvg || current.t === 'svg') {
      isSvg = true
      currentNode = (domCache[current.t] || (domCache[current.t] = document.createElementNS('http://www.w3.org/2000/svg', current.t))).cloneNode(false)
    } else {
      currentNode = (domCache[current.t] || (domCache[current.t] = document.createElement(current.t))).cloneNode(false)
    }
    if (_currentNode) {
      parentNode.replaceChild(currentNode, _currentNode)
    } else {
      parentNode.appendChild(currentNode)
    }
    if (txtNode) { return }
    // eslint-disable-next-line no-unused-expressions
    if (current.c[0]?.oncreate) { current?.c[0]?.oncreate(currentNode) }
  }
  if (txtNode) {
    // eslint-disable-next-line eqeqeq
    if (currentNode.data != current) { currentNode.data = current }
    return
  }
  if (current._r) {
    current._r._r = () => {
      if (!currentNode || !parentNode.contains(currentNode)) { return false }
      render(current, currentNode, parentNode, isSvg)
      return true
    }
  }
  let children = current.c.flat(Infinity)
  let attributes = {}
  if (children[0]?.constructor === Object && children[0]?.s !== s) {
    attributes = children[0]
    children = children.slice(1)
    for (const key in attributes) {
      if (key === skruvKey || key[0] === '_') { continue }
      if (key[0] === 'o' && key[1] === 'n') {
        let listeners = listenersMap.get(currentNode)
        if (!listeners) {
          listeners = {}
          listenersMap.set(currentNode, listeners)
        }
        const evt = key.slice(2)
        if (!listeners[key] || ('' + listeners[key]) !== ('' + attributes[key])) {
          if (listeners[key]) { currentNode.removeEventListener(evt, listeners[key]) }
          currentNode.addEventListener(evt, attributes[key])
          listeners[key] = attributes[key]
        } else if (!attributes[key]) {
          currentNode.removeEventListener(evt, listeners[key])
        }
      } else if (attributes[key] !== currentNode.getAttribute(key)) {
        if (
          (key === 'checked' || key === 'selected' || key === 'value') ||
          typeof attributes[key] === 'object' // Support complex data passing for custom elements
        ) {
          currentNode[key] = attributes[key]
        }
        if (attributes[key]) {
          currentNode.setAttribute(key, '' + attributes[key])
        } else {
          currentNode.removeAttribute(key)
        }
      }
    }
  }
  if (!children.length && currentNode.childNodes.length) {
    if (attributes['data-skruv-wait-for-not-empty']) {
      return
    }
    currentNode.replaceChildren()
    return
  }
  if (currentNode.childNodes.length > children.length) {
    for (let i = children.length; i < currentNode.childNodes.length; i++) {
      currentNode.removeChild(currentNode.childNodes[i])
    }
  }
  for (let i = 0; i < children.length; i++) {
    let forceFull = false
    let keyedNode
    if (children[i].constructor === Object) {
      keyedNode = keyed.get(children[i].c[0]?.[skruvKey])
      if (keyedNode) {
        if (keyedNode !== currentNode.childNodes[i]) {
          if (keyedNode === currentNode.childNodes[i + 1]) {
            currentNode.removeChild(currentNode.childNodes[i])
          } else if (keyed.get(children[i + 1]?.c?.[0]?.[skruvKey]) === currentNode.childNodes[i]) {
            currentNode.insertBefore(keyedNode, currentNode.childNodes[i])
          } else if (currentNode.childNodes[i]) {
            currentNode.replaceChild(keyedNode, currentNode.childNodes[i])
          } else {
            currentNode.appendChild(keyedNode)
          }
        }
        forceFull = children[i].c[0][skruvKey] !== oldKeys.get(currentNode.childNodes[i])
        if (!forceFull) {
          const oldKey = keyed.get(currentNode.childNodes[i])
          let noChange = true
          for (const k in children[i].c[0][skruvKey]) { if (children[i].c[0][skruvKey][k] !== oldKey[k]) { noChange = false } }
          if (noChange) { continue }
        }
      } else {
        forceFull = keyed.has(currentNode.childNodes[i])
      }
    }
    render(children[i], currentNode.childNodes[i] || false, currentNode, isSvg, forceFull)
  }
  if (attributes[skruvKey]) {
    keyed.set(attributes[skruvKey], currentNode)
    oldKeys.set(currentNode, attributes[skruvKey])
    keyed.set(currentNode, { ...attributes[skruvKey] })
  }
}

export const elementFactory = new Proxy({}, {
  /** @type {(_: any, name: string) => (arg0: (Record<string, any>|Vnode)[]) => Vnode} */
  get: (_, t) => (...c) => ({ s, t, c })
})

/**
 * @param {string} t
 * @param  {(Record<string, any>|Vnode)[]} c
 * @returns {Vnode}
 */
export const h = (t, ...c) => ({ s, t, c })
