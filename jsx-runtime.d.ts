import * as util from './utilityTypes';
export declare namespace JSX {
    interface IntrinsicElements {
        'html': util.SkruvHtmlHTMLAttributes;
        'base': util.SkruvBaseHTMLAttributes;
        'head': util.SkruvHeadHTMLAttributes;
        'title': util.SkruvTitleHTMLAttributes;
        'script': util.SkruvScriptHTMLAttributes;
        'style': util.SkruvStyleHTMLAttributes;
        'link': util.SkruvLinkHTMLAttributes;
        'meta': util.SkruvMetaHTMLAttributes;
        'body': util.SkruvBodyHTMLAttributes;
        'address': util.SkruvAddressHTMLAttributes;
        'article': util.SkruvArticleHTMLAttributes;
        'aside': util.SkruvAsideHTMLAttributes;
        'footer': util.SkruvFooterHTMLAttributes;
        'h1': util.SkruvH1HTMLAttributes;
        'h2': util.SkruvH2HTMLAttributes;
        'h3': util.SkruvH3HTMLAttributes;
        'h4': util.SkruvH4HTMLAttributes;
        'h5': util.SkruvH5HTMLAttributes;
        'h6': util.SkruvH6HTMLAttributes;
        'header': util.SkruvHeaderHTMLAttributes;
        'hgroup': util.SkruvHgroupHTMLAttributes;
        'main': util.SkruvMainHTMLAttributes;
        'nav': util.SkruvNavHTMLAttributes;
        'section': util.SkruvSectionHTMLAttributes;
        'search': util.SkruvSearchHTMLAttributes;
        'blockquote': util.SkruvBlockquoteHTMLAttributes;
        'cite': util.SkruvCiteHTMLAttributes;
        'dd': util.SkruvDdHTMLAttributes;
        'dt': util.SkruvDtHTMLAttributes;
        'dl': util.SkruvDlHTMLAttributes;
        'div': util.SkruvDivHTMLAttributes;
        'figcaption': util.SkruvFigcaptionHTMLAttributes;
        'figure': util.SkruvFigureHTMLAttributes;
        'hr': util.SkruvHrHTMLAttributes;
        'li': util.SkruvLiHTMLAttributes;
        'ol': util.SkruvOlHTMLAttributes;
        'ul': util.SkruvUlHTMLAttributes;
        'menu': util.SkruvMenuHTMLAttributes;
        'p': util.SkruvPHTMLAttributes;
        'pre': util.SkruvPreHTMLAttributes;
        'a': util.SkruvAHTMLAttributes;
        'abbr': util.SkruvAbbrHTMLAttributes;
        'b': util.SkruvBHTMLAttributes;
        'bdi': util.SkruvBdiHTMLAttributes;
        'bdo': util.SkruvBdoHTMLAttributes;
        'br': util.SkruvBrHTMLAttributes;
        'code': util.SkruvCodeHTMLAttributes;
        'data': util.SkruvDataHTMLAttributes;
        'dfn': util.SkruvDfnHTMLAttributes;
        'em': util.SkruvEmHTMLAttributes;
        'i': util.SkruvIHTMLAttributes;
        'kbd': util.SkruvKbdHTMLAttributes;
        'mark': util.SkruvMarkHTMLAttributes;
        'q': util.SkruvQHTMLAttributes;
        'rp': util.SkruvRpHTMLAttributes;
        'ruby': util.SkruvRubyHTMLAttributes;
        'rt': util.SkruvRtHTMLAttributes;
        's': util.SkruvSHTMLAttributes;
        'samp': util.SkruvSampHTMLAttributes;
        'small': util.SkruvSmallHTMLAttributes;
        'span': util.SkruvSpanHTMLAttributes;
        'strong': util.SkruvStrongHTMLAttributes;
        'sub': util.SkruvSubHTMLAttributes;
        'sup': util.SkruvSupHTMLAttributes;
        'time': util.SkruvTimeHTMLAttributes;
        'u': util.SkruvUHTMLAttributes;
        'var': util.SkruvVarHTMLAttributes;
        'wbr': util.SkruvWbrHTMLAttributes;
        'area': util.SkruvAreaHTMLAttributes;
        'audio': util.SkruvAudioHTMLAttributes;
        'img': util.SkruvImgHTMLAttributes;
        'map': util.SkruvMapHTMLAttributes;
        'track': util.SkruvTrackHTMLAttributes;
        'video': util.SkruvVideoHTMLAttributes;
        'embed': util.SkruvEmbedHTMLAttributes;
        'iframe': util.SkruvIframeHTMLAttributes;
        'object': util.SkruvObjectHTMLAttributes;
        'picture': util.SkruvPictureHTMLAttributes;
        'source': util.SkruvSourceHTMLAttributes;
        'portal': util.SkruvPortalHTMLAttributes;
        'canvas': util.SkruvCanvasHTMLAttributes;
        'noscript': util.SkruvNoscriptHTMLAttributes;
        'del': util.SkruvDelHTMLAttributes;
        'ins': util.SkruvInsHTMLAttributes;
        'caption': util.SkruvCaptionHTMLAttributes;
        'col': util.SkruvColHTMLAttributes;
        'colgroup': util.SkruvColgroupHTMLAttributes;
        'table': util.SkruvTableHTMLAttributes;
        'tbody': util.SkruvTbodyHTMLAttributes;
        'tr': util.SkruvTrHTMLAttributes;
        'td': util.SkruvTdHTMLAttributes;
        'tfoot': util.SkruvTfootHTMLAttributes;
        'th': util.SkruvThHTMLAttributes;
        'thead': util.SkruvTheadHTMLAttributes;
        'button': util.SkruvButtonHTMLAttributes;
        'datalist': util.SkruvDatalistHTMLAttributes;
        'option': util.SkruvOptionHTMLAttributes;
        'fieldset': util.SkruvFieldsetHTMLAttributes;
        'label': util.SkruvLabelHTMLAttributes;
        'form': util.SkruvFormHTMLAttributes;
        'input': util.SkruvInputHTMLAttributes;
        'legend': util.SkruvLegendHTMLAttributes;
        'meter': util.SkruvMeterHTMLAttributes;
        'optgroup': util.SkruvOptgroupHTMLAttributes;
        'select': util.SkruvSelectHTMLAttributes;
        'output': util.SkruvOutputHTMLAttributes;
        'progress': util.SkruvProgressHTMLAttributes;
        'textarea': util.SkruvTextareaHTMLAttributes;
        'details': util.SkruvDetailsHTMLAttributes;
        'summary': util.SkruvSummaryHTMLAttributes;
        'dialog': util.SkruvDialogHTMLAttributes;
        'slot': util.SkruvSlotHTMLAttributes;
        'template': util.SkruvTemplateHTMLAttributes;
        'svgA': util.SkruvASVGAttributes;
        'animate': util.SkruvAnimateSVGAttributes;
        'animateMotion': util.SkruvAnimatemotionSVGAttributes;
        'animateTransform': util.SkruvAnimatetransformSVGAttributes;
        'circle': util.SkruvCircleSVGAttributes;
        'clipPath': util.SkruvClippathSVGAttributes;
        'defs': util.SkruvDefsSVGAttributes;
        'desc': util.SkruvDescSVGAttributes;
        'ellipse': util.SkruvEllipseSVGAttributes;
        'feBlend': util.SkruvFeblendSVGAttributes;
        'feColorMatrix': util.SkruvFecolormatrixSVGAttributes;
        'feComponentTransfer': util.SkruvFecomponenttransferSVGAttributes;
        'feComposite': util.SkruvFecompositeSVGAttributes;
        'feConvolveMatrix': util.SkruvFeconvolvematrixSVGAttributes;
        'feDiffuseLighting': util.SkruvFediffuselightingSVGAttributes;
        'feDisplacementMap': util.SkruvFedisplacementmapSVGAttributes;
        'feDistantLight': util.SkruvFedistantlightSVGAttributes;
        'feDropShadow': util.SkruvFedropshadowSVGAttributes;
        'feFlood': util.SkruvFefloodSVGAttributes;
        'feFuncA': util.SkruvFefuncaSVGAttributes;
        'feFuncB': util.SkruvFefuncbSVGAttributes;
        'feFuncG': util.SkruvFefuncgSVGAttributes;
        'feFuncR': util.SkruvFefuncrSVGAttributes;
        'feGaussianBlur': util.SkruvFegaussianblurSVGAttributes;
        'feImage': util.SkruvFeimageSVGAttributes;
        'feMerge': util.SkruvFemergeSVGAttributes;
        'feMergeNode': util.SkruvFemergenodeSVGAttributes;
        'feMorphology': util.SkruvFemorphologySVGAttributes;
        'feOffset': util.SkruvFeoffsetSVGAttributes;
        'fePointLight': util.SkruvFepointlightSVGAttributes;
        'feSpecularLighting': util.SkruvFespecularlightingSVGAttributes;
        'feSpotLight': util.SkruvFespotlightSVGAttributes;
        'feTile': util.SkruvFetileSVGAttributes;
        'feTurbulence': util.SkruvFeturbulenceSVGAttributes;
        'filter': util.SkruvFilterSVGAttributes;
        'foreignObject': util.SkruvForeignobjectSVGAttributes;
        'g': util.SkruvGSVGAttributes;
        'image': util.SkruvImageSVGAttributes;
        'line': util.SkruvLineSVGAttributes;
        'linearGradient': util.SkruvLineargradientSVGAttributes;
        'marker': util.SkruvMarkerSVGAttributes;
        'mask': util.SkruvMaskSVGAttributes;
        'metadata': util.SkruvMetadataSVGAttributes;
        'mpath': util.SkruvMpathSVGAttributes;
        'path': util.SkruvPathSVGAttributes;
        'pattern': util.SkruvPatternSVGAttributes;
        'polygon': util.SkruvPolygonSVGAttributes;
        'polyline': util.SkruvPolylineSVGAttributes;
        'radialGradient': util.SkruvRadialgradientSVGAttributes;
        'rect': util.SkruvRectSVGAttributes;
        'svgScript': util.SkruvScriptSVGAttributes;
        'set': util.SkruvSetSVGAttributes;
        'stop': util.SkruvStopSVGAttributes;
        'svgStyle': util.SkruvStyleSVGAttributes;
        'svg': util.SkruvSvgSVGAttributes;
        'switch': util.SkruvSwitchSVGAttributes;
        'symbol': util.SkruvSymbolSVGAttributes;
        'text': util.SkruvTextSVGAttributes;
        'textPath': util.SkruvTextpathSVGAttributes;
        'svgTitle': util.SkruvTitleSVGAttributes;
        'tspan': util.SkruvTspanSVGAttributes;
        'use': util.SkruvUseSVGAttributes;
        'view': util.SkruvViewSVGAttributes;
        'math': util.SkruvMathMathMLAttributes;
        'semantics': util.SkruvSemanticsMathMLAttributes;
        'menclose': util.SkruvMencloseMathMLAttributes;
        'merror': util.SkruvMerrorMathMLAttributes;
        'mfrac': util.SkruvMfracMathMLAttributes;
        'mi': util.SkruvMiMathMLAttributes;
        'mmultiscripts': util.SkruvMmultiscriptsMathMLAttributes;
        'mn': util.SkruvMnMathMLAttributes;
        'mo': util.SkruvMoMathMLAttributes;
        'mover': util.SkruvMoverMathMLAttributes;
        'mpadded': util.SkruvMpaddedMathMLAttributes;
        'mphantom': util.SkruvMphantomMathMLAttributes;
        'mroot': util.SkruvMrootMathMLAttributes;
        'mrow': util.SkruvMrowMathMLAttributes;
        'ms': util.SkruvMsMathMLAttributes;
        'mspace': util.SkruvMspaceMathMLAttributes;
        'msqrt': util.SkruvMsqrtMathMLAttributes;
        'mstyle': util.SkruvMstyleMathMLAttributes;
        'msub': util.SkruvMsubMathMLAttributes;
        'msup': util.SkruvMsupMathMLAttributes;
        'msubsup': util.SkruvMsubsupMathMLAttributes;
        'mtable': util.SkruvMtableMathMLAttributes;
        'mtd': util.SkruvMtdMathMLAttributes;
        'mtext': util.SkruvMtextMathMLAttributes;
        'mtr': util.SkruvMtrMathMLAttributes;
        'munder': util.SkruvMunderMathMLAttributes;
        'munderover': util.SkruvMunderoverMathMLAttributes;
        'feed': util.SkruvFeedAtomAttributes;
        'entry': util.SkruvEntryAtomAttributes;
        'id': util.SkruvIdAtomAttributes;
        'atomTitle': util.SkruvTitleAtomAttributes;
        'updated': util.SkruvUpdatedAtomAttributes;
        'author': util.SkruvAuthorAtomAttributes;
        'name': util.SkruvNameAtomAttributes;
        'uri': util.SkruvUriAtomAttributes;
        'email': util.SkruvEmailAtomAttributes;
        'atomLink': util.SkruvLinkAtomAttributes;
        'category': util.SkruvCategoryAtomAttributes;
        'contributor': util.SkruvContributorAtomAttributes;
        'generator': util.SkruvGeneratorAtomAttributes;
        'icon': util.SkruvIconAtomAttributes;
        'logo': util.SkruvLogoAtomAttributes;
        'rights': util.SkruvRightsAtomAttributes;
        'subtitle': util.SkruvSubtitleAtomAttributes;
        'content': util.SkruvContentAtomAttributes;
        'atomSummary': util.SkruvSummaryAtomAttributes;
        'published': util.SkruvPublishedAtomAttributes;
        'atomSource': util.SkruvSourceAtomAttributes;
        'urlset': util.SkruvUrlsetSitemapAttributes;
        'url': util.SkruvUrlSitemapAttributes;
        'loc': util.SkruvLocSitemapAttributes;
        'lastmod': util.SkruvLastmodSitemapAttributes;
        'changefreq': util.SkruvChangefreqSitemapAttributes;
        'priority': util.SkruvPrioritySitemapAttributes;
        'sitemapindex': util.SkruvSitemapindexSitemapAttributes;
        'sitemap': util.SkruvSitemapSitemapAttributes;
        'skruvHeader': util.AsyncContent<{
            'name': string | number;
            'value': string;
            isSkruvDom?: false;
        }>;
        'skruvComment': util.AsyncContent<{
            isSkruvDom?: false;
        }>;
        'skruvText': util.AsyncContent<{
            isSkruvDom?: false;
        }>;
        [elemName: string]: any;
    }
}
export declare const Fragment = "#fragment";
export declare const jsxs: (nodeName: string | Function, attributes?: {
    children: never[];
}) => any;
export declare const jsx: (nodeName: string | Function, attributes?: {
    children: never[];
}) => any;
//# sourceMappingURL=jsx-runtime.d.ts.map