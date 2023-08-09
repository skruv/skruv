import * as util from './utilityTypes'

export namespace JSX {
  export interface IntrinsicElements {

    'html': util.SkruvHtmlHTMLAttributes

    'base': util.SkruvBaseHTMLAttributes

    'head': util.SkruvHeadHTMLAttributes

    'title': util.SkruvTitleHTMLAttributes

    'script': util.SkruvScriptHTMLAttributes

    'style': util.SkruvStyleHTMLAttributes

    'link': util.SkruvLinkHTMLAttributes

    'meta': util.SkruvMetaHTMLAttributes

    'body': util.SkruvBodyHTMLAttributes

    'address': util.SkruvAddressHTMLAttributes

    'article': util.SkruvArticleHTMLAttributes

    'aside': util.SkruvAsideHTMLAttributes

    'footer': util.SkruvFooterHTMLAttributes

    'h1': util.SkruvH1HTMLAttributes

    'h2': util.SkruvH2HTMLAttributes

    'h3': util.SkruvH3HTMLAttributes

    'h4': util.SkruvH4HTMLAttributes

    'h5': util.SkruvH5HTMLAttributes

    'h6': util.SkruvH6HTMLAttributes

    'header': util.SkruvHeaderHTMLAttributes

    'hgroup': util.SkruvHgroupHTMLAttributes

    'main': util.SkruvMainHTMLAttributes

    'nav': util.SkruvNavHTMLAttributes

    'section': util.SkruvSectionHTMLAttributes

    'search': util.SkruvSearchHTMLAttributes

    'blockquote': util.SkruvBlockquoteHTMLAttributes

    'cite': util.SkruvCiteHTMLAttributes

    'dd': util.SkruvDdHTMLAttributes

    'dt': util.SkruvDtHTMLAttributes

    'dl': util.SkruvDlHTMLAttributes

    'div': util.SkruvDivHTMLAttributes

    'figcaption': util.SkruvFigcaptionHTMLAttributes

    'figure': util.SkruvFigureHTMLAttributes

    'hr': util.SkruvHrHTMLAttributes

    'li': util.SkruvLiHTMLAttributes

    'ol': util.SkruvOlHTMLAttributes

    'ul': util.SkruvUlHTMLAttributes

    'menu': util.SkruvMenuHTMLAttributes

    'p': util.SkruvPHTMLAttributes

    'pre': util.SkruvPreHTMLAttributes

    'a': util.SkruvAHTMLAttributes

    'abbr': util.SkruvAbbrHTMLAttributes

    'b': util.SkruvBHTMLAttributes

    'bdi': util.SkruvBdiHTMLAttributes

    'bdo': util.SkruvBdoHTMLAttributes

    'br': util.SkruvBrHTMLAttributes

    'code': util.SkruvCodeHTMLAttributes

    'data': util.SkruvDataHTMLAttributes

    'dfn': util.SkruvDfnHTMLAttributes

    'em': util.SkruvEmHTMLAttributes

    'i': util.SkruvIHTMLAttributes

    'kbd': util.SkruvKbdHTMLAttributes

    'mark': util.SkruvMarkHTMLAttributes

    'q': util.SkruvQHTMLAttributes

    'rp': util.SkruvRpHTMLAttributes

    'ruby': util.SkruvRubyHTMLAttributes

    'rt': util.SkruvRtHTMLAttributes

    's': util.SkruvSHTMLAttributes

    'samp': util.SkruvSampHTMLAttributes

    'small': util.SkruvSmallHTMLAttributes

    'span': util.SkruvSpanHTMLAttributes

    'strong': util.SkruvStrongHTMLAttributes

    'sub': util.SkruvSubHTMLAttributes

    'sup': util.SkruvSupHTMLAttributes

    'time': util.SkruvTimeHTMLAttributes

    'u': util.SkruvUHTMLAttributes

    'var': util.SkruvVarHTMLAttributes

    'wbr': util.SkruvWbrHTMLAttributes

    'area': util.SkruvAreaHTMLAttributes

    'audio': util.SkruvAudioHTMLAttributes

    'img': util.SkruvImgHTMLAttributes

    'map': util.SkruvMapHTMLAttributes

    'track': util.SkruvTrackHTMLAttributes

    'video': util.SkruvVideoHTMLAttributes

    'embed': util.SkruvEmbedHTMLAttributes

    'iframe': util.SkruvIframeHTMLAttributes

    'object': util.SkruvObjectHTMLAttributes

    'picture': util.SkruvPictureHTMLAttributes

    'source': util.SkruvSourceHTMLAttributes

    'portal': util.SkruvPortalHTMLAttributes

    'canvas': util.SkruvCanvasHTMLAttributes

    'noscript': util.SkruvNoscriptHTMLAttributes

    'del': util.SkruvDelHTMLAttributes

    'ins': util.SkruvInsHTMLAttributes

    'caption': util.SkruvCaptionHTMLAttributes

    'col': util.SkruvColHTMLAttributes

