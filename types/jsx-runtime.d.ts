export const Fragment: "#fragment";
export function jsx(nodeName: string, attributes?: JSXAttributes | undefined): Vnode | [Vnode?];
export function jsxs(nodeName: string, attributes?: JSXAttributes | undefined): Vnode | [Vnode?];
export type Vnode = typeof import("./elements.js").Vnode;
export type VnodeAtrributes = typeof import("./elements.js").VnodeAtrributes;
export type JSXAdditionalProperties = {
    children?: [import("./elements.js").Vnode] | undefined;
};
export type JSXAttributes = VnodeAtrributes & JSXAdditionalProperties;
//# sourceMappingURL=jsx-runtime.d.ts.map