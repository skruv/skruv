export default render;
export type Vnode = {
    nodeName: string;
    data?: string | undefined;
    result?: ChildNodes | undefined;
    attributes: any;
    childNodes: ChildNodes;
};
export type ChildNodes = (ChildNode[] | ChildNode)[];
export type ChildNode = Vnode | Function | string | boolean | number | SkruvIterableType;
export type SkruvAdditionalIterableProperties = {
    result?: ChildNodes | undefined;
    booted?: boolean | undefined;
};
export type SkruvIterableType = (AsyncGenerator<any, (ChildNode | ChildNode[])[]> | AsyncIterable<ChildNodes>) & SkruvAdditionalIterableProperties;
export type SkruvAdditionalProperties = {
    skruvActiveAttributeGenerators?: Set<Vnode> | undefined;
    skruvActiveGenerators?: Set<SkruvIterableType> | undefined;
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