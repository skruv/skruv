export function reset(): void;
export function toHTML(vDom: HTMLElement, context: string, headers: {
    [key: string]: string;
}): string;
export function toText(vDom: HTMLElement): string;
declare class HTMLElement {
    /** @param {string} nodeName */
    constructor(nodeName: string, data?: string);
    skruvMock: boolean;
    /** @type {HTMLElement[]} */
    childNodes: HTMLElement[];
    /** @type {{ [key: string]: string; }} */
    attributes: {
        [key: string]: string;
    };
    /** @type {HTMLElement?} */
    parentNode: HTMLElement | null;
    /** @type {{ [key: string]: function; }} */
    eventListeners: {
        [key: string]: Function;
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
    nodeName: string | undefined;
    data: string;
    /**
     * @param {HTMLElement} newNode
     * @param {HTMLElement} oldNode
     */
    replaceChild(newNode: HTMLElement, oldNode: HTMLElement): void;
    /** @param {HTMLElement} node */
    append(node: HTMLElement): void;
    /** @param {HTMLElement} node */
    prepend(node: HTMLElement): void;
    /** @param {HTMLElement} node */
    after(node: HTMLElement): void;
    /** @param {HTMLElement} node */
    removeChild(node: HTMLElement): void;
    getAttributeNames(): string[];
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
     * @param {any} value
     */
    addEventListener(name: string | number, value: any): void;
    /** @param {any} event */
    dispatchEvent(event: any): void;
    /** @param {HTMLElement} node */
    contains(node: HTMLElement): boolean;
    get innerHTML(): string;
    get textContent(): string;
}
declare class Text extends HTMLElement {
    constructor(data?: string);
}
export {};
//# sourceMappingURL=minidom.d.ts.map