// @ts-nocheck

// Copyright (c) Nikita Vasilyev

// Permission is hereby granted, free of charge, to any person obtaining
// a copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to
// permit persons to whom the Software is furnished to do so, subject to
// the following conditions:

// The above copyright notice and this permission notice shall be
// included in all copies or substantial portions of the Software.

// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
// EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
// NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
// LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
// OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
// WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

/**
 * @see http://www.w3.org/TR/DOM-Level-2-Style/css.html#CSS-CSSStyleDeclaration
 */
class CSSStyleDeclaration {
  constructor () {
    this.length = 0
    this.parentRule = null

    // NON-STANDARD
    this._importants = {}
  }

  /**
   *
   * @param {string} name
   * @see http://www.w3.org/TR/DOM-Level-2-Style/css.html#CSS-CSSStyleDeclaration-getPropertyValue
   * @return {string} the value of the property if it has been explicitly set for this declaration block.
   * Returns the empty string if the property has not been set.
   */
  getPropertyValue (name) {
    return this[name] || ''
  }

  /**
   *
   * @param {string} name
   * @param {string} value
   * @param {string} [priority=null] "important" or null
   * @see http://www.w3.org/TR/DOM-Level-2-Style/css.html#CSS-CSSStyleDeclaration-setProperty
   */
  setProperty (name, value, priority) {
    if (this[name]) {
      // Property already exist. Overwrite it.
      var index = Array.prototype.indexOf.call(this, name)
      if (index < 0) {
        this[this.length] = name
        this.length++
      }
    } else {
      // New property.
      this[this.length] = name
      this.length++
    }
    this[name] = value + ''
    this._importants[name] = priority
  }

  /**
   *
   * @param {string} name
   * @see http://www.w3.org/TR/DOM-Level-2-Style/css.html#CSS-CSSStyleDeclaration-removeProperty
   * @return {string} the value of the property if it has been explicitly set for this declaration block.
   * Returns the empty string if the property has not been set or the property name does not correspond to a known CSS property.
   */
  removeProperty (name) {
    if (!(name in this)) {
      return ''
    }
    var index = Array.prototype.indexOf.call(this, name)
    if (index < 0) {
      return ''
    }
    var prevValue = this[name]
    this[name] = ''

    // That's what WebKit and Opera do
    Array.prototype.splice.call(this, index, 1)

    // That's what Firefox does
    // this[index] = ""

    return prevValue
  }

  getPropertyCSSValue () {
    // FIXME
  }

  /**
   *
   * @param {String} name
   */
  getPropertyPriority (name) {
    return this._importants[name] || ''
  }

  /**
   *   element.style.overflow = "auto"
   *   element.style.getPropertyShorthand("overflow-x")
   *   -> "overflow"
   */
  getPropertyShorthand () {
    // FIXME
  }

  isPropertyImplicit () {
    // FIXME
  }

  // Doesn't work in IE < 9
  get cssText () {
    var properties = []
    for (var i = 0, length = this.length; i < length; ++i) {
      var name = this[i]
      var value = this.getPropertyValue(name)
      var priority = this.getPropertyPriority(name)
      if (priority) {
        priority = ' !' + priority
      }
      properties[i] = name + ': ' + value + priority + ';'
    }
    return properties.join(' ')
  }

  set cssText (text) {
    var i, name
    for (i = this.length; i--;) {
      name = this[i]
      this[name] = ''
    }
    Array.prototype.splice.call(this, 0, this.length)
    this._importants = {}

    var dummyRule = parse('#bogus{' + text + '}').cssRules[0].style
    var length = dummyRule.length
    for (i = 0; i < length; ++i) {
      name = dummyRule[i]
      this.setProperty(dummyRule[i], dummyRule.getPropertyValue(name), dummyRule.getPropertyPriority(name))
    }
  }
}

/**
 * @see http://dev.w3.org/csswg/cssom/#the-cssrule-interface
 * @see http://www.w3.org/TR/DOM-Level-2-Style/css.html#CSS-CSSRule
 */
class CSSRule {
  constructor () {
    this.parentRule = null
    this.parentStyleSheet = null
    this.UNKNOWN_RULE = 0 // obsolete
    this.STYLE_RULE = 1
    this.CHARSET_RULE = 2 // obsolete
    this.IMPORT_RULE = 3
    this.MEDIA_RULE = 4
    this.FONT_FACE_RULE = 5
    this.PAGE_RULE = 6
    this.KEYFRAMES_RULE = 7
    this.KEYFRAME_RULE = 8
    this.MARGIN_RULE = 9
    this.NAMESPACE_RULE = 10
    this.COUNTER_STYLE_RULE = 11
    this.SUPPORTS_RULE = 12
    this.DOCUMENT_RULE = 13
    this.FONT_FEATURE_VALUES_RULE = 14
    this.VIEWPORT_RULE = 15
    this.REGION_STYLE_RULE = 16
  }
  // FIXME
}

/**
 * @see https://drafts.csswg.org/cssom/#the-cssgroupingrule-interface
 */
