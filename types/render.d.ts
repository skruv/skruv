export type Vnode = {
    s: Symbol;
    t: string;
    _c: SkruvChildNodes;
    _a: VnodeAtrributes;
    r: {
        r: () => boolean;
    };
};
/** @type {Vnode} */
export const Vnode: Vnode;
export type VnodeAtrributes = PreparedVnodeAtrributes & Record<string, (string | boolean | Function | number | Object | SkruvAttributesPromiseOrAsyncFunction | SkruvAttributesIterable)>;
/** @type {VnodeAtrributes} */
export const VnodeAtrributes: VnodeAtrributes;
export function h(t: string, ...c: Array<SkruvChildNode | VnodeAtrributes>): Vnode;
export function render(current: Vnode, currentNode?: HTMLElement | SVGElement | undefined, parentNode?: ParentNode | null, isSvg?: boolean | undefined): Promise<void>;
export const htmlFactory: Record<string, (...c: Array<SkruvChildNode | VnodeAtrributes>) => Vnode>;
export type SkruvValue = Vnode | Function | string | number | boolean | SkruvAsyncGenerator | AsyncIterable<SkruvValue> | Promise<SkruvValue> | SkruvAsyncFunction;
export type SkruvAttributesIterable = (AsyncGenerator<Function | string | boolean | number> | AsyncIterable<Function | string | boolean | number>);
export type SkruvAttributesPromiseOrAsyncFunction = (Promise<Function | string | boolean | number> | (() => Promise<Function | string | boolean | number>));
export type PreparedVnodeAtrributes = Partial<GlobalEventHandlers> & Partial<SkruvEvents> & Record<string, (string | boolean | Function | number | Object)>;
export type SkruvAsyncGenerator = AsyncGenerator<SkruvValue>;
export type SkruvAsyncIterable = AsyncIterable<SkruvValue>;
export type SkruvPromise = Promise<SkruvValue>;
export type SkruvAsyncFunction = () => Promise<SkruvValue>;
export type SkruvChildNode = Vnode | SkruvValue;
export type SkruvChildNodes = Array<SkruvChildNode>;
export type SkruvEvents = {
    oncreate: (arg0: HTMLElement | Text | SVGElement | Comment) => void;
    onremove: (arg0: HTMLElement | Text | SVGElement | Comment) => void;
};
export type PreparedVnode = {
    p: Symbol;
    s: Symbol;
    t: string;
    _c: SkruvChildNodes;
    _a: VnodeAtrributes;
    r: {
        r: () => boolean;
    };
    c: Array<PreparedVnode>;
    a: PreparedVnodeAtrributes;
};
//# sourceMappingURL=render.d.ts.map