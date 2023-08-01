/**
 * @typedef {Vnode|string|Boolean|Number|Record<string,(string|boolean|Function|number|Object)> & {oncreate:(e: Node) => void}?} SkruvChildNode
 * @typedef {SkruvChildNode[]} SkruvChildNodes
 * @typedef {Record<string,(string|boolean|Function|number|Object)>} VnodeAttributes
 */
/**
 * @typedef {object} Vnode
 * @prop {Symbol} s
 * @prop {string} t
 * @prop {SkruvChildNodes} c
 * @prop {() => boolean} [r]
 */
const s = Symbol.for('skruvDom')
const skruvKey = 'data-skruv-key'
const htmlNS = 'http://www.w3.org/1999/xhtml'
const svgNS = 'http://www.w3.org/2000/svg'
const mathmlNS = 'http://www.w3.org/1998/Math/MathML'
/** @type {WeakMap<Vnode|Node, Node|Object>} */
const keyed = new WeakMap()
/** @type {WeakMap<Node, Object>} */
const oldKeys = new WeakMap()
/** @type {WeakMap<Node, Record<string, function|string|boolean|object>>} */
const listenersMap = new WeakMap()
/** @type {Record<string, Node>} */
const domCache = {}
/**
 * @param {Record<string, any>|Vnode|string|number|boolean} current
 * @param {Node} currentNode
 * @param {ParentNode?} parentNode
 * @param {string} ns
 */