class CSSGroupingRule extends CSSRule {
  constructor () {
    super()
    this.cssRules = []
  }

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
  insertRule (rule, index) {
    if (index < 0 || index > this.cssRules.length) {
      throw new RangeError('INDEX_SIZE_ERR')
    }
    var cssRule = parse(rule).cssRules[0]
    cssRule.parentRule = this
    this.cssRules.splice(index, 0, cssRule)
    return index
  }

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
  deleteRule (index) {
    if (index < 0 || index >= this.cssRules.length) {
      throw new RangeError('INDEX_SIZE_ERR')
    }
    this.cssRules.splice(index, 1)[0].parentRule = null
  }
}

/**
 * @see https://www.w3.org/TR/css-conditional-3/#the-cssconditionrule-interface
 */
class CSSConditionRule extends CSSGroupingRule {
  constructor () {
    super()
    this.conditionText = ''
    this.cssRules = []
  }

  set cssText (cssText) {
    this.cssText = cssText
  }

  get cssText () {
    return this.cssText
  }
}

/**
 * @constructor
 * @see http://dev.w3.org/csswg/cssom/#cssstylerule
 * @see http://www.w3.org/TR/DOM-Level-2-Style/css.html#CSS-CSSStyleRule
 */
class CSSStyleRule extends CSSRule {
  constructor () {
    super()
    this.selectorText = ''
    this.style = new CSSStyleDeclaration()
    this.style.parentRule = this
    this.type = 1
  }

  get cssText () {
    var text
    if (this.selectorText) {
      text = this.selectorText + ' {' + this.style.cssText + '}'
    } else {
      text = ''
    }
    return text
  }

  set cssText (cssText) {
    var _rule = new CSSStyleRule()
    var rule = _rule.parse(cssText)
    this.style = rule.style
    this.selectorText = rule.selectorText
  }

  /**
   * NON-STANDARD
   * lightweight version of parse.js.
   * @param {string} ruleText
   * @return CSSStyleRule
   */
  parse (ruleText) {
    var i = 0
    var state = 'selector'
    var index
    var j = i
    var buffer = ''

    var SIGNIFICANT_WHITESPACE = {
      selector: true,
      value: true
    }

    var styleRule = new CSSStyleRule()
    var name; var
      priority = ''

    for (var character; (character = ruleText.charAt(i)); i++) {
      switch (character) {
        case ' ':
        case '\t':
        case '\r':
        case '\n':
        case '\f':
          if (SIGNIFICANT_WHITESPACE[state]) {
            // Squash 2 or more white-spaces in the row into 1
            switch (ruleText.charAt(i - 1)) {
              case ' ':
              case '\t':
              case '\r':
              case '\n':
              case '\f':
                break
              default:
                buffer += ' '
                break
            }
          }
          break

        // String
        case '"':
          j = i + 1
          index = ruleText.indexOf('"', j) + 1
          if (!index) {
            throw new Error('" is missing')
          }
          buffer += ruleText.slice(i, index)
          i = index - 1
          break

        case "'":
          j = i + 1
          index = ruleText.indexOf("'", j) + 1
          if (!index) {
            throw new Error("' is missing")
          }
          buffer += ruleText.slice(i, index)
          i = index - 1
          break

        // Comment
        case '/':
          if (ruleText.charAt(i + 1) === '*') {
            i += 2
            index = ruleText.indexOf('*/', i)
            if (index === -1) {
              throw new SyntaxError('Missing */')
            } else {
              i = index + 1
            }
          } else {
            buffer += character
          }
          break

        case '{':
          if (state === 'selector') {
            styleRule.selectorText = buffer.trim()
            buffer = ''
            state = 'name'
          }
          break

        case ':':
          if (state === 'name') {
            name = buffer.trim()
            buffer = ''
            state = 'value'
          } else {
            buffer += character
          }
          break

        case '!':
          if (state === 'value' && ruleText.indexOf('!important', i) === i) {
            priority = 'important'
            i += 'important'.length
          } else {
            buffer += character
          }
          break

        case ';':
          if (state === 'value') {
            styleRule.style.setProperty(name, buffer.trim(), priority)
            priority = ''
            buffer = ''
            state = 'name'
          } else {
            buffer += character
          }
          break

        case '}':
          if (state === 'value') {
            styleRule.style.setProperty(name, buffer.trim(), priority)
            priority = ''
            buffer = ''
          } else if (state === 'name') {
            break
          } else {
            buffer += character
          }
          state = 'selector'
          break

        default:
          buffer += character
          break
      }
    }
    return styleRule
  }
}

/**
 * @see http://dev.w3.org/csswg/cssom/#the-medialist-interface
 */
class MediaList {
  constructor () {
    this.length = 0
  }

  /**
 * @return {string}
 */
  get mediaText () {
    return Array.prototype.join.call(this, ', ')
  }

  /**
   * @param {string} value
   */
  set mediaText (value) {
    var values = value.split(',')
    var length = this.length = values.length
    for (var i = 0; i < length; i++) {
      this[i] = values[i].trim()
    }
  }

