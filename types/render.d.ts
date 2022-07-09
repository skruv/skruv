export default render;
export type Vnode = {
    nodeName: string;
    data?: string | undefined;
    attributes: any;
    childNodes: (ChildNodes | ChildNodes[]);
    booted?: boolean | undefined;
    result?: ChildNodes | undefined;
};
export type ChildNodes = ((string | number | boolean | Function | ChildNodes | ChildNodes[] | Vnode | SkruvIterableType)[][] | ChildNodes | Vnode | Function | string | boolean | number | SkruvIterableType | SkruvIterableType)[];
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
export type SkruvAdditionalIterableProperties = {
    result?: ChildNodes | undefined;
    booted?: boolean | undefined;
};
export type SkruvIterableType = (AsyncGenerator<any, (string | number | boolean | Function | ChildNodes | ChildNodes[] | Vnode | SkruvIterableType)[]> | AsyncIterable<ChildNodes>) & SkruvAdditionalIterableProperties;
/**
 * @param {Vnode} vNode
 * @param {SkruvDomType} node
 * @param {SkruvDomType|null} parent
 * @param {Boolean} isSvg
 */
declare function render(vNode: Vnode, node?: SkruvDomType, parent?: SkruvDomType | null, isSvg?: boolean): void;
//# sourceMappingURL=render.d.ts.map