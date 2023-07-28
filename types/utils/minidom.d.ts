export function reset(): void;
export function toHTML(vDom: HTMLElement, context: string, headers: {
    [key: string]: string;
}): string;
export function toText(vDom: HTMLElement): string;
declare class HTMLElement extends Element {
}
declare class Element {
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
    get textContent(): string;
}
declare class Text extends HTMLElement {
}
export {};
//# sourceMappingURL=minidom.d.ts.map