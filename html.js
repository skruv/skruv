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
    .map(child => typeof child === 'function' && child.prototype.toString() !== '[object AsyncGenerator]' ? child() : child)
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
 */
export const h = nodeName =>
  /**
   * @param {Object<String, *>} attributes
   * @param {LooseVnode[]} childNodes
   * @returns {Vnode}
   */
  (attributes = {}, ...childNodes) => ({
    nodeName,
    attributes,
    childNodes: recursiveFlattenFilter(childNodes)
  })

// HTML
export const a = h('a')
export const abbr = h('abbr')
export const acronym = h('acronym')
export const address = h('address')
export const applet = h('applet')
export const area = h('area')
export const article = h('article')
export const aside = h('aside')
export const audio = h('audio')
export const b = h('b')
export const base = h('base')
export const basefont = h('basefont')
export const bdi = h('bdi')
export const bdo = h('bdo')
export const bgsound = h('bgsound')
export const big = h('big')
export const blink = h('blink')
export const blockquote = h('blockquote')
export const body = h('body')
export const br = h('br')
export const button = h('button')
export const canvas = h('canvas')
export const caption = h('caption')
export const center = h('center')
export const cite = h('cite')
export const code = h('code')
export const col = h('col')
export const colgroup = h('colgroup')
export const command = h('command')
export const content = h('content')
export const data = h('data')
export const datalist = h('datalist')
export const dd = h('dd')
export const del = h('del')
export const details = h('details')
export const dfn = h('dfn')
export const dialog = h('dialog')
export const dir = h('dir')
export const div = h('div')
export const dl = h('dl')
export const dt = h('dt')
export const element = h('element')
export const em = h('em')
export const embed = h('embed')
export const fieldset = h('fieldset')
export const figcaption = h('figcaption')
export const figure = h('figure')
export const font = h('font')
export const footer = h('footer')
export const form = h('form')
export const frame = h('frame')
export const frameset = h('frameset')
export const h1 = h('h1')
export const h2 = h('h2')
export const h3 = h('h3')
export const h4 = h('h4')
export const h5 = h('h5')
export const h6 = h('h6')
export const head = h('head')
export const header = h('header')
export const hgroup = h('hgroup')
export const hr = h('hr')
export const html = h('html')
export const i = h('i')
export const iframe = h('iframe')
export const image = h('image')
export const img = h('img')
export const input = h('input')
export const ins = h('ins')
export const isindex = h('isindex')
export const kbd = h('kbd')
export const keygen = h('keygen')
export const label = h('label')
export const legend = h('legend')
export const li = h('li')
export const link = h('link')
export const listing = h('listing')
export const main = h('main')
export const map = h('map')
export const mark = h('mark')
export const marquee = h('marquee')
export const menu = h('menu')
export const menuitem = h('menuitem')
export const meta = h('meta')
export const meter = h('meter')
export const multicol = h('multicol')
export const nav = h('nav')
export const nextid = h('nextid')
export const nobr = h('nobr')
export const noembed = h('noembed')
export const noframes = h('noframes')
export const noscript = h('noscript')
export const object = h('object')
export const ol = h('ol')
export const optgroup = h('optgroup')
export const option = h('option')
export const output = h('output')
export const p = h('p')
export const param = h('param')
export const picture = h('picture')
export const plaintext = h('plaintext')
export const pre = h('pre')
export const progress = h('progress')
export const q = h('q')
export const rb = h('rb')
export const rp = h('rp')
export const rt = h('rt')
export const rtc = h('rtc')
export const ruby = h('ruby')
export const s = h('s')
export const samp = h('samp')
export const script = h('script')
export const section = h('section')
export const select = h('select')
export const shadow = h('shadow')
export const slot = h('slot')
export const small = h('small')
export const source = h('source')
export const spacer = h('spacer')
export const span = h('span')
export const strike = h('strike')
export const strong = h('strong')
export const style = h('style')
export const sub = h('sub')
export const summary = h('summary')
export const sup = h('sup')
export const table = h('table')
export const tbody = h('tbody')
export const td = h('td')
export const template = h('template')
export const textarea = h('textarea')
export const tfoot = h('tfoot')
export const th = h('th')
export const thead = h('thead')
export const time = h('time')
export const title = h('title')
export const tr = h('tr')
export const track = h('track')
export const tt = h('tt')
export const u = h('u')
export const ul = h('ul')
export const varElem = h('var')
export const video = h('video')
export const wbr = h('wbr')
export const xmp = h('xmp')

// SVG
export const animate = h('animate')
export const animateMotion = h('animateMotion')
export const animateTransform = h('animateTransform')
export const circle = h('circle')
export const clipPath = h('clipPath')
export const colorProfile = h('color-profile')
export const defs = h('defs')
export const desc = h('desc')
export const discard = h('discard')
export const ellipse = h('ellipse')
export const feBlend = h('feBlend')
export const feColorMatrix = h('feColorMatrix')
export const feComponentTransfer = h('feComponentTransfer')
export const feComposite = h('feComposite')
export const feConvolveMatrix = h('feConvolveMatrix')
export const feDiffuseLighting = h('feDiffuseLighting')
export const feDisplacementMap = h('feDisplacementMap')
export const feDistantLight = h('feDistantLight')
export const feDropShadow = h('feDropShadow')
export const feFlood = h('feFlood')
export const feFuncA = h('feFuncA')
export const feFuncB = h('feFuncB')
export const feFuncG = h('feFuncG')
export const feFuncR = h('feFuncR')
export const feGaussianBlur = h('feGaussianBlur')
export const feImage = h('feImage')
export const feMerge = h('feMerge')
export const feMergeNode = h('feMergeNode')
export const feMorphology = h('feMorphology')
export const feOffset = h('feOffset')
export const fePointLight = h('fePointLight')
export const feSpecularLighting = h('feSpecularLighting')
export const feSpotLight = h('feSpotLight')
export const feTile = h('feTile')
export const feTurbulence = h('feTurbulence')
export const filter = h('filter')
export const foreignObject = h('foreignObject')
export const g = h('g')
export const hatch = h('hatch')
export const hatchpath = h('hatchpath')
export const line = h('line')
export const linearGradient = h('linearGradient')
export const marker = h('marker')
export const mask = h('mask')
export const mesh = h('mesh')
export const meshgradient = h('meshgradient')
export const meshpatch = h('meshpatch')
export const meshrow = h('meshrow')
export const metadata = h('metadata')
export const mpath = h('mpath')
export const path = h('path')
export const pattern = h('pattern')
export const polygon = h('polygon')
export const polyline = h('polyline')
export const radialGradient = h('radialGradient')
export const rect = h('rect')
export const set = h('set')
export const solidcolor = h('solidcolor')
export const stop = h('stop')
export const svg = h('svg')
export const switchElem = h('switch')
export const symbol = h('symbol')
export const text = h('text')
export const textPath = h('textPath')
export const tspan = h('tspan')
export const unknown = h('unknown')
export const use = h('use')
export const view = h('view')

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
