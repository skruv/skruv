export function createState<T>(stateObj: T): AsyncGenerator<T, any, any> & T & {
    getGenerator: (key: string | number) => T[string | number];
    toJSON: () => T;
};
//# sourceMappingURL=state.d.ts.map