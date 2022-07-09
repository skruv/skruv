/**
 * @typedef SkruvEvents
 * @prop {function(HTMLElement | Text | SVGElement | Comment): void} oncreate
 * @prop {function(HTMLElement | Text | SVGElement | Comment): void} onremove
 * @prop {Object} key
 * @prop {Boolean} opaque
 */

/**
 * @typedef {Partial<GlobalEventHandlers> & Partial<SkruvEvents> & Object.<string, (string | boolean | function | number | undefined)>} VnodeAtrributes
 */

/**
 * @typedef Vnode
 * @prop {String} nodeName
 * @prop {String} [data]
 * @prop {ChildNodes} [result]
 * @prop {VnodeAtrributes} attributes
 * @prop {ChildNodes} childNodes
 */
/** @type {Vnode} */
export const Vnode = {
  nodeName: '',
  attributes: {},
  childNodes: []
}

/**
 * @typedef {Array<(Array<ChildNode>|ChildNode)>} ChildNodes
 */
/** @type {ChildNodes} */
export const ChildNodes = []

/**
 * @typedef {Vnode|Function|String|Boolean|Number|SkruvIterableType} ChildNode
 */
/** @type {ChildNode} */
export const ChildNode = Vnode

// TODO: these types would be much nicer as ChildNode|ChildNodes, but then typescript complains about recursiveness, because the SkruvIterableType can return a SkruvIterableType. Look into how to solve
/**
 * @typedef {Object} SkruvAdditionalIterableProperties
 * @property {ChildNodes|ChildNode} [result]
 * @property {Boolean} [booted]
 *
 * @typedef {(AsyncGenerator<Vnode|Function|String|Boolean|Number|ChildNodes> | AsyncIterable<Vnode|Function|String|Boolean|Number|ChildNodes>) & SkruvAdditionalIterableProperties} SkruvIterableType
 */
/** @type {SkruvIterableType} */
export const SkruvIterableType = (async function * () {yield Vnode})()

/**
 * @param {String} nodeName
 * @param {VnodeAtrributes} [attributes={}]
 * @param {...ChildNode} childNodes
 * @returns {Vnode}
 */
export const h = (nodeName, attributes = {}, ...childNodes) => ({ nodeName, attributes, childNodes })

// HTML

/**
 * @param {VnodeAtrributes} [attributes={}]
 * @param {...ChildNode} childNodes
 * @returns {Vnode}
 */
export const a = (attributes = {}, ...childNodes) => h('a', attributes, ...childNodes)
/**
 * @param {VnodeAtrributes} [attributes={}]
 * @param {...ChildNode} childNodes
 * @returns {Vnode}
 */
export const abbr = (attributes = {}, ...childNodes) => h('abbr', attributes, ...childNodes)
/**
 * @param {VnodeAtrributes} [attributes={}]
 * @param {...ChildNode} childNodes
 * @returns {Vnode}
 */
export const acronym = (attributes = {}, ...childNodes) => h('acronym', attributes, ...childNodes)
/**
 * @param {VnodeAtrributes} [attributes={}]
 * @param {...ChildNode} childNodes
 * @returns {Vnode}
 */
export const address = (attributes = {}, ...childNodes) => h('address', attributes, ...childNodes)
/**
 * @param {VnodeAtrributes} [attributes={}]
 * @param {...ChildNode} childNodes
 * @returns {Vnode}
 */
export const applet = (attributes = {}, ...childNodes) => h('applet', attributes, ...childNodes)
/**
 * @param {VnodeAtrributes} [attributes={}]
 * @param {...ChildNode} childNodes
 * @returns {Vnode}
 */
export const area = (attributes = {}, ...childNodes) => h('area', attributes, ...childNodes)
/**
 * @param {VnodeAtrributes} [attributes={}]
 * @param {...ChildNode} childNodes
 * @returns {Vnode}
 */
export const article = (attributes = {}, ...childNodes) => h('article', attributes, ...childNodes)
/**
 * @param {VnodeAtrributes} [attributes={}]
 * @param {...ChildNode} childNodes
 * @returns {Vnode}
 */
export const aside = (attributes = {}, ...childNodes) => h('aside', attributes, ...childNodes)
/**
 * @param {VnodeAtrributes} [attributes={}]
 * @param {...ChildNode} childNodes
 * @returns {Vnode}
 */
export const audio = (attributes = {}, ...childNodes) => h('audio', attributes, ...childNodes)
/**
 * @param {VnodeAtrributes} [attributes={}]
 * @param {...ChildNode} childNodes
 * @returns {Vnode}
 */
export const b = (attributes = {}, ...childNodes) => h('b', attributes, ...childNodes)
/**
 * @param {VnodeAtrributes} [attributes={}]
 * @param {...ChildNode} childNodes
 * @returns {Vnode}
 */
export const base = (attributes = {}, ...childNodes) => h('base', attributes, ...childNodes)
/**
 * @param {VnodeAtrributes} [attributes={}]
 * @param {...ChildNode} childNodes
 * @returns {Vnode}
 */
export const basefont = (attributes = {}, ...childNodes) => h('basefont', attributes, ...childNodes)
/**
 * @param {VnodeAtrributes} [attributes={}]
 * @param {...ChildNode} childNodes
 * @returns {Vnode}
 */
export const bdi = (attributes = {}, ...childNodes) => h('bdi', attributes, ...childNodes)
/**
 * @param {VnodeAtrributes} [attributes={}]
 * @param {...ChildNode} childNodes
 * @returns {Vnode}
 */
export const bdo = (attributes = {}, ...childNodes) => h('bdo', attributes, ...childNodes)
/**
 * @param {VnodeAtrributes} [attributes={}]
 * @param {...ChildNode} childNodes
 * @returns {Vnode}
 */
export const bgsound = (attributes = {}, ...childNodes) => h('bgsound', attributes, ...childNodes)
/**
 * @param {VnodeAtrributes} [attributes={}]
 * @param {...ChildNode} childNodes
 * @returns {Vnode}
 */
export const big = (attributes = {}, ...childNodes) => h('big', attributes, ...childNodes)
/**
 * @param {VnodeAtrributes} [attributes={}]
 * @param {...ChildNode} childNodes
 * @returns {Vnode}
 */
export const blink = (attributes = {}, ...childNodes) => h('blink', attributes, ...childNodes)
/**
 * @param {VnodeAtrributes} [attributes={}]
 * @param {...ChildNode} childNodes
 * @returns {Vnode}
 */
export const blockquote = (attributes = {}, ...childNodes) => h('blockquote', attributes, ...childNodes)
/**
 * @param {VnodeAtrributes} [attributes={}]
 * @param {...ChildNode} childNodes
 * @returns {Vnode}
 */
