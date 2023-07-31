export class Element {
    /** @param {string} nodeName */
    constructor(nodeName?: string);
    /** @type {Element[]} */
    childNodes: Element[];
    /** @type {{ [key: string]: string; }} */
    attributes: {
        [key: string]: string;
    };
    /** @type {Element?} */
    parentNode: Element | null;
    /** @type {{ [key: string]: function[]; }} */
    eventListeners: {
        [key: string]: Function[];
    };
    ownerDocument: {
        /** @type {HTMLElement?} */
        documentElement: HTMLElement | null;
        /**
         * @param {string} data
         * @returns {HTMLElement}
         */
        createComment: (data: string) => HTMLElement;
        /**
         * @param {string} data
         * @returns {Text}
         */
        createTextNode: (data: string) => Text;
        /**
         * @param {string} _ns
         * @param {string} nodeName
         * @returns {HTMLElement}
         */
        createElementNS: (_ns: string, nodeName: string) => HTMLElement;
        /**
         * @param {string} nodeName
         * @returns {HTMLElement}
         */
        createElement: (nodeName: string) => HTMLElement;
        querySelector: () => null;
        querySelectorAll: () => never[];
    };
    nodeName: string;
    data: string;
    /**
     * @param {Element} newNode
     * @param {Element} oldNode
     */
    replaceChild(newNode: Element, oldNode: Element): void;
    /** @param {Element} node */
    appendChild(node: Element): void;
    /** @param {Element} node */
    removeChild(node: Element): void;
    replaceChildren(): void;
    /** @param {string | number} name */
    getAttribute(name: string | number): string;
    /** @param {string | number} name */
    removeAttribute(name: string | number): void;
    /**
     * @param {string | number} name
     * @param {any} value
     */
    setAttribute(name: string | number, value: any): void;
    /** @param {string | number} name */
    removeEventListener(name: string | number): void;
    /**
     * @param {string | number} name
     * @param {function} value
     */
    addEventListener(name: string | number, value: Function): void;
    /** @param {Event} event */
    dispatchEvent(event: Event): void;
    /** @param {Element} node */
    contains(node: Element): boolean;
    /** @returns {Element} */
    cloneNode(): Element;
    get innerHTML(): string;
    set textContent(arg: string);
    get textContent(): string;
}
export class SVGElement extends Element {
}
export class HTMLElement extends Element {
}
export class HTMLOptionElement extends Element {
}
export class HTMLInputElement extends Element {
}
export class Text extends HTMLElement {
}
export class Comment extends HTMLElement {
}
export class Location extends URL {
    get ancestorOrigins(): {
        length: number;
        item: () => null;
        contains: () => boolean;
        [Symbol.iterator]: () => Generator<never, void, unknown>;
    };
    /** @param {string|URL} url */
    assign(url: string | URL): void;
    reload(): void;
    /** @param {string|URL} url */
    replace(url: string | URL): void;
}
export class EventSource {
    /**
     * @param {URL | string} _url
     * @param {EventSourceInit} [_init]
     */
    constructor(_url: URL | string, _init?: EventSourceInit | undefined);
    CONNECTING: number;
    OPEN: number;
    CLOSED: number;
    addEventListener(): void;
    close(): void;
}
export function reset(): void;
export function toHTML(vDom: HTMLElement, context: string, headers: {
    [key: string]: string;
}): string;
export function toText(vDom: HTMLElement): string;
//# sourceMappingURL=minidom.d.ts.map