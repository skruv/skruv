// TODO: To do this properly would require https://github.com/microsoft/TypeScript/issues/43826 as we need to always return a type with the generator/proxy but be able to set the original type (or any other type).
//@ts-ignore: TODO: TS thinks we want innerKey as a type
export type State<T> = T & AsyncGenerator<T> & { [key in keyof T]: State<T[key]> } & { getGenerator: (innerKey: string | number) => State<T[innerKey]>, toJSON: () => T };

// Vnode/DOM types

type NotAUnion<T> = [T] extends [infer U] ? _NotAUnion<U, U> : never;
type _NotAUnion<T, U> = U extends any ? [T] extends [U] ? unknown : never : never;
type NotBuiltinEvent = string & NotAUnion<keyof HTMLElementEventMap | keyof SVGElementEventMap | keyof MathMLElementEventMap>
type CustomEvents<T> = Record<`on${NotBuiltinEvent}`, (e: CustomEvent & { currentTarget: T }) => void>

type DataAttributes = Record<`data-${string}`, string | number | boolean>

type SkruvAdditionalAttributes<T> = {
  'data-skruv-after-create'?: (element: T) => void,
  'data-skruv-after-remove'?: (element: T) => void,
  'data-skruv-key'?: object,
  'data-skruv-finished'?: boolean,
  'data-skruv-wait-for-not-empty'?: boolean
}

interface HTMLGlobalAttributes {
  class?: string | undefined
  id?: string | undefined
  slot?: string | undefined
  accesskey?: string | undefined
  autocapitalize?: 'off' | 'none' | 'on' | 'sentences' | 'words' | 'characters' | undefined
  autofocus?: boolean | undefined
  contenteditable?: '' | 'true' | 'plaintext-only' | 'false'
  dir?: 'ltr' | 'rtl' | 'auto' | undefined
  draggable?: 'true' | 'false' | 'auto' | undefined
  enterkeyhint?: 'enter' | 'done' | 'go' | 'next' | 'previous' | 'search' | 'send' | undefined
  hidden?: 'until-found' | 'hidden' | '' | undefined
  inert?: boolean | undefined
  inputmode?: 'none' | 'text' | 'tel' | 'url' | 'email' | 'numeric' | 'decimal' | 'search' | undefined
  // "is" is special, see the spec
  // is: string
  itemid?: URL | undefined
  itemprop?: string | undefined
  itemref?: string | undefined // this needs to be a space separated list of valid ID's in the document
  itemscope?: boolean | undefined
  itemtype?: string | undefined // this needs to be a space separated list of valid URL's
  lang?: string | undefined
  nonce?: string | undefined
  popover?: 'auto' | '' | 'manual' | undefined
  spellcheck?: boolean | undefined
  style?: string | undefined
  tabindex?: number | undefined
  title?: string | undefined
  translate?: 'yes' | '' | 'no' | undefined
}

interface SVGGlobalAttributes { }
interface MathMLGlobalAttributes { }

type HTMLEvents<T> = { [key in keyof HTMLElementEventMap as `on${key}`]?: ((e: (HTMLElementEventMap[key] & { currentTarget: T })) => void) }
type SVGEvents<T> = { [key in keyof SVGElementEventMap as `on${key}`]?: ((e: (SVGElementEventMap[key] & { currentTarget: T })) => void) }
type MathMlEvents<T> = { [key in keyof MathMLElementEventMap as `on${key}`]?: ((e: (MathMLElementEventMap[key] & { currentTarget: T })) => void) }

type HTMLAttributes<T, A> = A & CustomEvents<T> & HTMLEvents<T> & DataAttributes & SkruvAdditionalAttributes<T> & HTMLGlobalAttributes & { isSkruvDom?: false }
type SVGAttributes<T, A> = A & CustomEvents<T> & SVGEvents<T> & DataAttributes & SkruvAdditionalAttributes<T> & SVGGlobalAttributes & { isSkruvDom?: false }
type MathMLAttributes<T, A> = A & CustomEvents<T> & MathMlEvents<T> & DataAttributes & SkruvAdditionalAttributes<T> & MathMLGlobalAttributes & { isSkruvDom?: false }

export type BasicVnode<N, T, A, C> = {
  isSkruvDom: true
  t: N
  c: [(HTMLAttributes<T, A> & SVGAttributes<T, A> & MathMLAttributes<T, A> | C)?, ...C[]]
  r?: () => boolean
}

export type HTMLVnode<N, T, A, C> = {
  isSkruvDom: true
  t: N
  c: [(HTMLAttributes<T, A> | C)?, ...C[]]
  r?: () => boolean
}

export type SVGVnode<N, T, A, C> = {
  isSkruvDom: true
  t: N
  c: [(SVGAttributes<T, A> | C)?, ...C[]]
  r?: () => boolean
}

export type MathMLVnode<N, T, A, C> = {
  isSkruvDom: true
  t: N
  c: [(MathMLAttributes<T, A> | C)?, ...C[]]
  r?: () => boolean
}

export type AtomVnode<N, T, A, C> = {
  isSkruvDom: true
  t: N
  c: [(A & { isSkruvDom?: false }| C)?, ...C[]]
  r?: () => boolean
}
export type attributes = HTMLAttributes<Record<string, string | number | boolean | object | Function>, HTMLElement> | SVGAttributes<Record<string, string | number | boolean | object | Function>, SVGElement> | MathMLAttributes<Record<string, string | number | boolean | object | Function>, MathMLElement>

export type Vnode = AnyElement
export type children = Vnode['c']

type CustomElements = { [id: `${string}-${string}`]: getHTMLVnode<Record<string, string | number | boolean | object | Function>, HTMLElement, typeof id, Vnode | string | number | boolean> }

export type getHTMLVnode<N, T, A, C> = (...args: [(HTMLAttributes<T, A> | C), ...C[]]) => HTMLVnode<N, T, A, C>




// Needed stuff:
// [ ] Map of all elements, their attributes and types
// [ ] Map of all allowed children and their types
// [ ] Map all of react attributes against their "real" counterparts

