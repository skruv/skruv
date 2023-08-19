export default fromCallback;
/**
 * @template T
 * @param {(value: (value: T[]) => void) => T} setupFunc
 * @returns {AsyncGenerator<T[]>}
 */
declare function fromCallback<T>(setupFunc: (value: (value: T[]) => void) => T): AsyncGenerator<T[], any, any>;
