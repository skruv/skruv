const htmlNS = 'http://www.w3.org/1999/xhtml'
/** @type {import("./utilityTypes").keyedMap} */
const keyed = new WeakMap()
/** @type {import("./utilityTypes").oldKeysMap} */
const oldKeys = new WeakMap()
/** @type {import("./utilityTypes").attributesMap} */
const attributesMap = new WeakMap()
/** @type {import("./utilityTypes").domCacheObj} */
const domCache = {}
/**
 * @param {import("./utilityTypes").Vnode} current
 * @param {import("./utilityTypes").AnyRealElement} currentNode
 * @param {ParentNode?} parentNode
 * @param {string} ns
 */
export const render = (
  current,
  // @ts-expect-error
  currentNode = globalThis.document.documentElement,
  // @ts-expect-error
  parentNode = currentNode.parentNode,
  ns = htmlNS,
  forceFull = false
) => {
  if (!parentNode) {
    throw new Error('No parent to render to')
  }
  if (typeof current === 'boolean') {
    // @ts-expect-error
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
      // @ts-expect-error: When this is a textnode we will only use it for text, so this should be fine
      currentNode = document.createTextNode('' + current)
    } else {
      if (current.t === 'svg') { ns = 'http://www.w3.org/2000/svg' }
      if (current.t === 'math') { ns = 'http://www.w3.org/1998/Math/MathML' }
      if (current.t === 'feed') { ns = 'http://www.w3.org/2005/Atom' }
      if (current.t === 'urlset' || current.t === 'sitemapindex') { ns = 'https://www.sitemaps.org/schemas/sitemap/0.9' }
      // @ts-expect-error: All the nodes are actually elements, since the domCache only contains elements
      currentNode = (domCache[current.t] || (domCache[current.t] = document.createElementNS(ns, current.t))).cloneNode(false)
    }
    if (_currentNode) {
      // @ts-expect-error
      parentNode.replaceChild(currentNode, _currentNode)
    } else {
      // @ts-expect-error
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
      // @ts-expect-error
      if (!currentNode || !parentNode.contains(currentNode)) { return false }
      render(current, currentNode, parentNode, ns)
      return true
    }
  }
  // This needs to come after the .r callback is registered since it should apply to child nodes, not the current node.
  if (current.t === 'foreignObject') { ns = htmlNS }
  /** @type {import("./utilityTypes").Vnode[]} */
  // @ts-expect-error
  let children = current.c.flat(Infinity)
  if (!globalThis?.isSkruvSSR) { children = children.filter(c => c?.t?.startsWith('skruv-')) }
  /** @type {import("./utilityTypes").attributes} */
  // @ts-expect-error
  let attributes = {}
  if (children[0]?.constructor === Object && !children[0]?.isSkruvDom) {
    // @ts-expect-error
    attributes = children[0]
    children = children.slice(1)
    let oldAttributes = attributesMap.get(currentNode)
    if (!oldAttributes) {
      oldAttributes = {}
      attributesMap.set(currentNode, oldAttributes)
    }
    for (const [key, value] of Object.entries(attributes)) {
      if (('' + oldAttributes[key]) === ('' + value)) { continue }
      if (key === 'data-skruv-key') { continue }
      if (key === 'data-skruv-after-create') {
        // Run after we have processed all the attributes and children
        setTimeout(() => value(currentNode), 0)
        oldAttributes[key] = value
        continue
      }
      if (key[0] === 'o' && key[1] === 'n') {
        const evt = key.slice(2)
        if (!oldAttributes[key]) {
          if (oldAttributes[key]) { currentNode.removeEventListener(evt, value) }
          currentNode.addEventListener(evt, value)
        } else if (!value) {
          currentNode.removeEventListener(evt, value)
        }
        oldAttributes[key] = value
        continue
      }
      if (
        (key === 'checked' || key === 'selected' || key === 'value') ||
        currentNode.nodeName.includes('-') // Support complex data passing for custom elements
      ) {
        // @ts-expect-error We have to index the element for custom elements or setting checked/selected/value
        currentNode[key] = value
      }
      if (value !== undefined) {
        currentNode.setAttribute(key, '' + value)
      } else {
        currentNode.removeAttribute(key)
      }
      oldAttributes[key] = value
    }
  }
  for (const key of currentNode.getAttributeNames().filter(e => !Object.keys(attributes).includes(e))) {
    currentNode.removeAttribute(key)
  }
  if (!children.length && currentNode.childNodes.length) {
    if (attributes['data-skruv-wait-for-not-empty']) {
      return
    }
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
    if (children[i]?.c) {
      // @ts-expect-error
      keyedNode = keyed.get(children[i].c[0]?.['data-skruv-key'])
      if (keyedNode) {
        // @ts-expect-error
        if (keyedNode !== currentNode.childNodes[i]) {
          // @ts-expect-error
          if (keyedNode === currentNode.childNodes[i + 1]) {
            currentNode.removeChild(currentNode.childNodes[i])
          // @ts-expect-error
          } else if (currentNode.childNodes[i] && keyed.get(children[i + 1]?.c?.[0]?.['data-skruv-key']) === currentNode.childNodes[i]) {
            // @ts-expect-error
            currentNode.insertBefore(keyedNode, currentNode.childNodes[i])
          } else if (currentNode.childNodes[i]) {
            // @ts-expect-error
            currentNode.replaceChild(keyedNode, currentNode.childNodes[i])
          } else {
            // @ts-expect-error
            currentNode.appendChild(keyedNode)
          }
        }
        // @ts-expect-error
        forceFull = children[i].c[0]['data-skruv-key'] !== oldKeys.get(currentNode.childNodes[i])
        if (!forceFull) {
          const lastKeyCopy = keyed.get(currentNode.childNodes[i])
          if (lastKeyCopy) {
            let noChange = true
            // @ts-expect-error
            for (const k in children[i].c[0]['data-skruv-key']) {
              // @ts-expect-error
              if (children[i].c[0]['data-skruv-key'][k] !== lastKeyCopy[k]) {
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
    // @ts-expect-error: This will be fine since if the node is of the wrong type a new one is created
    render(children[i], currentNode.childNodes[i] || false, currentNode, ns, forceFull)
  }
  if (attributes['data-skruv-key']) {
    keyed.set(attributes['data-skruv-key'], currentNode)
    oldKeys.set(currentNode, attributes['data-skruv-key'])
    keyed.set(currentNode, { ...attributes['data-skruv-key'] })
  }
}

/** @type {import("./utilityTypes").ElementMap} */ // @ts-expect-error
export const elementFactory = new Proxy({}, { get: (_, t) => (...c) => ({ isSkruvDom: true, t, c }) })
