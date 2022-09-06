export default render;
export type Vnode = typeof import("./elements.js").Vnode;
export type ChildNodes = typeof import("./elements.js").ChildNodes;
export type ChildNode = typeof import("./elements.js").ChildNode;
export type SkruvIterableType = typeof import("./elements.js").SkruvIterableType;
export type VnodeAtrributeGenerator = typeof import("./elements.js").VnodeAtrributeGenerator;
export type SkruvAdditionalProperties = {
    skruvActiveAttributeGenerators?: Set<import("./elements.js").VnodeAtrributeGenerator> | undefined;
    renderWaiting?: Set<import("./elements.js").VnodeAtrributeGenerator | import("./elements.js").SkruvIterableType> | undefined;
    skruvActiveGenerators?: Set<import("./elements.js").SkruvIterableType> | undefined;
    skruvListeners?: any;
    skruvkey?: Object | null | undefined;
    data?: string | undefined;
    append?: Function | undefined;
    removeAttribute?: Function | undefined;
    getAttribute?: Function | undefined;
    setAttribute?: Function | undefined;
    skruvRenderFinished?: Function | undefined;
    skruvFinished?: boolean | undefined;
    checked?: string | number | boolean | undefined;
    value?: string | number | boolean | undefined;
    selected?: string | number | boolean | undefined;
    checkRender?: Function | undefined;
    isSkruvSSR?: boolean | undefined;
};
export type SkruvDomType = Node & SkruvAdditionalProperties;
export type RenderConfig = {
    renderWaiting: Set<VnodeAtrributeGenerator | SkruvIterableType>;
    checkRender: Function;
    isSkruvSSR: boolean;
};
/**
 * @param {Vnode} vNode
 * @param {SkruvDomType} node
 * @param {SkruvDomType|null} parent
 * @param {Boolean} isSvg
 */
declare function render(vNode: Vnode, node?: SkruvDomType, parent?: SkruvDomType | null, isSvg?: boolean): Promise<any>;
//# sourceMappingURL=render.d.ts.map