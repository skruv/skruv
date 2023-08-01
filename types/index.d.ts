export function render(current: Record<string, any> | Vnode | string | number | boolean, currentNode?: Node, parentNode?: ParentNode | null, ns?: string, forceFull?: boolean): void;
/** @type {Record<string, (...c: Array<Record<string, any>|Vnode|string|number|boolean>) => Vnode>} */
export const elementFactory: Record<string, (...c: Array<Record<string, any> | Vnode | string | number | boolean>) => Vnode>;
export function h(t: string, ...c: Array<Record<string, any> | Vnode | string | number | boolean>[]): Vnode;
export type SkruvChildNode = string | number | boolean | Vnode | (Record<string, string | number | boolean | Object | Function> & {
    oncreate: (e: Node) => void;
});
export type SkruvChildNodes = SkruvChildNode[];
export type VnodeAttributes = Record<string, (string | boolean | Function | number | Object)>;
export type Vnode = {
    s: Symbol;
    t: string;
    c: SkruvChildNodes;
    r?: (() => boolean) | undefined;
};
//# sourceMappingURL=index.d.ts.map