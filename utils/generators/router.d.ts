/**
 * @param {{url: string, getGenerator: (arg: string) => string}} state
 */
export default function router(state: {
    url: string;
    getGenerator: (arg: string) => string;
}): AsyncGenerator<any, void, unknown>;
