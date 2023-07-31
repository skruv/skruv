export function render(current: Record<string, any> | Vnode | string | number | boolean, currentNode?: Node, parentNode?: ParentNode | null, isSvg?: boolean, forceFull?: boolean): void;
/** @type {Record<string, (...c: SkruvChildNodes) => Vnode>} */
export const elementFactory: Record<string, (...c: SkruvChildNodes) => Vnode>;
export function h(t: string, ...c: SkruvChildNode[]): Vnode;
export type SkruvChildNode = string | number | boolean | Vnode | (Record<string, string | number | boolean | Object | Function> & {
    _r: {
        _r: () => boolean;
    } | null;
} & {
    oncreate: (e: Node) => void;
});
export type SkruvChildNodes = SkruvChildNode[];
export type VnodeAttributes = Record<string, (string | boolean | Function | number | Object)>;
export type Vnode = {
    s: Symbol;
    t: string;
    c: SkruvChildNodes;
    _r?: {
        _r: () => boolean;
    } | undefined;
};
//# sourceMappingURL=index.d.ts.map