interface SkruvAHTMLElement extends HTMLVnode<'a', HTMLAnchorElement, SkruvAHTMLAttributes, AnyHTMLContent> { }
interface SkruvAbbrHTMLElement extends HTMLVnode<'abbr', HTMLElement, SkruvAbbrHTMLAttributes, AnyHTMLContent> { }
interface SkruvAddressHTMLElement extends HTMLVnode<'address', HTMLElement, SkruvAddressHTMLAttributes, AnyHTMLContent> { }
interface SkruvAreaHTMLElement extends HTMLVnode<'area', HTMLAreaElement, SkruvAreaHTMLAttributes, AnyHTMLContent> { }
interface SkruvArticleHTMLElement extends HTMLVnode<'article', HTMLElement, SkruvArticleHTMLAttributes, AnyHTMLContent> { }
interface SkruvAsideHTMLElement extends HTMLVnode<'aside', HTMLElement, SkruvAsideHTMLAttributes, AnyHTMLContent> { }
interface SkruvAudioHTMLElement extends HTMLVnode<'audio', HTMLAudioElement, SkruvAudioHTMLAttributes, AnyHTMLContent> { }
interface SkruvBHTMLElement extends HTMLVnode<'b', HTMLElement, SkruvBHTMLAttributes, AnyHTMLContent> { }
interface SkruvBdiHTMLElement extends HTMLVnode<'bdi', HTMLElement, SkruvBdiHTMLAttributes, AnyHTMLContent> { }
interface SkruvBdoHTMLElement extends HTMLVnode<'bdo', HTMLElement, SkruvBdoHTMLAttributes, AnyHTMLContent> { }
interface SkruvBlockquoteHTMLElement extends HTMLVnode<'blockquote', HTMLQuoteElement, SkruvBlockquoteHTMLAttributes, AnyHTMLContent> { }
interface SkruvBrHTMLElement extends HTMLVnode<'br', HTMLBRElement, SkruvBrHTMLAttributes, AnyHTMLContent> { }
interface SkruvButtonHTMLElement extends HTMLVnode<'button', HTMLButtonElement, SkruvButtonHTMLAttributes, AnyHTMLContent> { }
interface SkruvCanvasHTMLElement extends HTMLVnode<'canvas', HTMLCanvasElement, SkruvCanvasHTMLAttributes, AnyHTMLContent> { }
interface SkruvCiteHTMLElement extends HTMLVnode<'cite', HTMLElement, SkruvCiteHTMLAttributes, AnyHTMLContent> { }
interface SkruvCodeHTMLElement extends HTMLVnode<'code', HTMLElement, SkruvCodeHTMLAttributes, AnyHTMLContent> { }
interface SkruvDataHTMLElement extends HTMLVnode<'data', HTMLDataElement, SkruvDataHTMLAttributes, AnyHTMLContent> { }
interface SkruvDatalistHTMLElement extends HTMLVnode<'datalist', HTMLDataListElement, SkruvDatalistHTMLAttributes, AnyHTMLContent> { }
interface SkruvDelHTMLElement extends HTMLVnode<'del', HTMLModElement, SkruvDelHTMLAttributes, AnyHTMLContent> { }
interface SkruvDetailsHTMLElement extends HTMLVnode<'details', HTMLDetailsElement, SkruvDetailsHTMLAttributes, AnyHTMLContent> { }
interface SkruvDfnHTMLElement extends HTMLVnode<'dfn', HTMLElement, SkruvDfnHTMLAttributes, AnyHTMLContent> { }
interface SkruvDialogHTMLElement extends HTMLVnode<'dialog', HTMLDialogElement, SkruvDialogHTMLAttributes, AnyHTMLContent> { }
interface SkruvDivHTMLElement extends HTMLVnode<'div', HTMLDivElement, SkruvDivHTMLAttributes, AnyHTMLContent> { }
interface SkruvDlHTMLElement extends HTMLVnode<'dl', HTMLDListElement, SkruvDlHTMLAttributes, AnyHTMLContent> { }
interface SkruvEmHTMLElement extends HTMLVnode<'em', HTMLElement, SkruvEmHTMLAttributes, AnyHTMLContent> { }
interface SkruvEmbedHTMLElement extends HTMLVnode<'embed', HTMLEmbedElement, SkruvEmbedHTMLAttributes, AnyHTMLContent> { }
interface SkruvFieldsetHTMLElement extends HTMLVnode<'fieldset', HTMLFieldSetElement, SkruvFieldsetHTMLAttributes, AnyHTMLContent> { }
interface SkruvFigureHTMLElement extends HTMLVnode<'figure', HTMLElement, SkruvFigureHTMLAttributes, AnyHTMLContent> { }
interface SkruvFooterHTMLElement extends HTMLVnode<'footer', HTMLElement, SkruvFooterHTMLAttributes, AnyHTMLContent> { }
interface SkruvFormHTMLElement extends HTMLVnode<'form', HTMLFormElement, SkruvFormHTMLAttributes, AnyHTMLContent> { }
interface SkruvH1HTMLElement extends HTMLVnode<'h1', HTMLHeadingElement, SkruvH1HTMLAttributes, AnyHTMLContent> { }
interface SkruvH2HTMLElement extends HTMLVnode<'h2', HTMLHeadingElement, SkruvH2HTMLAttributes, AnyHTMLContent> { }
interface SkruvH3HTMLElement extends HTMLVnode<'h3', HTMLHeadingElement, SkruvH3HTMLAttributes, AnyHTMLContent> { }
interface SkruvH4HTMLElement extends HTMLVnode<'h4', HTMLHeadingElement, SkruvH4HTMLAttributes, AnyHTMLContent> { }
interface SkruvH5HTMLElement extends HTMLVnode<'h5', HTMLHeadingElement, SkruvH5HTMLAttributes, AnyHTMLContent> { }
interface SkruvH6HTMLElement extends HTMLVnode<'h6', HTMLHeadingElement, SkruvH6HTMLAttributes, AnyHTMLContent> { }
interface SkruvHeaderHTMLElement extends HTMLVnode<'header', HTMLElement, SkruvHeaderHTMLAttributes, AnyHTMLContent> { }
interface SkruvHgroupHTMLElement extends HTMLVnode<'hgroup', HTMLElement, SkruvHgroupHTMLAttributes, AnyHTMLContent> { }
interface SkruvHrHTMLElement extends HTMLVnode<'hr', HTMLHRElement, SkruvHrHTMLAttributes, AnyHTMLContent> { }
interface SkruvIHTMLElement extends HTMLVnode<'i', HTMLElement, SkruvIHTMLAttributes, AnyHTMLContent> { }
interface SkruvIframeHTMLElement extends HTMLVnode<'iframe', HTMLIFrameElement, SkruvIframeHTMLAttributes, AnyHTMLContent> { }
interface SkruvImgHTMLElement extends HTMLVnode<'img', HTMLImageElement, SkruvImgHTMLAttributes, AnyHTMLContent> { }
interface SkruvInputHTMLElement extends HTMLVnode<'input', HTMLInputElement, SkruvInputHTMLAttributes, AnyHTMLContent> { }
interface SkruvInsHTMLElement extends HTMLVnode<'ins', HTMLModElement, SkruvInsHTMLAttributes, AnyHTMLContent> { }
interface SkruvKbdHTMLElement extends HTMLVnode<'kbd', HTMLElement, SkruvKbdHTMLAttributes, AnyHTMLContent> { }
interface SkruvLabelHTMLElement extends HTMLVnode<'label', HTMLLabelElement, SkruvLabelHTMLAttributes, AnyHTMLContent> { }
interface SkruvLinkHTMLElement extends HTMLVnode<'link', HTMLLinkElement, SkruvLinkHTMLAttributes, AnyHTMLContent> { }
interface SkruvMainHTMLElement extends HTMLVnode<'main', HTMLElement, SkruvMainHTMLAttributes, AnyHTMLContent> { }
interface SkruvMapHTMLElement extends HTMLVnode<'map', HTMLMapElement, SkruvMapHTMLAttributes, AnyHTMLContent> { }
interface SkruvMarkHTMLElement extends HTMLVnode<'mark', HTMLElement, SkruvMarkHTMLAttributes, AnyHTMLContent> { }
interface SkruvMathHTMLElement extends HTMLVnode<'math', HTMLUnknownElement, SkruvMathHTMLAttributes, AnyHTMLContent> { }
interface SkruvMenuHTMLElement extends HTMLVnode<'menu', HTMLMenuElement, SkruvMenuHTMLAttributes, AnyHTMLContent> { }
interface SkruvMetaHTMLElement extends HTMLVnode<'meta', HTMLMetaElement, SkruvMetaHTMLAttributes, AnyHTMLContent> { }
interface SkruvMeterHTMLElement extends HTMLVnode<'meter', HTMLMeterElement, SkruvMeterHTMLAttributes, AnyHTMLContent> { }
interface SkruvNavHTMLElement extends HTMLVnode<'nav', HTMLElement, SkruvNavHTMLAttributes, AnyHTMLContent> { }
interface SkruvNoscriptHTMLElement extends HTMLVnode<'noscript', HTMLElement, SkruvNoscriptHTMLAttributes, AnyHTMLContent> { }
interface SkruvObjectHTMLElement extends HTMLVnode<'object', HTMLObjectElement, SkruvObjectHTMLAttributes, AnyHTMLContent> { }
interface SkruvOlHTMLElement extends HTMLVnode<'ol', HTMLOListElement, SkruvOlHTMLAttributes, AnyHTMLContent> { }
interface SkruvOutputHTMLElement extends HTMLVnode<'output', HTMLOutputElement, SkruvOutputHTMLAttributes, AnyHTMLContent> { }
interface SkruvPHTMLElement extends HTMLVnode<'p', HTMLParagraphElement, SkruvPHTMLAttributes, AnyHTMLContent> { }
interface SkruvPictureHTMLElement extends HTMLVnode<'picture', HTMLPictureElement, SkruvPictureHTMLAttributes, AnyHTMLContent> { }
interface SkruvPreHTMLElement extends HTMLVnode<'pre', HTMLPreElement, SkruvPreHTMLAttributes, AnyHTMLContent> { }
interface SkruvProgressHTMLElement extends HTMLVnode<'progress', HTMLProgressElement, SkruvProgressHTMLAttributes, AnyHTMLContent> { }
interface SkruvQHTMLElement extends HTMLVnode<'q', HTMLQuoteElement, SkruvQHTMLAttributes, AnyHTMLContent> { }
interface SkruvRubyHTMLElement extends HTMLVnode<'ruby', HTMLElement, SkruvRubyHTMLAttributes, AnyHTMLContent> { }
interface SkruvSHTMLElement extends HTMLVnode<'s', HTMLElement, SkruvSHTMLAttributes, AnyHTMLContent> { }
interface SkruvSampHTMLElement extends HTMLVnode<'samp', HTMLElement, SkruvSampHTMLAttributes, AnyHTMLContent> { }
interface SkruvScriptHTMLElement extends HTMLVnode<'script', HTMLScriptElement, SkruvScriptHTMLAttributes, AnyHTMLContent> { }
interface SkruvSearchHTMLElement extends HTMLVnode<'search', HTMLUnknownElement, SkruvSearchHTMLAttributes, AnyHTMLContent> { }
interface SkruvSectionHTMLElement extends HTMLVnode<'section', HTMLElement, SkruvSectionHTMLAttributes, AnyHTMLContent> { }
interface SkruvSelectHTMLElement extends HTMLVnode<'select', HTMLSelectElement, SkruvSelectHTMLAttributes, AnyHTMLContent> { }
interface SkruvSlotHTMLElement extends HTMLVnode<'slot', HTMLSlotElement, SkruvSlotHTMLAttributes, AnyHTMLContent> { }
interface SkruvSmallHTMLElement extends HTMLVnode<'small', HTMLElement, SkruvSmallHTMLAttributes, AnyHTMLContent> { }
interface SkruvSpanHTMLElement extends HTMLVnode<'span', HTMLSpanElement, SkruvSpanHTMLAttributes, AnyHTMLContent> { }
interface SkruvStrongHTMLElement extends HTMLVnode<'strong', HTMLElement, SkruvStrongHTMLAttributes, AnyHTMLContent> { }
interface SkruvSubHTMLElement extends HTMLVnode<'sub', HTMLElement, SkruvSubHTMLAttributes, AnyHTMLContent> { }
interface SkruvSupHTMLElement extends HTMLVnode<'sup', HTMLElement, SkruvSupHTMLAttributes, AnyHTMLContent> { }
interface SkruvSvgHTMLElement extends HTMLVnode<'svg', HTMLUnknownElement, SkruvSvgHTMLAttributes, AnyHTMLContent> { }
interface SkruvTableHTMLElement extends HTMLVnode<'table', HTMLTableElement, SkruvTableHTMLAttributes, AnyHTMLContent> { }
interface SkruvTemplateHTMLElement extends HTMLVnode<'template', HTMLTemplateElement, SkruvTemplateHTMLAttributes, AnyHTMLContent> { }
interface SkruvTextareaHTMLElement extends HTMLVnode<'textarea', HTMLTextAreaElement, SkruvTextareaHTMLAttributes, AnyHTMLContent> { }
interface SkruvTimeHTMLElement extends HTMLVnode<'time', HTMLTimeElement, SkruvTimeHTMLAttributes, AnyHTMLContent> { }
interface SkruvUHTMLElement extends HTMLVnode<'u', HTMLElement, SkruvUHTMLAttributes, AnyHTMLContent> { }
interface SkruvUlHTMLElement extends HTMLVnode<'ul', HTMLUListElement, SkruvUlHTMLAttributes, AnyHTMLContent> { }
interface SkruvVarHTMLElement extends HTMLVnode<'var', HTMLElement, SkruvVarHTMLAttributes, AnyHTMLContent> { }
interface SkruvVideoHTMLElement extends HTMLVnode<'video', HTMLVideoElement, SkruvVideoHTMLAttributes, AnyHTMLContent> { }
interface SkruvWbrHTMLElement extends HTMLVnode<'wbr', HTMLElement, SkruvWbrHTMLAttributes, AnyHTMLContent> { }
interface SkruvBaseHTMLElement extends HTMLVnode<'base', HTMLBaseElement, SkruvBaseHTMLAttributes, AnyHTMLContent> { }
interface SkruvStyleHTMLElement extends HTMLVnode<'style', HTMLStyleElement, SkruvStyleHTMLAttributes, AnyHTMLContent> { }
interface SkruvTitleHTMLElement extends HTMLVnode<'title', HTMLTitleElement, SkruvTitleHTMLAttributes, AnyHTMLContent> { }
interface SkruvHtmlHTMLElement extends HTMLVnode<'html', HTMLHtmlElement, SkruvHtmlHTMLAttributes, AnyHTMLContent> { }
interface SkruvHeadHTMLElement extends HTMLVnode<'head', HTMLHeadElement, SkruvHeadHTMLAttributes, AnyHTMLContent> { }
interface SkruvBodyHTMLElement extends HTMLVnode<'body', HTMLBodyElement, SkruvBodyHTMLAttributes, AnyHTMLContent> { }
interface SkruvLiHTMLElement extends HTMLVnode<'li', HTMLLIElement, SkruvLiHTMLAttributes, AnyHTMLContent> { }
interface SkruvDtHTMLElement extends HTMLVnode<'dt', HTMLElement, SkruvDtHTMLAttributes, AnyHTMLContent> { }
interface SkruvDdHTMLElement extends HTMLVnode<'dd', HTMLElement, SkruvDdHTMLAttributes, AnyHTMLContent> { }
interface SkruvFigcaptionHTMLElement extends HTMLVnode<'figcaption', HTMLElement, SkruvFigcaptionHTMLAttributes, AnyHTMLContent> { }
interface SkruvRtHTMLElement extends HTMLVnode<'rt', HTMLElement, SkruvRtHTMLAttributes, AnyHTMLContent> { }
interface SkruvRpHTMLElement extends HTMLVnode<'rp', HTMLElement, SkruvRpHTMLAttributes, AnyHTMLContent> { }
interface SkruvSourceHTMLElement extends HTMLVnode<'source', HTMLSourceElement, SkruvSourceHTMLAttributes, AnyHTMLContent> { }
interface SkruvTrackHTMLElement extends HTMLVnode<'track', HTMLTrackElement, SkruvTrackHTMLAttributes, AnyHTMLContent> { }
interface SkruvCaptionHTMLElement extends HTMLVnode<'caption', HTMLTableCaptionElement, SkruvCaptionHTMLAttributes, AnyHTMLContent> { }
interface SkruvColgroupHTMLElement extends HTMLVnode<'colgroup', HTMLTableColElement, SkruvColgroupHTMLAttributes, AnyHTMLContent> { }
interface SkruvColHTMLElement extends HTMLVnode<'col', HTMLTableColElement, SkruvColHTMLAttributes, AnyHTMLContent> { }
interface SkruvTbodyHTMLElement extends HTMLVnode<'tbody', HTMLTableSectionElement, SkruvTbodyHTMLAttributes, AnyHTMLContent> { }
interface SkruvTheadHTMLElement extends HTMLVnode<'thead', HTMLTableSectionElement, SkruvTheadHTMLAttributes, AnyHTMLContent> { }
interface SkruvTfootHTMLElement extends HTMLVnode<'tfoot', HTMLTableSectionElement, SkruvTfootHTMLAttributes, AnyHTMLContent> { }
interface SkruvTrHTMLElement extends HTMLVnode<'tr', HTMLTableRowElement, SkruvTrHTMLAttributes, AnyHTMLContent> { }
interface SkruvTdHTMLElement extends HTMLVnode<'td', HTMLTableCellElement, SkruvTdHTMLAttributes, AnyHTMLContent> { }
interface SkruvThHTMLElement extends HTMLVnode<'th', HTMLTableCellElement, SkruvThHTMLAttributes, AnyHTMLContent> { }
interface SkruvOptgroupHTMLElement extends HTMLVnode<'optgroup', HTMLOptGroupElement, SkruvOptgroupHTMLAttributes, AnyHTMLContent> { }
interface SkruvOptionHTMLElement extends HTMLVnode<'option', HTMLOptionElement, SkruvOptionHTMLAttributes, AnyHTMLContent> { }
interface SkruvLegendHTMLElement extends HTMLVnode<'legend', HTMLLegendElement, SkruvLegendHTMLAttributes, AnyHTMLContent> { }
interface SkruvSummaryHTMLElement extends HTMLVnode<'summary', HTMLElement, SkruvSummaryHTMLAttributes, AnyHTMLContent> { }


