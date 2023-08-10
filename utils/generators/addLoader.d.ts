export default addLoader;
export type Vnode = import("../../utilityTypes").Vnode;
/**
 * Adds a loader after waiting for the component for 300ms.
 * The loader can be something like div({ "skruvFinished": false }, "Loading content");
 *
 * @param {() => AsyncGenerator<Vnode|boolean|string>} component
 * @param {Vnode} loader
 */
declare function addLoader(component: () => AsyncGenerator<Vnode | boolean | string>, loader: Vnode): AsyncGenerator<string | boolean | import("../../utilityTypes").AnyElement, void, unknown>;
//# sourceMappingURL=addLoader.d.ts.map