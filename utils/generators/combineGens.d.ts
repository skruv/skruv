export default combineGens;
/**
 * @template T
 * @param  {...AsyncGenerator<T>} gens
 * @returns {AsyncGenerator<T[]>}
 */
declare function combineGens<T>(...gens: AsyncGenerator<T>[]): AsyncGenerator<T[]>;