type FlowContent = SkruvAHTMLElement | SkruvAbbrHTMLElement | SkruvAddressHTMLElement | SkruvAreaHTMLElement | SkruvArticleHTMLElement | SkruvAsideHTMLElement | SkruvAudioHTMLElement | SkruvBHTMLElement | SkruvBdiHTMLElement | SkruvBdoHTMLElement | SkruvBlockquoteHTMLElement | SkruvBrHTMLElement | SkruvButtonHTMLElement | SkruvCanvasHTMLElement | SkruvCiteHTMLElement | SkruvCodeHTMLElement | SkruvDataHTMLElement | SkruvDatalistHTMLElement | SkruvDelHTMLElement | SkruvDetailsHTMLElement | SkruvDfnHTMLElement | SkruvDialogHTMLElement | SkruvDivHTMLElement | SkruvDlHTMLElement | SkruvEmHTMLElement | SkruvEmbedHTMLElement | SkruvFieldsetHTMLElement | SkruvFigureHTMLElement | SkruvFooterHTMLElement | SkruvFormHTMLElement | SkruvH1HTMLElement | SkruvH2HTMLElement | SkruvH3HTMLElement | SkruvH4HTMLElement | SkruvH5HTMLElement | SkruvH6HTMLElement | SkruvHeaderHTMLElement | SkruvHgroupHTMLElement | SkruvHrHTMLElement | SkruvIHTMLElement | SkruvIframeHTMLElement | SkruvImgHTMLElement | SkruvInputHTMLElement | SkruvInsHTMLElement | SkruvKbdHTMLElement | SkruvLabelHTMLElement | SkruvLinkHTMLElement | SkruvMainHTMLElement | SkruvMapHTMLElement | SkruvMarkHTMLElement | SkruvMathHTMLElement | SkruvMenuHTMLElement | SkruvMetaHTMLElement | SkruvMeterHTMLElement | SkruvNavHTMLElement | SkruvNoscriptHTMLElement | SkruvObjectHTMLElement | SkruvOlHTMLElement | SkruvOutputHTMLElement | SkruvPHTMLElement | SkruvPictureHTMLElement | SkruvPreHTMLElement | SkruvProgressHTMLElement | SkruvQHTMLElement | SkruvRubyHTMLElement | SkruvSHTMLElement | SkruvSampHTMLElement | SkruvScriptHTMLElement | SkruvSearchHTMLElement | SkruvSectionHTMLElement | SkruvSelectHTMLElement | SkruvSlotHTMLElement | SkruvSmallHTMLElement | SkruvSpanHTMLElement | SkruvStrongHTMLElement | SkruvSubHTMLElement | SkruvSupHTMLElement | SkruvSvgHTMLElement | SkruvTableHTMLElement | SkruvTemplateHTMLElement | SkruvTextareaHTMLElement | SkruvTimeHTMLElement | SkruvUHTMLElement | SkruvUlHTMLElement | SkruvVarHTMLElement | SkruvVideoHTMLElement | SkruvWbrHTMLElement
type HeadingContent = SkruvH1HTMLElement | SkruvH2HTMLElement | SkruvH3HTMLElement | SkruvH4HTMLElement | SkruvH5HTMLElement | SkruvH6HTMLElement | SkruvHgroupHTMLElement
type SectioningContent = SkruvArticleHTMLElement | SkruvAsideHTMLElement | SkruvNavHTMLElement | SkruvSectionHTMLElement
type MetadataContent = SkruvBaseHTMLElement | SkruvLinkHTMLElement | SkruvMetaHTMLElement | SkruvNoscriptHTMLElement | SkruvScriptHTMLElement | SkruvStyleHTMLElement | SkruvTemplateHTMLElement | SkruvTitleHTMLElement
type InteractiveContent = SkruvAHTMLElement | SkruvAudioHTMLElement | SkruvButtonHTMLElement | SkruvDetailsHTMLElement | SkruvEmbedHTMLElement | SkruvIframeHTMLElement | SkruvImgHTMLElement | SkruvInputHTMLElement | SkruvLabelHTMLElement | SkruvObjectHTMLElement | SkruvSelectHTMLElement | SkruvTextareaHTMLElement | SkruvVideoHTMLElement
type PhrasingContent = SkruvAHTMLElement | SkruvAbbrHTMLElement | SkruvAreaHTMLElement | SkruvAudioHTMLElement | SkruvBHTMLElement | SkruvBdiHTMLElement | SkruvBdoHTMLElement | SkruvBrHTMLElement | SkruvButtonHTMLElement | SkruvCanvasHTMLElement | SkruvCiteHTMLElement | SkruvCodeHTMLElement | SkruvDataHTMLElement | SkruvDatalistHTMLElement | SkruvDelHTMLElement | SkruvDfnHTMLElement | SkruvEmHTMLElement | SkruvEmbedHTMLElement | SkruvIHTMLElement | SkruvIframeHTMLElement | SkruvImgHTMLElement | SkruvInputHTMLElement | SkruvInsHTMLElement | SkruvKbdHTMLElement | SkruvLabelHTMLElement | SkruvLinkHTMLElement | SkruvMapHTMLElement | SkruvMarkHTMLElement | SkruvMathHTMLElement | SkruvMetaHTMLElement | SkruvMeterHTMLElement | SkruvNoscriptHTMLElement | SkruvObjectHTMLElement | SkruvOutputHTMLElement | SkruvPictureHTMLElement | SkruvProgressHTMLElement | SkruvQHTMLElement | SkruvRubyHTMLElement | SkruvSHTMLElement | SkruvSampHTMLElement | SkruvScriptHTMLElement | SkruvSelectHTMLElement | SkruvSlotHTMLElement | SkruvSmallHTMLElement | SkruvSpanHTMLElement | SkruvStrongHTMLElement | SkruvSubHTMLElement | SkruvSupHTMLElement | SkruvSvgHTMLElement | SkruvTemplateHTMLElement | SkruvTextareaHTMLElement | SkruvTimeHTMLElement | SkruvUHTMLElement | SkruvVarHTMLElement | SkruvVideoHTMLElement | SkruvWbrHTMLElement
type EmbeddedContent = SkruvAudioHTMLElement | SkruvCanvasHTMLElement | SkruvEmbedHTMLElement | SkruvIframeHTMLElement | SkruvImgHTMLElement | SkruvMathHTMLElement | SkruvObjectHTMLElement | SkruvPictureHTMLElement | SkruvSvgHTMLElement | SkruvVideoHTMLElement
type OtherContent = SkruvHtmlHTMLElement | SkruvHeadHTMLElement | SkruvBodyHTMLElement | SkruvLiHTMLElement | SkruvDlHTMLElement | SkruvDtHTMLElement | SkruvDdHTMLElement | SkruvFigcaptionHTMLElement | SkruvRtHTMLElement | SkruvRpHTMLElement | SkruvSourceHTMLElement | SkruvTrackHTMLElement | SkruvCaptionHTMLElement | SkruvColgroupHTMLElement | SkruvColHTMLElement | SkruvTbodyHTMLElement | SkruvTheadHTMLElement | SkruvTfootHTMLElement | SkruvTrHTMLElement | SkruvTdHTMLElement | SkruvThHTMLElement | SkruvOptgroupHTMLElement | SkruvOptionHTMLElement | SkruvLegendHTMLElement | SkruvSummaryHTMLElement

type AnyHTMLElement = FlowContent | HeadingContent | SectioningContent | MetadataContent | InteractiveContent | PhrasingContent | EmbeddedContent | OtherContent
type AnyHTMLContent = AnyHTMLElement | string | number | boolean | AnyHTMLContent[] | AsyncGenerator<AnyHTMLContent> | Promise<AnyHTMLContent> | (() => AnyHTMLContent)


