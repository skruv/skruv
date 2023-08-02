export function render(current: Record<string, any> | Vnode | string | number | boolean, currentNode?: Node, parentNode?: ParentNode | null, ns?: string, forceFull?: boolean): void;
/** @type {Record<string, (...c: Array<Record<string, any>|Vnode|string|number|boolean>) => Vnode>} */
export const elementFactory: Record<string, (...c: Array<Record<string, any> | Vnode | string | number | boolean>) => Vnode>;
export type VnodeAttributes = Record<string, string | number | boolean | Function> & {
    oncreate?: ((e: Node) => void) | undefined;
    'data-skruv-key'?: object | undefined;
};
export type SkruvChildNode = Vnode | VnodeAttributes;
export type SkruvChildNodes = SkruvChildNode[];
export type Vnode = {
    s: Symbol;
    t: string;
    c: SkruvChildNodes;
    r?: (() => boolean) | undefined;
};
//# sourceMappingURL=index.d.ts.map