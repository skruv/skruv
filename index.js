const s = Symbol.for('skruvDom')
const eventPrefix = 'data-event-'
/**
 * @typedef {Vnode|Vnode[]|String|Boolean|Number} SkruvChildNode
 * @typedef {SkruvChildNode[]} SkruvChildNodes
 */
/**
 * @typedef {object} Vnode
 * @prop {Symbol} s
 * @prop {String} t
 * @prop {SkruvChildNodes} c
 * @prop {Record<string,(string|boolean|Function|number|Object)> & {_r:{_r:() => boolean}?}} a
 * @prop {{_r:() => boolean}} [_r]
 */
/** @type {Vnode} */
export const Vnode = { s, t: '', c: [], a: { _r: { _r: () => false } } }
/**
 * @param {string} t
 * @param  {(Record<string, any>|Vnode)[]} c
 * @returns {Vnode}
 */
// @ts-ignore: TODO: The check for non-attribute objects does not satisfy TS
export const h = (t, ...c) => ({
  s,
  t: t.toUpperCase(),
  ...(
    // @ts-ignore: its exactly because we don't know if its there that we check it
    !(c[0]?.[Symbol.asyncIterator]) &&
        c[0]?.constructor === Object &&
      c[0]?.s !== s
      ? {
        a: c[0],
        c: c.slice(1)
      }
      : {
        a: {},
        c: c
      }
  )
})

/** @type {WeakMap<Vnode, Node>} */
const keyed = new WeakMap()
/** @type {Record<string, Node>} */
const domCache = {}
/**
 * @param {Vnode} current
 * @param {Node} _currentNode
 * @param {ParentNode?} parentNode
 * @param {*} isSvg
 * @returns {boolean}
 */
export const render = (
  current,
  _currentNode = globalThis.document.documentElement,
  parentNode = _currentNode.parentNode,
  isSvg = false,
  doc = (parentNode?.ownerDocument || _currentNode?.ownerDocument)
) => {
  let currentNode = _currentNode
  /** @type {ChildNode[]|NodeList} */
  let childNodes = []
  if (!parentNode || !doc || (currentNode && !parentNode.contains(currentNode))) { return false }
  if (typeof current === 'boolean' || current === null || current === undefined) {
    if (currentNode) { parentNode.removeChild(currentNode) }
    return true
  }
  if (
    !currentNode ||
    (
      ((typeof current === 'string' || typeof current === 'number') && currentNode?.nodeName !== '#text') ||
      (current?.t && currentNode?.nodeName !== current?.t) ||
      // @ts-ignore: TODO: Handle key storage better
      (currentNode?._skruvKey !== current?.a?._key)
    )
  ) {
    if (typeof current === 'string' || typeof current === 'number') {
      currentNode = (domCache.text || (domCache.text = doc.createTextNode(''))).cloneNode()
    } else if (isSvg || current.t === 'svg') {
      currentNode = (domCache[current.t] || (domCache[current.t] = doc.createElementNS('http://www.w3.org/2000/svg', current.t))).cloneNode()
    } else {
      currentNode = (domCache[current.t] || (domCache[current.t] = doc.createElement(current.t))).cloneNode()
    }
    if (_currentNode) {
      parentNode.replaceChild(currentNode, _currentNode)
    } else {
      parentNode.appendChild(currentNode)
    }
    // @ts-ignore: see above
    if (current?.a?._key) { currentNode._skruvKey = current?.a?._key }
    // @ts-ignore: oncreate should always be callable. TODO: add strict typing
    if (current?.a?.oncreate) { current?.a?.oncreate(currentNode) }
  } else {
    childNodes = currentNode.childNodes
  }
  if ((typeof current === 'string' || typeof current === 'number')) {
    // @ts-ignore: We already checked this above. It's not 'never'
    if (('' + currentNode.data) !== ('' + current)) { currentNode.data = current }
    return true
  }
  if (current._r) { current._r._r = () => render(current, currentNode, parentNode, isSvg) }
  for (const key in current.a) {
    if (key[0] === '_') { continue }
    if (key[0] === 'o' && key[1] === 'n') {
      // @ts-ignore: TODO: this is a hacky way to store what the last eventlistener was
      if (!currentNode[eventPrefix + key] || ('' + currentNode[eventPrefix + key]) !== ('' + current.a[key])) {
        // @ts-ignore: See above
        if (currentNode[eventPrefix + key]) { currentNode.removeEventListener(key.slice(2), currentNode[eventPrefix + key]) }
        // @ts-ignore: See above
        currentNode.addEventListener(key.slice(2), current.a[key])
        // @ts-ignore: See above
        currentNode[eventPrefix + key] = current.a[key]
      } else if (!current.a[key]) {
        // @ts-ignore: data-event-* is the old function
        currentNode.removeEventListener(key.slice(2), currentNode[eventPrefix + key])
      }
    // @ts-ignore: If this was a text or comment element we would have returned above
    } else if (current.a[key] !== currentNode.getAttribute(key)) {
      if (
        (
          typeof current.a[key] === 'boolean' &&
          (
            (current.t === 'INPUT' && key === 'checked') ||
            (current.t === 'OPTION' && key === 'selected')
          )
        ) || typeof current.a[key] === 'object' // Support complex data passing for custom elements
      ) {
        // @ts-ignore TS does not think HTML properties are accessible directly?
        currentNode[key] = current.a[key]
      }
      if (current.a[key]) {
        // @ts-ignore: If this was a text or comment element we would have returned above
        currentNode.setAttribute(key, '' + current.a[key])
      } else {
        // @ts-ignore: If this was a text or comment element we would have returned above
        currentNode.removeAttribute(key)
      }
    }
  }
  const children = current.c.flat(Infinity)
  if (!children.length && childNodes.length) {
    if (current.a['data-skruv-wait-for-not-empty']) {
      return true
    }
    // @ts-ignore: If this was a text or comment element we would have returned above
    currentNode.replaceChildren()
    return true
  }
  if (childNodes.length > children.length) {
    for (let i = children.length; i < childNodes.length; i++) {
      currentNode.removeChild(childNodes[i])
    }
  }
  for (let i = 0; i < children.length; i++) {
    // @ts-ignore: TODO: the flattening seems to confuse TS
    if (keyed.has(children[i])) {
      // @ts-ignore: See above
      const keyedNode = keyed.get(children[i])
      if (keyedNode && keyedNode !== childNodes[i]) {
        if (keyedNode === childNodes[i + 1]) {
          currentNode.removeChild(childNodes[i])
        // @ts-ignore: See above
        } else if (keyed.has(children[i + 1]) && keyed.get(children[i + 1]) === childNodes[i]) {
          currentNode.insertBefore(keyedNode, childNodes[i])
        } else if (childNodes[i]) {
          currentNode.replaceChild(keyedNode, childNodes[i])
        } else {
          currentNode.appendChild(keyedNode)
        }
        // @ts-ignore: See above
        keyed.set(children[i], childNodes[i])
      }
      continue
    }
    // @ts-ignore: See above
    render(children[i], childNodes[i] || false, currentNode, isSvg)
  }
  keyed.set(current, currentNode)
  return true
}

export const elementFactory = new Proxy({}, {
  /** @type {(_: any, name: string) => (arg0: (Record<string, any>|Vnode)[]) => Vnode} */
  get: (_, name) => (...c) => h(name, ...c)
})