export const body = (attributes = {}, ...childNodes) => h('body', attributes, ...childNodes)
/**
 * @param {VnodeAtrributes} [attributes={}]
 * @param {...ChildNode} childNodes
 * @returns {Vnode}
 */
export const br = (attributes = {}, ...childNodes) => h('br', attributes, ...childNodes)
/**
 * @param {VnodeAtrributes} [attributes={}]
 * @param {...ChildNode} childNodes
 * @returns {Vnode}
 */
export const button = (attributes = {}, ...childNodes) => h('button', attributes, ...childNodes)
/**
 * @param {VnodeAtrributes} [attributes={}]
 * @param {...ChildNode} childNodes
 * @returns {Vnode}
 */
export const canvas = (attributes = {}, ...childNodes) => h('canvas', attributes, ...childNodes)
/**
 * @param {VnodeAtrributes} [attributes={}]
 * @param {...ChildNode} childNodes
 * @returns {Vnode}
 */
export const caption = (attributes = {}, ...childNodes) => h('caption', attributes, ...childNodes)
/**
 * @param {VnodeAtrributes} [attributes={}]
 * @param {...ChildNode} childNodes
 * @returns {Vnode}
 */
export const center = (attributes = {}, ...childNodes) => h('center', attributes, ...childNodes)
/**
 * @param {VnodeAtrributes} [attributes={}]
 * @param {...ChildNode} childNodes
 * @returns {Vnode}
 */
export const cite = (attributes = {}, ...childNodes) => h('cite', attributes, ...childNodes)
/**
 * @param {VnodeAtrributes} [attributes={}]
 * @param {...ChildNode} childNodes
 * @returns {Vnode}
 */
export const code = (attributes = {}, ...childNodes) => h('code', attributes, ...childNodes)
/**
 * @param {VnodeAtrributes} [attributes={}]
 * @param {...ChildNode} childNodes
 * @returns {Vnode}
 */
export const col = (attributes = {}, ...childNodes) => h('col', attributes, ...childNodes)
/**
 * @param {VnodeAtrributes} [attributes={}]
 * @param {...ChildNode} childNodes
 * @returns {Vnode}
 */
export const colgroup = (attributes = {}, ...childNodes) => h('colgroup', attributes, ...childNodes)
/**
 * @param {VnodeAtrributes} [attributes={}]
 * @param {...ChildNode} childNodes
 * @returns {Vnode}
 */
export const command = (attributes = {}, ...childNodes) => h('command', attributes, ...childNodes)
/**
 * @param {VnodeAtrributes} [attributes={}]
 * @param {...ChildNode} childNodes
 * @returns {Vnode}
 */
export const content = (attributes = {}, ...childNodes) => h('content', attributes, ...childNodes)
/**
 * @param {VnodeAtrributes} [attributes={}]
 * @param {...ChildNode} childNodes
 * @returns {Vnode}
 */
export const data = (attributes = {}, ...childNodes) => h('data', attributes, ...childNodes)
/**
 * @param {VnodeAtrributes} [attributes={}]
 * @param {...ChildNode} childNodes
 * @returns {Vnode}
 */
export const datalist = (attributes = {}, ...childNodes) => h('datalist', attributes, ...childNodes)
/**
 * @param {VnodeAtrributes} [attributes={}]
 * @param {...ChildNode} childNodes
 * @returns {Vnode}
 */
export const dd = (attributes = {}, ...childNodes) => h('dd', attributes, ...childNodes)
/**
 * @param {VnodeAtrributes} [attributes={}]
 * @param {...ChildNode} childNodes
 * @returns {Vnode}
 */
export const del = (attributes = {}, ...childNodes) => h('del', attributes, ...childNodes)
/**
 * @param {VnodeAtrributes} [attributes={}]
 * @param {...ChildNode} childNodes
 * @returns {Vnode}
 */
export const details = (attributes = {}, ...childNodes) => h('details', attributes, ...childNodes)
/**
 * @param {VnodeAtrributes} [attributes={}]
 * @param {...ChildNode} childNodes
 * @returns {Vnode}
 */
export const dfn = (attributes = {}, ...childNodes) => h('dfn', attributes, ...childNodes)
/**
 * @param {VnodeAtrributes} [attributes={}]
 * @param {...ChildNode} childNodes
 * @returns {Vnode}
 */
export const dialog = (attributes = {}, ...childNodes) => h('dialog', attributes, ...childNodes)
/**
 * @param {VnodeAtrributes} [attributes={}]
 * @param {...ChildNode} childNodes
 * @returns {Vnode}
 */
export const dir = (attributes = {}, ...childNodes) => h('dir', attributes, ...childNodes)
/**
 * @param {VnodeAtrributes} [attributes={}]
 * @param {...ChildNode} childNodes
 * @returns {Vnode}
 */
export const div = (attributes = {}, ...childNodes) => h('div', attributes, ...childNodes)
/**
 * @param {VnodeAtrributes} [attributes={}]
 * @param {...ChildNode} childNodes
 * @returns {Vnode}
 */
export const dl = (attributes = {}, ...childNodes) => h('dl', attributes, ...childNodes)
/**
 * @param {VnodeAtrributes} [attributes={}]
 * @param {...ChildNode} childNodes
 * @returns {Vnode}
 */
export const dt = (attributes = {}, ...childNodes) => h('dt', attributes, ...childNodes)
/**
 * @param {VnodeAtrributes} [attributes={}]
 * @param {...ChildNode} childNodes
 * @returns {Vnode}
 */
export const element = (attributes = {}, ...childNodes) => h('element', attributes, ...childNodes)
/**
 * @param {VnodeAtrributes} [attributes={}]
 * @param {...ChildNode} childNodes
 * @returns {Vnode}
 */
export const em = (attributes = {}, ...childNodes) => h('em', attributes, ...childNodes)
/**
 * @param {VnodeAtrributes} [attributes={}]
 * @param {...ChildNode} childNodes
 * @returns {Vnode}
 */
export const embed = (attributes = {}, ...childNodes) => h('embed', attributes, ...childNodes)
/**
 * @param {VnodeAtrributes} [attributes={}]
 * @param {...ChildNode} childNodes
 * @returns {Vnode}
 */
export const fieldset = (attributes = {}, ...childNodes) => h('fieldset', attributes, ...childNodes)
/**
 * @param {VnodeAtrributes} [attributes={}]
 * @param {...ChildNode} childNodes
 * @returns {Vnode}
 */
export const figcaption = (attributes = {}, ...childNodes) => h('figcaption', attributes, ...childNodes)
/**
 * @param {VnodeAtrributes} [attributes={}]
 * @param {...ChildNode} childNodes
 * @returns {Vnode}
 */
export const figure = (attributes = {}, ...childNodes) => h('figure', attributes, ...childNodes)
/**
 * @param {VnodeAtrributes} [attributes={}]
 * @param {...ChildNode} childNodes
 * @returns {Vnode}
 */
