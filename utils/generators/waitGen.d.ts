export default waitGen;
/**
 * @template T
 * @param {number} time
 * @param {T} value
 * @returns {AsyncGenerator<T>}
 */
declare function waitGen<T>(time: number, value: T): AsyncGenerator<T, any, any>;
//# sourceMappingURL=waitGen.d.ts.map