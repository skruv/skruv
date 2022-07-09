export type Vnode = {
    nodeName: string;
    data?: string | undefined;
    result?: ChildNodes | undefined;
    attributes: VnodeAtrributes;
    childNodes: ChildNodes;
};
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
export const Vnode: Vnode;
export type ChildNodes = Array<(Array<ChildNode> | ChildNode)>;
/**
 * @typedef {Array<(Array<ChildNode>|ChildNode)>} ChildNodes
 */
/** @type {ChildNodes} */
export const ChildNodes: ChildNodes;
export type ChildNode = Vnode | Function | string | boolean | number | SkruvIterableType;
/**
 * @typedef {Vnode|Function|String|Boolean|Number|SkruvIterableType} ChildNode
 */
/** @type {ChildNode} */
export const ChildNode: ChildNode;
export type SkruvIterableType = (AsyncGenerator<Vnode | Function | string | boolean | number | ChildNodes> | AsyncIterable<Vnode | Function | string | boolean | number | ChildNodes>) & SkruvAdditionalIterableProperties;
/**
 * @typedef {Object} SkruvAdditionalIterableProperties
 * @property {ChildNodes|ChildNode} [result]
 * @property {Boolean} [booted]
 *
 * @typedef {(AsyncGenerator<Vnode|Function|String|Boolean|Number|ChildNodes> | AsyncIterable<Vnode|Function|String|Boolean|Number|ChildNodes>) & SkruvAdditionalIterableProperties} SkruvIterableType
 */