export const font = (attributes = {}, ...childNodes) => h('font', attributes, ...childNodes)
/**
 * @param {VnodeAtrributes} [attributes={}]
 * @param {...ChildNode} childNodes
 * @returns {Vnode}
 */
export const footer = (attributes = {}, ...childNodes) => h('footer', attributes, ...childNodes)
/**
 * @param {VnodeAtrributes} [attributes={}]
 * @param {...ChildNode} childNodes
 * @returns {Vnode}
 */
export const form = (attributes = {}, ...childNodes) => h('form', attributes, ...childNodes)
/**
 * @param {VnodeAtrributes} [attributes={}]
 * @param {...ChildNode} childNodes
 * @returns {Vnode}
 */
export const frame = (attributes = {}, ...childNodes) => h('frame', attributes, ...childNodes)
/**
 * @param {VnodeAtrributes} [attributes={}]
 * @param {...ChildNode} childNodes
 * @returns {Vnode}
 */
export const frameset = (attributes = {}, ...childNodes) => h('frameset', attributes, ...childNodes)
/**
 * @param {VnodeAtrributes} [attributes={}]
 * @param {...ChildNode} childNodes
 * @returns {Vnode}
 */
export const h1 = (attributes = {}, ...childNodes) => h('h1', attributes, ...childNodes)
/**
 * @param {VnodeAtrributes} [attributes={}]
 * @param {...ChildNode} childNodes
 * @returns {Vnode}
 */
export const h2 = (attributes = {}, ...childNodes) => h('h2', attributes, ...childNodes)
/**
 * @param {VnodeAtrributes} [attributes={}]
 * @param {...ChildNode} childNodes
 * @returns {Vnode}
 */
export const h3 = (attributes = {}, ...childNodes) => h('h3', attributes, ...childNodes)
/**
 * @param {VnodeAtrributes} [attributes={}]
 * @param {...ChildNode} childNodes
 * @returns {Vnode}
 */
export const h4 = (attributes = {}, ...childNodes) => h('h4', attributes, ...childNodes)
/**
 * @param {VnodeAtrributes} [attributes={}]
 * @param {...ChildNode} childNodes
 * @returns {Vnode}
 */
export const h5 = (attributes = {}, ...childNodes) => h('h5', attributes, ...childNodes)
/**
 * @param {VnodeAtrributes} [attributes={}]
 * @param {...ChildNode} childNodes
 * @returns {Vnode}
 */
export const h6 = (attributes = {}, ...childNodes) => h('h6', attributes, ...childNodes)
/**
 * @param {VnodeAtrributes} [attributes={}]
 * @param {...ChildNode} childNodes
 * @returns {Vnode}
 */
export const head = (attributes = {}, ...childNodes) => h('head', attributes, ...childNodes)
/**
 * @param {VnodeAtrributes} [attributes={}]
 * @param {...ChildNode} childNodes
 * @returns {Vnode}
 */
export const header = (attributes = {}, ...childNodes) => h('header', attributes, ...childNodes)
/**
 * @param {VnodeAtrributes} [attributes={}]
 * @param {...ChildNode} childNodes
 * @returns {Vnode}
 */
export const hgroup = (attributes = {}, ...childNodes) => h('hgroup', attributes, ...childNodes)
/**
 * @param {VnodeAtrributes} [attributes={}]
 * @param {...ChildNode} childNodes
 * @returns {Vnode}
 */
export const hr = (attributes = {}, ...childNodes) => h('hr', attributes, ...childNodes)
/**
 * @param {VnodeAtrributes} [attributes={}]
 * @param {...ChildNode} childNodes
 * @returns {Vnode}
 */
export const html = (attributes = {}, ...childNodes) => h('html', attributes, ...childNodes)
/**
 * @param {VnodeAtrributes} [attributes={}]
 * @param {...ChildNode} childNodes
 * @returns {Vnode}
 */
export const i = (attributes = {}, ...childNodes) => h('i', attributes, ...childNodes)
/**
 * @param {VnodeAtrributes} [attributes={}]
 * @param {...ChildNode} childNodes
 * @returns {Vnode}
 */
export const iframe = (attributes = {}, ...childNodes) => h('iframe', attributes, ...childNodes)
/**
 * @param {VnodeAtrributes} [attributes={}]
 * @param {...ChildNode} childNodes
 * @returns {Vnode}
 */
export const image = (attributes = {}, ...childNodes) => h('image', attributes, ...childNodes)
/**
 * @param {VnodeAtrributes} [attributes={}]
 * @param {...ChildNode} childNodes
 * @returns {Vnode}
 */
export const img = (attributes = {}, ...childNodes) => h('img', attributes, ...childNodes)
/**
 * @param {VnodeAtrributes} [attributes={}]
 * @param {...ChildNode} childNodes
 * @returns {Vnode}
 */
export const input = (attributes = {}, ...childNodes) => h('input', attributes, ...childNodes)
/**
 * @param {VnodeAtrributes} [attributes={}]
 * @param {...ChildNode} childNodes
 * @returns {Vnode}
 */
export const ins = (attributes = {}, ...childNodes) => h('ins', attributes, ...childNodes)
/**
 * @param {VnodeAtrributes} [attributes={}]
 * @param {...ChildNode} childNodes
 * @returns {Vnode}
 */
export const isindex = (attributes = {}, ...childNodes) => h('isindex', attributes, ...childNodes)
/**
 * @param {VnodeAtrributes} [attributes={}]
 * @param {...ChildNode} childNodes
 * @returns {Vnode}
 */
export const kbd = (attributes = {}, ...childNodes) => h('kbd', attributes, ...childNodes)
/**
 * @param {VnodeAtrributes} [attributes={}]
 * @param {...ChildNode} childNodes
 * @returns {Vnode}
 */
export const keygen = (attributes = {}, ...childNodes) => h('keygen', attributes, ...childNodes)
/**
 * @param {VnodeAtrributes} [attributes={}]
 * @param {...ChildNode} childNodes
 * @returns {Vnode}
 */
export const label = (attributes = {}, ...childNodes) => h('label', attributes, ...childNodes)
/**
 * @param {VnodeAtrributes} [attributes={}]
 * @param {...ChildNode} childNodes
 * @returns {Vnode}
 */
export const legend = (attributes = {}, ...childNodes) => h('legend', attributes, ...childNodes)
/**
 * @param {VnodeAtrributes} [attributes={}]
 * @param {...ChildNode} childNodes
 * @returns {Vnode}
 */
export const li = (attributes = {}, ...childNodes) => h('li', attributes, ...childNodes)
/**
 * @param {VnodeAtrributes} [attributes={}]
 * @param {...ChildNode} childNodes
 * @returns {Vnode}
 */