interface SkruvASVGElement extends SVGVnode<'a', SVGAElement, SkruvASVGAttributes, AnySVGContent> { }
interface SkruvAnimateSVGElement extends SVGVnode<'animate', SVGAnimateElement, SkruvAnimateSVGAttributes, AnySVGContent> { }
interface SkruvAnimatemotionSVGElement extends SVGVnode<'animateMotion', SVGAnimateMotionElement, SkruvAnimatemotionSVGAttributes, AnySVGContent> { }
interface SkruvAnimatetransformSVGElement extends SVGVnode<'animateTransform', SVGAnimateTransformElement, SkruvAnimatetransformSVGAttributes, AnySVGContent> { }
interface SkruvCircleSVGElement extends SVGVnode<'circle', SVGCircleElement, SkruvCircleSVGAttributes, AnySVGContent> { }
interface SkruvClippathSVGElement extends SVGVnode<'clipPath', SVGClipPathElement, SkruvClippathSVGAttributes, AnySVGContent> { }
interface SkruvDefsSVGElement extends SVGVnode<'defs', SVGDefsElement, SkruvDefsSVGAttributes, AnySVGContent> { }
interface SkruvDescSVGElement extends SVGVnode<'desc', SVGDescElement, SkruvDescSVGAttributes, AnySVGContent> { }
interface SkruvEllipseSVGElement extends SVGVnode<'ellipse', SVGEllipseElement, SkruvEllipseSVGAttributes, AnySVGContent> { }
interface SkruvFeblendSVGElement extends SVGVnode<'feBlend', SVGFEBlendElement, SkruvFeblendSVGAttributes, AnySVGContent> { }
interface SkruvFecolormatrixSVGElement extends SVGVnode<'feColorMatrix', SVGFEColorMatrixElement, SkruvFecolormatrixSVGAttributes, AnySVGContent> { }
interface SkruvFecomponenttransferSVGElement extends SVGVnode<'feComponentTransfer', SVGFEComponentTransferElement, SkruvFecomponenttransferSVGAttributes, AnySVGContent> { }
interface SkruvFecompositeSVGElement extends SVGVnode<'feComposite', SVGFECompositeElement, SkruvFecompositeSVGAttributes, AnySVGContent> { }
interface SkruvFeconvolvematrixSVGElement extends SVGVnode<'feConvolveMatrix', SVGFEConvolveMatrixElement, SkruvFeconvolvematrixSVGAttributes, AnySVGContent> { }
interface SkruvFediffuselightingSVGElement extends SVGVnode<'feDiffuseLighting', SVGFEDiffuseLightingElement, SkruvFediffuselightingSVGAttributes, AnySVGContent> { }
interface SkruvFedisplacementmapSVGElement extends SVGVnode<'feDisplacementMap', SVGFEDisplacementMapElement, SkruvFedisplacementmapSVGAttributes, AnySVGContent> { }
interface SkruvFedistantlightSVGElement extends SVGVnode<'feDistantLight', SVGFEDistantLightElement, SkruvFedistantlightSVGAttributes, AnySVGContent> { }
interface SkruvFedropshadowSVGElement extends SVGVnode<'feDropShadow', SVGFEDropShadowElement, SkruvFedropshadowSVGAttributes, AnySVGContent> { }
interface SkruvFefloodSVGElement extends SVGVnode<'feFlood', SVGFEFloodElement, SkruvFefloodSVGAttributes, AnySVGContent> { }
interface SkruvFefuncaSVGElement extends SVGVnode<'feFuncA', SVGFEFuncAElement, SkruvFefuncaSVGAttributes, AnySVGContent> { }
interface SkruvFefuncbSVGElement extends SVGVnode<'feFuncB', SVGFEFuncBElement, SkruvFefuncbSVGAttributes, AnySVGContent> { }
interface SkruvFefuncgSVGElement extends SVGVnode<'feFuncG', SVGFEFuncGElement, SkruvFefuncgSVGAttributes, AnySVGContent> { }
interface SkruvFefuncrSVGElement extends SVGVnode<'feFuncR', SVGFEFuncRElement, SkruvFefuncrSVGAttributes, AnySVGContent> { }
interface SkruvFegaussianblurSVGElement extends SVGVnode<'feGaussianBlur', SVGFEGaussianBlurElement, SkruvFegaussianblurSVGAttributes, AnySVGContent> { }
interface SkruvFeimageSVGElement extends SVGVnode<'feImage', SVGFEImageElement, SkruvFeimageSVGAttributes, AnySVGContent> { }
interface SkruvFemergeSVGElement extends SVGVnode<'feMerge', SVGFEMergeElement, SkruvFemergeSVGAttributes, AnySVGContent> { }
interface SkruvFemergenodeSVGElement extends SVGVnode<'feMergeNode', SVGFEMergeNodeElement, SkruvFemergenodeSVGAttributes, AnySVGContent> { }
interface SkruvFemorphologySVGElement extends SVGVnode<'feMorphology', SVGFEMorphologyElement, SkruvFemorphologySVGAttributes, AnySVGContent> { }
interface SkruvFeoffsetSVGElement extends SVGVnode<'feOffset', SVGFEOffsetElement, SkruvFeoffsetSVGAttributes, AnySVGContent> { }
interface SkruvFepointlightSVGElement extends SVGVnode<'fePointLight', SVGFEPointLightElement, SkruvFepointlightSVGAttributes, AnySVGContent> { }
interface SkruvFespecularlightingSVGElement extends SVGVnode<'feSpecularLighting', SVGFESpecularLightingElement, SkruvFespecularlightingSVGAttributes, AnySVGContent> { }
interface SkruvFespotlightSVGElement extends SVGVnode<'feSpotLight', SVGFESpotLightElement, SkruvFespotlightSVGAttributes, AnySVGContent> { }
interface SkruvFetileSVGElement extends SVGVnode<'feTile', SVGFETileElement, SkruvFetileSVGAttributes, AnySVGContent> { }
interface SkruvFeturbulenceSVGElement extends SVGVnode<'feTurbulence', SVGFETurbulenceElement, SkruvFeturbulenceSVGAttributes, AnySVGContent> { }
interface SkruvFilterSVGElement extends SVGVnode<'filter', SVGFilterElement, SkruvFilterSVGAttributes, AnySVGContent> { }
interface SkruvForeignobjectSVGElement extends SVGVnode<'foreignObject', SVGForeignObjectElement, SkruvForeignobjectSVGAttributes, AnySVGContent> { }
interface SkruvGSVGElement extends SVGVnode<'g', SVGGElement, SkruvGSVGAttributes, AnySVGContent> { }
interface SkruvHatchSVGElement extends SVGVnode<'hatch', SVGElement, SkruvHatchSVGAttributes, AnySVGContent> { }
interface SkruvHatchpathSVGElement extends SVGVnode<'hatchpath', SVGElement, SkruvHatchpathSVGAttributes, AnySVGContent> { }
interface SkruvImageSVGElement extends SVGVnode<'image', SVGImageElement, SkruvImageSVGAttributes, AnySVGContent> { }
interface SkruvLineSVGElement extends SVGVnode<'line', SVGLineElement, SkruvLineSVGAttributes, AnySVGContent> { }
interface SkruvLineargradientSVGElement extends SVGVnode<'linearGradient', SVGLinearGradientElement, SkruvLineargradientSVGAttributes, AnySVGContent> { }
interface SkruvMarkerSVGElement extends SVGVnode<'marker', SVGMarkerElement, SkruvMarkerSVGAttributes, AnySVGContent> { }
interface SkruvMaskSVGElement extends SVGVnode<'mask', SVGMaskElement, SkruvMaskSVGAttributes, AnySVGContent> { }
interface SkruvMetadataSVGElement extends SVGVnode<'metadata', SVGMetadataElement, SkruvMetadataSVGAttributes, AnySVGContent> { }
interface SkruvMpathSVGElement extends SVGVnode<'mpath', SVGMPathElement, SkruvMpathSVGAttributes, AnySVGContent> { }
interface SkruvPathSVGElement extends SVGVnode<'path', SVGPathElement, SkruvPathSVGAttributes, AnySVGContent> { }
interface SkruvPatternSVGElement extends SVGVnode<'pattern', SVGPatternElement, SkruvPatternSVGAttributes, AnySVGContent> { }
interface SkruvPolygonSVGElement extends SVGVnode<'polygon', SVGPolygonElement, SkruvPolygonSVGAttributes, AnySVGContent> { }
interface SkruvPolylineSVGElement extends SVGVnode<'polyline', SVGPolylineElement, SkruvPolylineSVGAttributes, AnySVGContent> { }
interface SkruvRadialgradientSVGElement extends SVGVnode<'radialGradient', SVGRadialGradientElement, SkruvRadialgradientSVGAttributes, AnySVGContent> { }
interface SkruvRectSVGElement extends SVGVnode<'rect', SVGRectElement, SkruvRectSVGAttributes, AnySVGContent> { }
interface SkruvScriptSVGElement extends SVGVnode<'script', SVGScriptElement, SkruvScriptSVGAttributes, AnySVGContent> { }
interface SkruvSetSVGElement extends SVGVnode<'set', SVGSetElement, SkruvSetSVGAttributes, AnySVGContent> { }
interface SkruvStopSVGElement extends SVGVnode<'stop', SVGStopElement, SkruvStopSVGAttributes, AnySVGContent> { }
interface SkruvStyleSVGElement extends SVGVnode<'style', SVGStyleElement, SkruvStyleSVGAttributes, AnySVGContent> { }
interface SkruvSvgSVGElement extends SVGVnode<'svg', SVGSVGElement, SkruvSvgSVGAttributes, AnySVGContent> { }
interface SkruvSwitchSVGElement extends SVGVnode<'switch', SVGSwitchElement, SkruvSwitchSVGAttributes, AnySVGContent> { }
interface SkruvSymbolSVGElement extends SVGVnode<'symbol', SVGSymbolElement, SkruvSymbolSVGAttributes, AnySVGContent> { }
interface SkruvTextSVGElement extends SVGVnode<'text', SVGTextElement, SkruvTextSVGAttributes, AnySVGContent> { }
interface SkruvTextpathSVGElement extends SVGVnode<'textPath', SVGTextPathElement, SkruvTextpathSVGAttributes, AnySVGContent> { }
interface SkruvTitleSVGElement extends SVGVnode<'title', SVGTitleElement, SkruvTitleSVGAttributes, AnySVGContent> { }
interface SkruvTspanSVGElement extends SVGVnode<'tspan', SVGTSpanElement, SkruvTspanSVGAttributes, AnySVGContent> { }
interface SkruvUseSVGElement extends SVGVnode<'use', SVGUseElement, SkruvUseSVGAttributes, AnySVGContent> { }
interface SkruvViewSVGElement extends SVGVnode<'view', SVGViewElement, SkruvViewSVGAttributes, AnySVGContent> { }

type AnySVGElement = SkruvASVGElement | SkruvAnimateSVGElement | SkruvAnimatemotionSVGElement | SkruvAnimatetransformSVGElement | SkruvCircleSVGElement | SkruvClippathSVGElement | SkruvDefsSVGElement | SkruvDescSVGElement | SkruvEllipseSVGElement | SkruvFeblendSVGElement | SkruvFecolormatrixSVGElement | SkruvFecomponenttransferSVGElement | SkruvFecompositeSVGElement | SkruvFeconvolvematrixSVGElement | SkruvFediffuselightingSVGElement | SkruvFedisplacementmapSVGElement | SkruvFedistantlightSVGElement | SkruvFedropshadowSVGElement | SkruvFefloodSVGElement | SkruvFefuncaSVGElement | SkruvFefuncbSVGElement | SkruvFefuncgSVGElement | SkruvFefuncrSVGElement | SkruvFegaussianblurSVGElement | SkruvFeimageSVGElement | SkruvFemergeSVGElement | SkruvFemergenodeSVGElement | SkruvFemorphologySVGElement | SkruvFeoffsetSVGElement | SkruvFepointlightSVGElement | SkruvFespecularlightingSVGElement | SkruvFespotlightSVGElement | SkruvFetileSVGElement | SkruvFeturbulenceSVGElement | SkruvFilterSVGElement | SkruvForeignobjectSVGElement | SkruvGSVGElement | SkruvHatchSVGElement | SkruvHatchpathSVGElement | SkruvImageSVGElement | SkruvLineSVGElement | SkruvLineargradientSVGElement | SkruvMarkerSVGElement | SkruvMaskSVGElement | SkruvMetadataSVGElement | SkruvMpathSVGElement | SkruvPathSVGElement | SkruvPatternSVGElement | SkruvPolygonSVGElement | SkruvPolylineSVGElement | SkruvRadialgradientSVGElement | SkruvRectSVGElement | SkruvScriptSVGElement | SkruvSetSVGElement | SkruvStopSVGElement | SkruvStyleSVGElement | SkruvSvgSVGElement | SkruvSwitchSVGElement | SkruvSymbolSVGElement | SkruvTextSVGElement | SkruvTextpathSVGElement | SkruvTitleSVGElement | SkruvTspanSVGElement | SkruvUseSVGElement | SkruvViewSVGElement
type AnySVGContent = AnySVGElement | string | number | boolean | AnySVGContent[] | AsyncGenerator<AnySVGContent> | Promise<AnySVGContent> | (() => AnySVGContent)


interface SkruvMathMathMLElement extends MathMLVnode<'math', MathMLElement, SkruvMathMathMLAttributes, AnyMathMLContent> { }
interface SkruvMactionMathMLElement extends MathMLVnode<'maction', MathMLElement, SkruvMactionMathMLAttributes, AnyMathMLContent> { }
interface SkruvAnnotationMathMLElement extends MathMLVnode<'annotation', MathMLElement, SkruvAnnotationMathMLAttributes, AnyMathMLContent> { }
interface SkruvAnnotationXmlMathMLElement extends MathMLVnode<'annotation-xml', MathMLElement, SkruvAnnotationXmlMathMLAttributes, AnyMathMLContent> { }
interface SkruvMencloseMathMLElement extends MathMLVnode<'menclose', MathMLElement, SkruvMencloseMathMLAttributes, AnyMathMLContent> { }
interface SkruvMerrorMathMLElement extends MathMLVnode<'merror', MathMLElement, SkruvMerrorMathMLAttributes, AnyMathMLContent> { }
interface SkruvMfencedMathMLElement extends MathMLVnode<'mfenced', MathMLElement, SkruvMfencedMathMLAttributes, AnyMathMLContent> { }
interface SkruvMfracMathMLElement extends MathMLVnode<'mfrac', MathMLElement, SkruvMfracMathMLAttributes, AnyMathMLContent> { }
interface SkruvMiMathMLElement extends MathMLVnode<'mi', MathMLElement, SkruvMiMathMLAttributes, AnyMathMLContent> { }
interface SkruvMmultiscriptsMathMLElement extends MathMLVnode<'mmultiscripts', MathMLElement, SkruvMmultiscriptsMathMLAttributes, AnyMathMLContent> { }
interface SkruvMnMathMLElement extends MathMLVnode<'mn', MathMLElement, SkruvMnMathMLAttributes, AnyMathMLContent> { }
interface SkruvMoMathMLElement extends MathMLVnode<'mo', MathMLElement, SkruvMoMathMLAttributes, AnyMathMLContent> { }
interface SkruvMoverMathMLElement extends MathMLVnode<'mover', MathMLElement, SkruvMoverMathMLAttributes, AnyMathMLContent> { }
interface SkruvMpaddedMathMLElement extends MathMLVnode<'mpadded', MathMLElement, SkruvMpaddedMathMLAttributes, AnyMathMLContent> { }
interface SkruvMphantomMathMLElement extends MathMLVnode<'mphantom', MathMLElement, SkruvMphantomMathMLAttributes, AnyMathMLContent> { }
interface SkruvMprescriptsMathMLElement extends MathMLVnode<'mprescripts', MathMLElement, SkruvMprescriptsMathMLAttributes, AnyMathMLContent> { }
interface SkruvMrootMathMLElement extends MathMLVnode<'mroot', MathMLElement, SkruvMrootMathMLAttributes, AnyMathMLContent> { }
interface SkruvMrowMathMLElement extends MathMLVnode<'mrow', MathMLElement, SkruvMrowMathMLAttributes, AnyMathMLContent> { }
interface SkruvMsMathMLElement extends MathMLVnode<'ms', MathMLElement, SkruvMsMathMLAttributes, AnyMathMLContent> { }
interface SkruvSemanticsMathMLElement extends MathMLVnode<'semantics', MathMLElement, SkruvSemanticsMathMLAttributes, AnyMathMLContent> { }
interface SkruvMspaceMathMLElement extends MathMLVnode<'mspace', MathMLElement, SkruvMspaceMathMLAttributes, AnyMathMLContent> { }
interface SkruvMsqrtMathMLElement extends MathMLVnode<'msqrt', MathMLElement, SkruvMsqrtMathMLAttributes, AnyMathMLContent> { }
interface SkruvMstyleMathMLElement extends MathMLVnode<'mstyle', MathMLElement, SkruvMstyleMathMLAttributes, AnyMathMLContent> { }
interface SkruvMsubMathMLElement extends MathMLVnode<'msub', MathMLElement, SkruvMsubMathMLAttributes, AnyMathMLContent> { }
interface SkruvMsupMathMLElement extends MathMLVnode<'msup', MathMLElement, SkruvMsupMathMLAttributes, AnyMathMLContent> { }
interface SkruvMsubsupMathMLElement extends MathMLVnode<'msubsup', MathMLElement, SkruvMsubsupMathMLAttributes, AnyMathMLContent> { }
interface SkruvMtableMathMLElement extends MathMLVnode<'mtable', MathMLElement, SkruvMtableMathMLAttributes, AnyMathMLContent> { }
interface SkruvMtdMathMLElement extends MathMLVnode<'mtd', MathMLElement, SkruvMtdMathMLAttributes, AnyMathMLContent> { }
interface SkruvMtextMathMLElement extends MathMLVnode<'mtext', MathMLElement, SkruvMtextMathMLAttributes, AnyMathMLContent> { }
interface SkruvMtrMathMLElement extends MathMLVnode<'mtr', MathMLElement, SkruvMtrMathMLAttributes, AnyMathMLContent> { }
interface SkruvMunderMathMLElement extends MathMLVnode<'munder', MathMLElement, SkruvMunderMathMLAttributes, AnyMathMLContent> { }
interface SkruvMunderoverMathMLElement extends MathMLVnode<'munderover', MathMLElement, SkruvMunderoverMathMLAttributes, AnyMathMLContent> { }

