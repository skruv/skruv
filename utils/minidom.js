import cssom from './cssom.js'

const htmlNS = 'http://www.w3.org/1999/xhtml'
const svgNS = 'http://www.w3.org/2000/svg'
const mathmlNS = 'http://www.w3.org/1998/Math/MathML'
const atomNS = 'http://www.w3.org/2005/Atom'
const sitemapNS = 'https://www.sitemaps.org/schemas/sitemap/0.9'

// CSSOM polyfill
globalThis.CSSOM = cssom
// @ts-ignore: Type confusion between polyfilled and real elements
globalThis.CSSMediaRule = cssom.CSSMediaRule
// @ts-ignore: Type confusion between polyfilled and real elements
globalThis.CSSStyleRule = cssom.CSSStyleRule

// Minimal, naive DOM implementation. Enough for skruv
const document = {
  /** @type {HTMLElement?} */
  documentElement: null,
  /**
   * @param {string} data
   * @returns {HTMLElement}
   */
  createComment: data => new Comment(data),
  /**
   * @param {string} data
   * @returns {Text}
   */
  createTextNode: data => new Text(data),
  /**
   * @param {htmlNS|svgNS|mathmlNS} ns
   * @param {string} nodeName
   * @returns {Element}
   */
  createElementNS: (ns, nodeName) => {
    if (ns === htmlNS) { return new HTMLElement(nodeName) }
    if (ns === svgNS) { return new SVGElement(nodeName) }
    if (ns === mathmlNS) { return new MathMLElement(nodeName) }
    throw new Error('Unkown namespace: ' + ns)
  },
  querySelector: () => null,
  querySelectorAll: () => []
}

export class Element {
  /** @param {string} nodeName */
  constructor (nodeName = '') {
    /** @type {Element[]} */
    this.childNodes = []
    /** @type {{ [key: string]: string; }} */
    this.attributes = {}
    /** @type {Element?} */
    this.parentNode = null
    // TODO: make private
    /** @type {{ [key: string]: function[]; }} */
    this.eventListeners = {}
    this.ownerDocument = document
    this.nodeName = nodeName
    this.data = ''
    this.isSvg = false
  }

  /**
   * @param {Element} newNode
   * @param {Element} oldNode
   */
  replaceChild (newNode, oldNode) {
    if (newNode.parentNode) { newNode.parentNode.childNodes.splice(newNode.parentNode.childNodes.indexOf(newNode), 1) }
    this.childNodes[this.childNodes.indexOf(oldNode)] = newNode
    newNode.parentNode = this
    oldNode.parentNode = null
    if (oldNode === document.documentElement) {
      document.documentElement = newNode
    }
  }

  /** @param {Element} node */
  appendChild (node) {
    if (node.parentNode) { node.parentNode.childNodes.splice(node.parentNode.childNodes.indexOf(node), 1) }
    this.childNodes.push(node)
    node.parentNode = this
  }

  /** @param {Element} node */
  removeChild (node) {
    node.parentNode = null
    this.childNodes.splice(this.childNodes.indexOf(node), 1)
  }

  /**
   * @param {Element} newNode
   * @param {Element} oldNode
   */
  insertBefore (newNode, oldNode) {
    if (newNode.parentNode) { newNode.parentNode.childNodes.splice(newNode.parentNode.childNodes.indexOf(newNode), 1) }
    this.childNodes.splice(this.childNodes.indexOf(oldNode), 0, newNode)
    newNode.parentNode = this
  }

  replaceChildren () {
    this.childNodes = []
  }

  /** @param {string | number} name */
  getAttribute (name) {
    return this.attributes[name]
  }

  /** @param {string | number} name */
  removeAttribute (name) {
    delete this.attributes[name]
  }

  getAttributeNames () {
    return Object.keys(this.attributes)
  }

  /**
   * @param {string | number} name
   * @param {any} value
   */
  setAttribute (name, value) {
    this.attributes[name] = value
  }

  /** @param {string | number} name */
  removeEventListener (name) {
    delete this.eventListeners[name]
  }

  /**
   * @param {string | number} name
   * @param {function} value
   */
  addEventListener (name, value) {
    if (!this.eventListeners[name]) {
      this.eventListeners[name] = []
    }
    this.eventListeners[name].push(value)
  }

  /** @param {Event} event */
  dispatchEvent (event) {
    if (this.eventListeners[event.type]) {
      this.eventListeners[event.type].forEach(listener => listener({
        ...event,
        currentTarget: this,
        preventDefault: () => { }
      }))
    }
    if (this.parentNode) { this.parentNode.dispatchEvent(event) }
  }

  /** @param {Element} node */
  contains (node) {
    return true
  }

