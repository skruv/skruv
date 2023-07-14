// @ts-check
/* global HTMLInputElement HTMLOptionElement Text Comment HTMLElement SVGElement Document Window */
// TODO: Build
// Error boundaries (custom events that bubble)
// single level state

// TODO: Document
// data-skruv-key
// data-skruv-opaque
// data-skruv-finished
// data-skruv-wait-for-not-empty
// data-skruv-ssr-rendered
// oncreate & onremove
// hydration workflow
// css scoping
// state mgmt

// Globals used:
// document.querySelector
// elem.ownerDocument.documentElement
// elem.contains
// elem.replaceChild
// elem.prepend
// elem.after
// elem.parentNode
// elem.removeChild
// elem.dispatchEvent
// elem.getAttributeNames
// elem.setAttribute
// elem.getAttribute
// elem.removeAttribute
// elem.setAttribute
// elem.removeEventListener
// elem.addEventListener
// documentElement.createComment
// documentElement.createTextNode
// documentElement.createElementNS
// documentElement.createElement

/**
 * @typedef {(AsyncGenerator<Function|String|Boolean|Number>|AsyncIterable<Function|String|Boolean|Number>)} SkruvAttributesIterable
 */
/**
 * @typedef {(Promise<Function|String|Boolean|Number>|function(): Promise<Function|String|Boolean|Number>)} SkruvAttributesPromiseOrAsyncFunction
 */
/**
 * @typedef SkruvEvents
 * @prop {function(HTMLElement | Text | SVGElement | Comment): void} oncreate
 * @prop {function(HTMLElement | Text | SVGElement | Comment): void} onremove
 */
/**
 * @typedef {Partial<GlobalEventHandlers> & Partial<SkruvEvents> & Record<string,(string|boolean|Function|number|Object)>} PreparedVnodeAtrributes
 */
/**
 * @typedef {PreparedVnodeAtrributes & Record<string,(string|boolean|Function|number|Object|SkruvAttributesPromiseOrAsyncFunction|SkruvAttributesIterable)>} VnodeAtrributes
 */
/**
 * @typedef {object} Vnode
 * @prop {Symbol} s
 * @prop {String} t
 * @prop {SkruvChildNodes} _c
 * @prop {VnodeAtrributes} _a
 * @prop {{r:() => boolean}} r
 */
/**
 * @typedef {object} PreparedVnode
 * @prop {Symbol} p
 * @prop {Symbol} s
 * @prop {String} t
 * @prop {SkruvChildNodes} _c
 * @prop {VnodeAtrributes} _a
 * @prop {{r:() => boolean}} r
 * @prop {Array<PreparedVnode>} c
 * @prop {PreparedVnodeAtrributes} a
 */
/**
 * @typedef {AsyncGenerator<SkruvValue>} SkruvAsyncGenerator
 * @typedef {AsyncIterable<SkruvValue>} SkruvAsyncIterable
 * @typedef {Promise<SkruvValue>} SkruvPromise
 * @typedef {function(): Promise<SkruvValue>} SkruvAsyncFunction
 * @typedef {Vnode|Function|String|Number|Boolean|SkruvAsyncGenerator|SkruvAsyncIterable|SkruvPromise|SkruvAsyncFunction} SkruvValue
 */
/**
 * @typedef {Vnode|SkruvValue} SkruvChildNode
 */
/**
 * @typedef {Array<SkruvChildNode>} SkruvChildNodes
 */
const s = Symbol.for('skruvDom')
const p = Symbol.for('skruvDomPrepared')
/** @type {WeakMap<SkruvAsyncGenerator|SkruvAsyncIterable|SkruvPromise|SkruvAsyncFunction|Function|Vnode, SkruvValue?>} */
const generatorResults = new WeakMap()
/** @type {WeakMap<Node, Record<string,EventListener?>>} */
const skruvListeners = new WeakMap()
/** @type {WeakMap<Object, Node>} */
const keyedNodes = new WeakMap()
let hydrationResolve = () => { }
/** @type {Promise<void>} */
const hydrationPromise = (new Promise(resolve => { hydrationResolve = () => resolve() }))
const waitingGens = new Set()
// @ts-ignore This is a global set by SSR/Tests
let hydrating = self?.SkruvWaitForAsync || !!document.querySelector('data-skruv-ssr-rendered')

