export default combineGens;
/**
 * @template T
 * @param  {...AsyncGenerator<T>} gens
 * @returns {AsyncGenerator<T[]>}
 */
declare function combineGens<T>(...gens: AsyncGenerator<T, any, any>[]): AsyncGenerator<T[], any, any>;
//# sourceMappingURL=combineGens.d.ts.map