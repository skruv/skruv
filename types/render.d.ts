export default render;
export type Vnode = typeof import("./elements.js").Vnode;
export type ChildNodes = typeof import("./elements.js").ChildNodes;
export type ChildNode = typeof import("./elements.js").ChildNode;
export type SkruvIterableType = typeof import("./elements.js").SkruvIterableType;
export type SkruvAdditionalProperties = {
    skruvActiveAttributeGenerators?: Set<import("./elements.js").Vnode> | undefined;
    skruvActiveGenerators?: Set<import("./elements.js").SkruvIterableType> | undefined;
    skruvListeners?: any;
    skruvkey?: Object | undefined;
    data?: string | undefined;
    append?: Function | undefined;
    removeAttribute?: Function | undefined;
    getAttribute?: Function | undefined;
    setAttribute?: Function | undefined;
};
export type SkruvDomType = Node & SkruvAdditionalProperties;
/**
 * @param {Vnode} vNode
 * @param {SkruvDomType} node
 * @param {SkruvDomType|null} parent
 * @param {Boolean} isSvg
 */
declare function render(vNode: Vnode, node?: SkruvDomType, parent?: SkruvDomType | null, isSvg?: boolean): void;
//# sourceMappingURL=render.d.ts.map