  /**
   * @param {string} medium
   */
  appendMedium (medium) {
    if (Array.prototype.indexOf.call(this, medium) === -1) {
      this[this.length] = medium
      this.length++
    }
  }

  /**
   * @param {string} medium
   */
  deleteMedium (medium) {
    var index = Array.prototype.indexOf.call(this, medium)
    if (index !== -1) {
      Array.prototype.splice.call(this, index, 1)
    }
  }
}

/**
 * @see http://dev.w3.org/csswg/cssom/#cssmediarule
 * @see http://www.w3.org/TR/DOM-Level-2-Style/css.html#CSS-CSSMediaRule
 */
class CSSMediaRule extends CSSConditionRule {
  constructor () {
    super()
    this.media = new MediaList()
    this.type = 4
  }

  // https://opensource.apple.com/source/WebCore/WebCore-7611.1.21.161.3/css/CSSMediaRule.cpp
  get conditionText () {
    return this.media.mediaText
  }

  set conditionText (value) {
    if (!this.media) { this.media = new MediaList() }
    this.media.mediaText = value
  }

  get cssText () {
    var cssTexts = []
    for (var i = 0, length = this.cssRules.length; i < length; i++) {
      cssTexts.push(this.cssRules[i].cssText)
    }
    return '@media ' + this.media.mediaText + ' {' + cssTexts.join('') + '}'
  }
}

/**
 * @see https://drafts.csswg.org/css-conditional-3/#the-csssupportsrule-interface
 */
class CSSSupportsRule extends CSSConditionRule {
  constructor () {
    super()
    this.type = 12
  }

  get cssText () {
    var cssTexts = []

    for (var i = 0, length = this.cssRules.length; i < length; i++) {
      cssTexts.push(this.cssRules[i].cssText)
    }

    return '@supports ' + this.conditionText + ' {' + cssTexts.join('') + '}'
  }
}

/**
 * @constructor
 * @see http://dev.w3.org/csswg/cssom/#cssimportrule
 * @see http://www.w3.org/TR/DOM-Level-2-Style/css.html#CSS-CSSImportRule
 */

class CSSImportRule extends CSSRule {
  constructor () {
    super()
    this.href = ''
    this.media = new MediaList()
    this.styleSheet = new CSSStyleSheet()
    this.type = 3
  }

  get cssText () {
    var mediaText = this.media.mediaText
    return '@import url(' + this.href + ')' + (mediaText ? ' ' + mediaText : '') + ';'
  }

  set cssText (cssText) {
    var i = 0

    /**
     * @import url(partial.css) screen, handheld;
     *        ||               |
     *        after-import     media
     *         |
     *         url
     */
    var state = ''

    var buffer = ''
    var index
    for (var character; (character = cssText.charAt(i)); i++) {
      switch (character) {
        case ' ':
        case '\t':
        case '\r':
        case '\n':
        case '\f':
          if (state === 'after-import') {
            state = 'url'
          } else {
            buffer += character
          }
          break

        case '@':
          if (!state && cssText.indexOf('@import', i) === i) {
            state = 'after-import'
            i += 'import'.length
            buffer = ''
          }
          break

        case 'u':
          if (state === 'url' && cssText.indexOf('url(', i) === i) {
            index = cssText.indexOf(')', i + 1)
            if (index === -1) {
              throw new Error(i + ': ")" not found')
            }
            i += 'url('.length
            var url = cssText.slice(i, index)
            if (url[0] === url[url.length - 1]) {
              if (url[0] === '"' || url[0] === "'") {
                url = url.slice(1, -1)
              }
            }
            this.href = url
            i = index
            state = 'media'
          }
          break

        case '"':
          if (state === 'url') {
            index = cssText.indexOf('"', i + 1)
            if (!index) {
              throw new Error(i + ": '\"' not found")
            }
            this.href = cssText.slice(i + 1, index)
            i = index
            state = 'media'
          }
          break

        case "'":
          if (state === 'url') {
            index = cssText.indexOf("'", i + 1)
            if (!index) {
              throw new Error(i + ': "\'" not found')
            }
            this.href = cssText.slice(i + 1, index)
            i = index
            state = 'media'
          }
          break

        case ';':
          if (state === 'media') {
            if (buffer) {
              this.media.mediaText = buffer.trim()
            }
          }
          break

        default:
          if (state === 'media') {
            buffer += character
          }
          break
      }
    }
  }
}

/**
 * @see http://dev.w3.org/csswg/cssom/#css-font-face-rule
 */
class CSSFontFaceRule extends CSSRule {
  constructor () {
    super()
    this.style = new CSSStyleDeclaration()
    this.style.parentRule = this
    this.type = 5
  }

  // FIXME
  // CSSOM.CSSFontFaceRule.prototype.insertRule = CSSStyleSheet.prototype.insertRule;
  // CSSOM.CSSFontFaceRule.prototype.deleteRule = CSSStyleSheet.prototype.deleteRule;
  get cssText () {
    return '@font-face {' + this.style.cssText + '}'
  }
}