  /** @returns {Element} */
  cloneNode () {
    if (this.nodeName === '#comment') { return new Comment(this.data) }
    if (this.nodeName === '#text') { return new Text(this.data) }
    // @ts-ignore: We need to clone this element
    return new this.constructor(this.nodeName)
  }

  get innerHTML () {
    return toHTML(this, '', {})
  }

  get textContent () {
    return toText(this)
  }

  set textContent (data) {
    if (!(this instanceof Text || this instanceof Comment)) {
      const text = new Text(data)
      this.childNodes = [text]
      text.parentNode = this
    } else {
      this.data = data
    }
  }
}

export class HTMLElement extends Element { }
export class SVGElement extends Element { }
export class MathMLElement extends Element { }
export class HTMLOptionElement extends HTMLElement { }
export class HTMLInputElement extends HTMLElement { }

export class Text extends Element {
  constructor (data = '') {
    super('#text')
    /** @type {string} */
    this.data = data
  }
}

export class Comment extends Element {
  constructor (data = '') {
    super('#comment')
    /** @type {string} */
    this.data = data
  }
}

export class Location extends URL {
  get ancestorOrigins () {
    return {
      length: 0,
      item: () => null,
      contains: () => false,
      [Symbol.iterator]: function * () { }
    }
  }

  /** @param {string|URL} url */
  assign (url) {
    this.constructor(url)
  }

  reload () { }
  /** @param {string|URL} url */
  replace (url) {
    this.constructor(url)
  }
}

// @ts-ignore: Type confusion between polyfilled and real elements
globalThis.Location = Location

// Global MiniDOM classes for use in instanceof
// @ts-ignore: Type confusion between polyfilled and real elements
globalThis.Element = Element
// @ts-ignore: Type confusion between polyfilled and real elements
globalThis.HTMLOptionElement = HTMLOptionElement
// @ts-ignore: Type confusion between polyfilled and real elements
globalThis.HTMLInputElement = HTMLInputElement
// @ts-ignore: Type confusion between polyfilled and real elements
globalThis.SVGElement = SVGElement
// @ts-ignore: Type confusion between polyfilled and real elements
globalThis.HTMLElement = HTMLElement
// @ts-ignore: Type confusion between polyfilled and real elements
globalThis.MathMLElement = MathMLElement
// @ts-ignore: Type confusion between polyfilled and real elements
globalThis.Text = Text
// @ts-ignore: Type confusion between polyfilled and real elements
globalThis.Comment = Comment

// Fake EventSource
export class EventSource {
  /**
   * @param {URL | string} _url
   * @param {EventSourceInit} [_init]
   */
  constructor (_url, _init) {
    this.CONNECTING = 0
    this.OPEN = 1
    this.CLOSED = 2
  }

  addEventListener () { }
  close () { }
}
// @ts-ignore: Type confusion between polyfilled and real elements
globalThis.EventSource = EventSource

globalThis.addEventListener = () => { }

// Reset function to get a new global document
export const reset = () => {
  const rootElement = new HTMLElement('document')
  const documentElement = new HTMLElement('html')
  documentElement.parentNode = rootElement
  rootElement.childNodes = [documentElement]
  document.documentElement = documentElement
  // @ts-ignore: Type confusion between polyfilled and real elements
  globalThis.document = document
}
reset()

// HTML rendering utils

