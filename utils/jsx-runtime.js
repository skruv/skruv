
import { h } from '../index.js'

/** @type {Record<string,string>} */
const reactMappings = {
  accentHeight: 'accent-height',
  accentheight: 'accent-height',
  acceptCharset: 'accept-charset',
  acceptcharset: 'accept-charset',
  accessKey: 'accesskey',
  alignmentBaseline: 'alignment-baseline',
  alignmentbaseline: 'alignment-baseline',
  allowFullScreen: 'allowfullscreen',
  allowReorder: 'allowreorder',
  arabicForm: 'arabic-form',
  arabicform: 'arabic-form',
  attributeName: 'attributename',
  attributeType: 'attributetype',
  autoCapitalize: 'autocapitalize',
  autoComplete: 'autocomplete',
  autoCorrect: 'autocorrect',
  autoFocus: 'autofocus',
  autoPlay: 'autoplay',
  autoReverse: 'autoreverse',
  autoSave: 'autosave',
  baseFrequency: 'basefrequency',
  baseProfile: 'baseprofile',
  baselineShift: 'baseline-shift',
  baselineshift: 'baseline-shift',
  calcMode: 'calcmode',
  capHeight: 'cap-height',
  capheight: 'cap-height',
  cellPadding: 'cellpadding',
  cellSpacing: 'cellspacing',
  charSet: 'charset',
  classID: 'classid',
  className: 'class',
  classname: 'class',
  clipPath: 'clip-path',
  clipPathUnits: 'clippathunits',
  clipRule: 'clip-rule',
  clippath: 'clip-path',
  cliprule: 'clip-rule',
  colSpan: 'colspan',
  colorInterpolation: 'color-interpolation',
  colorInterpolationFilters: 'color-interpolation-filters',
  colorProfile: 'color-profile',
  colorRendering: 'color-rendering',
  colorinterpolation: 'color-interpolation',
  colorinterpolationfilters: 'color-interpolation-filters',
  colorprofile: 'color-profile',
  colorrendering: 'color-rendering',
  contentEditable: 'contenteditable',
  contentScriptType: 'contentscripttype',
  contentStyleType: 'contentstyletype',
  contextMenu: 'contextmenu',
  controlsList: 'controlslist',
  crossOrigin: 'crossorigin',
  dangerouslySetInnerHTML: 'dangerouslysetinnerhtml',
  dateTime: 'datetime',
  defaultChecked: 'defaultchecked',
  defaultValue: 'defaultvalue',
  diffuseConstant: 'diffuseconstant',
  disablePictureInPicture: 'disablepictureinpicture',
  disableRemotePlayback: 'disableremoteplayback',
  dominantBaseline: 'dominant-baseline',
  dominantbaseline: 'dominant-baseline',
  edgeMode: 'edgemode',
  enableBackground: 'enable-background',
  enablebackground: 'enable-background',
  encType: 'enctype',
  enterKeyHint: 'enterkeyhint',
  externalResourcesRequired: 'externalresourcesrequired',
  fetchPriority: 'fetchpriority',
  fillOpacity: 'fill-opacity',
  fillRule: 'fill-rule',
  fillopacity: 'fill-opacity',
  fillrule: 'fill-rule',
  filterRes: 'filterres',
  filterUnits: 'filterunits',
  floodColor: 'flood-color',
  floodOpacity: 'flood-opacity',
  floodcolor: 'flood-color',
  floodopacity: 'flood-opacity',
  fontFamily: 'font-family',
  fontSize: 'font-size',
  fontSizeAdjust: 'font-size-adjust',
  fontStretch: 'font-stretch',
  fontStyle: 'font-style',
  fontVariant: 'font-variant',
  fontWeight: 'font-weight',
  fontfamily: 'font-family',
  fontsize: 'font-size',
  fontsizeadjust: 'font-size-adjust',
  fontstretch: 'font-stretch',
  fontstyle: 'font-style',
  fontvariant: 'font-variant',
  fontweight: 'font-weight',
  formAction: 'formaction',
  formEncType: 'formenctype',
  formMethod: 'formmethod',
  formNoValidate: 'formnovalidate',
  formTarget: 'formtarget',
  frameBorder: 'frameborder',
  glyphName: 'glyph-name',
  glyphOrientationHorizontal: 'glyph-orientation-horizontal',
  glyphOrientationVertical: 'glyph-orientation-vertical',
  glyphRef: 'glyphref',
  glyphname: 'glyph-name',
  glyphorientationhorizontal: 'glyph-orientation-horizontal',
  glyphorientationvertical: 'glyph-orientation-vertical',
  gradientTransform: 'gradienttransform',
  gradientUnits: 'gradientunits',
  horizAdvX: 'horiz-adv-x',
  horizOriginX: 'horiz-origin-x',
  horizadvx: 'horiz-adv-x',
  horizoriginx: 'horiz-origin-x',
  hrefLang: 'hreflang',
  htmlFor: 'for',
  htmlfor: 'for',
  httpEquiv: 'http-equiv',
  httpequiv: 'http-equiv',
  imageRendering: 'image-rendering',
  imageSizes: 'imagesizes',
  imageSrcSet: 'imagesrcset',
  imagerendering: 'image-rendering',
  innerHTML: 'innerhtml',
  inputMode: 'inputmode',
  itemID: 'itemid',
  itemProp: 'itemprop',
  itemRef: 'itemref',
  itemScope: 'itemscope',
  itemType: 'itemtype',
  kernelMatrix: 'kernelmatrix',
  kernelUnitLength: 'kernelunitlength',
  keyParams: 'keyparams',
  keyPoints: 'keypoints',
  keySplines: 'keysplines',
  keyTimes: 'keytimes',
  keyType: 'keytype',
  lengthAdjust: 'lengthadjust',
  letterSpacing: 'letter-spacing',
  letterspacing: 'letter-spacing',
  lightingColor: 'lighting-color',
  lightingcolor: 'lighting-color',
  limitingConeAngle: 'limitingconeangle',
  marginHeight: 'marginheight',
  marginWidth: 'marginwidth',
  markerEnd: 'marker-end',
  markerHeight: 'markerheight',
  markerMid: 'marker-mid',
  markerStart: 'marker-start',
  markerUnits: 'markerunits',
  markerWidth: 'markerwidth',
  markerend: 'marker-end',
  markermid: 'marker-mid',
  markerstart: 'marker-start',
  maskContentUnits: 'maskcontentunits',
  maskUnits: 'maskunits',
  maxLength: 'maxlength',
  mediaGroup: 'mediagroup',
  minLength: 'minlength',
  noModule: 'nomodule',
  noValidate: 'novalidate',
  numOctaves: 'numoctaves',
  overlinePosition: 'overline-position',
  overlineThickness: 'overline-thickness',
  overlineposition: 'overline-position',
  overlinethickness: 'overline-thickness',
  paintOrder: 'paint-order',
  paintorder: 'paint-order',
  panose1: 'panose-1',
  pathLength: 'pathlength',
  patternContentUnits: 'patterncontentunits',
  patternTransform: 'patterntransform',
  patternUnits: 'patternunits',
  playsInline: 'playsinline',
  pointerEvents: 'pointer-events',
  pointerevents: 'pointer-events',
  pointsAtX: 'pointsatx',
  pointsAtY: 'pointsaty',
  pointsAtZ: 'pointsatz',
  preserveAlpha: 'preservealpha',
  preserveAspectRatio: 'preserveaspectratio',
  primitiveUnits: 'primitiveunits',
  radioGroup: 'radiogroup',
  readOnly: 'readonly',
  refX: 'refx',
  refY: 'refy',
  referrerPolicy: 'referrerpolicy',
  renderingIntent: 'rendering-intent',
  renderingintent: 'rendering-intent',
  repeatCount: 'repeatcount',
  repeatDur: 'repeatdur',
  requiredExtensions: 'requiredextensions',
  requiredFeatures: 'requiredfeatures',
  rowSpan: 'rowspan',
  shapeRendering: 'shape-rendering',
  shaperendering: 'shape-rendering',
  specularConstant: 'specularconstant',
  specularExponent: 'specularexponent',
  spellCheck: 'spellcheck',
  spreadMethod: 'spreadmethod',
  srcDoc: 'srcdoc',
  srcLang: 'srclang',
  srcSet: 'srcset',
  startOffset: 'startoffset',
  stdDeviation: 'stddeviation',
  stitchTiles: 'stitchtiles',
  stopColor: 'stop-color',
  stopOpacity: 'stop-opacity',
  stopcolor: 'stop-color',
  stopopacity: 'stop-opacity',
  strikethroughPosition: 'strikethrough-position',
  strikethroughThickness: 'strikethrough-thickness',
  strikethroughposition: 'strikethrough-position',
  strikethroughthickness: 'strikethrough-thickness',
  strokeDasharray: 'stroke-dasharray',
  strokeDashoffset: 'stroke-dashoffset',
  strokeLinecap: 'stroke-linecap',
  strokeLinejoin: 'stroke-linejoin',
  strokeMiterlimit: 'stroke-miterlimit',
  strokeOpacity: 'stroke-opacity',
  strokeWidth: 'stroke-width',
  strokedasharray: 'stroke-dasharray',
  strokedashoffset: 'stroke-dashoffset',
  strokelinecap: 'stroke-linecap',
  strokelinejoin: 'stroke-linejoin',
  strokemiterlimit: 'stroke-miterlimit',
  strokeopacity: 'stroke-opacity',
  strokewidth: 'stroke-width',
  suppressContentEditableWarning: 'suppresscontenteditablewarning',
  suppressHydrationWarning: 'suppresshydrationwarning',
  surfaceScale: 'surfacescale',
  systemLanguage: 'systemlanguage',
  tabIndex: 'tabindex',
  tableValues: 'tablevalues',
  targetX: 'targetx',
  targetY: 'targety',
  textAnchor: 'text-anchor',
  textDecoration: 'text-decoration',
  textLength: 'textlength',
  textRendering: 'text-rendering',
  textanchor: 'text-anchor',
  textdecoration: 'text-decoration',
  textrendering: 'text-rendering',
  transformOrigin: 'transform-origin',
  transformorigin: 'transform-origin',
  underlinePosition: 'underline-position',
  underlineThickness: 'underline-thickness',
  underlineposition: 'underline-position',
  underlinethickness: 'underline-thickness',
  unicodeBidi: 'unicode-bidi',
  unicodeRange: 'unicode-range',
  unicodebidi: 'unicode-bidi',
  unicoderange: 'unicode-range',
  unitsPerEm: 'units-per-em',
  unitsperem: 'units-per-em',
  useMap: 'usemap',
  vAlphabetic: 'v-alphabetic',
  vHanging: 'v-hanging',
  vIdeographic: 'v-ideographic',
  vMathematical: 'v-mathematical',
  valphabetic: 'v-alphabetic',
  vectorEffect: 'vector-effect',
  vectoreffect: 'vector-effect',
  vertAdvY: 'vert-adv-y',
  vertOriginX: 'vert-origin-x',
  vertOriginY: 'vert-origin-y',
  vertadvy: 'vert-adv-y',
  vertoriginx: 'vert-origin-x',
  vertoriginy: 'vert-origin-y',
  vhanging: 'v-hanging',
  videographic: 'v-ideographic',
  viewBox: 'viewbox',
  viewTarget: 'viewtarget',
  vmathematical: 'v-mathematical',
  wordSpacing: 'word-spacing',
  wordspacing: 'word-spacing',
  writingMode: 'writing-mode',
  writingmode: 'writing-mode',
  xChannelSelector: 'xchannelselector',
  xHeight: 'x-height',
  xheight: 'x-height',
  xlinkActuate: 'xlink:actuate',
  xlinkArcrole: 'xlink:arcrole',
  xlinkHref: 'xlink:href',
  xlinkRole: 'xlink:role',
  xlinkShow: 'xlink:show',
  xlinkTitle: 'xlink:title',
  xlinkType: 'xlink:type',
  xlinkactuate: 'xlink:actuate',
  xlinkarcrole: 'xlink:arcrole',
  xlinkhref: 'xlink:href',
  xlinkrole: 'xlink:role',
  xlinkshow: 'xlink:show',
  xlinktitle: 'xlink:title',
  xlinktype: 'xlink:type',
  xmlBase: 'xml:base',
  xmlLang: 'xml:lang',
  xmlSpace: 'xmlspace',
  xmlbase: 'xml:base',
  xmllang: 'xml:lang',
  xmlnsXlink: 'xmlns:xlink',
  xmlnsxlink: 'xmlns:xlink',
  yChannelSelector: 'ychannelselector',
  zoomAndPan: 'zoomandpan',
  // This is stupid and I hate it.
  onChange: 'oninput',
  onchange: 'oninput'
}