type AnyMathMLElement = SkruvMathMathMLElement | SkruvMactionMathMLElement | SkruvAnnotationMathMLElement | SkruvAnnotationXmlMathMLElement | SkruvMencloseMathMLElement | SkruvMerrorMathMLElement | SkruvMfencedMathMLElement | SkruvMfracMathMLElement | SkruvMiMathMLElement | SkruvMmultiscriptsMathMLElement | SkruvMnMathMLElement | SkruvMoMathMLElement | SkruvMoverMathMLElement | SkruvMpaddedMathMLElement | SkruvMphantomMathMLElement | SkruvMprescriptsMathMLElement | SkruvMrootMathMLElement | SkruvMrowMathMLElement | SkruvMsMathMLElement | SkruvSemanticsMathMLElement | SkruvMspaceMathMLElement | SkruvMsqrtMathMLElement | SkruvMstyleMathMLElement | SkruvMsubMathMLElement | SkruvMsupMathMLElement | SkruvMsubsupMathMLElement | SkruvMtableMathMLElement | SkruvMtdMathMLElement | SkruvMtextMathMLElement | SkruvMtrMathMLElement | SkruvMunderMathMLElement | SkruvMunderoverMathMLElement
type AnyMathMLContent = AnyMathMLElement | string | number | boolean | AnyMathMLContent[] | AsyncGenerator<AnyMathMLContent> | Promise<AnyMathMLContent> | (() => AnyMathMLContent)

type AnyElement = AnyHTMLElement | AnySVGElement | AnyMathMLElement
type AnyContent = AnyHTMLContent | AnySVGContent | AnyMathMLContent


interface SkruvHtmlHTMLAttributes { }
interface SkruvHeadHTMLAttributes { }
interface SkruvTitleHTMLAttributes { }
interface SkruvBaseHTMLAttributes {
  'href'?: string | undefined
  'target'?: string | undefined
}
interface SkruvLinkHTMLAttributes {
  'href'?: string | undefined
  'crossorigin'?: string | undefined
  'rel'?: string | undefined
  'media'?: string | undefined
  'integrity'?: string | undefined
  'hreflang'?: string | undefined
  'type'?: string | undefined
  'referrerpolicy'?: string | undefined
  'sizes'?: string | undefined
  'imagesrcset'?: string | undefined
  'imagesizes'?: string | undefined
  'as'?: string | undefined
  'blocking'?: 'render' | undefined
  'color'?: string | undefined
  'disabled'?: boolean | undefined
  'fetchpriority'?: string | undefined
  'title'?: string | undefined
}
interface SkruvMetaHTMLAttributes {
  'name'?: string | undefined
  'http-equiv'?: string | undefined
  'content'?: string | undefined
  'charset'?: string | undefined
  'media'?: string | undefined
}
interface SkruvStyleHTMLAttributes {
  'media'?: string | undefined
  'blocking'?: 'render' | undefined
  'title'?: string | undefined
}
interface SkruvBodyHTMLAttributes { }
interface SkruvArticleHTMLAttributes { }
interface SkruvSectionHTMLAttributes { }
interface SkruvNavHTMLAttributes { }
interface SkruvAsideHTMLAttributes { }
interface SkruvH1HTMLAttributes { }
interface SkruvH2HTMLAttributes { }
interface SkruvH3HTMLAttributes { }
interface SkruvH4HTMLAttributes { }
interface SkruvH5HTMLAttributes { }
interface SkruvH6HTMLAttributes { }
interface SkruvHgroupHTMLAttributes { }
interface SkruvHeaderHTMLAttributes { }
interface SkruvFooterHTMLAttributes { }
interface SkruvAddressHTMLAttributes { }
interface SkruvPHTMLAttributes { }
interface SkruvHrHTMLAttributes { }
interface SkruvPreHTMLAttributes { }
interface SkruvBlockquoteHTMLAttributes {
  'cite'?: string | undefined
}
interface SkruvOlHTMLAttributes {
  'reversed'?: boolean | undefined
  'start'?: number | undefined
  'type'?: string | undefined
}
interface SkruvUlHTMLAttributes { }
interface SkruvMenuHTMLAttributes { }
interface SkruvLiHTMLAttributes { }
interface SkruvDlHTMLAttributes { }
interface SkruvDtHTMLAttributes { }
interface SkruvDdHTMLAttributes { }
interface SkruvFigureHTMLAttributes { }
interface SkruvFigcaptionHTMLAttributes { }
interface SkruvMainHTMLAttributes { }
interface SkruvSearchHTMLAttributes { }
interface SkruvDivHTMLAttributes { }
interface SkruvAHTMLAttributes {
  'href'?: string | undefined
  'target'?: string | undefined
  'download'?: string | undefined
  'ping'?: string | undefined
  'rel'?: string | undefined
  'hreflang'?: string | undefined
  'type'?: string | undefined
  'referrerpolicy'?: string | undefined
}
interface SkruvEmHTMLAttributes { }
interface SkruvStrongHTMLAttributes { }
interface SkruvSmallHTMLAttributes { }
interface SkruvSHTMLAttributes { }
interface SkruvCiteHTMLAttributes { }
interface SkruvQHTMLAttributes {
  'cite'?: string | undefined
}
interface SkruvDfnHTMLAttributes {
  'title'?: string | undefined
}
interface SkruvAbbrHTMLAttributes {
  'title'?: string | undefined
}
interface SkruvRubyHTMLAttributes { }
interface SkruvRtHTMLAttributes { }
interface SkruvRpHTMLAttributes { }
interface SkruvDataHTMLAttributes {
  'value'?: number | string | undefined
}
interface SkruvTimeHTMLAttributes {
  'datetime'?: string | undefined
}
interface SkruvCodeHTMLAttributes { }
interface SkruvVarHTMLAttributes { }
interface SkruvSampHTMLAttributes { }
interface SkruvKbdHTMLAttributes { }
interface SkruvSubHTMLAttributes { }
interface SkruvSupHTMLAttributes { }
interface SkruvIHTMLAttributes { }
interface SkruvBHTMLAttributes { }
interface SkruvUHTMLAttributes { }
interface SkruvMarkHTMLAttributes { }
interface SkruvBdiHTMLAttributes {
  'dir'?: string | undefined
}
interface SkruvBdoHTMLAttributes {
  'dir'?: string | undefined
}
interface SkruvSpanHTMLAttributes { }
interface SkruvBrHTMLAttributes { }
interface SkruvWbrHTMLAttributes { }
interface SkruvInsHTMLAttributes {
  'cite'?: string | undefined
  'datetime'?: string | undefined
}
interface SkruvDelHTMLAttributes {
  'cite'?: string | undefined
  'datetime'?: string | undefined
}
interface SkruvPictureHTMLAttributes { }
interface SkruvSourceHTMLAttributes {
  'type'?: string | undefined
  'media'?: string | undefined
  'src'?: string | undefined
  'srcset'?: string | undefined
  'sizes'?: string | undefined
  'width'?: number | string | undefined
  'height'?: string | undefined
}
interface SkruvImgHTMLAttributes {
  'alt'?: string | undefined
  'src'?: string | undefined
  'srcset'?: string | undefined
  'sizes'?: string | undefined
  'crossorigin'?: string | undefined
  'usemap'?: string | undefined
  'ismap'?: boolean | undefined
  'width'?: number | string | undefined
  'height'?: string | undefined
  'referrerpolicy'?: string | undefined
  'decoding'?: string | undefined
  'loading'?: string | undefined
  'fetchpriority'?: string | undefined
}
interface SkruvIframeHTMLAttributes {
  'src'?: string | undefined
  'srcdoc'?: string | undefined
  'name'?: string | undefined
  'sandbox'?: 'allow-downloads' | 'allow-forms' | 'allow-modals' | 'allow-orientation-lock' | 'allow-pointer-lock' | 'allow-popups' | 'allow-popups-to-escape-sandbox' | 'allow-presentation' | 'allow-same-origin' | 'allow-scripts' | 'allow-top-navigation' | 'allow-top-navigation-by-user-activation' | 'allow-top-navigation-to-custom-protocols' | undefined
  'allow'?: string | undefined
  'allowfullscreen'?: boolean | undefined
  'width'?: number | string | undefined
  'height'?: string | undefined
  'referrerpolicy'?: string | undefined
  'loading'?: string | undefined
}
interface SkruvEmbedHTMLAttributes {
  'src'?: string | undefined
  'type'?: string | undefined
  'width'?: number | string | undefined
  'height'?: string | undefined
}
interface SkruvObjectHTMLAttributes {
  'data'?: string | undefined
  'type'?: string | undefined
  'name'?: string | undefined
  'form'?: string | undefined
  'width'?: number | string | undefined
  'height'?: string | undefined
}
interface SkruvVideoHTMLAttributes {
  'src'?: string | undefined
  'crossorigin'?: string | undefined
  'poster'?: string | undefined
  'preload'?: string | undefined
  'autoplay'?: boolean | undefined
  'playsinline'?: boolean | undefined
  'loop'?: number | boolean | undefined
  'muted'?: boolean | undefined
  'controls'?: boolean | undefined
  'width'?: number | string | undefined
  'height'?: string | undefined
}
interface SkruvAudioHTMLAttributes {
  'src'?: string | undefined
  'crossorigin'?: string | undefined
  'preload'?: string | undefined
  'autoplay'?: boolean | undefined
  'loop'?: number | boolean | undefined
  'muted'?: boolean | undefined
  'controls'?: boolean | undefined
}
interface SkruvTrackHTMLAttributes {
  'kind'?: string | undefined
  'src'?: string | undefined
  'srclang'?: string | undefined
  'label'?: string | undefined
  'default'?: boolean | undefined
}
interface SkruvMapHTMLAttributes {
  'name'?: string | undefined
}
interface SkruvAreaHTMLAttributes {
  'alt'?: string | undefined
  'coords'?: string | undefined
  'shape'?: string | undefined
  'href'?: string | undefined
  'target'?: string | undefined
  'download'?: string | undefined
  'ping'?: string | undefined
  'rel'?: string | undefined
  'referrerpolicy'?: string | undefined
}
interface SkruvTableHTMLAttributes { }
interface SkruvCaptionHTMLAttributes { }
interface SkruvColgroupHTMLAttributes {
  'span'?: number | undefined
}
interface SkruvColHTMLAttributes {
  'span'?: number | undefined
}
interface SkruvTbodyHTMLAttributes { }
interface SkruvTheadHTMLAttributes { }
interface SkruvTfootHTMLAttributes { }
interface SkruvTrHTMLAttributes { }
interface SkruvTdHTMLAttributes {
  'colspan'?: number | undefined
  'rowspan'?: number | undefined
  'headers'?: string | undefined
}
interface SkruvThHTMLAttributes {
  'colspan'?: number | undefined
  'rowspan'?: number | undefined
  'headers'?: string | undefined
  'scope'?: string | undefined
  'abbr'?: string | undefined
}
interface SkruvFormHTMLAttributes {
  'accept-charset'?: string | undefined
  'action'?: string | undefined
  'autocomplete'?: string | undefined
  'enctype'?: string | undefined
  'method'?: string | undefined
  'name'?: string | undefined
  'novalidate'?: boolean | undefined
  'target'?: string | undefined
  'rel'?: string | undefined
}
interface SkruvLabelHTMLAttributes {
  'for'?: string | undefined
}
interface SkruvInputHTMLAttributes {
  'accept'?: string | undefined
  'alt'?: string | undefined
  'autocomplete'?: string | undefined
  'checked'?: boolean | undefined
  'dirname'?: string | undefined
  'disabled'?: boolean | undefined
  'form'?: string | undefined
  'formaction'?: string | undefined
  'formenctype'?: string | undefined
  'formmethod'?: string | undefined
  'formnovalidate'?: boolean | undefined
  'formtarget'?: string | undefined
  'height'?: string | undefined
  'list'?: string | undefined
  'max'?: number | string | undefined
  'maxlength'?: number | undefined
  'min'?: number | string | undefined
  'minlength'?: number | undefined
  'multiple'?: boolean | undefined
  'name'?: string | undefined
  'pattern'?: string | undefined
  'placeholder'?: string | undefined
  'popovertarget'?: string | undefined
  'popovertargetaction'?: 'toggle' | 'show' | 'hide' | undefined
  'readonly'?: boolean | undefined
  'required'?: boolean | undefined
  'size'?: string | undefined
  'src'?: string | undefined
  'step'?: string | undefined
  'type'?: string | undefined
  'value'?: number | string | undefined
  'width'?: number | string | undefined
  'title'?: string | undefined
}
interface SkruvButtonHTMLAttributes {
  'disabled'?: boolean | undefined
  'form'?: string | undefined
  'formaction'?: string | undefined
  'formenctype'?: string | undefined
  'formmethod'?: string | undefined
  'formnovalidate'?: boolean | undefined
  'formtarget'?: string | undefined
  'name'?: string | undefined
  'popovertarget'?: string | undefined
  'popovertargetaction'?: 'toggle' | 'show' | 'hide' | undefined
  'type'?: string | undefined
  'value'?: number | string | undefined
}
interface SkruvSelectHTMLAttributes {
  'autocomplete'?: string | undefined
  'disabled'?: boolean | undefined
  'form'?: string | undefined
  'multiple'?: boolean | undefined
  'name'?: string | undefined
  'required'?: boolean | undefined
  'size'?: string | undefined
}
interface SkruvDatalistHTMLAttributes { }
interface SkruvOptgroupHTMLAttributes {
  'disabled'?: boolean | undefined
  'label'?: string | undefined
}
interface SkruvOptionHTMLAttributes {
  'disabled'?: boolean | undefined
  'label'?: string | undefined
  'selected'?: boolean | undefined
  'value'?: number | string | undefined
}
interface SkruvTextareaHTMLAttributes {
  'autocomplete'?: string | undefined
  'cols'?: string | undefined
  'dirname'?: string | undefined
  'disabled'?: boolean | undefined
  'form'?: string | undefined
  'maxlength'?: number | undefined
  'minlength'?: number | undefined
  'name'?: string | undefined
  'placeholder'?: string | undefined
  'readonly'?: boolean | undefined
  'required'?: boolean | undefined
  'rows'?: string | undefined
  'wrap'?: string | undefined
}
interface SkruvOutputHTMLAttributes {
  'for'?: string | undefined
  'form'?: string | undefined
  'name'?: string | undefined
}
interface SkruvProgressHTMLAttributes {
  'value'?: number | string | undefined
  'max'?: number | string | undefined
}
interface SkruvMeterHTMLAttributes {
  'value'?: number | string | undefined
  'min'?: number | string | undefined
  'max'?: number | string | undefined
  'low'?: number | undefined
  'high'?: number | undefined
  'optimum'?: number | undefined
}
interface SkruvFieldsetHTMLAttributes {
  'disabled'?: boolean | undefined
  'form'?: string | undefined
  'name'?: string | undefined
}
interface SkruvLegendHTMLAttributes { }
interface SkruvDetailsHTMLAttributes {
  'open'?: boolean | undefined
}
interface SkruvSummaryHTMLAttributes { }
interface SkruvDialogHTMLAttributes {
  'open'?: boolean | undefined
}
interface SkruvScriptHTMLAttributes {
  'src'?: string | undefined
  'type'?: string | undefined
  'nomodule'?: boolean | undefined
  'async'?: boolean | undefined
  'defer'?: boolean | undefined
  'crossorigin'?: string | undefined
  'integrity'?: string | undefined
  'referrerpolicy'?: string | undefined
  'blocking'?: 'render' | undefined
  'fetchpriority'?: string | undefined
}
interface SkruvNoscriptHTMLAttributes { }
interface SkruvTemplateHTMLAttributes { }
interface SkruvSlotHTMLAttributes {
  'name'?: string | undefined
}
interface SkruvCanvasHTMLAttributes {
  'width'?: number | string | undefined
  'height'?: string | undefined
}


