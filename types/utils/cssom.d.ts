declare namespace _default {
    export { CSSStyleDeclaration };
    export { CSSRule };
    export { CSSGroupingRule };
    export { CSSConditionRule };
    export { CSSStyleRule };
    export { MediaList };
    export { CSSMediaRule };
    export { CSSSupportsRule };
    export { CSSImportRule };
    export { CSSFontFaceRule };
    export { CSSHostRule };
    export { StyleSheet };
    export { CSSStyleSheet };
    export { CSSKeyframesRule };
    export { CSSKeyframeRule };
    export { MatcherList };
    export { CSSDocumentRule };
    export { CSSValue };
    export { CSSValueExpression };
    export { parse };
    export { clone };
}
export default _default;
/**
 * @see http://www.w3.org/TR/DOM-Level-2-Style/css.html#CSS-CSSStyleDeclaration
 */
declare class CSSStyleDeclaration {
    length: number;
    parentRule: any;
    _importants: {};
    /**
     *
     * @param {string} name
     * @see http://www.w3.org/TR/DOM-Level-2-Style/css.html#CSS-CSSStyleDeclaration-getPropertyValue
     * @return {string} the value of the property if it has been explicitly set for this declaration block.
     * Returns the empty string if the property has not been set.
     */
    getPropertyValue(name: string): string;
    /**
     *
     * @param {string} name
     * @param {string} value
     * @param {string} [priority=null] "important" or null
     * @see http://www.w3.org/TR/DOM-Level-2-Style/css.html#CSS-CSSStyleDeclaration-setProperty
     */
    setProperty(name: string, value: string, priority?: string | undefined): void;
    /**
     *
     * @param {string} name
     * @see http://www.w3.org/TR/DOM-Level-2-Style/css.html#CSS-CSSStyleDeclaration-removeProperty
     * @return {string} the value of the property if it has been explicitly set for this declaration block.
     * Returns the empty string if the property has not been set or the property name does not correspond to a known CSS property.
     */
    removeProperty(name: string): string;
    getPropertyCSSValue(): void;
    /**
     *
     * @param {String} name
     */
    getPropertyPriority(name: string): any;
    /**
     *   element.style.overflow = "auto"
     *   element.style.getPropertyShorthand("overflow-x")
     *   -> "overflow"
     */
    getPropertyShorthand(): void;
    isPropertyImplicit(): void;
    set cssText(arg: string);
    get cssText(): string;
}
/**
 * @see http://dev.w3.org/csswg/cssom/#the-cssrule-interface
 * @see http://www.w3.org/TR/DOM-Level-2-Style/css.html#CSS-CSSRule
 */
declare class CSSRule {
    parentRule: any;
    parentStyleSheet: any;
    UNKNOWN_RULE: number;
    STYLE_RULE: number;
    CHARSET_RULE: number;
    IMPORT_RULE: number;
    MEDIA_RULE: number;
    FONT_FACE_RULE: number;
    PAGE_RULE: number;
    KEYFRAMES_RULE: number;
    KEYFRAME_RULE: number;
    MARGIN_RULE: number;
    NAMESPACE_RULE: number;
    COUNTER_STYLE_RULE: number;
    SUPPORTS_RULE: number;
    DOCUMENT_RULE: number;
    FONT_FEATURE_VALUES_RULE: number;
    VIEWPORT_RULE: number;
    REGION_STYLE_RULE: number;
}
/**
 * @see https://drafts.csswg.org/cssom/#the-cssgroupingrule-interface
 */
declare class CSSGroupingRule extends CSSRule {
    cssRules: any[];
    /**
     * Used to insert a new CSS rule to a list of CSS rules.
     *
     * @example
     *   cssGroupingRule.cssText
     *   -> "body{margin:0;}"
     *   cssGroupingRule.insertRule("img{border:none;}", 1)
     *   -> 1
     *   cssGroupingRule.cssText
     *   -> "body{margin:0;}img{border:none;}"
     *
     * @param {string} rule
     * @param {number} [index]
     * @see https://www.w3.org/TR/cssom-1/#dom-cssgroupingrule-insertrule
     * @return {number} The index within the grouping rule's collection of the newly inserted rule.
     */
    insertRule(rule: string, index?: number | undefined): number;
    /**
     * Used to delete a rule from the grouping rule.
     *
     *   cssGroupingRule.cssText
     *   -> "img{border:none;}body{margin:0;}"
     *   cssGroupingRule.deleteRule(0)
     *   cssGroupingRule.cssText
     *   -> "body{margin:0;}"
     *
     * @param {number} index within the grouping rule's rule list of the rule to remove.
     * @see https://www.w3.org/TR/cssom-1/#dom-cssgroupingrule-deleterule
     */
    deleteRule(index: number): void;
}
/**
 * @see https://www.w3.org/TR/css-conditional-3/#the-cssconditionrule-interface
 */