/** @type {SkruvIterableType} */
export const SkruvIterableType: SkruvIterableType;
export function h(nodeName: string, attributes?: VnodeAtrributes | undefined, ...childNodes: ChildNode[]): Vnode;
export function a(attributes?: VnodeAtrributes | undefined, ...childNodes: ChildNode[]): Vnode;
export function abbr(attributes?: VnodeAtrributes | undefined, ...childNodes: ChildNode[]): Vnode;
export function acronym(attributes?: VnodeAtrributes | undefined, ...childNodes: ChildNode[]): Vnode;
export function address(attributes?: VnodeAtrributes | undefined, ...childNodes: ChildNode[]): Vnode;
export function applet(attributes?: VnodeAtrributes | undefined, ...childNodes: ChildNode[]): Vnode;
export function area(attributes?: VnodeAtrributes | undefined, ...childNodes: ChildNode[]): Vnode;
export function article(attributes?: VnodeAtrributes | undefined, ...childNodes: ChildNode[]): Vnode;
export function aside(attributes?: VnodeAtrributes | undefined, ...childNodes: ChildNode[]): Vnode;
export function audio(attributes?: VnodeAtrributes | undefined, ...childNodes: ChildNode[]): Vnode;
export function b(attributes?: VnodeAtrributes | undefined, ...childNodes: ChildNode[]): Vnode;
export function base(attributes?: VnodeAtrributes | undefined, ...childNodes: ChildNode[]): Vnode;
export function basefont(attributes?: VnodeAtrributes | undefined, ...childNodes: ChildNode[]): Vnode;
export function bdi(attributes?: VnodeAtrributes | undefined, ...childNodes: ChildNode[]): Vnode;
export function bdo(attributes?: VnodeAtrributes | undefined, ...childNodes: ChildNode[]): Vnode;
export function bgsound(attributes?: VnodeAtrributes | undefined, ...childNodes: ChildNode[]): Vnode;
export function big(attributes?: VnodeAtrributes | undefined, ...childNodes: ChildNode[]): Vnode;
export function blink(attributes?: VnodeAtrributes | undefined, ...childNodes: ChildNode[]): Vnode;
export function blockquote(attributes?: VnodeAtrributes | undefined, ...childNodes: ChildNode[]): Vnode;
export function body(attributes?: VnodeAtrributes | undefined, ...childNodes: ChildNode[]): Vnode;
export function br(attributes?: VnodeAtrributes | undefined, ...childNodes: ChildNode[]): Vnode;
export function button(attributes?: VnodeAtrributes | undefined, ...childNodes: ChildNode[]): Vnode;
export function canvas(attributes?: VnodeAtrributes | undefined, ...childNodes: ChildNode[]): Vnode;
export function caption(attributes?: VnodeAtrributes | undefined, ...childNodes: ChildNode[]): Vnode;
export function center(attributes?: VnodeAtrributes | undefined, ...childNodes: ChildNode[]): Vnode;
export function cite(attributes?: VnodeAtrributes | undefined, ...childNodes: ChildNode[]): Vnode;
export function code(attributes?: VnodeAtrributes | undefined, ...childNodes: ChildNode[]): Vnode;
export function col(attributes?: VnodeAtrributes | undefined, ...childNodes: ChildNode[]): Vnode;
export function colgroup(attributes?: VnodeAtrributes | undefined, ...childNodes: ChildNode[]): Vnode;
export function command(attributes?: VnodeAtrributes | undefined, ...childNodes: ChildNode[]): Vnode;
export function content(attributes?: VnodeAtrributes | undefined, ...childNodes: ChildNode[]): Vnode;
export function data(attributes?: VnodeAtrributes | undefined, ...childNodes: ChildNode[]): Vnode;
export function datalist(attributes?: VnodeAtrributes | undefined, ...childNodes: ChildNode[]): Vnode;
export function dd(attributes?: VnodeAtrributes | undefined, ...childNodes: ChildNode[]): Vnode;
export function del(attributes?: VnodeAtrributes | undefined, ...childNodes: ChildNode[]): Vnode;
export function details(attributes?: VnodeAtrributes | undefined, ...childNodes: ChildNode[]): Vnode;
export function dfn(attributes?: VnodeAtrributes | undefined, ...childNodes: ChildNode[]): Vnode;
export function dialog(attributes?: VnodeAtrributes | undefined, ...childNodes: ChildNode[]): Vnode;
export function dir(attributes?: VnodeAtrributes | undefined, ...childNodes: ChildNode[]): Vnode;
export function div(attributes?: VnodeAtrributes | undefined, ...childNodes: ChildNode[]): Vnode;
export function dl(attributes?: VnodeAtrributes | undefined, ...childNodes: ChildNode[]): Vnode;
export function dt(attributes?: VnodeAtrributes | undefined, ...childNodes: ChildNode[]): Vnode;
export function element(attributes?: VnodeAtrributes | undefined, ...childNodes: ChildNode[]): Vnode;
export function em(attributes?: VnodeAtrributes | undefined, ...childNodes: ChildNode[]): Vnode;
export function embed(attributes?: VnodeAtrributes | undefined, ...childNodes: ChildNode[]): Vnode;
export function fieldset(attributes?: VnodeAtrributes | undefined, ...childNodes: ChildNode[]): Vnode;
export function figcaption(attributes?: VnodeAtrributes | undefined, ...childNodes: ChildNode[]): Vnode;
export function figure(attributes?: VnodeAtrributes | undefined, ...childNodes: ChildNode[]): Vnode;
export function font(attributes?: VnodeAtrributes | undefined, ...childNodes: ChildNode[]): Vnode;
export function footer(attributes?: VnodeAtrributes | undefined, ...childNodes: ChildNode[]): Vnode;
export function form(attributes?: VnodeAtrributes | undefined, ...childNodes: ChildNode[]): Vnode;
export function frame(attributes?: VnodeAtrributes | undefined, ...childNodes: ChildNode[]): Vnode;
export function frameset(attributes?: VnodeAtrributes | undefined, ...childNodes: ChildNode[]): Vnode;
export function h1(attributes?: VnodeAtrributes | undefined, ...childNodes: ChildNode[]): Vnode;
export function h2(attributes?: VnodeAtrributes | undefined, ...childNodes: ChildNode[]): Vnode;
export function h3(attributes?: VnodeAtrributes | undefined, ...childNodes: ChildNode[]): Vnode;
export function h4(attributes?: VnodeAtrributes | undefined, ...childNodes: ChildNode[]): Vnode;
export function h5(attributes?: VnodeAtrributes | undefined, ...childNodes: ChildNode[]): Vnode;
export function h6(attributes?: VnodeAtrributes | undefined, ...childNodes: ChildNode[]): Vnode;
export function head(attributes?: VnodeAtrributes | undefined, ...childNodes: ChildNode[]): Vnode;
export function header(attributes?: VnodeAtrributes | undefined, ...childNodes: ChildNode[]): Vnode;
export function hgroup(attributes?: VnodeAtrributes | undefined, ...childNodes: ChildNode[]): Vnode;
export function hr(attributes?: VnodeAtrributes | undefined, ...childNodes: ChildNode[]): Vnode;
export function html(attributes?: VnodeAtrributes | undefined, ...childNodes: ChildNode[]): Vnode;
export function i(attributes?: VnodeAtrributes | undefined, ...childNodes: ChildNode[]): Vnode;
export function iframe(attributes?: VnodeAtrributes | undefined, ...childNodes: ChildNode[]): Vnode;
export function image(attributes?: VnodeAtrributes | undefined, ...childNodes: ChildNode[]): Vnode;
export function img(attributes?: VnodeAtrributes | undefined, ...childNodes: ChildNode[]): Vnode;
export function input(attributes?: VnodeAtrributes | undefined, ...childNodes: ChildNode[]): Vnode;
export function ins(attributes?: VnodeAtrributes | undefined, ...childNodes: ChildNode[]): Vnode;
export function isindex(attributes?: VnodeAtrributes | undefined, ...childNodes: ChildNode[]): Vnode;
export function kbd(attributes?: VnodeAtrributes | undefined, ...childNodes: ChildNode[]): Vnode;
export function keygen(attributes?: VnodeAtrributes | undefined, ...childNodes: ChildNode[]): Vnode;
export function label(attributes?: VnodeAtrributes | undefined, ...childNodes: ChildNode[]): Vnode;
export function legend(attributes?: VnodeAtrributes | undefined, ...childNodes: ChildNode[]): Vnode;
export function li(attributes?: VnodeAtrributes | undefined, ...childNodes: ChildNode[]): Vnode;
export function link(attributes?: VnodeAtrributes | undefined, ...childNodes: ChildNode[]): Vnode;
export function listing(attributes?: VnodeAtrributes | undefined, ...childNodes: ChildNode[]): Vnode;
export function main(attributes?: VnodeAtrributes | undefined, ...childNodes: ChildNode[]): Vnode;
export function map(attributes?: VnodeAtrributes | undefined, ...childNodes: ChildNode[]): Vnode;
export function mark(attributes?: VnodeAtrributes | undefined, ...childNodes: ChildNode[]): Vnode;
export function marquee(attributes?: VnodeAtrributes | undefined, ...childNodes: ChildNode[]): Vnode;
export function menu(attributes?: VnodeAtrributes | undefined, ...childNodes: ChildNode[]): Vnode;
export function menuitem(attributes?: VnodeAtrributes | undefined, ...childNodes: ChildNode[]): Vnode;
export function meta(attributes?: VnodeAtrributes | undefined, ...childNodes: ChildNode[]): Vnode;
export function meter(attributes?: VnodeAtrributes | undefined, ...childNodes: ChildNode[]): Vnode;
export function multicol(attributes?: VnodeAtrributes | undefined, ...childNodes: ChildNode[]): Vnode;
export function nav(attributes?: VnodeAtrributes | undefined, ...childNodes: ChildNode[]): Vnode;
export function nextid(attributes?: VnodeAtrributes | undefined, ...childNodes: ChildNode[]): Vnode;
export function nobr(attributes?: VnodeAtrributes | undefined, ...childNodes: ChildNode[]): Vnode;
export function noembed(attributes?: VnodeAtrributes | undefined, ...childNodes: ChildNode[]): Vnode;
export function noframes(attributes?: VnodeAtrributes | undefined, ...childNodes: ChildNode[]): Vnode;
export function noscript(attributes?: VnodeAtrributes | undefined, ...childNodes: ChildNode[]): Vnode;
export function object(attributes?: VnodeAtrributes | undefined, ...childNodes: ChildNode[]): Vnode;
export function ol(attributes?: VnodeAtrributes | undefined, ...childNodes: ChildNode[]): Vnode;
export function optgroup(attributes?: VnodeAtrributes | undefined, ...childNodes: ChildNode[]): Vnode;
export function option(attributes?: VnodeAtrributes | undefined, ...childNodes: ChildNode[]): Vnode;
export function output(attributes?: VnodeAtrributes | undefined, ...childNodes: ChildNode[]): Vnode;
export function p(attributes?: VnodeAtrributes | undefined, ...childNodes: ChildNode[]): Vnode;
export function param(attributes?: VnodeAtrributes | undefined, ...childNodes: ChildNode[]): Vnode;
export function picture(attributes?: VnodeAtrributes | undefined, ...childNodes: ChildNode[]): Vnode;
export function plaintext(attributes?: VnodeAtrributes | undefined, ...childNodes: ChildNode[]): Vnode;
export function pre(attributes?: VnodeAtrributes | undefined, ...childNodes: ChildNode[]): Vnode;
export function progress(attributes?: VnodeAtrributes | undefined, ...childNodes: ChildNode[]): Vnode;
export function q(attributes?: VnodeAtrributes | undefined, ...childNodes: ChildNode[]): Vnode;
export function rb(attributes?: VnodeAtrributes | undefined, ...childNodes: ChildNode[]): Vnode;
export function rp(attributes?: VnodeAtrributes | undefined, ...childNodes: ChildNode[]): Vnode;
export function rt(attributes?: VnodeAtrributes | undefined, ...childNodes: ChildNode[]): Vnode;
export function rtc(attributes?: VnodeAtrributes | undefined, ...childNodes: ChildNode[]): Vnode;
export function ruby(attributes?: VnodeAtrributes | undefined, ...childNodes: ChildNode[]): Vnode;
export function s(attributes?: VnodeAtrributes | undefined, ...childNodes: ChildNode[]): Vnode;
export function samp(attributes?: VnodeAtrributes | undefined, ...childNodes: ChildNode[]): Vnode;
export function script(attributes?: VnodeAtrributes | undefined, ...childNodes: ChildNode[]): Vnode;
export function section(attributes?: VnodeAtrributes | undefined, ...childNodes: ChildNode[]): Vnode;
export function select(attributes?: VnodeAtrributes | undefined, ...childNodes: ChildNode[]): Vnode;
export function shadow(attributes?: VnodeAtrributes | undefined, ...childNodes: ChildNode[]): Vnode;
export function slot(attributes?: VnodeAtrributes | undefined, ...childNodes: ChildNode[]): Vnode;
export function small(attributes?: VnodeAtrributes | undefined, ...childNodes: ChildNode[]): Vnode;
export function source(attributes?: VnodeAtrributes | undefined, ...childNodes: ChildNode[]): Vnode;
export function spacer(attributes?: VnodeAtrributes | undefined, ...childNodes: ChildNode[]): Vnode;
export function span(attributes?: VnodeAtrributes | undefined, ...childNodes: ChildNode[]): Vnode;
export function strike(attributes?: VnodeAtrributes | undefined, ...childNodes: ChildNode[]): Vnode;
export function strong(attributes?: VnodeAtrributes | undefined, ...childNodes: ChildNode[]): Vnode;
export function style(attributes?: VnodeAtrributes | undefined, ...childNodes: ChildNode[]): Vnode;
export function sub(attributes?: VnodeAtrributes | undefined, ...childNodes: ChildNode[]): Vnode;
export function summary(attributes?: VnodeAtrributes | undefined, ...childNodes: ChildNode[]): Vnode;
export function sup(attributes?: VnodeAtrributes | undefined, ...childNodes: ChildNode[]): Vnode;
export function table(attributes?: VnodeAtrributes | undefined, ...childNodes: ChildNode[]): Vnode;
export function tbody(attributes?: VnodeAtrributes | undefined, ...childNodes: ChildNode[]): Vnode;
export function td(attributes?: VnodeAtrributes | undefined, ...childNodes: ChildNode[]): Vnode;
export function template(attributes?: VnodeAtrributes | undefined, ...childNodes: ChildNode[]): Vnode;
export function textarea(attributes?: VnodeAtrributes | undefined, ...childNodes: ChildNode[]): Vnode;
export function tfoot(attributes?: VnodeAtrributes | undefined, ...childNodes: ChildNode[]): Vnode;
export function th(attributes?: VnodeAtrributes | undefined, ...childNodes: ChildNode[]): Vnode;
export function thead(attributes?: VnodeAtrributes | undefined, ...childNodes: ChildNode[]): Vnode;
export function time(attributes?: VnodeAtrributes | undefined, ...childNodes: ChildNode[]): Vnode;
export function title(attributes?: VnodeAtrributes | undefined, ...childNodes: ChildNode[]): Vnode;
export function tr(attributes?: VnodeAtrributes | undefined, ...childNodes: ChildNode[]): Vnode;
export function track(attributes?: VnodeAtrributes | undefined, ...childNodes: ChildNode[]): Vnode;
export function tt(attributes?: VnodeAtrributes | undefined, ...childNodes: ChildNode[]): Vnode;
export function u(attributes?: VnodeAtrributes | undefined, ...childNodes: ChildNode[]): Vnode;
export function ul(attributes?: VnodeAtrributes | undefined, ...childNodes: ChildNode[]): Vnode;
export function varElem(attributes?: VnodeAtrributes | undefined, ...childNodes: ChildNode[]): Vnode;
export function video(attributes?: VnodeAtrributes | undefined, ...childNodes: ChildNode[]): Vnode;
export function wbr(attributes?: VnodeAtrributes | undefined, ...childNodes: ChildNode[]): Vnode;
export function xmp(attributes?: VnodeAtrributes | undefined, ...childNodes: ChildNode[]): Vnode;
export function animate(attributes?: VnodeAtrributes | undefined, ...childNodes: ChildNode[]): Vnode;
export function animateMotion(attributes?: VnodeAtrributes | undefined, ...childNodes: ChildNode[]): Vnode;
export function animateTransform(attributes?: VnodeAtrributes | undefined, ...childNodes: ChildNode[]): Vnode;
export function circle(attributes?: VnodeAtrributes | undefined, ...childNodes: ChildNode[]): Vnode;
export function clipPath(attributes?: VnodeAtrributes | undefined, ...childNodes: ChildNode[]): Vnode;
export function defs(attributes?: VnodeAtrributes | undefined, ...childNodes: ChildNode[]): Vnode;
export function desc(attributes?: VnodeAtrributes | undefined, ...childNodes: ChildNode[]): Vnode;
export function discard(attributes?: VnodeAtrributes | undefined, ...childNodes: ChildNode[]): Vnode;
export function ellipse(attributes?: VnodeAtrributes | undefined, ...childNodes: ChildNode[]): Vnode;
export function feBlend(attributes?: VnodeAtrributes | undefined, ...childNodes: ChildNode[]): Vnode;
export function feColorMatrix(attributes?: VnodeAtrributes | undefined, ...childNodes: ChildNode[]): Vnode;
export function feComponentTransfer(attributes?: VnodeAtrributes | undefined, ...childNodes: ChildNode[]): Vnode;
export function feComposite(attributes?: VnodeAtrributes | undefined, ...childNodes: ChildNode[]): Vnode;
export function feConvolveMatrix(attributes?: VnodeAtrributes | undefined, ...childNodes: ChildNode[]): Vnode;
export function feDiffuseLighting(attributes?: VnodeAtrributes | undefined, ...childNodes: ChildNode[]): Vnode;
export function feDisplacementMap(attributes?: VnodeAtrributes | undefined, ...childNodes: ChildNode[]): Vnode;
export function feDistantLight(attributes?: VnodeAtrributes | undefined, ...childNodes: ChildNode[]): Vnode;
export function feDropShadow(attributes?: VnodeAtrributes | undefined, ...childNodes: ChildNode[]): Vnode;
export function feFlood(attributes?: VnodeAtrributes | undefined, ...childNodes: ChildNode[]): Vnode;
export function feFuncA(attributes?: VnodeAtrributes | undefined, ...childNodes: ChildNode[]): Vnode;
export function feFuncB(attributes?: VnodeAtrributes | undefined, ...childNodes: ChildNode[]): Vnode;
export function feFuncG(attributes?: VnodeAtrributes | undefined, ...childNodes: ChildNode[]): Vnode;
export function feFuncR(attributes?: VnodeAtrributes | undefined, ...childNodes: ChildNode[]): Vnode;
export function feGaussianBlur(attributes?: VnodeAtrributes | undefined, ...childNodes: ChildNode[]): Vnode;
export function feImage(attributes?: VnodeAtrributes | undefined, ...childNodes: ChildNode[]): Vnode;
export function feMerge(attributes?: VnodeAtrributes | undefined, ...childNodes: ChildNode[]): Vnode;
export function feMergeNode(attributes?: VnodeAtrributes | undefined, ...childNodes: ChildNode[]): Vnode;
export function feMorphology(attributes?: VnodeAtrributes | undefined, ...childNodes: ChildNode[]): Vnode;
export function feOffset(attributes?: VnodeAtrributes | undefined, ...childNodes: ChildNode[]): Vnode;
export function fePointLight(attributes?: VnodeAtrributes | undefined, ...childNodes: ChildNode[]): Vnode;
export function feSpecularLighting(attributes?: VnodeAtrributes | undefined, ...childNodes: ChildNode[]): Vnode;
export function feSpotLight(attributes?: VnodeAtrributes | undefined, ...childNodes: ChildNode[]): Vnode;
export function feTile(attributes?: VnodeAtrributes | undefined, ...childNodes: ChildNode[]): Vnode;
export function feTurbulence(attributes?: VnodeAtrributes | undefined, ...childNodes: ChildNode[]): Vnode;
export function filter(attributes?: VnodeAtrributes | undefined, ...childNodes: ChildNode[]): Vnode;
export function foreignObject(attributes?: VnodeAtrributes | undefined, ...childNodes: ChildNode[]): Vnode;
export function g(attributes?: VnodeAtrributes | undefined, ...childNodes: ChildNode[]): Vnode;
export function hatch(attributes?: VnodeAtrributes | undefined, ...childNodes: ChildNode[]): Vnode;
export function hatchpath(attributes?: VnodeAtrributes | undefined, ...childNodes: ChildNode[]): Vnode;
export function line(attributes?: VnodeAtrributes | undefined, ...childNodes: ChildNode[]): Vnode;
export function linearGradient(attributes?: VnodeAtrributes | undefined, ...childNodes: ChildNode[]): Vnode;
export function marker(attributes?: VnodeAtrributes | undefined, ...childNodes: ChildNode[]): Vnode;
export function mask(attributes?: VnodeAtrributes | undefined, ...childNodes: ChildNode[]): Vnode;
export function mesh(attributes?: VnodeAtrributes | undefined, ...childNodes: ChildNode[]): Vnode;
export function meshgradient(attributes?: VnodeAtrributes | undefined, ...childNodes: ChildNode[]): Vnode;
export function meshpatch(attributes?: VnodeAtrributes | undefined, ...childNodes: ChildNode[]): Vnode;
export function meshrow(attributes?: VnodeAtrributes | undefined, ...childNodes: ChildNode[]): Vnode;
export function metadata(attributes?: VnodeAtrributes | undefined, ...childNodes: ChildNode[]): Vnode;
export function mpath(attributes?: VnodeAtrributes | undefined, ...childNodes: ChildNode[]): Vnode;
export function path(attributes?: VnodeAtrributes | undefined, ...childNodes: ChildNode[]): Vnode;
export function pattern(attributes?: VnodeAtrributes | undefined, ...childNodes: ChildNode[]): Vnode;
export function polygon(attributes?: VnodeAtrributes | undefined, ...childNodes: ChildNode[]): Vnode;
export function polyline(attributes?: VnodeAtrributes | undefined, ...childNodes: ChildNode[]): Vnode;
export function radialGradient(attributes?: VnodeAtrributes | undefined, ...childNodes: ChildNode[]): Vnode;
export function rect(attributes?: VnodeAtrributes | undefined, ...childNodes: ChildNode[]): Vnode;
export function set(attributes?: VnodeAtrributes | undefined, ...childNodes: ChildNode[]): Vnode;
export function solidcolor(attributes?: VnodeAtrributes | undefined, ...childNodes: ChildNode[]): Vnode;
export function stop(attributes?: VnodeAtrributes | undefined, ...childNodes: ChildNode[]): Vnode;
export function svg(attributes?: VnodeAtrributes | undefined, ...childNodes: ChildNode[]): Vnode;
export function switchElem(attributes?: VnodeAtrributes | undefined, ...childNodes: ChildNode[]): Vnode;
export function symbol(attributes?: VnodeAtrributes | undefined, ...childNodes: ChildNode[]): Vnode;
export function text(attributes?: VnodeAtrributes | undefined, ...childNodes: ChildNode[]): Vnode;
export function textPath(attributes?: VnodeAtrributes | undefined, ...childNodes: ChildNode[]): Vnode;
export function tspan(attributes?: VnodeAtrributes | undefined, ...childNodes: ChildNode[]): Vnode;
export function unknown(attributes?: VnodeAtrributes | undefined, ...childNodes: ChildNode[]): Vnode;
export function use(attributes?: VnodeAtrributes | undefined, ...childNodes: ChildNode[]): Vnode;
export function view(attributes?: VnodeAtrributes | undefined, ...childNodes: ChildNode[]): Vnode;
export function css(strings: TemplateStringsArray, ...keys: (string | number | boolean | undefined)[]): Vnode;
export type SkruvEvents = {
    oncreate: (arg0: HTMLElement | Text | SVGElement | Comment) => void;
    onremove: (arg0: HTMLElement | Text | SVGElement | Comment) => void;
    key: Object;
    opaque: boolean;
};
export type VnodeAtrributes = Partial<GlobalEventHandlers> & Partial<SkruvEvents> & {
    [x: string]: (string | boolean | Function | number | undefined);
};
export type SkruvAdditionalIterableProperties = {
    result?: ChildNodes | ChildNode | undefined;
    booted?: boolean | undefined;
};
//# sourceMappingURL=elements.d.ts.map