/** @type {Vnode} */
export const Vnode = { s, t: '', _c: [], _a: {}, r: { r: () => false } }

/** @type {VnodeAtrributes} */
export const VnodeAtrributes = {}

/**
 * @param {string} t
 * @param  {Array<SkruvChildNode|VnodeAtrributes>} c
 * @returns {Vnode}
 */
// @ts-ignore TODO: TS seems to be confused about the spreading of attributes and children. Try separating them
export const h = (t, ...c) => ({
  s,
  t,
  ...(
    typeof c[0] === 'object' &&
    !Array.isArray(c[0]) &&
    !(c[0] instanceof Function) && !(c[0] instanceof Function && c[0]?.prototype?.toString?.() === '[object AsyncGenerator]') &&
    // @ts-ignore How to check for booted generators?
    !(c[0]?.[Symbol.asyncIterator]) &&
    // @ts-ignore TODO: check why this still thinks a function can fall though
    c[0]?.s !== s
      ? {
        _a: c[0],
        _c: c.slice(1)
      }
      : {
        _a: {},
        _c: c
      }),
  r: {
    r: () => {
      if (hydrating && !waitingGens.size) {
        hydrating = false
        hydrationResolve()
      }
      return true
    }
  }
})

// This functions takes in a potentially async value and makes it sync
/**
 * @param {SkruvValue} value
 * @param  {PreparedVnode} parent
 * @param  {boolean} toVnodes
 * @returns {SkruvValue}
 */
const syncify = (value, parent, toVnodes) => {
  /**
   *
   * @param {Function | SkruvAsyncIterable | SkruvPromise | Vnode} value
   * @param {string | number | boolean | Function | Vnode | SkruvAsyncIterable | SkruvPromise | null} result
   * @returns
   */
  const process = (value, result) => {
    // @ts-ignore optional chaining
    if (hydrating && result?._a?.['data-skruv-finished'] !== false) {
      waitingGens.delete(value)
      // Make sure any async calls that returned other async nodes get added to the hydration queue
      if (result) {
        // @ts-ignore vdom typeguard
        if (result?.s === s) { flatten(result) } else { syncify(result, parent, toVnodes) }
      }
    }
    generatorResults.set(value, result)
    return parent.r.r()
  }
  // @ts-ignore maybe stricten up checks here
  if (generatorResults.has(value)) { return generatorResults.get(value) }
  // @ts-ignore TODO: Check what is the right way to detect started asynciterators
  if (typeof value === 'object' && value?.[Symbol.asyncIterator]) {
    const val = (/** @type {SkruvAsyncIterable} */ (value))
    if (hydrating) { waitingGens.add(val) }
    generatorResults.set(val, null);
    (async () => { for await (const result of val) { if (!process(value, result)) { break } } })()
    return false
  } else if (value instanceof Function && value?.prototype?.toString?.() === '[object AsyncGenerator]') {
    if (hydrating) { waitingGens.add(value) }
    generatorResults.set(value, null);
    (async () => { for await (const result of value()) { if (!process(value, result)) { break } } })()
    return false
    // @ts-ignore TODO: .then might not exist, but thats why I'm checking it!
  } else if (typeof value === 'object' && value !== null && value?.then instanceof Function) {
    const val = (/** @type {SkruvPromise} */ (value))
    if (hydrating) { waitingGens.add(value) }
    generatorResults.set(val, null);
    (async () => { process(val, await val) })()
    return false
  } else if (typeof value === 'function' && value.constructor.name === 'AsyncFunction') {
    if (hydrating) { waitingGens.add(value) }
    generatorResults.set(value, null);
    (async () => { process(value, await value()) })()
    return false
  } else if (typeof value === 'function') {
    if (toVnodes) {
      return value()
    }
    return value
  } else if (typeof value === 'string' || typeof value === 'number') {
    if (toVnodes) {
      return h('#text', { data: value.toString() })
    }
    return value.toString()
  } else if (typeof value === 'boolean') {
    return value
  }
  throw new Error('Unkown type in syncify: ' + JSON.stringify(value))
}

/**
 *
 * @param {SkruvChildNodes} c
 * @param {Vnode} skruvDom
 * @returns {PreparedVnode[]}
 */
