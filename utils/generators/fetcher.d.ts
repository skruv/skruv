export class HTTPError extends Error {
    /**
     * @param {{ req: string, url: string, opt: SkruvRequestInit }} request
     * @param {number} status
     * @param {Headers} headers
     * @param {JSONValue} body
     */
    constructor(request: {
        req: string;
        url: string;
        opt: SkruvRequestInit;
    }, status: number, headers: Headers, body: JSONValue);
    ok: boolean;
    request: {
        req: string;
        url: string;
        opt: SkruvRequestInit;
    };
    status: number;
    headers: Headers;
    body: JSONValue;
}
export class HTTPEmptyError extends HTTPError {
}
export function replacer(_key: any, value: any): any;
export const cache: Map<any, any>;
export const idMap: Map<any, any>;
export function fetchGenerator(_req: string | Request | AsyncGenerator<string> | AsyncGenerator<pgReq>, opt?: SkruvRequestInit): AsyncGenerator<HTTPEmptyError | HTTPError | SkruvResponse>;
export function fetchSingle(req: string | Request | AsyncGenerator<string> | AsyncGenerator<pgReq>, opt: SkruvRequestInit): Promise<HTTPEmptyError | HTTPError | SkruvResponse>;
export type select = {
    table: string;
    select: select[];
};
export type andOr = {
    field: string;
    condition: string;
    value: string;
};
export type order = {
    field: string;
    direction: string;
};
export type pgReq = {
    table: string;
    select?: select[] | undefined;
    and?: andOr[] | undefined;
    or?: andOr[] | undefined;
    order?: order[] | undefined;
    limit?: string | undefined;
    offset?: string | undefined;
    where?: {
        [key: string]: string;
    } | undefined;
};
export type SkruvRequestInitAdditional = {
    allowEmpty?: boolean | undefined;
};
export type SkruvRequestInit = RequestInit & SkruvRequestInitAdditional;
export type JSONValue = string | number | boolean | any[] | {
    [x: string]: any;
};
export type SkruvResponse = {
    ok: boolean;
    request: {
        req: string;
        url: string;
        opt: SkruvRequestInit;
    };
    headers: Headers;
    body: JSONValue;
};
//# sourceMappingURL=fetcher.d.ts.map