export default addLoader;
export type AnyContent = import("../../utilityTypes").AnyContent;
/**
 * Adds a loader after waiting for the component for 300ms.
 * The loader can be something like div({ "skruvFinished": false }, "Loading content");
 * @template T, L
 * @param  {() => AsyncGenerator<T>} component
 * @param {L} loader
 * @param {number} [waitTime = 300]
 *
 * @returns {AsyncGenerator<T | L>}
 */
declare function addLoader<T, L>(component: () => AsyncGenerator<T, any, any>, loader: L, waitTime?: number | undefined): AsyncGenerator<T | L, any, any>;