const recurseVnodes = (c, skruvDom) => {
  const newVnodes = c.flat(Infinity)
    // @ts-ignore TS does not understand that .s is a typeguard for vnodes
    .map(value => value?.s === s ? flatten(value) : syncify(value, skruvDom, true))
    .flat(Infinity)
    .filter(value => value !== null && typeof value !== 'boolean')
  // @ts-ignore Optional chaining
  if (newVnodes.find(value => value?.p !== p)) {
    return recurseVnodes(newVnodes, skruvDom)
  }
  // @ts-ignore We already guard against this with the .p check above
  return newVnodes
}

// This needs all sorts of cleanup
// TODO: Instead of modifying the object have the r function be an object ({r:()=>}) so you can replace the inner function without having to modify the original
/**
 * @param {Vnode} skruvDom
 * @returns {PreparedVnode}
 */
const flatten = skruvDom => {
  const a = Object.fromEntries(
    Object.entries(skruvDom._a)
      .filter(entry => entry[1] !== null)
      // @ts-ignore We already check null above
      .map(([key, value]) => key === 'data-skruv-key' ? [key, value] : [key, syncify(value, skruvDom, false)])
      .filter(entry => entry[1] !== null)
  )
  return {
    p,
    ...skruvDom,
    a,
    c: recurseVnodes(skruvDom._c, skruvDom)
  }
}

/**
 * @param {PreparedVnode} current
 * @param {HTMLElement | SVGElement} currentNode
 * @param {ParentNode?} parentNode
 * @param {boolean} isSvg
 */