export const link = (attributes = {}, ...childNodes) => h('link', attributes, ...childNodes)
/**
 * @param {VnodeAtrributes} [attributes={}]
 * @param {...ChildNode} childNodes
 * @returns {Vnode}
 */
export const listing = (attributes = {}, ...childNodes) => h('listing', attributes, ...childNodes)
/**
 * @param {VnodeAtrributes} [attributes={}]
 * @param {...ChildNode} childNodes
 * @returns {Vnode}
 */
export const main = (attributes = {}, ...childNodes) => h('main', attributes, ...childNodes)
/**
 * @param {VnodeAtrributes} [attributes={}]
 * @param {...ChildNode} childNodes
 * @returns {Vnode}
 */
export const map = (attributes = {}, ...childNodes) => h('map', attributes, ...childNodes)
/**
 * @param {VnodeAtrributes} [attributes={}]
 * @param {...ChildNode} childNodes
 * @returns {Vnode}
 */
export const mark = (attributes = {}, ...childNodes) => h('mark', attributes, ...childNodes)
/**
 * @param {VnodeAtrributes} [attributes={}]
 * @param {...ChildNode} childNodes
 * @returns {Vnode}
 */
export const marquee = (attributes = {}, ...childNodes) => h('marquee', attributes, ...childNodes)
/**
 * @param {VnodeAtrributes} [attributes={}]
 * @param {...ChildNode} childNodes
 * @returns {Vnode}
 */
export const menu = (attributes = {}, ...childNodes) => h('menu', attributes, ...childNodes)
/**
 * @param {VnodeAtrributes} [attributes={}]
 * @param {...ChildNode} childNodes
 * @returns {Vnode}
 */
export const menuitem = (attributes = {}, ...childNodes) => h('menuitem', attributes, ...childNodes)
/**
 * @param {VnodeAtrributes} [attributes={}]
 * @param {...ChildNode} childNodes
 * @returns {Vnode}
 */
export const meta = (attributes = {}, ...childNodes) => h('meta', attributes, ...childNodes)
/**
 * @param {VnodeAtrributes} [attributes={}]
 * @param {...ChildNode} childNodes
 * @returns {Vnode}
 */
export const meter = (attributes = {}, ...childNodes) => h('meter', attributes, ...childNodes)
/**
 * @param {VnodeAtrributes} [attributes={}]
 * @param {...ChildNode} childNodes
 * @returns {Vnode}
 */
export const multicol = (attributes = {}, ...childNodes) => h('multicol', attributes, ...childNodes)
/**
 * @param {VnodeAtrributes} [attributes={}]
 * @param {...ChildNode} childNodes
 * @returns {Vnode}
 */
export const nav = (attributes = {}, ...childNodes) => h('nav', attributes, ...childNodes)
/**
 * @param {VnodeAtrributes} [attributes={}]
 * @param {...ChildNode} childNodes
 * @returns {Vnode}
 */
export const nextid = (attributes = {}, ...childNodes) => h('nextid', attributes, ...childNodes)
/**
 * @param {VnodeAtrributes} [attributes={}]
 * @param {...ChildNode} childNodes
 * @returns {Vnode}
 */
export const nobr = (attributes = {}, ...childNodes) => h('nobr', attributes, ...childNodes)
/**
 * @param {VnodeAtrributes} [attributes={}]
 * @param {...ChildNode} childNodes
 * @returns {Vnode}
 */
export const noembed = (attributes = {}, ...childNodes) => h('noembed', attributes, ...childNodes)
/**
 * @param {VnodeAtrributes} [attributes={}]
 * @param {...ChildNode} childNodes
 * @returns {Vnode}
 */
export const noframes = (attributes = {}, ...childNodes) => h('noframes', attributes, ...childNodes)
/**
 * @param {VnodeAtrributes} [attributes={}]
 * @param {...ChildNode} childNodes
 * @returns {Vnode}
 */
export const noscript = (attributes = {}, ...childNodes) => h('noscript', attributes, ...childNodes)
/**
 * @param {VnodeAtrributes} [attributes={}]
 * @param {...ChildNode} childNodes
 * @returns {Vnode}
 */
export const object = (attributes = {}, ...childNodes) => h('object', attributes, ...childNodes)
/**
 * @param {VnodeAtrributes} [attributes={}]
 * @param {...ChildNode} childNodes
 * @returns {Vnode}
 */
export const ol = (attributes = {}, ...childNodes) => h('ol', attributes, ...childNodes)
/**
 * @param {VnodeAtrributes} [attributes={}]
 * @param {...ChildNode} childNodes
 * @returns {Vnode}
 */
export const optgroup = (attributes = {}, ...childNodes) => h('optgroup', attributes, ...childNodes)
/**
 * @param {VnodeAtrributes} [attributes={}]
 * @param {...ChildNode} childNodes
 * @returns {Vnode}
 */
export const option = (attributes = {}, ...childNodes) => h('option', attributes, ...childNodes)
/**
 * @param {VnodeAtrributes} [attributes={}]
 * @param {...ChildNode} childNodes
 * @returns {Vnode}
 */
export const output = (attributes = {}, ...childNodes) => h('output', attributes, ...childNodes)
/**
 * @param {VnodeAtrributes} [attributes={}]
 * @param {...ChildNode} childNodes
 * @returns {Vnode}
 */
export const p = (attributes = {}, ...childNodes) => h('p', attributes, ...childNodes)
/**
 * @param {VnodeAtrributes} [attributes={}]
 * @param {...ChildNode} childNodes
 * @returns {Vnode}
 */
export const param = (attributes = {}, ...childNodes) => h('param', attributes, ...childNodes)
/**
 * @param {VnodeAtrributes} [attributes={}]
 * @param {...ChildNode} childNodes
 * @returns {Vnode}
 */
export const picture = (attributes = {}, ...childNodes) => h('picture', attributes, ...childNodes)
/**
 * @param {VnodeAtrributes} [attributes={}]
 * @param {...ChildNode} childNodes
 * @returns {Vnode}
 */
export const plaintext = (attributes = {}, ...childNodes) => h('plaintext', attributes, ...childNodes)
/**
 * @param {VnodeAtrributes} [attributes={}]
 * @param {...ChildNode} childNodes
 * @returns {Vnode}
 */
export const pre = (attributes = {}, ...childNodes) => h('pre', attributes, ...childNodes)
/**
 * @param {VnodeAtrributes} [attributes={}]
 * @param {...ChildNode} childNodes
 * @returns {Vnode}
 */
export const progress = (attributes = {}, ...childNodes) => h('progress', attributes, ...childNodes)
/**
 * @param {VnodeAtrributes} [attributes={}]
 * @param {...ChildNode} childNodes
 * @returns {Vnode}
 */