    'colgroup': util.SkruvColgroupHTMLAttributes

    'table': util.SkruvTableHTMLAttributes

    'tbody': util.SkruvTbodyHTMLAttributes

    'tr': util.SkruvTrHTMLAttributes

    'td': util.SkruvTdHTMLAttributes

    'tfoot': util.SkruvTfootHTMLAttributes

    'th': util.SkruvThHTMLAttributes

    'thead': util.SkruvTheadHTMLAttributes

    'button': util.SkruvButtonHTMLAttributes

    'datalist': util.SkruvDatalistHTMLAttributes

    'option': util.SkruvOptionHTMLAttributes

    'fieldset': util.SkruvFieldsetHTMLAttributes

    'label': util.SkruvLabelHTMLAttributes

    'form': util.SkruvFormHTMLAttributes

    'input': util.SkruvInputHTMLAttributes

    'legend': util.SkruvLegendHTMLAttributes

    'meter': util.SkruvMeterHTMLAttributes

    'optgroup': util.SkruvOptgroupHTMLAttributes

    'select': util.SkruvSelectHTMLAttributes

    'output': util.SkruvOutputHTMLAttributes

    'progress': util.SkruvProgressHTMLAttributes

    'textarea': util.SkruvTextareaHTMLAttributes

    'details': util.SkruvDetailsHTMLAttributes

    'summary': util.SkruvSummaryHTMLAttributes

    'dialog': util.SkruvDialogHTMLAttributes

    'slot': util.SkruvSlotHTMLAttributes

    'template': util.SkruvTemplateHTMLAttributes

    'svgA': util.SkruvASVGAttributes

    'animate': util.SkruvAnimateSVGAttributes

    'animateMotion': util.SkruvAnimatemotionSVGAttributes

    'animateTransform': util.SkruvAnimatetransformSVGAttributes

    'circle': util.SkruvCircleSVGAttributes

    'clipPath': util.SkruvClippathSVGAttributes

    'defs': util.SkruvDefsSVGAttributes

    'desc': util.SkruvDescSVGAttributes

    'ellipse': util.SkruvEllipseSVGAttributes

    'feBlend': util.SkruvFeblendSVGAttributes

    'feColorMatrix': util.SkruvFecolormatrixSVGAttributes

    'feComponentTransfer': util.SkruvFecomponenttransferSVGAttributes

    'feComposite': util.SkruvFecompositeSVGAttributes

    'feConvolveMatrix': util.SkruvFeconvolvematrixSVGAttributes

    'feDiffuseLighting': util.SkruvFediffuselightingSVGAttributes

    'feDisplacementMap': util.SkruvFedisplacementmapSVGAttributes

    'feDistantLight': util.SkruvFedistantlightSVGAttributes

    'feDropShadow': util.SkruvFedropshadowSVGAttributes

    'feFlood': util.SkruvFefloodSVGAttributes

    'feFuncA': util.SkruvFefuncaSVGAttributes

    'feFuncB': util.SkruvFefuncbSVGAttributes

    'feFuncG': util.SkruvFefuncgSVGAttributes

    'feFuncR': util.SkruvFefuncrSVGAttributes

    'feGaussianBlur': util.SkruvFegaussianblurSVGAttributes

    'feImage': util.SkruvFeimageSVGAttributes

    'feMerge': util.SkruvFemergeSVGAttributes

    'feMergeNode': util.SkruvFemergenodeSVGAttributes

    'feMorphology': util.SkruvFemorphologySVGAttributes

    'feOffset': util.SkruvFeoffsetSVGAttributes

    'fePointLight': util.SkruvFepointlightSVGAttributes

    'feSpecularLighting': util.SkruvFespecularlightingSVGAttributes

    'feSpotLight': util.SkruvFespotlightSVGAttributes

    'feTile': util.SkruvFetileSVGAttributes

    'feTurbulence': util.SkruvFeturbulenceSVGAttributes

    'filter': util.SkruvFilterSVGAttributes

    'foreignObject': util.SkruvForeignobjectSVGAttributes

    'g': util.SkruvGSVGAttributes

    'image': util.SkruvImageSVGAttributes

    'line': util.SkruvLineSVGAttributes

    'linearGradient': util.SkruvLineargradientSVGAttributes

    'marker': util.SkruvMarkerSVGAttributes

    'mask': util.SkruvMaskSVGAttributes

    'metadata': util.SkruvMetadataSVGAttributes

    'mpath': util.SkruvMpathSVGAttributes

    'path': util.SkruvPathSVGAttributes

    'pattern': util.SkruvPatternSVGAttributes

    'polygon': util.SkruvPolygonSVGAttributes

    'polyline': util.SkruvPolylineSVGAttributes

    'radialGradient': util.SkruvRadialgradientSVGAttributes

    'rect': util.SkruvRectSVGAttributes

    'svgScript': util.SkruvScriptSVGAttributes

    'set': util.SkruvSetSVGAttributes

    'stop': util.SkruvStopSVGAttributes