const renderRecursive = (current, currentNode, parentNode, isSvg) => {
  if (current.p !== p) {
    throw new Error('unkown type in render: ' + JSON.stringify(current))
  }
  if (!parentNode || (currentNode && !parentNode.contains(currentNode))) { return false }
  const ownerDocument = currentNode.ownerDocument
  const documentElement = ownerDocument.documentElement

  for (const key of currentNode.getAttributeNames().filter(k => !Object.keys(current.a).includes(k))) {
    currentNode.removeAttribute(key)
  }

  for (const [key, value] of Object.entries(current.a)) {
    if (key === 'data-skruv-key') { continue }
    if (value === null || value === false) {
      if (currentNode.getAttribute(key)) {
        currentNode.removeAttribute(key)
      }
      continue
    }
    /** @type {EventListenerOrEventListenerObject} */
    if (key.slice(0, 2) === 'on' && value instanceof Function) {
      let listeners = skruvListeners.get(currentNode)
      const curr = listeners?.[key]
      if (!listeners) {
        listeners = {}
        skruvListeners.set(currentNode, listeners)
      }
      if (curr && curr.toString() !== value.toString()) {
        currentNode.removeEventListener(key.slice(2), curr)
        listeners[key] = null
      }
      if (!curr) {
        // @ts-ignore EventListener and Function are incompatible according to TS
        listeners[key] = value
        // @ts-ignore EventListener and Function are incompatible according to TS
        currentNode.addEventListener(key.slice(2), value)
      }
      continue
    }
    currentNode.setAttribute(key, value.toString())
    if (key === 'value' && (typeof value === 'number' || typeof value === 'string') && currentNode instanceof HTMLInputElement) {
      currentNode[key] = value.toString()
    }
    if (
      (
        typeof value === 'boolean' &&
        (
          (currentNode instanceof HTMLInputElement && key === 'checked') ||
          (currentNode instanceof HTMLOptionElement && key === 'selected')
        )
      ) || typeof value === 'object' // Support complex data passing for custom elements
    ) {
      // @ts-ignore TS does not think properties are accessible directly?
      currentNode[key] = value
    }
  }

  current.r.r = () => renderRecursive(flatten(current), currentNode, parentNode, isSvg)

  if (current.a['data-skruv-opaque']) {
    return true
  }

  // Reuse of old nodes and handle keying
  const prev = Array.from(currentNode.childNodes)
  const curr = current.c
  /** @type {Array<Node?>} */
  const newOrder = []
  /**
   * @param {ChildNode} p
   * @param {Vnode} c
   * @returns {boolean}
   */
  const comp = (p, c) => p.nodeName.toLowerCase() === c.t && !newOrder.includes(p)
  for (let ci = 0; ci < curr.length; ci++) {
    const c = curr[ci]
    const inPrev = c.a['data-skruv-key'] ? keyedNodes.get(c.a['data-skruv-key']) : prev.find(p => comp(p, c))
    if (inPrev) {
      newOrder[ci] = inPrev
    } else {
      newOrder[ci] = null
    }
  }
  const toRemove = prev.filter(p => !newOrder.includes(p))

  if (current.c.length || !current.a['data-skruv-wait-for-not-empty']) {
    for (const elem of toRemove.filter(e => !!e)) {
      currentNode.removeChild(elem)
      // We have to do a microsleep before check since keyed nodes could have been moved to another location
      setTimeout(() => {
        if (!documentElement?.contains(elem) && skruvListeners.get(elem)?.onremove) { elem.dispatchEvent(new CustomEvent('remove')) }
      }, 1)
    }
  }

  for (let i = 0; i < newOrder.length; i++) {
    const child = current.c[i]
    let created = false
    if (!newOrder[i]) {
      let newChild
      if (current.t === '#comment') {
        newChild = ownerDocument.createComment('')
      } else if (child.t === '#text') {
        newChild = ownerDocument.createTextNode('')
      } else if (child.p === p && (isSvg || child.t === 'svg')) {
        newChild = ownerDocument.createElementNS('http://www.w3.org/2000/svg', child.t)
      } else {
        newChild = ownerDocument.createElement(child.t)
      }
      created = true
      if (currentNode.childNodes[i]) {
        currentNode.replaceChild(newChild, currentNode.childNodes[i])
      } else if (i === 0) {
        currentNode.prepend(newChild)
      } else {
        currentNode.childNodes[i - 1].after(newChild)
      }
    } else if (newOrder[i] !== currentNode.childNodes[i]) {
      // Make ts happy
      const nodeToMove = newOrder[i]
      if (nodeToMove) {
        if (i === 0) {
          currentNode.prepend(nodeToMove)
        } else {
          currentNode.childNodes[i - 1].after(nodeToMove)
        }
      }
    }
    const childNode = currentNode.childNodes[i]
    if ((childNode instanceof Text || childNode instanceof Comment)) {
      if (childNode.data !== child.a.data) { childNode.data = child.a.data.toString() }
      // Comment and text nodes have no attributes or children so bail here
      continue
    }
    if (!(childNode instanceof HTMLElement || childNode instanceof SVGElement)) {
      throw new Error('Child node of unkown type: ' + JSON.stringify({ childNode, child }))
    }
    if (child.a['data-skruv-key'] && !keyedNodes.has(child.a['data-skruv-key'])) { keyedNodes.set(child.a['data-skruv-key'], childNode) }
    renderRecursive(child, childNode, currentNode, isSvg || current.t === 'svg')
    if (created && skruvListeners.get(childNode)?.oncreate) { childNode.dispatchEvent(new CustomEvent('create')) }
  }
  return true
}

/**
 * @param {Vnode} current
 * @param {HTMLElement | SVGElement} [currentNode]
 * @param {ParentNode?} parentNode
 * @param {boolean} [isSvg]
 */
export const render = async (
  current,
  currentNode = self.document.documentElement,
  parentNode = currentNode?.parentNode,
  isSvg = false
) => {
  if (!parentNode) {
    // TODO: create error classes for skruv, inherit from one single error class
    throw new Error('Skruv: No parent to render to')
  }
  if (!(parentNode instanceof HTMLElement || parentNode instanceof SVGElement || parentNode instanceof Document || parentNode instanceof Window)) {
    // TODO: create error classes for skruv, inherit from one single error class
    throw new Error('Skruv: Parent of wrong type')
  }
  if (hydrating) {
    // If we are hydrating we first do a pass to find all async nodes, resolve those and then do a full render
    flatten(current).r.r()
    await hydrationPromise
  }
  renderRecursive(flatten(current), currentNode, parentNode, isSvg)
}

/** @type {Record<string, ((...c: Array<SkruvChildNode|VnodeAtrributes>) => Vnode)>} */
const proxyBase = {}
export const htmlFactory = new Proxy(
  proxyBase,
  { get: (_target, /** @type {string} */name) => /** @param {Array<SkruvChildNode|VnodeAtrributes>} c */(...c) => h(name, ...c) }
)
