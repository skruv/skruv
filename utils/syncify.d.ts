export let hydrationPromise: Promise<any>;
export function reset(): void;
export function syncify<T>(value: string | number | boolean | T | AsyncGenerator<T, any, any> | AsyncIterator<T, any, undefined> | Promise<T> | (() => T), key?: (string | number) | null, parent?: (Array<any> | Object) | null, cbparent?: {
    r: () => boolean;
} | null, root?: boolean): T;
