/** @type {Record<string,string>} */
declare const reactMappings: Record<string, string>;
declare function camelize(s: any): any;
declare function typeMapping(t: any): any;
declare const types: any;
declare const parsed: any;
declare var elementGroups: {
    name: string;
    children: string[];
}[];
declare var SVGElements: string[];
declare var SVGAttributesMap: {};
declare var MathMLElements: string[];
declare var MathMLAttributesMap: {
    'annotation-xml': {
        encoding: string;
        src: string;
    };
    annotation: {
        encoding: string;
        src: string;
    };
    maction: {
        actiontype: string;
        selection: string;
    };
    math: {
        display: string;
    };
    menclose: {
        notation: string;
    };
    merror: {};
    mfenced: {
        close: string;
        open: string;
        separators: string;
    };
    mfrac: {
        denomalign: string;
        linethickness: string;
        numalign: string;
    };
    mi: {};
    mmultiscripts: {
        subscriptshift: string;
        superscriptshift: string;
    };
    mn: {};
    mo: {
        accent: string;
        fence: string;
        largeop: string;
        lspace: string;
        maxsize: string;
        minsize: string;
        movablelimits: string;
        rspace: string;
        separator: string;
        stretchy: string;
        symmetric: string;
    };
    mover: {
        accent: string;
    };
    mpadded: {
        depth: string;
        height: string;
        lspace: string;
        voffset: string;
        width: string;
    };
    mphantom: {};
    mprescripts: {};
    mroot: {};
    mrow: {};
    ms: {
        lquote: string;
        rquote: string;
    };
    mspace: {
        depth: string;
        height: string;
        width: string;
    };
    msqrt: {};
    mstyle: {
        background: string;
        color: string;
        fontsize: string;
        fontstyle: string;
        fontweight: string;
        scriptminsize: string;
        scriptsizemultiplier: string;
    };
    msub: {
        subscriptshift: string;
    };
    msubsup: {
        subscriptshift: string;
        superscriptshift: string;
    };
    msup: {
        superscriptshift: string;
    };
    mtable: {
        align: string;
        columnalign: string;
        columnlines: string;
        frame: string;
        framespacing: string;
        rowalign: string;
        rowlines: string;
        rowspacing: string;
        width: string;
    };
    mtd: {
        columnspan: string;
        rowspan: string;
        columnalign: string;
        rowalign: string;
    };
    mtext: {};
    mtr: {
        columnalign: string;
        rowalign: string;
    };
    munder: {
        accentunder: string;
    };
    munderover: {
        accent: string;
        accentunder: string;
    };
    semantics: {
        encoding: string;
        src: string;
    };
};
declare function toElementName(e: any): any;
//# sourceMappingURL=generate-spec.js.d.ts.map