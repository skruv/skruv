export let hydrationPromise: Promise<any>;
export function reset(): void;
export function syncify<T>(value: AsyncGenerator<T> | AsyncIterator<T> | Promise<T> | (() => T) | string | number | boolean | T, key?: (string | number) | null, parent?: (Array<any> | Object) | null, cbparent?: {
    r: () => boolean;
} | null, root?: boolean): T;
