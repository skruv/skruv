export const Fragment: "#fragment";
export function jsx(nodeName: string, attributes?: JSXAttributes | undefined): Vnode | [Vnode?];
export function jsxs(nodeName: string, attributes?: JSXAttributes | undefined): Vnode | [Vnode?];
export type Vnode = typeof import("../index.js").Vnode;
export type VnodeAtrributes = Record<string, (string | boolean | Function | number | Object)>;
export type JSXAdditionalProperties = {
    children?: [import("../index.js").Vnode] | undefined;
};
export type JSXAttributes = VnodeAtrributes & JSXAdditionalProperties;
//# sourceMappingURL=jsx-runtime.d.ts.map