interface SkruvASVGAttributes {
}
interface SkruvAnimateSVGAttributes {
}
interface SkruvAnimatemotionSVGAttributes {
}
interface SkruvAnimatetransformSVGAttributes {
}
interface SkruvCircleSVGAttributes {
}
interface SkruvClippathSVGAttributes {
}
interface SkruvDefsSVGAttributes {
}
interface SkruvDescSVGAttributes {
}
interface SkruvEllipseSVGAttributes {
}
interface SkruvFeblendSVGAttributes {
}
interface SkruvFecolormatrixSVGAttributes {
}
interface SkruvFecomponenttransferSVGAttributes {
}
interface SkruvFecompositeSVGAttributes {
}
interface SkruvFeconvolvematrixSVGAttributes {
}
interface SkruvFediffuselightingSVGAttributes {
}
interface SkruvFedisplacementmapSVGAttributes {
}
interface SkruvFedistantlightSVGAttributes {
}
interface SkruvFedropshadowSVGAttributes {
}
interface SkruvFefloodSVGAttributes {
}
interface SkruvFefuncaSVGAttributes {
}
interface SkruvFefuncbSVGAttributes {
}
interface SkruvFefuncgSVGAttributes {
}
interface SkruvFefuncrSVGAttributes {
}
interface SkruvFegaussianblurSVGAttributes {
}
interface SkruvFeimageSVGAttributes {
}
interface SkruvFemergeSVGAttributes {
}
interface SkruvFemergenodeSVGAttributes {
}
interface SkruvFemorphologySVGAttributes {
}
interface SkruvFeoffsetSVGAttributes {
}
interface SkruvFepointlightSVGAttributes {
}
interface SkruvFespecularlightingSVGAttributes {
}
interface SkruvFespotlightSVGAttributes {
}
interface SkruvFetileSVGAttributes {
}
interface SkruvFeturbulenceSVGAttributes {
}
interface SkruvFilterSVGAttributes {
}
interface SkruvForeignobjectSVGAttributes {
}
interface SkruvGSVGAttributes {
}
interface SkruvHatchSVGAttributes {
}
interface SkruvHatchpathSVGAttributes {
}
interface SkruvImageSVGAttributes {
}
interface SkruvLineSVGAttributes {
}
interface SkruvLineargradientSVGAttributes {
}
interface SkruvMarkerSVGAttributes {
}
interface SkruvMaskSVGAttributes {
}
interface SkruvMetadataSVGAttributes {
}
interface SkruvMpathSVGAttributes {
}
interface SkruvPathSVGAttributes {
}
interface SkruvPatternSVGAttributes {
}
interface SkruvPolygonSVGAttributes {
}
interface SkruvPolylineSVGAttributes {
}
interface SkruvRadialgradientSVGAttributes {
}
interface SkruvRectSVGAttributes {
}
interface SkruvScriptSVGAttributes {
}
interface SkruvSetSVGAttributes {
}
interface SkruvStopSVGAttributes {
}
interface SkruvStyleSVGAttributes {
}
interface SkruvSvgSVGAttributes {
}
interface SkruvSwitchSVGAttributes {
}
interface SkruvSymbolSVGAttributes {
}
interface SkruvTextSVGAttributes {
}
interface SkruvTextpathSVGAttributes {
}
interface SkruvTitleSVGAttributes {
}
interface SkruvTspanSVGAttributes {
}
interface SkruvUseSVGAttributes {
}
interface SkruvViewSVGAttributes {
}


