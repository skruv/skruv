/**
 * @typedef {Vnode|string|Boolean|Number|Record<string,(string|boolean|Function|number|Object)> & {oncreate:(e: Node) => void}?} SkruvChildNode
 * @typedef {SkruvChildNode[]} SkruvChildNodes
 * @typedef {Record<string,(string|boolean|Function|number|Object)> & {children?: SkruvChildNodes}} VnodeAttributes
 */
/**
 * @typedef {object} Vnode
 * @prop {Symbol} s
 * @prop {string} t
 * @prop {SkruvChildNodes} c
 * @prop {() => boolean} [r]
 */
export const Fragment: "#fragment";
export function jsxs(nodeName: string, attributes?: VnodeAttributes | undefined): Vnode | SkruvChildNodes;
export function jsx(nodeName: string, attributes?: VnodeAttributes | undefined): Vnode | SkruvChildNodes;
export type SkruvChildNode = string | number | boolean | Vnode | (Record<string, string | number | boolean | Object | Function> & {
    oncreate: (e: Node) => void;
});
export type SkruvChildNodes = SkruvChildNode[];
export type VnodeAttributes = Record<string, (string | boolean | Function | number | Object)> & {
    children?: SkruvChildNode[];
};
export type Vnode = {
    s: Symbol;
    t: string;
    c: SkruvChildNodes;
    r?: (() => boolean) | undefined;
};
//# sourceMappingURL=jsx-runtime.d.ts.map