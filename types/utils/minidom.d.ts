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
         * @param {htmlNS|svgNS|mathmlNS} ns
         * @param {string} nodeName
         * @returns {Element}
         */
        createElementNS: (ns: "http://www.w3.org/1999/xhtml" | "http://www.w3.org/2000/svg" | "http://www.w3.org/1998/Math/MathML", nodeName: string) => Element;
        querySelector: () => null;
        querySelectorAll: () => never[];
    };
    nodeName: string;
    data: string;
    isSvg: boolean;
    /**
     * @param {Element} newNode
     * @param {Element} oldNode
     */
    replaceChild(newNode: Element, oldNode: Element): void;
    /** @param {Element} node */
    appendChild(node: Element): void;
    /** @param {Element} node */
    removeChild(node: Element): void;
    /**
     * @param {Element} newNode
     * @param {Element} oldNode
     */
    insertBefore(newNode: Element, oldNode: Element): void;
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
export class HTMLElement extends Element {
}
export class SVGElement extends Element {
}
export class MathMLElement extends Element {
}
export class HTMLOptionElement extends HTMLElement {
}
export class HTMLInputElement extends HTMLElement {
}
export class Text extends Element {
}
export class Comment extends Element {
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