interface SkruvMathMathMLAttributes {
  'display'?: 'block' | 'inline' | undefined

}
interface SkruvMactionMathMLAttributes {
  'actiontype'?: 'statusline' | 'toggle' | undefined
  'selection'?: string | undefined

}
interface SkruvAnnotationMathMLAttributes {
  'encoding'?: string | undefined
  'src'?: string | undefined

}
interface SkruvAnnotationXmlMathMLAttributes {
  'encoding'?: string | undefined
  'src'?: string | undefined

}
interface SkruvMencloseMathMLAttributes {
  'notation'?: 'longdiv' | 'actuarial' | 'box' | 'roundedbox' | 'circle' | 'left' | 'right' | 'top' | 'bottom' | 'updiagonalstrike' | 'downdiagonalstrike' | 'verticalstrike' | 'horizontalstrike' | 'madruwb' | 'updiagonalarrow' | 'phasorangle' | undefined

}
interface SkruvMerrorMathMLAttributes {
}
interface SkruvMfencedMathMLAttributes {
  'close'?: string | undefined
  'open'?: string | undefined
  'separators'?: string | undefined

}
interface SkruvMfracMathMLAttributes {
  'denomalign'?: 'left' | 'center' | 'right' | undefined
  'linethickness'?: string | undefined
  'numalign'?: 'left' | 'center' | 'right' | undefined

}
interface SkruvMiMathMLAttributes {
}
interface SkruvMmultiscriptsMathMLAttributes {
  'subscriptshift'?: string | undefined
  'superscriptshift'?: string | undefined

}
interface SkruvMnMathMLAttributes {
}
interface SkruvMoMathMLAttributes {
  'accent'?: boolean | undefined
  'fence'?: boolean | undefined
  'largeop'?: boolean | undefined
  'lspace'?: string | undefined
  'maxsize'?: string | undefined
  'minsize'?: string | undefined
  'movablelimits'?: boolean | undefined
  'rspace'?: string | undefined
  'separator'?: boolean | undefined
  'stretchy'?: boolean | undefined
  'symmetric'?: boolean | undefined

}
interface SkruvMoverMathMLAttributes {
  'accent'?: boolean | undefined

}
interface SkruvMpaddedMathMLAttributes {
  'depth'?: string | undefined
  'height'?: string | undefined
  'lspace'?: string | undefined
  'voffset'?: string | undefined
  'width'?: string | undefined

}
interface SkruvMphantomMathMLAttributes {
}
interface SkruvMprescriptsMathMLAttributes {
}
interface SkruvMrootMathMLAttributes {
}
interface SkruvMrowMathMLAttributes {
}
interface SkruvMsMathMLAttributes {
  'lquote'?: string | undefined
  'rquote'?: string | undefined

}
interface SkruvSemanticsMathMLAttributes {
  'encoding'?: string | undefined
  'src'?: string | undefined

}
interface SkruvMspaceMathMLAttributes {
  'depth'?: string | undefined
  'height'?: string | undefined
  'width'?: string | undefined

}
interface SkruvMsqrtMathMLAttributes {
}
interface SkruvMstyleMathMLAttributes {
  'background'?: string | undefined
  'color'?: string | undefined
  'fontsize'?: string | undefined
  'fontstyle'?: string | undefined
  'fontweight'?: string | undefined
  'scriptminsize'?: string | undefined
  'scriptsizemultiplier'?: string | undefined

}
interface SkruvMsubMathMLAttributes {
  'subscriptshift'?: string | undefined

}
interface SkruvMsupMathMLAttributes {
  'superscriptshift'?: string | undefined

}
interface SkruvMsubsupMathMLAttributes {
  'subscriptshift'?: string | undefined
  'superscriptshift'?: string | undefined

}
interface SkruvMtableMathMLAttributes {
  'align'?: 'axis' | 'baseline' | 'bottom' | 'center' | 'top' | undefined
  'columnalign'?: 'left' | 'center' | 'right' | undefined
  'columnlines'?: string | undefined
  'frame'?: 'none' | 'solid' | 'dashed' | undefined
  'framespacing'?: string | undefined
  'rowalign'?: 'axis' | 'baseline' | 'bottom' | 'center' | 'top' | undefined
  'rowlines'?: string | undefined
  'rowspacing'?: string | undefined
  'width'?: string | undefined

}
interface SkruvMtdMathMLAttributes {
  'columnspan'?: number | undefined
  'rowspan'?: number | undefined
  'columnalign'?: 'left' | 'center' | 'right' | undefined
  'rowalign'?: 'axis' | 'baseline' | 'bottom' | 'center' | 'top' | undefined

}
interface SkruvMtextMathMLAttributes {
}
interface SkruvMtrMathMLAttributes {
  'columnalign'?: 'left' | 'center' | 'right' | undefined
  'rowalign'?: 'axis' | 'baseline' | 'bottom' | 'center' | 'top' | undefined

}
interface SkruvMunderMathMLAttributes {
  'accentunder'?: boolean | undefined

}
interface SkruvMunderoverMathMLAttributes {
  'accent'?: boolean | undefined
  'accentunder'?: boolean | undefined

}