export const q = (attributes = {}, ...childNodes) => h('q', attributes, ...childNodes)
/**
 * @param {VnodeAtrributes} [attributes={}]
 * @param {...ChildNode} childNodes
 * @returns {Vnode}
 */
export const rb = (attributes = {}, ...childNodes) => h('rb', attributes, ...childNodes)
/**
 * @param {VnodeAtrributes} [attributes={}]
 * @param {...ChildNode} childNodes
 * @returns {Vnode}
 */
export const rp = (attributes = {}, ...childNodes) => h('rp', attributes, ...childNodes)
/**
 * @param {VnodeAtrributes} [attributes={}]
 * @param {...ChildNode} childNodes
 * @returns {Vnode}
 */
export const rt = (attributes = {}, ...childNodes) => h('rt', attributes, ...childNodes)
/**
 * @param {VnodeAtrributes} [attributes={}]
 * @param {...ChildNode} childNodes
 * @returns {Vnode}
 */
export const rtc = (attributes = {}, ...childNodes) => h('rtc', attributes, ...childNodes)
/**
 * @param {VnodeAtrributes} [attributes={}]
 * @param {...ChildNode} childNodes
 * @returns {Vnode}
 */
export const ruby = (attributes = {}, ...childNodes) => h('ruby', attributes, ...childNodes)
/**
 * @param {VnodeAtrributes} [attributes={}]
 * @param {...ChildNode} childNodes
 * @returns {Vnode}
 */
export const s = (attributes = {}, ...childNodes) => h('s', attributes, ...childNodes)
/**
 * @param {VnodeAtrributes} [attributes={}]
 * @param {...ChildNode} childNodes
 * @returns {Vnode}
 */
export const samp = (attributes = {}, ...childNodes) => h('samp', attributes, ...childNodes)
/**
 * @param {VnodeAtrributes} [attributes={}]
 * @param {...ChildNode} childNodes
 * @returns {Vnode}
 */
export const script = (attributes = {}, ...childNodes) => h('script', attributes, ...childNodes)
/**
 * @param {VnodeAtrributes} [attributes={}]
 * @param {...ChildNode} childNodes
 * @returns {Vnode}
 */
export const section = (attributes = {}, ...childNodes) => h('section', attributes, ...childNodes)
/**
 * @param {VnodeAtrributes} [attributes={}]
 * @param {...ChildNode} childNodes
 * @returns {Vnode}
 */
export const select = (attributes = {}, ...childNodes) => h('select', attributes, ...childNodes)
/**
 * @param {VnodeAtrributes} [attributes={}]
 * @param {...ChildNode} childNodes
 * @returns {Vnode}
 */
export const shadow = (attributes = {}, ...childNodes) => h('shadow', attributes, ...childNodes)
/**
 * @param {VnodeAtrributes} [attributes={}]
 * @param {...ChildNode} childNodes
 * @returns {Vnode}
 */
export const slot = (attributes = {}, ...childNodes) => h('slot', attributes, ...childNodes)
/**
 * @param {VnodeAtrributes} [attributes={}]
 * @param {...ChildNode} childNodes
 * @returns {Vnode}
 */
export const small = (attributes = {}, ...childNodes) => h('small', attributes, ...childNodes)
/**
 * @param {VnodeAtrributes} [attributes={}]
 * @param {...ChildNode} childNodes
 * @returns {Vnode}
 */
export const source = (attributes = {}, ...childNodes) => h('source', attributes, ...childNodes)
/**
 * @param {VnodeAtrributes} [attributes={}]
 * @param {...ChildNode} childNodes
 * @returns {Vnode}
 */
export const spacer = (attributes = {}, ...childNodes) => h('spacer', attributes, ...childNodes)
/**
 * @param {VnodeAtrributes} [attributes={}]
 * @param {...ChildNode} childNodes
 * @returns {Vnode}
 */
export const span = (attributes = {}, ...childNodes) => h('span', attributes, ...childNodes)
/**
 * @param {VnodeAtrributes} [attributes={}]
 * @param {...ChildNode} childNodes
 * @returns {Vnode}
 */
export const strike = (attributes = {}, ...childNodes) => h('strike', attributes, ...childNodes)
/**
 * @param {VnodeAtrributes} [attributes={}]
 * @param {...ChildNode} childNodes
 * @returns {Vnode}
 */
export const strong = (attributes = {}, ...childNodes) => h('strong', attributes, ...childNodes)
/**
 * @param {VnodeAtrributes} [attributes={}]
 * @param {...ChildNode} childNodes
 * @returns {Vnode}
 */
export const style = (attributes = {}, ...childNodes) => h('style', attributes, ...childNodes)
/**
 * @param {VnodeAtrributes} [attributes={}]
 * @param {...ChildNode} childNodes
 * @returns {Vnode}
 */
export const sub = (attributes = {}, ...childNodes) => h('sub', attributes, ...childNodes)
/**
 * @param {VnodeAtrributes} [attributes={}]
 * @param {...ChildNode} childNodes
 * @returns {Vnode}
 */
export const summary = (attributes = {}, ...childNodes) => h('summary', attributes, ...childNodes)
/**
 * @param {VnodeAtrributes} [attributes={}]
 * @param {...ChildNode} childNodes
 * @returns {Vnode}
 */
export const sup = (attributes = {}, ...childNodes) => h('sup', attributes, ...childNodes)
/**
 * @param {VnodeAtrributes} [attributes={}]
 * @param {...ChildNode} childNodes
 * @returns {Vnode}
 */
export const table = (attributes = {}, ...childNodes) => h('table', attributes, ...childNodes)
/**
 * @param {VnodeAtrributes} [attributes={}]
 * @param {...ChildNode} childNodes
 * @returns {Vnode}
 */
export const tbody = (attributes = {}, ...childNodes) => h('tbody', attributes, ...childNodes)
/**
 * @param {VnodeAtrributes} [attributes={}]
 * @param {...ChildNode} childNodes
 * @returns {Vnode}
 */
export const td = (attributes = {}, ...childNodes) => h('td', attributes, ...childNodes)
/**
 * @param {VnodeAtrributes} [attributes={}]
 * @param {...ChildNode} childNodes
 * @returns {Vnode}
 */
export const template = (attributes = {}, ...childNodes) => h('template', attributes, ...childNodes)
/**
 * @param {VnodeAtrributes} [attributes={}]
 * @param {...ChildNode} childNodes
 * @returns {Vnode}
 */
export const textarea = (attributes = {}, ...childNodes) => h('textarea', attributes, ...childNodes)
/**
 * @param {VnodeAtrributes} [attributes={}]
 * @param {...ChildNode} childNodes
 * @returns {Vnode}
 */