    'svgStyle': util.SkruvStyleSVGAttributes

    'svg': util.SkruvSvgSVGAttributes

    'switch': util.SkruvSwitchSVGAttributes

    'symbol': util.SkruvSymbolSVGAttributes

    'text': util.SkruvTextSVGAttributes

    'textPath': util.SkruvTextpathSVGAttributes

    'svgTitle': util.SkruvTitleSVGAttributes

    'tspan': util.SkruvTspanSVGAttributes

    'use': util.SkruvUseSVGAttributes

    'view': util.SkruvViewSVGAttributes

    'math': util.SkruvMathMathMLAttributes

    'semantics': util.SkruvSemanticsMathMLAttributes

    'menclose': util.SkruvMencloseMathMLAttributes

    'merror': util.SkruvMerrorMathMLAttributes

    'mfrac': util.SkruvMfracMathMLAttributes

    'mi': util.SkruvMiMathMLAttributes

    'mmultiscripts': util.SkruvMmultiscriptsMathMLAttributes

    'mn': util.SkruvMnMathMLAttributes

    'mo': util.SkruvMoMathMLAttributes

    'mover': util.SkruvMoverMathMLAttributes

    'mpadded': util.SkruvMpaddedMathMLAttributes

    'mphantom': util.SkruvMphantomMathMLAttributes

    'mroot': util.SkruvMrootMathMLAttributes

    'mrow': util.SkruvMrowMathMLAttributes

    'ms': util.SkruvMsMathMLAttributes

    'mspace': util.SkruvMspaceMathMLAttributes

    'msqrt': util.SkruvMsqrtMathMLAttributes

    'mstyle': util.SkruvMstyleMathMLAttributes

    'msub': util.SkruvMsubMathMLAttributes

    'msup': util.SkruvMsupMathMLAttributes

    'msubsup': util.SkruvMsubsupMathMLAttributes

    'mtable': util.SkruvMtableMathMLAttributes

    'mtd': util.SkruvMtdMathMLAttributes

    'mtext': util.SkruvMtextMathMLAttributes

    'mtr': util.SkruvMtrMathMLAttributes

    'munder': util.SkruvMunderMathMLAttributes

    'munderover': util.SkruvMunderoverMathMLAttributes

    'feed': util.SkruvFeedAtomAttributes

    'entry': util.SkruvEntryAtomAttributes

    'id': util.SkruvIdAtomAttributes

    'atomTitle': util.SkruvTitleAtomAttributes

    'updated': util.SkruvUpdatedAtomAttributes

    'author': util.SkruvAuthorAtomAttributes

    'name': util.SkruvNameAtomAttributes

    'uri': util.SkruvUriAtomAttributes

    'email': util.SkruvEmailAtomAttributes

    'atomLink': util.SkruvLinkAtomAttributes

    'category': util.SkruvCategoryAtomAttributes

    'contributor': util.SkruvContributorAtomAttributes

    'generator': util.SkruvGeneratorAtomAttributes

    'icon': util.SkruvIconAtomAttributes

    'logo': util.SkruvLogoAtomAttributes

    'rights': util.SkruvRightsAtomAttributes

    'subtitle': util.SkruvSubtitleAtomAttributes

    'content': util.SkruvContentAtomAttributes

    'atomSummary': util.SkruvSummaryAtomAttributes

    'published': util.SkruvPublishedAtomAttributes

    'atomSource': util.SkruvSourceAtomAttributes

    'urlset': util.SkruvUrlsetSitemapAttributes

    'url': util.SkruvUrlSitemapAttributes

    'loc': util.SkruvLocSitemapAttributes

    'lastmod': util.SkruvLastmodSitemapAttributes

    'changefreq': util.SkruvChangefreqSitemapAttributes

    'priority': util.SkruvPrioritySitemapAttributes

    'sitemapindex': util.SkruvSitemapindexSitemapAttributes

    'sitemap': util.SkruvSitemapSitemapAttributes
    [elemName: string]: any;
  }
}

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

export const Fragment = '#fragment'

export const jsxs = (nodeName: string, attributes = {children: []}) => {
  if (nodeName === Fragment && attributes.children) { return attributes.children }
  if (nodeName === Fragment) { return [] }
  const { children, ...attrs } = attributes
  if (!nodeName.includes('-')) {
    Object.keys(attrs)
      .forEach(e => {
        if (e[0] === 'o' && e[1] === 'n' && e !== e.toLowerCase()) {
          // @ts-ignore
          attrs[e.toLowerCase()] = attrs[e]
          // @ts-ignore
          delete attrs[e]
          // @ts-ignore
        } else if (reactMappings[e]) {
          // @ts-ignore
          attrs[reactMappings[e]] = attrs[e]
          // @ts-ignore
          delete attrs[e]
        }
      })
  }
  if (children) { return { isSkruvDom: true, t: nodeName, c: [attrs || {}, children] } }
  return { isSkruvDom: true, t: nodeName, c: [attrs || {}] }
}

export const jsx = jsxs
