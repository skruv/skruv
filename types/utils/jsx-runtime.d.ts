export const Fragment: "#fragment";
export function jsx(nodeName: string, attributes?: VnodeAttributes | undefined): Vnode | [];
export function jsxs(nodeName: string, attributes?: VnodeAttributes | undefined): Vnode | [];
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
//# sourceMappingURL=jsx-runtime.d.ts.map