export const tfoot = (attributes = {}, ...childNodes) => h('tfoot', attributes, ...childNodes)
/**
 * @param {VnodeAtrributes} [attributes={}]
 * @param {...ChildNode} childNodes
 * @returns {Vnode}
 */
export const th = (attributes = {}, ...childNodes) => h('th', attributes, ...childNodes)
/**
 * @param {VnodeAtrributes} [attributes={}]
 * @param {...ChildNode} childNodes
 * @returns {Vnode}
 */
export const thead = (attributes = {}, ...childNodes) => h('thead', attributes, ...childNodes)
/**
 * @param {VnodeAtrributes} [attributes={}]
 * @param {...ChildNode} childNodes
 * @returns {Vnode}
 */
export const time = (attributes = {}, ...childNodes) => h('time', attributes, ...childNodes)
/**
 * @param {VnodeAtrributes} [attributes={}]
 * @param {...ChildNode} childNodes
 * @returns {Vnode}
 */
export const title = (attributes = {}, ...childNodes) => h('title', attributes, ...childNodes)
/**
 * @param {VnodeAtrributes} [attributes={}]
 * @param {...ChildNode} childNodes
 * @returns {Vnode}
 */
export const tr = (attributes = {}, ...childNodes) => h('tr', attributes, ...childNodes)
/**
 * @param {VnodeAtrributes} [attributes={}]
 * @param {...ChildNode} childNodes
 * @returns {Vnode}
 */
export const track = (attributes = {}, ...childNodes) => h('track', attributes, ...childNodes)
/**
 * @param {VnodeAtrributes} [attributes={}]
 * @param {...ChildNode} childNodes
 * @returns {Vnode}
 */
export const tt = (attributes = {}, ...childNodes) => h('tt', attributes, ...childNodes)
/**
 * @param {VnodeAtrributes} [attributes={}]
 * @param {...ChildNode} childNodes
 * @returns {Vnode}
 */
export const u = (attributes = {}, ...childNodes) => h('u', attributes, ...childNodes)
/**
 * @param {VnodeAtrributes} [attributes={}]
 * @param {...ChildNode} childNodes
 * @returns {Vnode}
 */
export const ul = (attributes = {}, ...childNodes) => h('ul', attributes, ...childNodes)
/**
 * @param {VnodeAtrributes} [attributes={}]
 * @param {...ChildNode} childNodes
 * @returns {Vnode}
 */
export const varElem = (attributes = {}, ...childNodes) => h('var', attributes, ...childNodes)
/**
 * @param {VnodeAtrributes} [attributes={}]
 * @param {...ChildNode} childNodes
 * @returns {Vnode}
 */
export const video = (attributes = {}, ...childNodes) => h('video', attributes, ...childNodes)
/**
 * @param {VnodeAtrributes} [attributes={}]
 * @param {...ChildNode} childNodes
 * @returns {Vnode}
 */
export const wbr = (attributes = {}, ...childNodes) => h('wbr', attributes, ...childNodes)
/**
 * @param {VnodeAtrributes} [attributes={}]
 * @param {...ChildNode} childNodes
 * @returns {Vnode}
 */
export const xmp = (attributes = {}, ...childNodes) => h('xmp', attributes, ...childNodes)

// SVG
/**
 * @param {VnodeAtrributes} [attributes={}]
 * @param {...ChildNode} childNodes
 * @returns {Vnode}
 */
export const animate = (attributes = {}, ...childNodes) => h('animate', attributes, ...childNodes)
/**
 * @param {VnodeAtrributes} [attributes={}]
 * @param {...ChildNode} childNodes
 * @returns {Vnode}
 */
export const animateMotion = (attributes = {}, ...childNodes) => h('animateMotion', attributes, ...childNodes)
/**
 * @param {VnodeAtrributes} [attributes={}]
 * @param {...ChildNode} childNodes
 * @returns {Vnode}
 */
export const animateTransform = (attributes = {}, ...childNodes) => h('animateTransform', attributes, ...childNodes)
/**
 * @param {VnodeAtrributes} [attributes={}]
 * @param {...ChildNode} childNodes
 * @returns {Vnode}
 */
export const circle = (attributes = {}, ...childNodes) => h('circle', attributes, ...childNodes)
/**
 * @param {VnodeAtrributes} [attributes={}]
 * @param {...ChildNode} childNodes
 * @returns {Vnode}
 */
export const clipPath = (attributes = {}, ...childNodes) => h('clipPath', attributes, ...childNodes)
/**
 * @param {VnodeAtrributes} [attributes={}]
 * @param {...ChildNode} childNodes
 * @returns {Vnode}
 */
export const defs = (attributes = {}, ...childNodes) => h('defs', attributes, ...childNodes)
/**
 * @param {VnodeAtrributes} [attributes={}]
 * @param {...ChildNode} childNodes
 * @returns {Vnode}
 */
export const desc = (attributes = {}, ...childNodes) => h('desc', attributes, ...childNodes)
/**
 * @param {VnodeAtrributes} [attributes={}]
 * @param {...ChildNode} childNodes
 * @returns {Vnode}
 */
export const discard = (attributes = {}, ...childNodes) => h('discard', attributes, ...childNodes)
/**
 * @param {VnodeAtrributes} [attributes={}]
 * @param {...ChildNode} childNodes
 * @returns {Vnode}
 */
export const ellipse = (attributes = {}, ...childNodes) => h('ellipse', attributes, ...childNodes)
/**
 * @param {VnodeAtrributes} [attributes={}]
 * @param {...ChildNode} childNodes
 * @returns {Vnode}
 */
export const feBlend = (attributes = {}, ...childNodes) => h('feBlend', attributes, ...childNodes)
/**
 * @param {VnodeAtrributes} [attributes={}]
 * @param {...ChildNode} childNodes
 * @returns {Vnode}
 */
export const feColorMatrix = (attributes = {}, ...childNodes) => h('feColorMatrix', attributes, ...childNodes)
/**
 * @param {VnodeAtrributes} [attributes={}]
 * @param {...ChildNode} childNodes
 * @returns {Vnode}
 */
export const feComponentTransfer = (attributes = {}, ...childNodes) => h('feComponentTransfer', attributes, ...childNodes)
/**
 * @param {VnodeAtrributes} [attributes={}]
 * @param {...ChildNode} childNodes
 * @returns {Vnode}
 */
export const feComposite = (attributes = {}, ...childNodes) => h('feComposite', attributes, ...childNodes)
/**
 * @param {VnodeAtrributes} [attributes={}]
 * @param {...ChildNode} childNodes
 * @returns {Vnode}
 */
export const feConvolveMatrix = (attributes = {}, ...childNodes) => h('feConvolveMatrix', attributes, ...childNodes)
/**
 * @param {VnodeAtrributes} [attributes={}]
 * @param {...ChildNode} childNodes
 * @returns {Vnode}
 */