declare class CSSConditionRule extends CSSGroupingRule {
    conditionText: string;
    set cssText(arg: any);
    get cssText(): any;
}
/**
 * @constructor
 * @see http://dev.w3.org/csswg/cssom/#cssstylerule
 * @see http://www.w3.org/TR/DOM-Level-2-Style/css.html#CSS-CSSStyleRule
 */
declare class CSSStyleRule extends CSSRule {
    selectorText: string;
    style: CSSStyleDeclaration;
    type: number;
    set cssText(arg: string);
    get cssText(): string;
    /**
     * NON-STANDARD
     * lightweight version of parse.js.
     * @param {string} ruleText
     * @return CSSStyleRule
     */
    parse(ruleText: string): CSSStyleRule;
}
/**
 * @see http://dev.w3.org/csswg/cssom/#the-medialist-interface
 */
declare class MediaList {
    length: number;
    /**
     * @param {string} value
     */
    set mediaText(arg: string);
    /**
   * @return {string}
   */
    get mediaText(): string;
    /**
     * @param {string} medium
     */
    appendMedium(medium: string): void;
    /**
     * @param {string} medium
     */
    deleteMedium(medium: string): void;
}
/**
 * @see http://dev.w3.org/csswg/cssom/#cssmediarule
 * @see http://www.w3.org/TR/DOM-Level-2-Style/css.html#CSS-CSSMediaRule
 */
declare class CSSMediaRule extends CSSConditionRule {
    media: MediaList;
    type: number;
    get cssText(): string;
}
/**
 * @see https://drafts.csswg.org/css-conditional-3/#the-csssupportsrule-interface
 */
declare class CSSSupportsRule extends CSSConditionRule {
    type: number;
    get cssText(): string;
}
/**
 * @constructor
 * @see http://dev.w3.org/csswg/cssom/#cssimportrule
 * @see http://www.w3.org/TR/DOM-Level-2-Style/css.html#CSS-CSSImportRule
 */
declare class CSSImportRule extends CSSRule {
    href: string;
    media: MediaList;
    styleSheet: CSSStyleSheet;
    type: number;
    set cssText(arg: string);
    get cssText(): string;
}
/**
 * @see http://dev.w3.org/csswg/cssom/#css-font-face-rule
 */
declare class CSSFontFaceRule extends CSSRule {
    style: CSSStyleDeclaration;
    type: number;
    get cssText(): string;
}
/**
 * @see http://www.w3.org/TR/shadow-dom/#host-at-rule
 */
declare class CSSHostRule extends CSSRule {
    cssRules: any[];
    type: number;
    get cssText(): string;
}
/**
 * @see http://dev.w3.org/csswg/cssom/#the-stylesheet-interface
 */
declare class StyleSheet {
    parentStyleSheet: any;
}
/**
 * @constructor
 * @see http://www.w3.org/TR/DOM-Level-2-Style/css.html#CSS-CSSStyleSheet
 */