export const render = (
  current,
  currentNode = globalThis.document.documentElement,
  parentNode = currentNode.parentNode,
  ns = htmlNS,
  forceFull = false
) => {
  if (!parentNode) {
    throw new Error('No parent to render to')
  }
  if (typeof current === 'boolean') {
    if (currentNode) { parentNode.removeChild(currentNode) }
    return
  }
  const txtNode = (typeof current === 'string' || typeof current === 'number')
  if (
    forceFull ||
    !currentNode ||
    (txtNode && currentNode.nodeName !== '#text') ||
    (!txtNode && currentNode.nodeName.toLowerCase() !== current.t.toLowerCase())
  ) {
    const _currentNode = currentNode
    if (txtNode) {
      currentNode = document.createTextNode('' + current)
    } else {
      if (current.t === 'svg') { ns = svgNS }
      if (current.t === 'math') { ns = mathmlNS }
      currentNode = (domCache[current.t] || (domCache[current.t] = document.createElementNS(ns, current.t))).cloneNode(false)
    }
    if (_currentNode) {
      parentNode.replaceChild(currentNode, _currentNode)
    } else {
      parentNode.appendChild(currentNode)
    }
    if (txtNode) { return }
  }
  if (txtNode) {
    // We do a loose comparison to allow for numbers
    // eslint-disable-next-line eqeqeq
    if (currentNode.textContent != current) { currentNode.textContent = '' + current }
    return
  }
  if (current.r) {
    current.r = () => {
      if (!currentNode || !parentNode.contains(currentNode)) { return false }
      render(current, currentNode, parentNode, ns)
      return true
    }
  }
  // This needs to come after the .r callback is registered since it should apply to child nodes, not the current node.
  if (current.t === 'foreignObject') { ns = htmlNS }
  let children = current.c.flat(Infinity)
  /** @type {Record<string, string|boolean|function|object>} */
  let attributes = {}
  if (children[0]?.constructor === Object && children[0]?.s !== s) {
    attributes = children[0]
    children = children.slice(1)
    for (const key in attributes) {
      if (key === skruvKey) { continue }
      if (key[0] === 'o' && key[1] === 'n') {
        let listeners = listenersMap.get(currentNode)
        if (!listeners) {
          listeners = {}
          listenersMap.set(currentNode, listeners)
        }
        const evt = key.slice(2)
        if (!listeners[key] || ('' + listeners[key]) !== ('' + attributes[key])) {
          if (evt === 'create') {
            // Wait to call until after a microsleep to ensure that we don't remove any elements created in the oncreate
            setTimeout(
              // @ts-ignore: .on functions should always be callable
              () => attributes[key](currentNode),
              0
            )
            listeners[key] = attributes[key]
            continue
          }
          // @ts-ignore: TODO: TS does not think Function is compatible with EventListenerOrEventListenerObject
          if (listeners[key]) { currentNode.removeEventListener(evt, listeners[key]) }
          // @ts-ignore: TODO: TS does not think Function is compatible with EventListenerOrEventListenerObject
          currentNode.addEventListener(evt, attributes[key])
          listeners[key] = attributes[key]
        } else if (!attributes[key]) {
          // @ts-ignore: TODO: TS does not think Function is compatible with EventListenerOrEventListenerObject
          currentNode.removeEventListener(evt, listeners[key])
        }
        // @ts-ignore: TODO: TS does not like that currentNode "might" be a Node here, but since we do checking for text nodes above it is a Element
      } else if (attributes[key] !== currentNode.getAttribute(key)) {
        if (
          (key === 'checked' || key === 'selected' || key === 'value') ||
          typeof attributes[key] === 'object' // Support complex data passing for custom elements
        ) {
          // @ts-ignore: TODO: TS does not like indexing elements with strings, but in this case we need to to set special props. Could be fixed with excessive checking, but that'd slow down perf
          currentNode[key] = attributes[key]
        }
        if (attributes[key]) {
          // @ts-ignore: TODO: TS does not like that currentNode "might" be a Node here, but since we do checking for text nodes above it is a Element
          currentNode.setAttribute(key, '' + attributes[key])
        } else {
          // @ts-ignore: TODO: TS does not like that currentNode "might" be a Node here, but since we do checking for text nodes above it is a Element
          currentNode.removeAttribute(key)
        }
      }
    }
  }
  if (!children.length && currentNode.childNodes.length) {
    if (attributes['data-skruv-wait-for-not-empty']) {
      return
    }
    // @ts-ignore: TODO: TS does not like that currentNode "might" be a Node here, but since we do checking for text nodes above it is a Element
    currentNode.replaceChildren()
    return
  }
  if (currentNode.childNodes.length > children.length) {
    for (let i = (currentNode.childNodes.length - 1); i >= children.length; i--) {
      currentNode.removeChild(currentNode.childNodes[i])
    }
  }
  for (let i = 0; i < children.length; i++) {
    let forceFull = false
    /** @type {Element} */
    let keyedNode
    if (!!children[i].c && children[i].constructor === Object) {
      // @ts-ignore: A key in the keyed map only points to actual Elements.
      keyedNode = keyed.get(children[i].c[0]?.[skruvKey])
      if (keyedNode) {
        if (keyedNode !== currentNode.childNodes[i]) {
          if (keyedNode === currentNode.childNodes[i + 1]) {
            currentNode.removeChild(currentNode.childNodes[i])
          } else if (currentNode.childNodes[i] && keyed.get(children[i + 1]?.c?.[0]?.[skruvKey]) === currentNode.childNodes[i]) {
            currentNode.insertBefore(keyedNode, currentNode.childNodes[i])
          } else if (currentNode.childNodes[i]) {
            currentNode.replaceChild(keyedNode, currentNode.childNodes[i])
          } else {
            currentNode.appendChild(keyedNode)
          }
        }
        forceFull = children[i].c[0][skruvKey] !== oldKeys.get(currentNode.childNodes[i])
        if (!forceFull) {
          const lastKeyCopy = keyed.get(currentNode.childNodes[i])
          if (lastKeyCopy) {
            let noChange = true
            for (const k in children[i].c[0][skruvKey]) {
              // @ts-ignore: oldKey might be undefinded
              if (children[i].c[0][skruvKey][k] !== lastKeyCopy[k]) {
                noChange = false
              }
            }
            if (noChange) { continue }
          }
        }
      } else {
        forceFull = keyed.has(currentNode.childNodes[i])
      }
    }
    // @ts-ignore: TODO: TS does not like that currentNode "might" be a Node here, but since we do checking for text nodes above it is a Element
    render(children[i], currentNode.childNodes[i] || false, currentNode, ns, forceFull)
  }
  if (attributes[skruvKey]) {
    // @ts-ignore: TODO: The skruvkey is always an object here, but clarify the types for the attributes a bit more
    keyed.set(attributes[skruvKey], currentNode)
    oldKeys.set(currentNode, attributes[skruvKey])
    // @ts-ignore: TODO: The skruvkey is always an object here, but clarify the types for the attributes a bit more
    keyed.set(currentNode, { ...attributes[skruvKey] })
  }
}

/** @type {Record<string, (...c: Array<Record<string, any>|Vnode|string|number|boolean>) => Vnode>} */
export const elementFactory = new Proxy({}, { get: (_, t) => (/** @type {Array<Record<string, any>|Vnode|string|number|boolean>} */ ...c) => ({ s, t, c }) })