/**
 * @see http://www.w3.org/TR/shadow-dom/#host-at-rule
 */
class CSSHostRule extends CSSRule {
  constructor () {
    super()
    this.cssRules = []
    this.type = 1001
  }

  // FIXME
  // CSSOM.CSSHostRule.prototype.insertRule = CSSStyleSheet.prototype.insertRule;
  // CSSOM.CSSHostRule.prototype.deleteRule = CSSStyleSheet.prototype.deleteRule;
  get cssText () {
    var cssTexts = []
    for (var i = 0, length = this.cssRules.length; i < length; i++) {
      cssTexts.push(this.cssRules[i].cssText)
    }
    return '@host {' + cssTexts.join('') + '}'
  }
}

/**
 * @see http://dev.w3.org/csswg/cssom/#the-stylesheet-interface
 */
class StyleSheet {
  constructor () {
    this.parentStyleSheet = null
  }
}

/**
 * @constructor
 * @see http://www.w3.org/TR/DOM-Level-2-Style/css.html#CSS-CSSStyleSheet
 */
class CSSStyleSheet extends StyleSheet {
  constructor () {
    super()
    this.cssRules = []
  }

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
  insertRule (rule, index) {
    if (index < 0 || index > this.cssRules.length) {
      throw new RangeError('INDEX_SIZE_ERR')
    }
    var cssRule = parse(rule).cssRules[0]
    cssRule.parentStyleSheet = this
    this.cssRules.splice(index, 0, cssRule)
    return index
  }

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
  deleteRule (index) {
    if (index < 0 || index >= this.cssRules.length) {
      throw new RangeError('INDEX_SIZE_ERR')
    }
    this.cssRules.splice(index, 1)
  }

  /**
 * NON-STANDARD
 * @return {string} serialize stylesheet
 */
  toString () {
    var result = ''
    var rules = this.cssRules
    for (var i = 0; i < rules.length; i++) {
      result += rules[i].cssText + '\n'
    }
    return result
  }
}

/**
 * @constructor
 * @see http://www.w3.org/TR/css3-animations/#DOM-CSSKeyframesRule
 */
class CSSKeyframesRule extends CSSRule {
  constructor () {
    super()
    this.name = ''
    this.cssRules = []
    this.type = 7
  }

  // FIXME
  // CSSOM.CSSKeyframesRule.prototype.insertRule = CSSStyleSheet.prototype.insertRule;
  // CSSOM.CSSKeyframesRule.prototype.deleteRule = CSSStyleSheet.prototype.deleteRule;
  get cssText () {
    var cssTexts = []
    for (var i = 0, length = this.cssRules.length; i < length; i++) {
      cssTexts.push('  ' + this.cssRules[i].cssText)
    }
    return '@' + (this._vendorPrefix || '') + 'keyframes ' + this.name + ' { \n' + cssTexts.join('\n') + '\n}'
  }
}

/**
 * @constructor
 * @see http://www.w3.org/TR/css3-animations/#DOM-CSSKeyframeRule
 */
class CSSKeyframeRule extends CSSRule {
  constructor () {
    super()
    this.keyText = ''
    this.style = new CSSStyleDeclaration()
    this.style.parentRule = this
    this.type = 8
  }

  // FIXME
  // CSSOM.CSSKeyframeRule.prototype.insertRule = CSSStyleSheet.prototype.insertRule;
  // CSSOM.CSSKeyframeRule.prototype.deleteRule = CSSStyleSheet.prototype.deleteRule;
  get cssText () {
    return this.keyText + ' {' + this.style.cssText + '} '
  }
}

/**
 * @see https://developer.mozilla.org/en/CSS/@-moz-document
 */
class MatcherList {
  constructor () {
    this.length = 0
  }

  /**
 * @return {string}
 */
  get matcherText () {
    return Array.prototype.join.call(this, ', ')
  }

  /**
   * @param {string} value
   */
  set matcherText (value) {
    // just a temporary solution, actually it may be wrong by just split the value with ',', because a url can include ','.
    var values = value.split(',')
    var length = this.length = values.length
    for (var i = 0; i < length; i++) {
      this[i] = values[i].trim()
    }
  }

  /**
   * @param {string} matcher
   */
  appendMatcher (matcher) {
    if (Array.prototype.indexOf.call(this, matcher) === -1) {
      this[this.length] = matcher
      this.length++
    }
  }

  /**
   * @param {string} matcher
   */
  deleteMatcher (matcher) {
    var index = Array.prototype.indexOf.call(this, matcher)
    if (index !== -1) {
      Array.prototype.splice.call(this, index, 1)
    }
  }
}

/**
 * @constructor
 * @see https://developer.mozilla.org/en/CSS/@-moz-document
 */

class CSSDocumentRule extends CSSRule {
  constructor () {
    super()
    this.matcher = new MatcherList()
    this.cssRules = []
    this.type = 10
  }