declare class CSSStyleSheet extends StyleSheet {
    cssRules: any[];
    /**
    * Used to insert a new rule into the style sheet. The new rule now becomes part of the cascade.
    *
    *   sheet = new Sheet("body {margin: 0}")
    *   sheet.toString()
    *   -> "body{margin:0;}"
    *   sheet.insertRule("img {border: none}", 0)
    *   -> 0
    *   sheet.toString()
    *   -> "img{border:none;}body{margin:0;}"
    *
    * @param {string} rule
    * @param {number} index
    * @see http://www.w3.org/TR/DOM-Level-2-Style/css.html#CSS-CSSStyleSheet-insertRule
    * @return {number} The index within the style sheet's rule collection of the newly inserted rule.
    */
    insertRule(rule: string, index: number): number;
    /**
     * Used to delete a rule from the style sheet.
     *
     *   sheet = new Sheet("img{border:none} body{margin:0}")
     *   sheet.toString()
     *   -> "img{border:none;}body{margin:0;}"
     *   sheet.deleteRule(0)
     *   sheet.toString()
     *   -> "body{margin:0;}"
     *
     * @param {number} index within the style sheet's rule list of the rule to remove.
     * @see http://www.w3.org/TR/DOM-Level-2-Style/css.html#CSS-CSSStyleSheet-deleteRule
     */
    deleteRule(index: number): void;
}
/**
 * @constructor
 * @see http://www.w3.org/TR/css3-animations/#DOM-CSSKeyframesRule
 */
declare class CSSKeyframesRule extends CSSRule {
    name: string;
    cssRules: any[];
    type: number;
    get cssText(): string;
}
/**
 * @constructor
 * @see http://www.w3.org/TR/css3-animations/#DOM-CSSKeyframeRule
 */
declare class CSSKeyframeRule extends CSSRule {
    keyText: string;
    style: CSSStyleDeclaration;
    type: number;
    get cssText(): string;
}
/**
 * @see https://developer.mozilla.org/en/CSS/@-moz-document
 */
declare class MatcherList {
    length: number;
    /**
     * @param {string} value
     */
    set matcherText(arg: string);
    /**
   * @return {string}
   */
    get matcherText(): string;
    /**
     * @param {string} matcher
     */
    appendMatcher(matcher: string): void;
    /**
     * @param {string} matcher
     */
    deleteMatcher(matcher: string): void;
}
/**
 * @constructor
 * @see https://developer.mozilla.org/en/CSS/@-moz-document
 */
declare class CSSDocumentRule extends CSSRule {
    matcher: MatcherList;
    cssRules: any[];
    type: number;
    get cssText(): string;
}
/**
 * @constructor
 * @see http://www.w3.org/TR/DOM-Level-2-Style/css.html#CSS-CSSValue
 *
 * TODO: add if needed
 */
declare class CSSValue {
    set cssText(arg: void);
    get cssText(): void;
    _getConstructorName(): string;
}
/**
 * @constructor
 * @see http://msdn.microsoft.com/en-us/library/ms537634(v=vs.85).aspx
 *
 */
declare class CSSValueExpression extends CSSValue {
    constructor(token: any, idx: any);
    _token: any;
    _idx: any;
    /**
     * parse css expression() value
     *
     * @return {Object}
     *         - error:
     *         or
     *         - idx:
     *         - expression:
     *
     * Example:
     *
     * .selector {
     *    zoom: expression(documentElement.clientWidth > 1000 ? '1000px' : 'auto');
    * }
    */
    parse(): Object;
    /**
     *
     * @return {Object|false}
     *          - idx:
     *          - text:
     *          or
     *          - error:
     *          or
     *          false
     *
     */
    _parseJSComment(token: any, idx: any): Object | false;
    /**
     *
     * @return {Object|false}
     *          - idx:
     *          - text:
     *          or
     *          false
     *
     */
    _parseJSString(token: any, idx: any, sep: any): Object | false;
    /**
     * parse regexp in css expression
     *
     * @return {Object|false}
     *        - idx:
     *        - regExp:
     *        or
     *        false
     */
    _parseJSRexExp(token: any, idx: any): Object | false;
    /**
     *
     * find next sep(same line) index in `token`
     *
     * @return {Number}
     *
     */
    _findMatchedIdx(token: any, idx: any, sep: any): number;
}
/**
 * @param {string} token
 */
declare function parse(token: string): CSSStyleSheet;
/**
 * Produces a deep copy of stylesheet — the instance variables of stylesheet are copied recursively.
 * @param {CSSStyleSheet} stylesheet
 * @nosideeffects
 * @return {CSSStyleSheet}
 */
declare function clone(stylesheet: CSSStyleSheet): CSSStyleSheet;
//# sourceMappingURL=cssom.d.ts.map