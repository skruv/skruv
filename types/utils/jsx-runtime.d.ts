export const Fragment: "#fragment";
export function jsx(nodeName: string, attributes?: JSXAttributes | undefined): Vnode | [Vnode?];
export function jsxs(nodeName: string, attributes?: JSXAttributes | undefined): Vnode | [Vnode?];
export type SkruvChildNode = Vnode | Vnode[] | string | boolean | number;
export type SkruvChildNodes = SkruvChildNode[];
export type VnodeAtrributes = Record<string, (string | boolean | Function | number | Object)>;
export type Vnode = {
    s: Symbol;
    t: string;
    c: SkruvChildNodes;
    a: Record<string, (string | boolean | Function | number | Object)> & {
        _r: {
            _r: () => boolean;
        } | null;
    };
    _r?: {
        _r: () => boolean;
    } | undefined;
};
export type JSXAdditionalProperties = {
    children?: [Vnode] | undefined;
};
export type JSXAttributes = VnodeAtrributes & JSXAdditionalProperties;
//# sourceMappingURL=jsx-runtime.d.ts.map