/**
 * @typedef {Vnode|string|Boolean|Number|Record<string,(string|boolean|Function|number|Object)> & {oncreate:(e: Node) => void}?} SkruvChildNode
 * @typedef {SkruvChildNode[]} SkruvChildNodes
 * @typedef {Record<string,(string|boolean|Function|number|Object)> & {children?: SkruvChildNodes}} VnodeAttributes
 */
/**
 * @typedef {object} Vnode
 * @prop {Symbol} s
 * @prop {string} t
 * @prop {SkruvChildNodes} c
 * @prop {() => boolean} [r]
 */

export const Fragment = '#fragment'

/**
 * @param {string} nodeName
 * @param {VnodeAttributes} [attributes={}]
 * @returns {Vnode|SkruvChildNodes}
 */
export const jsxs = (nodeName, attributes = {}) => {
  if (nodeName === Fragment && attributes.children) { return attributes.children }
  if (nodeName === Fragment) { return [] }
  const { children, ...attrs } = attributes
  if (!nodeName.includes('-')) {
    Object.keys(attrs)
      .forEach(e => {
        if (e[0] === 'o' && e[1] === 'n' && e !== e.toLowerCase()) {
          attrs[e.toLowerCase()] = attrs[e]
          delete attrs[e]
        } else if (reactMappings[e]) {
          attrs[reactMappings[e]] = attrs[e]
          delete attrs[e]
        }
      })
  }
  // @ts-ignore: TODO: Harmonize typings
  if (children) { return h(nodeName, attrs || {}, children) }
  // @ts-ignore: TODO: Harmonize typings
  return h(nodeName, attrs || {})
}

export const jsx = jsxs
