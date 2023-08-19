export const hydrationPromise: Promise<any>;
/**
 * @template T
 * @param {AsyncGenerator<T>|AsyncIterator<T>|Promise<T>|(()=>T)|string|number|boolean|T} value
 * @param {(string|number)?} key
 * @param {(Array<any>|Object)?} parent
 * @param {{r:() => boolean}?} cbparent
 * @returns {T}
 */
export function syncify<T>(value: string | number | boolean | T | AsyncGenerator<T, any, any> | AsyncIterator<T, any, undefined> | Promise<T> | (() => T), key?: (string | number) | null, parent?: (Array<any> | Object) | null, cbparent?: {
    r: () => boolean;
} | null, root?: boolean): T;