// From https://github.com/lechidung/escape/blob/1.4.2/mod.ts
const matchEscHtmlRx = /["'&<>]/
/** @param {string} str */
const escapeHtml = str => {
  const matchEscHtml = matchEscHtmlRx.exec(str)
  if (!matchEscHtml) {
    return str
  }
  let escape
  let html = ''
  let index = 0
  let lastIndex = 0
  for (index = matchEscHtml.index; index < str.length; index++) {
    switch (str.charCodeAt(index)) {
      case 34: // "
        escape = '&quot;'
        break
      case 38: // &
        escape = '&amp;'
        break
      case 39: // '
        escape = '&#39;'
        break
      case 60: // <
        escape = '&lt;'
        break
      case 62: // >
        escape = '&gt;'
        break
      default:
        continue
    }

    if (lastIndex !== index) {
      html += str.substring(lastIndex, index)
    }

    lastIndex = index + 1
    html += escape
  }

  return lastIndex !== index ? html + str.substring(lastIndex, index) : html
}

// From https://stackoverflow.com/a/9756789
/**
 * @param {string} s
 * @param {string | undefined} [preserveCR]
 */
const quoteattr = (s, preserveCR) => {
  preserveCR = preserveCR ? '&#13;' : '\n'
  return ('' + s) /* Forces the conversion to string. */
    .replace(/&/g, '&amp;') /* This MUST be the 1st replacement. */
    .replace(/'/g, '&apos;') /* The 4 other predefined entities, required. */
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/\r\n/g, preserveCR) /* Must be before the next replacement. */
    .replace(/[\r\n]/g, preserveCR)
}

const htmlAttr = (/** @type {[string, string]} */[name, value]) =>
  `${quoteattr(name)}="${quoteattr(value)}"`

/**
 * @param {HTMLElement} vDom
 * @param {{ [key: string]: string; }} headers
 * @returns {string}
 */
const htmlTag = (vDom, headers) => {
  if (['area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input', 'link', 'meta', 'param', 'source', 'track', 'wbr'].includes(vDom.nodeName.toLowerCase())) {
    return `<${quoteattr(vDom.nodeName.toLowerCase())}${!Object.entries(vDom.attributes).length
        ? ''
        : (' ' + Object.entries(vDom.attributes).map(htmlAttr)
          .join(' '))
      }/>`
  }
  return `<${quoteattr(vDom.nodeName)}${!Object.entries(vDom.attributes).length
      ? ''
      : (' ' + Object.entries(vDom.attributes).map(htmlAttr)
        .join(' '))
    }>${vDom.childNodes.map(e =>
      toHTML(e, vDom.nodeName, headers)
    ).join('')
    }</${quoteattr(vDom.nodeName)}>`
}

/**
 * @param {HTMLElement} vDom
 * @param {string} context
 * @param {{ [key: string]: string; }} headers
 * @returns {string}
 */
export const toHTML = (vDom, context, headers) => {
  if (vDom.nodeName === 'svg') {
    vDom.setAttribute('xmlns', svgNS)
  }
  if (vDom.nodeName === 'math') {
    vDom.setAttribute('xmlns', mathmlNS)
  }
  if (vDom.nodeName === 'feed') {
    vDom.setAttribute('xmlns', atomNS)
  }
  if (vDom.nodeName === 'urlset' || vDom.nodeName === 'sitemapindex') {
    vDom.setAttribute('xmlns', sitemapNS)
  }

  // If this is the root add a content-type header and the html/xml preamble
  if (context === '') {
    if (vDom.nodeName === 'html') {
      headers['content-type'] = 'text/html'
      return `<!DOCTYPE html>${toHTML(vDom, 'root', headers)}`
    }
    if (vDom.nodeName === 'svg') {
      headers['content-type'] = 'mage/svg+xml'
    }
    if (vDom.nodeName === 'math') {
      headers['content-type'] = 'application/mathml+xml'
    }
    if (vDom.nodeName === 'feed') {
      headers['content-type'] = 'application/atom+xml'
    }
    if (vDom.nodeName === 'urlset' || vDom.nodeName === 'sitemapindex') {
      headers['content-type'] = 'application/xml'
    }
    return `<?xml version="1.0" encoding="UTF-8"?>${toHTML(vDom, 'root', headers)}`
  }

  if (
    vDom.nodeName.toLowerCase() === '#text' && context === 'raw'
  ) {
    return vDom.data
  } else if (
    vDom.nodeName.toLowerCase() === '#text' && context === 'script'
  ) {
    // TODO: SECURITY: check escaping on CSS/JS. Or rely on CSP to make it safe
    return vDom.data.replace('</script>', '<\\/script>')
  } else if (
    vDom.nodeName.toLowerCase() === '#text' && context === 'style'
  ) {
    // TODO: SECURITY: check escaping on CSS/JS. Or rely on CSP to make it safe
    return vDom.data.replace('</style>', '<\\/style>')
  } else if (vDom.nodeName.toLowerCase() === '#text') {
    return escapeHtml(vDom.data)
  } else if (vDom.nodeName.toLowerCase() === '#comment') {
    return `<!--${escapeHtml(
      vDom.childNodes.map(e => toHTML(e, vDom.nodeName.toLowerCase(), headers)).join('')
    )
      }-->`
  } else if (vDom.nodeName.toLowerCase() === '#raw') {
    return vDom.childNodes.map(e => toHTML(e, vDom.nodeName.toLowerCase(), headers)).join(
      ''
    )
  } else if (vDom.nodeName.toLowerCase() === '#meta') {
    headers[vDom.attributes['http-equiv']] = vDom.attributes?.content
    return vDom.childNodes.map(e => toHTML(e, vDom.nodeName.toLowerCase(), headers)).join(
      ''
    )
  } else {
    return htmlTag(vDom, headers)
  }
}

/**
 * @param {HTMLElement} vDom
 * @returns {string}
 */
export const toText = vDom => {
  if (vDom.nodeName.toLowerCase() === '#text') {
    return vDom.data
  } else {
    return vDom.childNodes.map(e => toText(e)).join('')
  }
}