  // FIXME
  // CSSOM.CSSDocumentRule.prototype.insertRule = CSSStyleSheet.prototype.insertRule;
  // CSSOM.CSSDocumentRule.prototype.deleteRule = CSSStyleSheet.prototype.deleteRule;
  get cssText () {
    var cssTexts = []
    for (var i = 0, length = this.cssRules.length; i < length; i++) {
      cssTexts.push(this.cssRules[i].cssText)
    }
    return '@-moz-document ' + this.matcher.matcherText + ' {' + cssTexts.join('') + '}'
  }
}

/**
 * @constructor
 * @see http://www.w3.org/TR/DOM-Level-2-Style/css.html#CSS-CSSValue
 */
class CSSValue {
  // @see: http://www.w3.org/TR/DOM-Level-2-Style/css.html#CSS-CSSValue
  set cssText (text) {
    var name = this._getConstructorName()

    throw new Error('DOMException: property "cssText" of "' + name + '" is readonly and can not be replaced with "' + text + '"!')
  }

  get cssText () {
    var name = this._getConstructorName()

    throw new Error('getter "cssText" of "' + name + '" is not implemented!')
  }

  _getConstructorName () {
    var s = this.constructor.toString()
    var c = s.match(/function\s([^(]+)/)
    var name = c[1]

    return name
  }
}

/**
 * @constructor
 * @see http://msdn.microsoft.com/en-us/library/ms537634(v=vs.85).aspx
 *
 */
class CSSValueExpression extends CSSValue {
  constructor (token, idx) {
    super()
    this._token = token
    this._idx = idx
  }

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
  parse () {
    var token = this._token
    var idx = this._idx

    var character = ''
    var expression = ''
    var error = ''
    var info
    var paren = []

    for (; ; ++idx) {
      character = token.charAt(idx)

      // end of token
      if (character === '') {
        error = 'css expression error: unfinished expression!'
        break
      }

      switch (character) {
        case '(':
          paren.push(character)
          expression += character
          break

        case ')':
          paren.pop(character)
          expression += character
          break

        case '/':
          if ((info = this._parseJSComment(token, idx))) { // comment?
            if (info.error) {
              error = 'css expression error: unfinished comment in expression!'
            } else {
              idx = info.idx
              // ignore the comment
            }
          } else if ((info = this._parseJSRexExp(token, idx))) { // regexp
            idx = info.idx
            expression += info.text
          } else { // other
            expression += character
          }
          break

        case "'":
        case '"':
          info = this._parseJSString(token, idx, character)
          if (info) { // string
            idx = info.idx
            expression += info.text
          } else {
            expression += character
          }
          break

        default:
          expression += character
          break
      }

      if (error) {
        break
      }

      // end of expression
      if (paren.length === 0) {
        break
      }
    }

    var ret
    if (error) {
      ret = {
        error: error
      }
    } else {
      ret = {
        idx: idx,
        expression: expression
      }
    }

    return ret
  }

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
  _parseJSComment (token, idx) {
    var nextChar = token.charAt(idx + 1)
    var text

    if (nextChar === '/' || nextChar === '*') {
      var startIdx = idx
      var endIdx
      var commentEndChar

      if (nextChar === '/') { // line comment
        commentEndChar = '\n'
      } else if (nextChar === '*') { // block comment
        commentEndChar = '*/'
      }

      endIdx = token.indexOf(commentEndChar, startIdx + 1 + 1)
      if (endIdx !== -1) {
        endIdx = endIdx + commentEndChar.length - 1
        text = token.substring(idx, endIdx + 1)
        return {
          idx: endIdx,
          text: text
        }
      } else {
        var error = 'css expression error: unfinished comment in expression!'
        return {
          error: error
        }
      }
    } else {
      return false
    }
  }

  /**
   *
   * @return {Object|false}
   *          - idx:
   *          - text:
   *          or
   *          false
   *
   */
  _parseJSString (token, idx, sep) {
    var endIdx = this._findMatchedIdx(token, idx, sep)
    var text

    if (endIdx === -1) {
      return false
    } else {
      text = token.substring(idx, endIdx + sep.length)

      return {
        idx: endIdx,
        text: text
      }
    }
  }

  /**
   * parse regexp in css expression
   *
   * @return {Object|false}
   *        - idx:
   *        - regExp:
   *        or
   *        false
   */

