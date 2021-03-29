/**
 * @typedef LooseVnode
 * @type {Boolean | String | Number | Vnode | Vnode[] | function(): LooseVnode | function(): LooseVnode[]}
 */

/**
 * @typedef Vnode
 * @prop {String} nodeName
 * @prop {String} [data]
 * @prop {Object<[String], [String]>} attributes
 * @prop {Array<Vnode>} childNodes
 */
/** @type {Vnode} */
export const Vnode = {
  nodeName: '',
  attributes: {},
  childNodes: []
}

/**
 * @param {String | Number | Boolean} data
 * @returns {Vnode}
 */
export const textNode = (data) => ({
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
 * @param {String} nodeName
  * @param {Object<String, *>} attributes
  * @param {LooseVnode[]} childNodes
  * @returns {Vnode}
 */
export const h = (nodeName, attributes = {}, ...childNodes) => ({
  nodeName,
  attributes,
  childNodes: recursiveFlattenFilter(childNodes)
})

// HTML
export const a = (...args) => h('a', ...args)
export const abbr = (...args) => h('abbr', ...args)
export const acronym = (...args) => h('acronym', ...args)
export const address = (...args) => h('address', ...args)
export const applet = (...args) => h('applet', ...args)
export const area = (...args) => h('area', ...args)
export const article = (...args) => h('article', ...args)
export const aside = (...args) => h('aside', ...args)
export const audio = (...args) => h('audio', ...args)
export const b = (...args) => h('b', ...args)
export const base = (...args) => h('base', ...args)
export const basefont = (...args) => h('basefont', ...args)
export const bdi = (...args) => h('bdi', ...args)
export const bdo = (...args) => h('bdo', ...args)
export const bgsound = (...args) => h('bgsound', ...args)
export const big = (...args) => h('big', ...args)
export const blink = (...args) => h('blink', ...args)
export const blockquote = (...args) => h('blockquote', ...args)
export const body = (...args) => h('body', ...args)
export const br = (...args) => h('br', ...args)
export const button = (...args) => h('button', ...args)
export const canvas = (...args) => h('canvas', ...args)
export const caption = (...args) => h('caption', ...args)
export const center = (...args) => h('center', ...args)
export const cite = (...args) => h('cite', ...args)
export const code = (...args) => h('code', ...args)
export const col = (...args) => h('col', ...args)
export const colgroup = (...args) => h('colgroup', ...args)
export const command = (...args) => h('command', ...args)
export const content = (...args) => h('content', ...args)
export const data = (...args) => h('data', ...args)
export const datalist = (...args) => h('datalist', ...args)
export const dd = (...args) => h('dd', ...args)
export const del = (...args) => h('del', ...args)
export const details = (...args) => h('details', ...args)
export const dfn = (...args) => h('dfn', ...args)
export const dialog = (...args) => h('dialog', ...args)
export const dir = (...args) => h('dir', ...args)
export const div = (...args) => h('div', ...args)
export const dl = (...args) => h('dl', ...args)
export const dt = (...args) => h('dt', ...args)
export const element = (...args) => h('element', ...args)
export const em = (...args) => h('em', ...args)
export const embed = (...args) => h('embed', ...args)
export const fieldset = (...args) => h('fieldset', ...args)
export const figcaption = (...args) => h('figcaption', ...args)
export const figure = (...args) => h('figure', ...args)
export const font = (...args) => h('font', ...args)
export const footer = (...args) => h('footer', ...args)
export const form = (...args) => h('form', ...args)
export const frame = (...args) => h('frame', ...args)
export const frameset = (...args) => h('frameset', ...args)
export const h1 = (...args) => h('h1', ...args)
export const h2 = (...args) => h('h2', ...args)
export const h3 = (...args) => h('h3', ...args)
export const h4 = (...args) => h('h4', ...args)
export const h5 = (...args) => h('h5', ...args)
export const h6 = (...args) => h('h6', ...args)
export const head = (...args) => h('head', ...args)
export const header = (...args) => h('header', ...args)
export const hgroup = (...args) => h('hgroup', ...args)
export const hr = (...args) => h('hr', ...args)
export const html = (...args) => h('html', ...args)
export const i = (...args) => h('i', ...args)
export const iframe = (...args) => h('iframe', ...args)
export const image = (...args) => h('image', ...args)
export const img = (...args) => h('img', ...args)
export const input = (...args) => h('input', ...args)
export const ins = (...args) => h('ins', ...args)
export const isindex = (...args) => h('isindex', ...args)
export const kbd = (...args) => h('kbd', ...args)
export const keygen = (...args) => h('keygen', ...args)
export const label = (...args) => h('label', ...args)
export const legend = (...args) => h('legend', ...args)
export const li = (...args) => h('li', ...args)
export const link = (...args) => h('link', ...args)
export const listing = (...args) => h('listing', ...args)
export const main = (...args) => h('main', ...args)
export const map = (...args) => h('map', ...args)
export const mark = (...args) => h('mark', ...args)
export const marquee = (...args) => h('marquee', ...args)
export const menu = (...args) => h('menu', ...args)
export const menuitem = (...args) => h('menuitem', ...args)
export const meta = (...args) => h('meta', ...args)
export const meter = (...args) => h('meter', ...args)
export const multicol = (...args) => h('multicol', ...args)
export const nav = (...args) => h('nav', ...args)
export const nextid = (...args) => h('nextid', ...args)
export const nobr = (...args) => h('nobr', ...args)
export const noembed = (...args) => h('noembed', ...args)
export const noframes = (...args) => h('noframes', ...args)
export const noscript = (...args) => h('noscript', ...args)
export const object = (...args) => h('object', ...args)
export const ol = (...args) => h('ol', ...args)
export const optgroup = (...args) => h('optgroup', ...args)
export const option = (...args) => h('option', ...args)
export const output = (...args) => h('output', ...args)
export const p = (...args) => h('p', ...args)
export const param = (...args) => h('param', ...args)
export const picture = (...args) => h('picture', ...args)
export const plaintext = (...args) => h('plaintext', ...args)
export const pre = (...args) => h('pre', ...args)
export const progress = (...args) => h('progress', ...args)
export const q = (...args) => h('q', ...args)
export const rb = (...args) => h('rb', ...args)
export const rp = (...args) => h('rp', ...args)
export const rt = (...args) => h('rt', ...args)
export const rtc = (...args) => h('rtc', ...args)
export const ruby = (...args) => h('ruby', ...args)
export const s = (...args) => h('s', ...args)
export const samp = (...args) => h('samp', ...args)
export const script = (...args) => h('script', ...args)
export const section = (...args) => h('section', ...args)
export const select = (...args) => h('select', ...args)
export const shadow = (...args) => h('shadow', ...args)
export const slot = (...args) => h('slot', ...args)
export const small = (...args) => h('small', ...args)
export const source = (...args) => h('source', ...args)
export const spacer = (...args) => h('spacer', ...args)
export const span = (...args) => h('span', ...args)
export const strike = (...args) => h('strike', ...args)
export const strong = (...args) => h('strong', ...args)
export const style = (...args) => h('style', ...args)
export const sub = (...args) => h('sub', ...args)
export const summary = (...args) => h('summary', ...args)
export const sup = (...args) => h('sup', ...args)
export const table = (...args) => h('table', ...args)
export const tbody = (...args) => h('tbody', ...args)
export const td = (...args) => h('td', ...args)
export const template = (...args) => h('template', ...args)
export const textarea = (...args) => h('textarea', ...args)
export const tfoot = (...args) => h('tfoot', ...args)
export const th = (...args) => h('th', ...args)
export const thead = (...args) => h('thead', ...args)
export const time = (...args) => h('time', ...args)
export const title = (...args) => h('title', ...args)
export const tr = (...args) => h('tr', ...args)
export const track = (...args) => h('track', ...args)
export const tt = (...args) => h('tt', ...args)
export const u = (...args) => h('u', ...args)
export const ul = (...args) => h('ul', ...args)
export const varElem = (...args) => h('var', ...args)
export const video = (...args) => h('video', ...args)
export const wbr = (...args) => h('wbr', ...args)
export const xmp = (...args) => h('xmp', ...args)

// SVG
export const animate = (...args) => h('animate', ...args)
export const animateMotion = (...args) => h('animateMotion', ...args)
export const animateTransform = (...args) => h('animateTransform', ...args)
export const circle = (...args) => h('circle', ...args)
export const clipPath = (...args) => h('clipPath', ...args)
export const colorProfile = (...args) => h('color, ...args-profile')
export const defs = (...args) => h('defs', ...args)
export const desc = (...args) => h('desc', ...args)
export const discard = (...args) => h('discard', ...args)
export const ellipse = (...args) => h('ellipse', ...args)
export const feBlend = (...args) => h('feBlend', ...args)
export const feColorMatrix = (...args) => h('feColorMatrix', ...args)
export const feComponentTransfer = (...args) => h('feComponentTransfer', ...args)
export const feComposite = (...args) => h('feComposite', ...args)
export const feConvolveMatrix = (...args) => h('feConvolveMatrix', ...args)
export const feDiffuseLighting = (...args) => h('feDiffuseLighting', ...args)
export const feDisplacementMap = (...args) => h('feDisplacementMap', ...args)
export const feDistantLight = (...args) => h('feDistantLight', ...args)
export const feDropShadow = (...args) => h('feDropShadow', ...args)
export const feFlood = (...args) => h('feFlood', ...args)
export const feFuncA = (...args) => h('feFuncA', ...args)
export const feFuncB = (...args) => h('feFuncB', ...args)
export const feFuncG = (...args) => h('feFuncG', ...args)
export const feFuncR = (...args) => h('feFuncR', ...args)
export const feGaussianBlur = (...args) => h('feGaussianBlur', ...args)
export const feImage = (...args) => h('feImage', ...args)
export const feMerge = (...args) => h('feMerge', ...args)
export const feMergeNode = (...args) => h('feMergeNode', ...args)
export const feMorphology = (...args) => h('feMorphology', ...args)
export const feOffset = (...args) => h('feOffset', ...args)
export const fePointLight = (...args) => h('fePointLight', ...args)
export const feSpecularLighting = (...args) => h('feSpecularLighting', ...args)
export const feSpotLight = (...args) => h('feSpotLight', ...args)
export const feTile = (...args) => h('feTile', ...args)
export const feTurbulence = (...args) => h('feTurbulence', ...args)
export const filter = (...args) => h('filter', ...args)
export const foreignObject = (...args) => h('foreignObject', ...args)
export const g = (...args) => h('g', ...args)
export const hatch = (...args) => h('hatch', ...args)
export const hatchpath = (...args) => h('hatchpath', ...args)
export const line = (...args) => h('line', ...args)
export const linearGradient = (...args) => h('linearGradient', ...args)
export const marker = (...args) => h('marker', ...args)
export const mask = (...args) => h('mask', ...args)
export const mesh = (...args) => h('mesh', ...args)
export const meshgradient = (...args) => h('meshgradient', ...args)
export const meshpatch = (...args) => h('meshpatch', ...args)
export const meshrow = (...args) => h('meshrow', ...args)
export const metadata = (...args) => h('metadata', ...args)
export const mpath = (...args) => h('mpath', ...args)
export const path = (...args) => h('path', ...args)
export const pattern = (...args) => h('pattern', ...args)
export const polygon = (...args) => h('polygon', ...args)
export const polyline = (...args) => h('polyline', ...args)
export const radialGradient = (...args) => h('radialGradient', ...args)
export const rect = (...args) => h('rect', ...args)
export const set = (...args) => h('set', ...args)
export const solidcolor = (...args) => h('solidcolor', ...args)
export const stop = (...args) => h('stop', ...args)
export const svg = (...args) => h('svg', ...args)
export const switchElem = (...args) => h('switch', ...args)
export const symbol = (...args) => h('symbol', ...args)
export const text = (...args) => h('text', ...args)
export const textPath = (...args) => h('textPath', ...args)
export const tspan = (...args) => h('tspan', ...args)
export const unknown = (...args) => h('unknown', ...args)
export const use = (...args) => h('use', ...args)
export const view = (...args) => h('view', ...args)

// CSS template literal
/**
 * @param {String[]} strings
 * @param {[String | Number | Boolean]} keys
 * @returns {Vnode}
 */
export const css = (strings, ...keys) => {
  /** @type {Vnode[]} */
  const vNodeArr = []
  return style({}, strings.reduce((prev, curr, i) => {
    prev.push(textNode(curr))
    keys[i] && prev.push(textNode(keys[i]))
    return prev
  }, vNodeArr))
}