export const feDiffuseLighting = (attributes = {}, ...childNodes) => h('feDiffuseLighting', attributes, ...childNodes)
/**
 * @param {VnodeAtrributes} [attributes={}]
 * @param {...ChildNode} childNodes
 * @returns {Vnode}
 */
export const feDisplacementMap = (attributes = {}, ...childNodes) => h('feDisplacementMap', attributes, ...childNodes)
/**
 * @param {VnodeAtrributes} [attributes={}]
 * @param {...ChildNode} childNodes
 * @returns {Vnode}
 */
export const feDistantLight = (attributes = {}, ...childNodes) => h('feDistantLight', attributes, ...childNodes)
/**
 * @param {VnodeAtrributes} [attributes={}]
 * @param {...ChildNode} childNodes
 * @returns {Vnode}
 */
export const feDropShadow = (attributes = {}, ...childNodes) => h('feDropShadow', attributes, ...childNodes)
/**
 * @param {VnodeAtrributes} [attributes={}]
 * @param {...ChildNode} childNodes
 * @returns {Vnode}
 */
export const feFlood = (attributes = {}, ...childNodes) => h('feFlood', attributes, ...childNodes)
/**
 * @param {VnodeAtrributes} [attributes={}]
 * @param {...ChildNode} childNodes
 * @returns {Vnode}
 */
export const feFuncA = (attributes = {}, ...childNodes) => h('feFuncA', attributes, ...childNodes)
/**
 * @param {VnodeAtrributes} [attributes={}]
 * @param {...ChildNode} childNodes
 * @returns {Vnode}
 */
export const feFuncB = (attributes = {}, ...childNodes) => h('feFuncB', attributes, ...childNodes)
/**
 * @param {VnodeAtrributes} [attributes={}]
 * @param {...ChildNode} childNodes
 * @returns {Vnode}
 */
export const feFuncG = (attributes = {}, ...childNodes) => h('feFuncG', attributes, ...childNodes)
/**
 * @param {VnodeAtrributes} [attributes={}]
 * @param {...ChildNode} childNodes
 * @returns {Vnode}
 */
export const feFuncR = (attributes = {}, ...childNodes) => h('feFuncR', attributes, ...childNodes)
/**
 * @param {VnodeAtrributes} [attributes={}]
 * @param {...ChildNode} childNodes
 * @returns {Vnode}
 */
export const feGaussianBlur = (attributes = {}, ...childNodes) => h('feGaussianBlur', attributes, ...childNodes)
/**
 * @param {VnodeAtrributes} [attributes={}]
 * @param {...ChildNode} childNodes
 * @returns {Vnode}
 */
export const feImage = (attributes = {}, ...childNodes) => h('feImage', attributes, ...childNodes)
/**
 * @param {VnodeAtrributes} [attributes={}]
 * @param {...ChildNode} childNodes
 * @returns {Vnode}
 */
export const feMerge = (attributes = {}, ...childNodes) => h('feMerge', attributes, ...childNodes)
/**
 * @param {VnodeAtrributes} [attributes={}]
 * @param {...ChildNode} childNodes
 * @returns {Vnode}
 */
export const feMergeNode = (attributes = {}, ...childNodes) => h('feMergeNode', attributes, ...childNodes)
/**
 * @param {VnodeAtrributes} [attributes={}]
 * @param {...ChildNode} childNodes
 * @returns {Vnode}
 */
export const feMorphology = (attributes = {}, ...childNodes) => h('feMorphology', attributes, ...childNodes)
/**
 * @param {VnodeAtrributes} [attributes={}]
 * @param {...ChildNode} childNodes
 * @returns {Vnode}
 */
export const feOffset = (attributes = {}, ...childNodes) => h('feOffset', attributes, ...childNodes)
/**
 * @param {VnodeAtrributes} [attributes={}]
 * @param {...ChildNode} childNodes
 * @returns {Vnode}
 */
export const fePointLight = (attributes = {}, ...childNodes) => h('fePointLight', attributes, ...childNodes)
/**
 * @param {VnodeAtrributes} [attributes={}]
 * @param {...ChildNode} childNodes
 * @returns {Vnode}
 */
export const feSpecularLighting = (attributes = {}, ...childNodes) => h('feSpecularLighting', attributes, ...childNodes)
/**
 * @param {VnodeAtrributes} [attributes={}]
 * @param {...ChildNode} childNodes
 * @returns {Vnode}
 */
export const feSpotLight = (attributes = {}, ...childNodes) => h('feSpotLight', attributes, ...childNodes)
/**
 * @param {VnodeAtrributes} [attributes={}]
 * @param {...ChildNode} childNodes
 * @returns {Vnode}
 */
export const feTile = (attributes = {}, ...childNodes) => h('feTile', attributes, ...childNodes)
/**
 * @param {VnodeAtrributes} [attributes={}]
 * @param {...ChildNode} childNodes
 * @returns {Vnode}
 */
export const feTurbulence = (attributes = {}, ...childNodes) => h('feTurbulence', attributes, ...childNodes)
/**
 * @param {VnodeAtrributes} [attributes={}]
 * @param {...ChildNode} childNodes
 * @returns {Vnode}
 */
export const filter = (attributes = {}, ...childNodes) => h('filter', attributes, ...childNodes)
/**
 * @param {VnodeAtrributes} [attributes={}]
 * @param {...ChildNode} childNodes
 * @returns {Vnode}
 */
export const foreignObject = (attributes = {}, ...childNodes) => h('foreignObject', attributes, ...childNodes)
/**
 * @param {VnodeAtrributes} [attributes={}]
 * @param {...ChildNode} childNodes
 * @returns {Vnode}
 */
export const g = (attributes = {}, ...childNodes) => h('g', attributes, ...childNodes)
/**
 * @param {VnodeAtrributes} [attributes={}]
 * @param {...ChildNode} childNodes
 * @returns {Vnode}
 */
export const hatch = (attributes = {}, ...childNodes) => h('hatch', attributes, ...childNodes)
/**
 * @param {VnodeAtrributes} [attributes={}]
 * @param {...ChildNode} childNodes
 * @returns {Vnode}
 */
export const hatchpath = (attributes = {}, ...childNodes) => h('hatchpath', attributes, ...childNodes)
/**
 * @param {VnodeAtrributes} [attributes={}]
 * @param {...ChildNode} childNodes
 * @returns {Vnode}
 */
export const line = (attributes = {}, ...childNodes) => h('line', attributes, ...childNodes)
/**
 * @param {VnodeAtrributes} [attributes={}]
 * @param {...ChildNode} childNodes
 * @returns {Vnode}
 */
export const linearGradient = (attributes = {}, ...childNodes) => h('linearGradient', attributes, ...childNodes)
/**
 * @param {VnodeAtrributes} [attributes={}]
 * @param {...ChildNode} childNodes
 * @returns {Vnode}
 */