export type ElementMap = {
  'html': (...c: SkruvHtmlHTMLElement['c']) => SkruvHtmlHTMLElement
  'head': (...c: SkruvHeadHTMLElement['c']) => SkruvHeadHTMLElement
  'title': (...c: SkruvTitleHTMLElement['c']) => SkruvTitleHTMLElement
  'base': (...c: SkruvBaseHTMLElement['c']) => SkruvBaseHTMLElement
  'link': (...c: SkruvLinkHTMLElement['c']) => SkruvLinkHTMLElement
  'meta': (...c: SkruvMetaHTMLElement['c']) => SkruvMetaHTMLElement
  'style': (...c: SkruvStyleHTMLElement['c']) => SkruvStyleHTMLElement
  'body': (...c: SkruvBodyHTMLElement['c']) => SkruvBodyHTMLElement
  'article': (...c: SkruvArticleHTMLElement['c']) => SkruvArticleHTMLElement
  'section': (...c: SkruvSectionHTMLElement['c']) => SkruvSectionHTMLElement
  'nav': (...c: SkruvNavHTMLElement['c']) => SkruvNavHTMLElement
  'aside': (...c: SkruvAsideHTMLElement['c']) => SkruvAsideHTMLElement
  'h1': (...c: SkruvH1HTMLElement['c']) => SkruvH1HTMLElement
  'h2': (...c: SkruvH2HTMLElement['c']) => SkruvH2HTMLElement
  'h3': (...c: SkruvH3HTMLElement['c']) => SkruvH3HTMLElement
  'h4': (...c: SkruvH4HTMLElement['c']) => SkruvH4HTMLElement
  'h5': (...c: SkruvH5HTMLElement['c']) => SkruvH5HTMLElement
  'h6': (...c: SkruvH6HTMLElement['c']) => SkruvH6HTMLElement
  'hgroup': (...c: SkruvHgroupHTMLElement['c']) => SkruvHgroupHTMLElement
  'header': (...c: SkruvHeaderHTMLElement['c']) => SkruvHeaderHTMLElement
  'footer': (...c: SkruvFooterHTMLElement['c']) => SkruvFooterHTMLElement
  'address': (...c: SkruvAddressHTMLElement['c']) => SkruvAddressHTMLElement
  'p': (...c: SkruvPHTMLElement['c']) => SkruvPHTMLElement
  'hr': (...c: SkruvHrHTMLElement['c']) => SkruvHrHTMLElement
  'pre': (...c: SkruvPreHTMLElement['c']) => SkruvPreHTMLElement
  'blockquote': (...c: SkruvBlockquoteHTMLElement['c']) => SkruvBlockquoteHTMLElement
  'ol': (...c: SkruvOlHTMLElement['c']) => SkruvOlHTMLElement
  'ul': (...c: SkruvUlHTMLElement['c']) => SkruvUlHTMLElement
  'menu': (...c: SkruvMenuHTMLElement['c']) => SkruvMenuHTMLElement
  'li': (...c: SkruvLiHTMLElement['c']) => SkruvLiHTMLElement
  'dl': (...c: SkruvDlHTMLElement['c']) => SkruvDlHTMLElement
  'dt': (...c: SkruvDtHTMLElement['c']) => SkruvDtHTMLElement
  'dd': (...c: SkruvDdHTMLElement['c']) => SkruvDdHTMLElement
  'figure': (...c: SkruvFigureHTMLElement['c']) => SkruvFigureHTMLElement
  'figcaption': (...c: SkruvFigcaptionHTMLElement['c']) => SkruvFigcaptionHTMLElement
  'main': (...c: SkruvMainHTMLElement['c']) => SkruvMainHTMLElement
  'search': (...c: SkruvSearchHTMLElement['c']) => SkruvSearchHTMLElement
  'div': (...c: SkruvDivHTMLElement['c']) => SkruvDivHTMLElement
  'a': (...c: SkruvAHTMLElement['c']) => SkruvAHTMLElement
  'em': (...c: SkruvEmHTMLElement['c']) => SkruvEmHTMLElement
  'strong': (...c: SkruvStrongHTMLElement['c']) => SkruvStrongHTMLElement
  'small': (...c: SkruvSmallHTMLElement['c']) => SkruvSmallHTMLElement
  's': (...c: SkruvSHTMLElement['c']) => SkruvSHTMLElement
  'cite': (...c: SkruvCiteHTMLElement['c']) => SkruvCiteHTMLElement
  'q': (...c: SkruvQHTMLElement['c']) => SkruvQHTMLElement
  'dfn': (...c: SkruvDfnHTMLElement['c']) => SkruvDfnHTMLElement
  'abbr': (...c: SkruvAbbrHTMLElement['c']) => SkruvAbbrHTMLElement
  'ruby': (...c: SkruvRubyHTMLElement['c']) => SkruvRubyHTMLElement
  'rt': (...c: SkruvRtHTMLElement['c']) => SkruvRtHTMLElement
  'rp': (...c: SkruvRpHTMLElement['c']) => SkruvRpHTMLElement
  'data': (...c: SkruvDataHTMLElement['c']) => SkruvDataHTMLElement
  'time': (...c: SkruvTimeHTMLElement['c']) => SkruvTimeHTMLElement
  'code': (...c: SkruvCodeHTMLElement['c']) => SkruvCodeHTMLElement
  'var': (...c: SkruvVarHTMLElement['c']) => SkruvVarHTMLElement
  'samp': (...c: SkruvSampHTMLElement['c']) => SkruvSampHTMLElement
  'kbd': (...c: SkruvKbdHTMLElement['c']) => SkruvKbdHTMLElement
  'sub': (...c: SkruvSubHTMLElement['c']) => SkruvSubHTMLElement
  'sup': (...c: SkruvSupHTMLElement['c']) => SkruvSupHTMLElement
  'i': (...c: SkruvIHTMLElement['c']) => SkruvIHTMLElement
  'b': (...c: SkruvBHTMLElement['c']) => SkruvBHTMLElement
  'u': (...c: SkruvUHTMLElement['c']) => SkruvUHTMLElement
  'mark': (...c: SkruvMarkHTMLElement['c']) => SkruvMarkHTMLElement
  'bdi': (...c: SkruvBdiHTMLElement['c']) => SkruvBdiHTMLElement
  'bdo': (...c: SkruvBdoHTMLElement['c']) => SkruvBdoHTMLElement
  'span': (...c: SkruvSpanHTMLElement['c']) => SkruvSpanHTMLElement
  'br': (...c: SkruvBrHTMLElement['c']) => SkruvBrHTMLElement
  'wbr': (...c: SkruvWbrHTMLElement['c']) => SkruvWbrHTMLElement
  'ins': (...c: SkruvInsHTMLElement['c']) => SkruvInsHTMLElement
  'del': (...c: SkruvDelHTMLElement['c']) => SkruvDelHTMLElement
  'picture': (...c: SkruvPictureHTMLElement['c']) => SkruvPictureHTMLElement
  'source': (...c: SkruvSourceHTMLElement['c']) => SkruvSourceHTMLElement
  'img': (...c: SkruvImgHTMLElement['c']) => SkruvImgHTMLElement
  'iframe': (...c: SkruvIframeHTMLElement['c']) => SkruvIframeHTMLElement
  'embed': (...c: SkruvEmbedHTMLElement['c']) => SkruvEmbedHTMLElement
  'object': (...c: SkruvObjectHTMLElement['c']) => SkruvObjectHTMLElement
  'video': (...c: SkruvVideoHTMLElement['c']) => SkruvVideoHTMLElement
  'audio': (...c: SkruvAudioHTMLElement['c']) => SkruvAudioHTMLElement
  'track': (...c: SkruvTrackHTMLElement['c']) => SkruvTrackHTMLElement
  'map': (...c: SkruvMapHTMLElement['c']) => SkruvMapHTMLElement
  'area': (...c: SkruvAreaHTMLElement['c']) => SkruvAreaHTMLElement
  'table': (...c: SkruvTableHTMLElement['c']) => SkruvTableHTMLElement
  'caption': (...c: SkruvCaptionHTMLElement['c']) => SkruvCaptionHTMLElement
  'colgroup': (...c: SkruvColgroupHTMLElement['c']) => SkruvColgroupHTMLElement
  'col': (...c: SkruvColHTMLElement['c']) => SkruvColHTMLElement
  'tbody': (...c: SkruvTbodyHTMLElement['c']) => SkruvTbodyHTMLElement
  'thead': (...c: SkruvTheadHTMLElement['c']) => SkruvTheadHTMLElement
  'tfoot': (...c: SkruvTfootHTMLElement['c']) => SkruvTfootHTMLElement
  'tr': (...c: SkruvTrHTMLElement['c']) => SkruvTrHTMLElement
  'td': (...c: SkruvTdHTMLElement['c']) => SkruvTdHTMLElement
  'th': (...c: SkruvThHTMLElement['c']) => SkruvThHTMLElement
  'form': (...c: SkruvFormHTMLElement['c']) => SkruvFormHTMLElement
  'label': (...c: SkruvLabelHTMLElement['c']) => SkruvLabelHTMLElement
  'input': (...c: SkruvInputHTMLElement['c']) => SkruvInputHTMLElement
  'button': (...c: SkruvButtonHTMLElement['c']) => SkruvButtonHTMLElement
  'select': (...c: SkruvSelectHTMLElement['c']) => SkruvSelectHTMLElement
  'datalist': (...c: SkruvDatalistHTMLElement['c']) => SkruvDatalistHTMLElement
  'optgroup': (...c: SkruvOptgroupHTMLElement['c']) => SkruvOptgroupHTMLElement
  'option': (...c: SkruvOptionHTMLElement['c']) => SkruvOptionHTMLElement
  'textarea': (...c: SkruvTextareaHTMLElement['c']) => SkruvTextareaHTMLElement
  'output': (...c: SkruvOutputHTMLElement['c']) => SkruvOutputHTMLElement
  'progress': (...c: SkruvProgressHTMLElement['c']) => SkruvProgressHTMLElement
  'meter': (...c: SkruvMeterHTMLElement['c']) => SkruvMeterHTMLElement
  'fieldset': (...c: SkruvFieldsetHTMLElement['c']) => SkruvFieldsetHTMLElement
  'legend': (...c: SkruvLegendHTMLElement['c']) => SkruvLegendHTMLElement
  'details': (...c: SkruvDetailsHTMLElement['c']) => SkruvDetailsHTMLElement
  'summary': (...c: SkruvSummaryHTMLElement['c']) => SkruvSummaryHTMLElement
  'dialog': (...c: SkruvDialogHTMLElement['c']) => SkruvDialogHTMLElement
  'script': (...c: SkruvScriptHTMLElement['c']) => SkruvScriptHTMLElement
  'noscript': (...c: SkruvNoscriptHTMLElement['c']) => SkruvNoscriptHTMLElement
  'template': (...c: SkruvTemplateHTMLElement['c']) => SkruvTemplateHTMLElement
  'slot': (...c: SkruvSlotHTMLElement['c']) => SkruvSlotHTMLElement
  'canvas': (...c: SkruvCanvasHTMLElement['c']) => SkruvCanvasHTMLElement
  'a': (...c: SkruvASVGElement['c']) => SkruvASVGElement
  'animate': (...c: SkruvAnimateSVGElement['c']) => SkruvAnimateSVGElement
  'animateMotion': (...c: SkruvAnimatemotionSVGElement['c']) => SkruvAnimatemotionSVGElement
  'animateTransform': (...c: SkruvAnimatetransformSVGElement['c']) => SkruvAnimatetransformSVGElement
  'circle': (...c: SkruvCircleSVGElement['c']) => SkruvCircleSVGElement
  'clipPath': (...c: SkruvClippathSVGElement['c']) => SkruvClippathSVGElement
  'defs': (...c: SkruvDefsSVGElement['c']) => SkruvDefsSVGElement
  'desc': (...c: SkruvDescSVGElement['c']) => SkruvDescSVGElement
  'ellipse': (...c: SkruvEllipseSVGElement['c']) => SkruvEllipseSVGElement
  'feBlend': (...c: SkruvFeblendSVGElement['c']) => SkruvFeblendSVGElement
  'feColorMatrix': (...c: SkruvFecolormatrixSVGElement['c']) => SkruvFecolormatrixSVGElement
  'feComponentTransfer': (...c: SkruvFecomponenttransferSVGElement['c']) => SkruvFecomponenttransferSVGElement
  'feComposite': (...c: SkruvFecompositeSVGElement['c']) => SkruvFecompositeSVGElement
  'feConvolveMatrix': (...c: SkruvFeconvolvematrixSVGElement['c']) => SkruvFeconvolvematrixSVGElement
  'feDiffuseLighting': (...c: SkruvFediffuselightingSVGElement['c']) => SkruvFediffuselightingSVGElement
  'feDisplacementMap': (...c: SkruvFedisplacementmapSVGElement['c']) => SkruvFedisplacementmapSVGElement
  'feDistantLight': (...c: SkruvFedistantlightSVGElement['c']) => SkruvFedistantlightSVGElement
  'feDropShadow': (...c: SkruvFedropshadowSVGElement['c']) => SkruvFedropshadowSVGElement
  'feFlood': (...c: SkruvFefloodSVGElement['c']) => SkruvFefloodSVGElement
  'feFuncA': (...c: SkruvFefuncaSVGElement['c']) => SkruvFefuncaSVGElement
  'feFuncB': (...c: SkruvFefuncbSVGElement['c']) => SkruvFefuncbSVGElement
  'feFuncG': (...c: SkruvFefuncgSVGElement['c']) => SkruvFefuncgSVGElement
  'feFuncR': (...c: SkruvFefuncrSVGElement['c']) => SkruvFefuncrSVGElement
  'feGaussianBlur': (...c: SkruvFegaussianblurSVGElement['c']) => SkruvFegaussianblurSVGElement
  'feImage': (...c: SkruvFeimageSVGElement['c']) => SkruvFeimageSVGElement
  'feMerge': (...c: SkruvFemergeSVGElement['c']) => SkruvFemergeSVGElement
  'feMergeNode': (...c: SkruvFemergenodeSVGElement['c']) => SkruvFemergenodeSVGElement
  'feMorphology': (...c: SkruvFemorphologySVGElement['c']) => SkruvFemorphologySVGElement
  'feOffset': (...c: SkruvFeoffsetSVGElement['c']) => SkruvFeoffsetSVGElement
  'fePointLight': (...c: SkruvFepointlightSVGElement['c']) => SkruvFepointlightSVGElement
  'feSpecularLighting': (...c: SkruvFespecularlightingSVGElement['c']) => SkruvFespecularlightingSVGElement
  'feSpotLight': (...c: SkruvFespotlightSVGElement['c']) => SkruvFespotlightSVGElement
  'feTile': (...c: SkruvFetileSVGElement['c']) => SkruvFetileSVGElement
  'feTurbulence': (...c: SkruvFeturbulenceSVGElement['c']) => SkruvFeturbulenceSVGElement
  'filter': (...c: SkruvFilterSVGElement['c']) => SkruvFilterSVGElement
  'foreignObject': (...c: SkruvForeignobjectSVGElement['c']) => SkruvForeignobjectSVGElement
  'g': (...c: SkruvGSVGElement['c']) => SkruvGSVGElement
  'hatch': (...c: SkruvHatchSVGElement['c']) => SkruvHatchSVGElement
  'hatchpath': (...c: SkruvHatchpathSVGElement['c']) => SkruvHatchpathSVGElement
  'image': (...c: SkruvImageSVGElement['c']) => SkruvImageSVGElement
  'line': (...c: SkruvLineSVGElement['c']) => SkruvLineSVGElement
  'linearGradient': (...c: SkruvLineargradientSVGElement['c']) => SkruvLineargradientSVGElement
  'marker': (...c: SkruvMarkerSVGElement['c']) => SkruvMarkerSVGElement
  'mask': (...c: SkruvMaskSVGElement['c']) => SkruvMaskSVGElement
  'metadata': (...c: SkruvMetadataSVGElement['c']) => SkruvMetadataSVGElement
  'mpath': (...c: SkruvMpathSVGElement['c']) => SkruvMpathSVGElement
  'path': (...c: SkruvPathSVGElement['c']) => SkruvPathSVGElement
  'pattern': (...c: SkruvPatternSVGElement['c']) => SkruvPatternSVGElement
  'polygon': (...c: SkruvPolygonSVGElement['c']) => SkruvPolygonSVGElement
  'polyline': (...c: SkruvPolylineSVGElement['c']) => SkruvPolylineSVGElement
  'radialGradient': (...c: SkruvRadialgradientSVGElement['c']) => SkruvRadialgradientSVGElement
  'rect': (...c: SkruvRectSVGElement['c']) => SkruvRectSVGElement
  'script': (...c: SkruvScriptSVGElement['c']) => SkruvScriptSVGElement
  'set': (...c: SkruvSetSVGElement['c']) => SkruvSetSVGElement
  'stop': (...c: SkruvStopSVGElement['c']) => SkruvStopSVGElement
  'style': (...c: SkruvStyleSVGElement['c']) => SkruvStyleSVGElement
  'svg': (...c: SkruvSvgSVGElement['c']) => SkruvSvgSVGElement
  'switch': (...c: SkruvSwitchSVGElement['c']) => SkruvSwitchSVGElement
  'symbol': (...c: SkruvSymbolSVGElement['c']) => SkruvSymbolSVGElement
  'text': (...c: SkruvTextSVGElement['c']) => SkruvTextSVGElement
  'textPath': (...c: SkruvTextpathSVGElement['c']) => SkruvTextpathSVGElement
  'title': (...c: SkruvTitleSVGElement['c']) => SkruvTitleSVGElement
  'tspan': (...c: SkruvTspanSVGElement['c']) => SkruvTspanSVGElement
  'use': (...c: SkruvUseSVGElement['c']) => SkruvUseSVGElement
  'view': (...c: SkruvViewSVGElement['c']) => SkruvViewSVGElement
  'math': (...c: SkruvMathMathMLElement['c']) => SkruvMathMathMLElement
  'maction': (...c: SkruvMactionMathMLElement['c']) => SkruvMactionMathMLElement
  'annotation': (...c: SkruvAnnotationMathMLElement['c']) => SkruvAnnotationMathMLElement
  'annotation-xml': (...c: SkruvAnnotationXmlMathMLElement['c']) => SkruvAnnotationXmlMathMLElement
  'menclose': (...c: SkruvMencloseMathMLElement['c']) => SkruvMencloseMathMLElement
  'merror': (...c: SkruvMerrorMathMLElement['c']) => SkruvMerrorMathMLElement
  'mfenced': (...c: SkruvMfencedMathMLElement['c']) => SkruvMfencedMathMLElement
  'mfrac': (...c: SkruvMfracMathMLElement['c']) => SkruvMfracMathMLElement
  'mi': (...c: SkruvMiMathMLElement['c']) => SkruvMiMathMLElement
  'mmultiscripts': (...c: SkruvMmultiscriptsMathMLElement['c']) => SkruvMmultiscriptsMathMLElement
  'mn': (...c: SkruvMnMathMLElement['c']) => SkruvMnMathMLElement
  'mo': (...c: SkruvMoMathMLElement['c']) => SkruvMoMathMLElement
  'mover': (...c: SkruvMoverMathMLElement['c']) => SkruvMoverMathMLElement
  'mpadded': (...c: SkruvMpaddedMathMLElement['c']) => SkruvMpaddedMathMLElement
  'mphantom': (...c: SkruvMphantomMathMLElement['c']) => SkruvMphantomMathMLElement
  'mprescripts': (...c: SkruvMprescriptsMathMLElement['c']) => SkruvMprescriptsMathMLElement
  'mroot': (...c: SkruvMrootMathMLElement['c']) => SkruvMrootMathMLElement
  'mrow': (...c: SkruvMrowMathMLElement['c']) => SkruvMrowMathMLElement
  'ms': (...c: SkruvMsMathMLElement['c']) => SkruvMsMathMLElement
  'semantics': (...c: SkruvSemanticsMathMLElement['c']) => SkruvSemanticsMathMLElement
  'mspace': (...c: SkruvMspaceMathMLElement['c']) => SkruvMspaceMathMLElement
  'msqrt': (...c: SkruvMsqrtMathMLElement['c']) => SkruvMsqrtMathMLElement
  'mstyle': (...c: SkruvMstyleMathMLElement['c']) => SkruvMstyleMathMLElement
  'msub': (...c: SkruvMsubMathMLElement['c']) => SkruvMsubMathMLElement
  'msup': (...c: SkruvMsupMathMLElement['c']) => SkruvMsupMathMLElement
  'msubsup': (...c: SkruvMsubsupMathMLElement['c']) => SkruvMsubsupMathMLElement
  'mtable': (...c: SkruvMtableMathMLElement['c']) => SkruvMtableMathMLElement
  'mtd': (...c: SkruvMtdMathMLElement['c']) => SkruvMtdMathMLElement
  'mtext': (...c: SkruvMtextMathMLElement['c']) => SkruvMtextMathMLElement
  'mtr': (...c: SkruvMtrMathMLElement['c']) => SkruvMtrMathMLElement
  'munder': (...c: SkruvMunderMathMLElement['c']) => SkruvMunderMathMLElement
  'munderover': (...c: SkruvMunderoverMathMLElement['c']) => SkruvMunderoverMathMLElement
} & CustomElements
