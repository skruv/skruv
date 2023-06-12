export default render;
export type Vnode = typeof import("./elements.js").Vnode;
export type ChildNodes = typeof import("./elements.js").ChildNodes;
export type SkruvIterableType = typeof import("./elements.js").SkruvIterableType;
export type VnodeAtrributeGenerator = typeof import("./elements.js").VnodeAtrributeGenerator;
export type RenderConfig = {
    renderWaiting: Set<VnodeAtrributeGenerator | SkruvIterableType>;
    checkRender: Function;
    isSkruvSSR: boolean;
};
/**
 * @param {Vnode} vNode
 * @param {HTMLElement | SVGElement} node
 * @param {ParentNode?} parent
 * @param {Boolean} isSvg
 */
declare function render(vNode: Vnode, node?: HTMLElement | SVGElement, parent?: ParentNode | null, isSvg?: boolean): Promise<any>;
//# sourceMappingURL=render.d.ts.map