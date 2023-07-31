export const Fragment: "#fragment";
export function jsx(nodeName: string, attributes?: VnodeAttributes | undefined): Vnode | [];
export function jsxs(nodeName: string, attributes?: VnodeAttributes | undefined): Vnode | [];
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
//# sourceMappingURL=jsx-runtime.d.ts.map