// TODO: CSSOM is deprecated/abandoned. Its dependency free, but look for replacements or vendor it into this repo.
import cssom from 'cssom'

// Minimal, naive DOM implementation. Enough for skruv
const document = {
  /** @type {HTMLElement?} */
  documentElement: null,
  /**
   * @param {string} data
   * @returns {HTMLElement}
   */
  createComment: data => new HTMLElement('#comment', data),
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
class HTMLElement {
  /** @param {string} nodeName */
  constructor (nodeName, data = '') {
    this.skruvMock = true
    /** @type {HTMLElement[]} */
    this.childNodes = []
    /** @type {{ [key: string]: string; }} */
    this.attributes = {}
    /** @type {HTMLElement?} */
    this.parentNode = null
    /** @type {{ [key: string]: function; }} */
    this.eventListeners = {}
    this.ownerDocument = document
    this.nodeName = nodeName || this.nodeName
    this.data = data
  }

  /**
   * @param {HTMLElement} newNode
   * @param {HTMLElement} oldNode
   */
  replaceChild (newNode, oldNode) {
    this.childNodes[this.childNodes.indexOf(oldNode)] = newNode
    newNode.parentNode = this
    oldNode.parentNode = null
  }

  /** @param {HTMLElement} node */
  append (node) {
    this.childNodes.push(node)
    node.parentNode = this
  }

  /** @param {HTMLElement} node */
  prepend (node) {
    this.childNodes.unshift(node)
    node.parentNode = this
  }

  /** @param {HTMLElement} node */
  after (node) {
    if (!this.parentNode) {
      throw new Error('No parent to add node to in after')
    }
    this.parentNode.childNodes.splice(this.parentNode.childNodes.indexOf(this) + 1, 0, node)
    node.parentNode = this.parentNode
  }

  /** @param {HTMLElement} node */
  removeChild (node) {
    this.childNodes.splice(this.childNodes.indexOf(node), 1)
    node.parentNode = null
  }

  getAttributeNames () {
    return Object.keys(this.attributes)
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
   * @param {any} value
   */
  addEventListener (name, value) {
    this.eventListeners[name] = value
  }

  /** @param {any} event */
  dispatchEvent (event) {
    this.parentNode && this.parentNode?.dispatchEvent?.(event)
  }

  /** @param {HTMLElement} node */
  contains (node) {
    return true
  }

  get innerHTML () {
    return toHTML(this, '', {})
  }

  get textContent () {
    return toText(this)
  }
}
class SVGElement extends HTMLElement {}
class Text extends HTMLElement {
  constructor (data = '') {
    super('#text', '')
    this.data = data
  }
}
class Comment extends HTMLElement {
  constructor (data = '') {
    super('#text', '')
    this.data = data
  }
}

// Global MiniDOM classes for use in instanceof
globalThis.SVGElement = SVGElement
globalThis.HTMLElement = HTMLElement
globalThis.Text = Text
globalThis.Comment = Comment

// CSSOM polyfill
globalThis.CSSOM = cssom
globalThis.CSSMediaRule = cssom.CSSMediaRule
globalThis.CSSStyleRule = cssom.CSSStyleRule

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
globalThis.EventSource = FakeEventSource

globalThis.window = globalThis
globalThis.addEventListener = () => {}

// Reset function to get a new global document
export const reset = () => {
  const rootElement = new HTMLElement('document')
  const documentElement = new HTMLElement('html')
  documentElement.parentNode = rootElement
  rootElement.childNodes = [documentElement]
  document.documentElement = documentElement
  globalThis.document = document
}
reset()

// HTML rendering utils

// From https://github.com/lechidung/escape/blob/1.4.2/mod.ts
const matchEscHtmlRx = /["'&<>]/
/** @param {string} str */
function escapeHtml (str) {
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
function quoteattr (s, preserveCR) {
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
const htmlTag = (vDom, headers) =>
  `<${quoteattr(vDom.nodeName)}${
    !Object.entries(vDom.attributes).length
      ? ''
      : (' ' + Object.entries(vDom.attributes).map(htmlAttr)
.join(' '))
  }>${
    vDom.childNodes.map(e =>
      toHTML(e, vDom.nodeName, headers)
    ).join('')
  }</${quoteattr(vDom.nodeName)}>`

/**
 * @param {HTMLElement} vDom
 * @param {string} context
 * @param {{ [key: string]: string; }} headers
 * @returns {string}
 */
export const toHTML = (vDom, context, headers) => {
  if (
    vDom.nodeName === '#text' &&
    (context === 'raw' || context === 'script' || context === 'style')
  ) {
    return vDom.data // TODO: SECURITY: check escaping on CSS/JS. Or rely on CSP to make it safe
  } else if (vDom.nodeName === '#text') {
    return escapeHtml(vDom.data)
  } else if (vDom.nodeName === '#comment') {
    return `<!--${
      escapeHtml(
        vDom.childNodes.map(e => toHTML(e, vDom.nodeName, headers)).join('')
      )
    }-->`
  } else if (vDom.nodeName === 'html') {
    // Hacky way to make sure we have a doctype
    return `<!DOCTYPE html>${htmlTag(vDom, headers)}`
  } else if (vDom.nodeName === '#raw') {
    return vDom.childNodes.map(e => toHTML(e, vDom.nodeName, headers)).join(
      ''
    )
  } else if (vDom.nodeName === '#meta') {
    headers[vDom.attributes['http-equiv']] = vDom.attributes?.content
    return vDom.childNodes.map(e => toHTML(e, vDom.nodeName, headers)).join(
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
  if (vDom.nodeName === '#text') {
    return vDom.data
  } else {
    return vDom.childNodes.map(e => toText(e)).join('')
  }
}
