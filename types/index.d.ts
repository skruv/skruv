export function render(current: Vnode, currentNode?: Node, parentNode?: ParentNode | null, isSvg?: boolean, forceFull?: boolean): void;
export const elementFactory: any;
export function h(t: string, ...c: (Record<string, any> | Vnode)[]): Vnode;
export type SkruvChildNode = Vnode | Vnode[] | string | boolean | number | (Record<string, (string | boolean | Function | number | Object)> & {
    _r: {
        _r: () => boolean;
    } | null;
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