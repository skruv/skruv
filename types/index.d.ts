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
/**
 * @typedef {Vnode|Vnode[]|String|Boolean|Number} SkruvChildNode
 * @typedef {SkruvChildNode[]} SkruvChildNodes
 */
/**
 * @typedef {object} Vnode
 * @prop {Symbol} s
 * @prop {String} t
 * @prop {SkruvChildNodes} c
 * @prop {Record<string,(string|boolean|Function|number|Object)> & {_r:{_r:() => boolean}?}} a
 * @prop {{_r:() => boolean}} [_r]
 */
/** @type {Vnode} */
export const Vnode: Vnode;
export function h(t: string, ...c: (Record<string, any> | Vnode)[]): Vnode;
export function render(current: Vnode, _currentNode?: Node, parentNode?: ParentNode | null, isSvg?: any, doc?: Document | null): boolean;
export const elementFactory: any;
export type SkruvChildNode = Vnode | Vnode[] | string | boolean | number;
export type SkruvChildNodes = SkruvChildNode[];
//# sourceMappingURL=index.d.ts.map