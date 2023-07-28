export function h(t: string, ...c: (Record<string, any> | Vnode)[]): Vnode;
export function render(current: Vnode, _currentNode?: Node, parentNode?: ParentNode | null, isSvg?: any): boolean;
export const elementFactory: any;
export type SkruvChildNode = Vnode | Vnode[] | string | boolean | number;
export type SkruvChildNodes = SkruvChildNode[];
export type VnodeAtrributes = Record<string, (string | boolean | Function | number | Object)>;
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
//# sourceMappingURL=index.d.ts.map