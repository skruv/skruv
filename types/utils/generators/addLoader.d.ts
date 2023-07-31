export default addLoader;
export type Vnode = import("../../index.js").Vnode;
/**
 * Adds a loader after waiting for the component for 300ms.
 * The loader can be something like div({ "data-skruv-finished": false }, "Loading content");
 *
 * @param {() => AsyncGenerator<Vnode|boolean|string>} component
 * @param {Vnode} loader
 */
declare function addLoader(component: () => AsyncGenerator<Vnode | boolean | string>, loader: Vnode): AsyncGenerator<string | boolean | import("../../index.js").Vnode, void, unknown>;
//# sourceMappingURL=addLoader.d.ts.map