  /*

  all legal RegExp

  /a/
  (/a/)
  [/a/]
  [12, /a/]

  !/a/

  +/a/
  -/a/
  * /a/
  / /a/
  %/a/

  ===/a/
  !==/a/
  ==/a/
  !=/a/
  >/a/
  >=/a/
  </a/
  <=/a/

  &/a/
  |/a/
  ^/a/
  ~/a/
  <</a/
  >>/a/
  >>>/a/

  &&/a/
  ||/a/
  ?/a/
  =/a/
  ,/a/

      delete /a/
          in /a/
  instanceof /a/
          new /a/
      typeof /a/
        void /a/

  */
  _parseJSRexExp (token, idx) {
    var before = token.substring(0, idx).replace(/\s+$/, '')
    var legalRegx = [
      /^$/,
      /\($/,
      /\[$/,
      /!$/,
      /\+$/,
      /-$/,
      /\*$/,
      /\/\s+/,
      /%$/,
      /=$/,
      />$/,
      /<$/,
      /&$/,
      /\|$/,
      /\^$/,
      /~$/,
      /\?$/,
      /,$/,
      /delete$/,
      /in$/,
      /instanceof$/,
      /new$/,
      /typeof$/,
      /void$/
    ]

    var isLegal = legalRegx.some(function (reg) {
      return reg.test(before)
    })

    if (!isLegal) {
      return false
    } else {
      var sep = '/'

      // same logic as string
      return this._parseJSString(token, idx, sep)
    }
  }

  /**
   *
   * find next sep(same line) index in `token`
   *
   * @return {Number}
   *
   */
  _findMatchedIdx (token, idx, sep) {
    var startIdx = idx
    var endIdx

    var NOT_FOUND = -1

    while (true) {
      endIdx = token.indexOf(sep, startIdx + 1)

      if (endIdx === -1) { // not found
        endIdx = NOT_FOUND
        break
      } else {
        var text = token.substring(idx + 1, endIdx)
        var matched = text.match(/\\+$/)
        if (!matched || matched[0] % 2 === 0) { // not escaped
          break
        } else {
          startIdx = endIdx
        }
      }
    }

    // boundary must be in the same line(js sting or regexp)
    var nextNewLineIdx = token.indexOf('\n', idx + 1)
    if (nextNewLineIdx < endIdx) {
      endIdx = NOT_FOUND
    }

    return endIdx
  }
}

/**
 * @param {string} token
 */
function parse (token) {
  var i = 0

  /**
    "before-selector" or
    "selector" or
    "atRule" or
    "atBlock" or
    "conditionBlock" or
    "before-name" or
    "name" or
    "before-value" or
    "value"
  */
  var state = 'before-selector'

  var index
  var buffer = ''
  var valueParenthesisDepth = 0

  var SIGNIFICANT_WHITESPACE = {
    selector: true,
    value: true,
    'value-parenthesis': true,
    atRule: true,
    'importRule-begin': true,
    importRule: true,
    atBlock: true,
    conditionBlock: true,
    'documentRule-begin': true
  }

  var styleSheet = new CSSStyleSheet()

  // @type CSSStyleSheet|CSSMediaRule|CSSSupportsRule|CSSFontFaceRule|CSSKeyframesRule|CSSDocumentRule
  var currentScope = styleSheet

  // @type CSSMediaRule|CSSSupportsRule|CSSKeyframesRule|CSSDocumentRule
  var parentRule

  var ancestorRules = []
  var hasAncestors = false
  var prevScope

  var name
  var priority = ''
  var styleRule
  var mediaRule
  var supportsRule
  var importRule
  var fontFaceRule
  var keyframesRule
  var documentRule
  var hostRule

  var atKeyframesRegExp = /@(-(?:\w+-)+)?keyframes/g

  var parseError = function (message) {
    var lines = token.substring(0, i).split('\n')
    var lineCount = lines.length
    var charCount = lines.pop().length + 1
    var error = new Error(message + ' (line ' + lineCount + ', char ' + charCount + ')')
    error.line = lineCount
    /* jshint sub : true */
    error.char = charCount
    error.styleSheet = styleSheet
    throw error
  }

  for (var character; (character = token.charAt(i)); i++) {
    switch (character) {
      case ' ':
      case '\t':
      case '\r':
      case '\n':
      case '\f':
        if (SIGNIFICANT_WHITESPACE[state]) {
          buffer += character
        }
        break

      // String
      case '"':
        index = i + 1
        do {
          index = token.indexOf('"', index) + 1
          if (!index) {
            parseError('Unmatched "')
          }
        } while (token[index - 2] === '\\')
        buffer += token.slice(i, index)
        i = index - 1
        switch (state) {
          case 'before-value':
            state = 'value'
            break
          case 'importRule-begin':
            state = 'importRule'
            break
        }
        break

      case "'":
        index = i + 1
        do {
          index = token.indexOf("'", index) + 1
          if (!index) {
            parseError("Unmatched '")
          }
        } while (token[index - 2] === '\\')
        buffer += token.slice(i, index)
        i = index - 1
        switch (state) {
          case 'before-value':
            state = 'value'
            break
          case 'importRule-begin':
            state = 'importRule'
            break
        }
        break

      // Comment
      case '/':
        if (token.charAt(i + 1) === '*') {
          i += 2
          index = token.indexOf('*/', i)
          if (index === -1) {
            parseError('Missing */')
          } else {
            i = index + 1
          }
        } else {
          buffer += character
        }
        if (state === 'importRule-begin') {
          buffer += ' '
          state = 'importRule'
        }
        break

      // At-rule
      case '@':
        if (token.indexOf('@-moz-document', i) === i) {
          state = 'documentRule-begin'
          documentRule = new CSSDocumentRule()
          documentRule.__starts = i
          i += '-moz-document'.length
          buffer = ''
          break
        } else if (token.indexOf('@media', i) === i) {
          state = 'atBlock'
          mediaRule = new CSSMediaRule()
          mediaRule.__starts = i
          i += 'media'.length
          buffer = ''
          break
        } else if (token.indexOf('@supports', i) === i) {
          state = 'conditionBlock'
          supportsRule = new CSSSupportsRule()
          supportsRule.__starts = i
          i += 'supports'.length
          buffer = ''
          break
        } else if (token.indexOf('@host', i) === i) {
          state = 'hostRule-begin'
          i += 'host'.length
          hostRule = new CSSHostRule()
          hostRule.__starts = i
          buffer = ''
          break
        } else if (token.indexOf('@import', i) === i) {
          state = 'importRule-begin'
          i += 'import'.length
          buffer += '@import'
          break
        } else if (token.indexOf('@font-face', i) === i) {
          state = 'fontFaceRule-begin'
          i += 'font-face'.length
          fontFaceRule = new CSSFontFaceRule()
          fontFaceRule.__starts = i
          buffer = ''
          break
        } else {
          atKeyframesRegExp.lastIndex = i
          var matchKeyframes = atKeyframesRegExp.exec(token)
          if (matchKeyframes && matchKeyframes.index === i) {
            state = 'keyframesRule-begin'
            keyframesRule = new CSSKeyframesRule()
            keyframesRule.__starts = i
            keyframesRule._vendorPrefix = matchKeyframes[1] // Will come out as undefined if no prefix was found
            i += matchKeyframes[0].length - 1
            buffer = ''
            break
          } else if (state === 'selector') {
            state = 'atRule'
          }
        }
        buffer += character
        break

      case '{':
        if (state === 'selector' || state === 'atRule') {
          styleRule.selectorText = buffer.trim()
          styleRule.style.__starts = i
          buffer = ''
          state = 'before-name'
        } else if (state === 'atBlock') {
          mediaRule.media.mediaText = buffer.trim()

          if (parentRule) {
            ancestorRules.push(parentRule)
          }

          currentScope = parentRule = mediaRule
          mediaRule.parentStyleSheet = styleSheet
          buffer = ''
          state = 'before-selector'
        } else if (state === 'conditionBlock') {
          supportsRule.conditionText = buffer.trim()

          if (parentRule) {
            ancestorRules.push(parentRule)
          }

          currentScope = parentRule = supportsRule
          supportsRule.parentStyleSheet = styleSheet
          buffer = ''
          state = 'before-selector'
        } else if (state === 'hostRule-begin') {
          if (parentRule) {
            ancestorRules.push(parentRule)
          }

          currentScope = parentRule = hostRule
          hostRule.parentStyleSheet = styleSheet
          buffer = ''
          state = 'before-selector'
        } else if (state === 'fontFaceRule-begin') {
          if (parentRule) {
            fontFaceRule.parentRule = parentRule
          }
          fontFaceRule.parentStyleSheet = styleSheet
          styleRule = fontFaceRule
          buffer = ''
          state = 'before-name'
        } else if (state === 'keyframesRule-begin') {
          keyframesRule.name = buffer.trim()
          if (parentRule) {
            ancestorRules.push(parentRule)
            keyframesRule.parentRule = parentRule
          }
          keyframesRule.parentStyleSheet = styleSheet
          currentScope = parentRule = keyframesRule
          buffer = ''
          state = 'keyframeRule-begin'
        } else if (state === 'keyframeRule-begin') {
          styleRule = new CSSKeyframeRule()
          styleRule.keyText = buffer.trim()
          styleRule.__starts = i
          buffer = ''
          state = 'before-name'
        } else if (state === 'documentRule-begin') {
          // FIXME: what if this '{' is in the url text of the match function?
          documentRule.matcher.matcherText = buffer.trim()
          if (parentRule) {
            ancestorRules.push(parentRule)
            documentRule.parentRule = parentRule
          }
          currentScope = parentRule = documentRule
          documentRule.parentStyleSheet = styleSheet
          buffer = ''
          state = 'before-selector'
        }
        break

      case ':':
        if (state === 'name') {
          name = buffer.trim()
          buffer = ''
          state = 'before-value'
        } else {
          buffer += character
        }
        break

      case '(':
        if (state === 'value') {
          // ie css expression mode
          if (buffer.trim() === 'expression') {
            var info = (new CSSValueExpression(token, i)).parse()

            if (info.error) {
              parseError(info.error)
            } else {
              buffer += info.expression
              i = info.idx
            }
          } else {
            state = 'value-parenthesis'
            // always ensure this is reset to 1 on transition
            // from value to value-parenthesis
            valueParenthesisDepth = 1
            buffer += character
          }
        } else if (state === 'value-parenthesis') {
          valueParenthesisDepth++
          buffer += character
        } else {
          buffer += character
        }
        break

      case ')':
        if (state === 'value-parenthesis') {
          valueParenthesisDepth--
          if (valueParenthesisDepth === 0) { state = 'value' }
        }
        buffer += character
        break

      case '!':
        if (state === 'value' && token.indexOf('!important', i) === i) {
          priority = 'important'
          i += 'important'.length
        } else {
          buffer += character
        }
        break

      case ';':
        switch (state) {
          case 'value':
            styleRule.style.setProperty(name, buffer.trim(), priority)
            priority = ''
            buffer = ''
            state = 'before-name'
            break
          case 'atRule':
            buffer = ''
            state = 'before-selector'
            break
          case 'importRule':
            importRule = new CSSImportRule()
            importRule.parentStyleSheet = importRule.styleSheet.parentStyleSheet = styleSheet
            importRule.cssText = buffer + character
            styleSheet.cssRules.push(importRule)
            buffer = ''
            state = 'before-selector'
            break
          default:
            buffer += character
            break
        }
        break

      case '}':
        switch (state) {
          case 'value':
            styleRule.style.setProperty(name, buffer.trim(), priority)
            priority = ''
          /* falls through */
          case 'before-name':
          case 'name':
            styleRule.__ends = i + 1
            if (parentRule) {
              styleRule.parentRule = parentRule
            }
            styleRule.parentStyleSheet = styleSheet
            currentScope.cssRules.push(styleRule)
            buffer = ''
            if (currentScope.constructor === CSSKeyframesRule) {
              state = 'keyframeRule-begin'
            } else {
              state = 'before-selector'
            }
            break
          case 'keyframeRule-begin':
          case 'before-selector':
          case 'selector':
            // End of media/supports/document rule.
            if (!parentRule) {
              parseError('Unexpected }')
            }

            // Handle rules nested in @media or @supports
            hasAncestors = ancestorRules.length > 0

            while (ancestorRules.length > 0) {
              parentRule = ancestorRules.pop()

              if (
                parentRule.constructor.name === 'CSSMediaRule' ||
                parentRule.constructor.name === 'CSSSupportsRule'
              ) {
                prevScope = currentScope
                currentScope = parentRule
                currentScope.cssRules.push(prevScope)
                break
              }

              if (ancestorRules.length === 0) {
                hasAncestors = false
              }
            }

            if (!hasAncestors) {
              currentScope.__ends = i + 1
              styleSheet.cssRules.push(currentScope)
              currentScope = styleSheet
              parentRule = null
            }

            buffer = ''
            state = 'before-selector'
            break
        }
        break

      default:
        switch (state) {
          case 'before-selector':
            state = 'selector'
            styleRule = new CSSStyleRule()
            styleRule.__starts = i
            break
          case 'before-name':
            state = 'name'
            break
          case 'before-value':
            state = 'value'
            break
          case 'importRule-begin':
            state = 'importRule'
            break
        }
        buffer += character
        break
    }
  }

  return styleSheet
}

/**
 * Produces a deep copy of stylesheet — the instance variables of stylesheet are copied recursively.
 * @param {CSSStyleSheet} stylesheet
 * @nosideeffects
 * @return {CSSStyleSheet}
 */
function clone (stylesheet) {
  var cloned = new CSSStyleSheet()

  var rules = stylesheet.cssRules
  if (!rules) {
    return cloned
  }

  for (var i = 0, rulesLength = rules.length; i < rulesLength; i++) {
    var rule = rules[i]
    var ruleClone = cloned.cssRules[i] = new rule.constructor()

    var style = rule.style
    if (style) {
      var styleClone = ruleClone.style = new CSSStyleDeclaration()
      for (var j = 0, styleLength = style.length; j < styleLength; j++) {
        var name = styleClone[j] = style[j]
        styleClone[name] = style[name]
        styleClone._importants[name] = style.getPropertyPriority(name)
      }
      styleClone.length = style.length
    }

    if (Object.prototype.hasOwnProperty.call(rule, 'keyText')) {
      ruleClone.keyText = rule.keyText
    }

    if (Object.prototype.hasOwnProperty.call(rule, 'selectorText')) {
      ruleClone.selectorText = rule.selectorText
    }

    if (Object.prototype.hasOwnProperty.call(rule, 'mediaText')) {
      ruleClone.mediaText = rule.mediaText
    }

    if (Object.prototype.hasOwnProperty.call(rule, 'conditionText')) {
      ruleClone.conditionText = rule.conditionText
    }

    if (Object.prototype.hasOwnProperty.call(rule, 'cssRules')) {
      ruleClone.cssRules = clone(rule).cssRules
    }
  }
  return cloned
}

export default {
  CSSStyleDeclaration,
  CSSRule,
  CSSGroupingRule,
  CSSConditionRule,
  CSSStyleRule,
  MediaList,
  CSSMediaRule,
  CSSSupportsRule,
  CSSImportRule,
  CSSFontFaceRule,
  CSSHostRule,
  StyleSheet,
  CSSStyleSheet,
  CSSKeyframesRule,
  CSSKeyframeRule,
  MatcherList,
  CSSDocumentRule,
  CSSValue,
  CSSValueExpression,
  parse,
  clone
}