export const marker = (attributes = {}, ...childNodes) => h('marker', attributes, ...childNodes)
/**
 * @param {VnodeAtrributes} [attributes={}]
 * @param {...ChildNode} childNodes
 * @returns {Vnode}
 */
export const mask = (attributes = {}, ...childNodes) => h('mask', attributes, ...childNodes)
/**
 * @param {VnodeAtrributes} [attributes={}]
 * @param {...ChildNode} childNodes
 * @returns {Vnode}
 */
export const mesh = (attributes = {}, ...childNodes) => h('mesh', attributes, ...childNodes)
/**
 * @param {VnodeAtrributes} [attributes={}]
 * @param {...ChildNode} childNodes
 * @returns {Vnode}
 */
export const meshgradient = (attributes = {}, ...childNodes) => h('meshgradient', attributes, ...childNodes)
/**
 * @param {VnodeAtrributes} [attributes={}]
 * @param {...ChildNode} childNodes
 * @returns {Vnode}
 */
export const meshpatch = (attributes = {}, ...childNodes) => h('meshpatch', attributes, ...childNodes)
/**
 * @param {VnodeAtrributes} [attributes={}]
 * @param {...ChildNode} childNodes
 * @returns {Vnode}
 */
export const meshrow = (attributes = {}, ...childNodes) => h('meshrow', attributes, ...childNodes)
/**
 * @param {VnodeAtrributes} [attributes={}]
 * @param {...ChildNode} childNodes
 * @returns {Vnode}
 */
export const metadata = (attributes = {}, ...childNodes) => h('metadata', attributes, ...childNodes)
/**
 * @param {VnodeAtrributes} [attributes={}]
 * @param {...ChildNode} childNodes
 * @returns {Vnode}
 */
export const mpath = (attributes = {}, ...childNodes) => h('mpath', attributes, ...childNodes)
/**
 * @param {VnodeAtrributes} [attributes={}]
 * @param {...ChildNode} childNodes
 * @returns {Vnode}
 */
export const path = (attributes = {}, ...childNodes) => h('path', attributes, ...childNodes)
/**
 * @param {VnodeAtrributes} [attributes={}]
 * @param {...ChildNode} childNodes
 * @returns {Vnode}
 */
export const pattern = (attributes = {}, ...childNodes) => h('pattern', attributes, ...childNodes)
/**
 * @param {VnodeAtrributes} [attributes={}]
 * @param {...ChildNode} childNodes
 * @returns {Vnode}
 */
export const polygon = (attributes = {}, ...childNodes) => h('polygon', attributes, ...childNodes)
/**
 * @param {VnodeAtrributes} [attributes={}]
 * @param {...ChildNode} childNodes
 * @returns {Vnode}
 */
export const polyline = (attributes = {}, ...childNodes) => h('polyline', attributes, ...childNodes)
/**
 * @param {VnodeAtrributes} [attributes={}]
 * @param {...ChildNode} childNodes
 * @returns {Vnode}
 */
export const radialGradient = (attributes = {}, ...childNodes) => h('radialGradient', attributes, ...childNodes)
/**
 * @param {VnodeAtrributes} [attributes={}]
 * @param {...ChildNode} childNodes
 * @returns {Vnode}
 */
export const rect = (attributes = {}, ...childNodes) => h('rect', attributes, ...childNodes)
/**
 * @param {VnodeAtrributes} [attributes={}]
 * @param {...ChildNode} childNodes
 * @returns {Vnode}
 */
export const set = (attributes = {}, ...childNodes) => h('set', attributes, ...childNodes)
/**
 * @param {VnodeAtrributes} [attributes={}]
 * @param {...ChildNode} childNodes
 * @returns {Vnode}
 */
export const solidcolor = (attributes = {}, ...childNodes) => h('solidcolor', attributes, ...childNodes)
/**
 * @param {VnodeAtrributes} [attributes={}]
 * @param {...ChildNode} childNodes
 * @returns {Vnode}
 */
export const stop = (attributes = {}, ...childNodes) => h('stop', attributes, ...childNodes)
/**
 * @param {VnodeAtrributes} [attributes={}]
 * @param {...ChildNode} childNodes
 * @returns {Vnode}
 */
export const svg = (attributes = {}, ...childNodes) => h('svg', attributes, ...childNodes)
/**
 * @param {VnodeAtrributes} [attributes={}]
 * @param {...ChildNode} childNodes
 * @returns {Vnode}
 */
export const switchElem = (attributes = {}, ...childNodes) => h('switch', attributes, ...childNodes)
/**
 * @param {VnodeAtrributes} [attributes={}]
 * @param {...ChildNode} childNodes
 * @returns {Vnode}
 */
export const symbol = (attributes = {}, ...childNodes) => h('symbol', attributes, ...childNodes)
/**
 * @param {VnodeAtrributes} [attributes={}]
 * @param {...ChildNode} childNodes
 * @returns {Vnode}
 */
export const text = (attributes = {}, ...childNodes) => h('text', attributes, ...childNodes)
/**
 * @param {VnodeAtrributes} [attributes={}]
 * @param {...ChildNode} childNodes
 * @returns {Vnode}
 */
export const textPath = (attributes = {}, ...childNodes) => h('textPath', attributes, ...childNodes)
/**
 * @param {VnodeAtrributes} [attributes={}]
 * @param {...ChildNode} childNodes
 * @returns {Vnode}
 */
export const tspan = (attributes = {}, ...childNodes) => h('tspan', attributes, ...childNodes)
/**
 * @param {VnodeAtrributes} [attributes={}]
 * @param {...ChildNode} childNodes
 * @returns {Vnode}
 */
export const unknown = (attributes = {}, ...childNodes) => h('unknown', attributes, ...childNodes)
/**
 * @param {VnodeAtrributes} [attributes={}]
 * @param {...ChildNode} childNodes
 * @returns {Vnode}
 */
export const use = (attributes = {}, ...childNodes) => h('use', attributes, ...childNodes)
/**
 * @param {VnodeAtrributes} [attributes={}]
 * @param {...ChildNode} childNodes
 * @returns {Vnode}
 */
export const view = (attributes = {}, ...childNodes) => h('view', attributes, ...childNodes)

// CSS template literal
/**
 * @param {TemplateStringsArray} strings
 * @param {(String | Number | Boolean | undefined)[]} keys
 * @returns {Vnode}
 */
export const css = (strings, ...keys) => style({}, ...strings.reduce(
  /**
   * @param {String[]} prev
   * @param {String} curr
   * @returns {String[]}
   */
  (prev, curr, i) => {
    prev.push(curr)
    prev.push(keys?.[i]?.toString() || '')
    return prev
  }, [])
)
