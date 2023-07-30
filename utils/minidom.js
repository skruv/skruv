import cssom from './cssom.js'

// CSSOM polyfill
// @ts-ignore: TODO: instead polyfill CSSStyleSheet when safari adoption catches up
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
   * @param {string} _ns
   * @param {string} nodeName
   * @returns {HTMLElement}
   */
  createElementNS: (_ns, nodeName) => new HTMLElement(nodeName),
  /**
   * @param {string} nodeName
   * @returns {HTMLElement}
   */
  createElement: nodeName => new HTMLElement(nodeName),
  querySelector: () => null,
  querySelectorAll: () => []
}

class Element {
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
  }

  /**
   * @param {Element} newNode
   * @param {Element} oldNode
   */
  replaceChild (newNode, oldNode) {
    this.childNodes[this.childNodes.indexOf(oldNode)] = newNode
    newNode.parentNode = this
    oldNode.parentNode = null
  }

  /** @param {Element} node */
  appendChild (node) {
    this.childNodes.push(node)
    node.parentNode = this
  }

  /** @param {Element} node */
  removeChild (node) {
    this.childNodes.splice(this.childNodes.indexOf(node), 1)
    node.parentNode = null
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
    // @ts-ignore: This event is assumed to be synthetic
    if (!event.target) { event.target = this }
    if (this.eventListeners[event.type]) {
      this.eventListeners[event.type].forEach(listener => listener({
        ...event,
        currentTarget: this,
        preventDefault: () => {}
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
    return new Element(this.nodeName)
  }

  get innerHTML () {
    return toHTML(this, '', {})
  }

  get textContent () {
    return toText(this)
  }
}

class SVGElement extends Element {}
class HTMLElement extends Element {}

class HTMLOptionElement extends Element {}
class HTMLInputElement extends Element {}

class Text extends HTMLElement {
  constructor (data = '') {
    super('#text')
    /** @type {string} */
    this.data = data
  }
}

class Comment extends HTMLElement {
  constructor (data = '') {
    super('#comment')
    /** @type {string} */
    this.data = data
  }
}

class Location extends URL {
  get ancestorOrigins () {
    return {
      length: 0,
      item: () => null,
      contains: () => false,
      [Symbol.iterator]: function * () {}
    }
  }

  /** @param {string|URL} url */
  assign (url) {
    this.constructor(url)
  }

  reload () {}
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
globalThis.Text = Text
// @ts-ignore: Type confusion between polyfilled and real elements
globalThis.Comment = Comment

// Fake eventsource
class FakeEventSource {
  /**
   * @param {URL | string} _url
   * @param {EventSourceInit} [_init]
   */
  constructor (_url, _init) {
    this.CONNECTING = 0
    this.OPEN = 1
    this.CLOSED = 2
  }

  addEventListener () {}
  close () {}
}
// @ts-ignore: Type confusion between polyfilled and real elements
globalThis.EventSource = FakeEventSource

globalThis.addEventListener = () => {}

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

const htmlAttr = (/** @type {[string, string]} */ [name, value]) =>
  `${quoteattr(name)}="${quoteattr(value)}"`

/**
 * @param {HTMLElement} vDom
 * @param {{ [key: string]: string; }} headers
 * @returns {string}
 */
const htmlTag = (vDom, headers) => {
  if (['area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input', 'link', 'meta', 'param', 'source', 'track', 'wbr'].includes(vDom.nodeName.toLowerCase())) {
    return `<${quoteattr(vDom.nodeName.toLowerCase())}${
      !Object.entries(vDom.attributes).length
        ? ''
        : (' ' + Object.entries(vDom.attributes).map(htmlAttr)
  .join(' '))
    }/>`
  }
  return `<${quoteattr(vDom.nodeName)}${
    !Object.entries(vDom.attributes).length
      ? ''
      : (' ' + Object.entries(vDom.attributes).map(htmlAttr)
.join(' '))
  }>${
    vDom.childNodes.map(e =>
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
  if (
    vDom.nodeName.toLowerCase() === '#text' &&
    (context === 'RAW' || context === 'SCRIPT' || context === 'STYLE')
  ) {
    return vDom.data // TODO: SECURITY: check escaping on CSS/JS. Or rely on CSP to make it safe
  } else if (vDom.nodeName.toLowerCase() === '#text') {
    return escapeHtml(vDom.data)
  } else if (vDom.nodeName.toLowerCase() === '#comment') {
    return `<!--${
      escapeHtml(
        vDom.childNodes.map(e => toHTML(e, vDom.nodeName.toLowerCase(), headers)).join('')
      )
    }-->`
  } else if (vDom.nodeName.toLowerCase() === 'html') {
    // Hacky way to make sure we have a doctype
    return `<!DOCTYPE html>${htmlTag(vDom, headers)}`
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
