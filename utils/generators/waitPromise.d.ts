export default waitPromise;
/**
 * @template T
 * @param {number} time
 * @param {T?} value
 * @returns {Promise<T?>}
 */
declare function waitPromise<T>(time: number, value?: T | null): Promise<T | null>;
