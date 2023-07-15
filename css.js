/* global CSSMediaRule CSSStyleRule CSSOM */

// TODO: package
/** @type {function} */
let resolveStyles = () => {}
let promiseStyles = new Promise(resolve => { resolveStyles = resolve })
const styleMap = new Map()

// // Example of using webcrypto for hashing. Only works if loaded over https
// const encoder = new TextEncoder()
// /**
//  * @param {string} str
//  * @returns {Promise<string>}
//  */
// const hash = async str => [...new Uint8Array(await crypto.subtle.digest('SHA-1', encoder.encode(str)))].map(x => x.toString(16).padStart(2, '0')).join('')

/**
 * @param {string} str
 * @returns {string}
 */
const hash = str => {
  let hash = 0
  if (str.length === 0) { return hash.toString() }
  for (let i = 0; i < str.length; i++) {
    hash = ((hash << 5) - hash) + str.charCodeAt(i)
    hash |= 0 // Convert to 32bit integer
  }
  return hash.toString()
}

/**
 * Scoped CSS helper
 * @param {TemplateStringsArray} strings
 * @param {(String | Number | Boolean | undefined)[]} keys
 * @returns {string}
 */
export const css = (strings, ...keys) => {
  const stylesheet = strings.reduce(
    /**
     * @param {String[]} prev
     * @param {String} curr
     * @returns {String[]}
     */
    (prev, curr, i) => {
      prev.push(curr)
      prev.push(keys?.[i]?.toString() || '')
      return prev
    },
    []
  ).join('')

  // The implementation of this is lifted from https://github.com/samthor/scoped with some modifications
  const attrRe = /^\[.*?(?:(["'])(?:.|\\\1)*\1.*)*\]/
  const walkSelectorRe = /([([,]|:scope\b)/ // "interesting" setups
  const scopeRe = /^:scope\b/

  /**
   * Consumes a single selector from candidate selector text, which may contain many.
   *
   * @param {string} raw selector text
   * @param {string} prefix prefix to apply
   * @return {?{selector: string, rest: string}}
   */
  function consumeSelector (raw, prefix) {
    let i = raw.search(walkSelectorRe)
    if (i === -1) {
      // found literally nothing interesting, success
      return {
        selector: `${prefix} ${raw}`,
        rest: ''
      }
    } else if (raw[i] === ',') {
      // found comma without anything interesting, yield rest
      return {
        selector: `${prefix} ${raw.substring(0, i)}`,
        rest: raw.substring(i + 1)
      }
    }

    let leftmost = true // whether we're past a descendant or similar selector
    let scope = false // whether :scope has been found + replaced
    i = raw.search(/\S/) // place i after initial whitespace only

    let depth = 0
    // eslint-disable-next-line no-labels
    outer:
    for (; i < raw.length; ++i) {
      const char = raw[i]
      switch (char) {
        case '[': {
          const match = attrRe.exec(raw.substring(i))
          i += (match ? match[0].length : 1) - 1 // we add 1 every loop
          continue
        }
        case '(':
          ++depth
          continue
        case ':':
          if (!leftmost) {
            continue // doesn't matter if :scope is here, it'll always be ignored
          } else if (!scopeRe.test(raw.substring(i))) {
            continue // not ':scope', ignore
          } else if (depth) {
            return null
          }
          // Replace ':scope' with our prefix. This can happen many times; ':scope:scope' is valid.
          // It will never apply to a descendant selector (e.g., ".foo :scope") as this is ignored
          // by browsers anyway (invalid).
          raw = raw.substring(0, i) + prefix + raw.substring(i + 6)
          i += prefix.length
          scope = true
          --i // we'd skip over next character otherwise
          continue // run loop again
        case ')':
          if (depth) {
            --depth
          }
          continue
      }
      if (depth) {
        continue
      }

      switch (char) {
        case ',':
          // eslint-disable-next-line no-labels
          break outer
        case ' ':
        case '>':
        case '~':
        case '+':
          if (!leftmost) {
            continue
          }
          leftmost = false
      }
    }

    const selector = (scope ? '' : `${prefix} `) + raw.substring(0, i)
    return { selector, rest: raw.substring(i + 1) }
  }

  /**
   * @param {string} selectorText
   * @param {string} prefix to apply
   */
  function updateSelectorText (selectorText, prefix) {
    const found = []

    while (selectorText) {
      const consumed = consumeSelector(selectorText, prefix)
      if (consumed === null) {
        return ':not(*)'
      }
      found.push(consumed.selector)
      selectorText = consumed.rest
    }

    return found.join(', ')
  }

  /**
   * Upgrades a specific CSSRule.
   *
   * @param {!CSSRule} rule
   * @param {string} prefix to apply
   */
  function upgradeRule (rule, prefix) {
    if (rule instanceof CSSMediaRule) {
      // upgrade children
      const l = rule.cssRules.length
      for (let j = 0; j < l; ++j) {
        upgradeRule(rule.cssRules[j], prefix)
      }
      return
    }

    if (!(rule instanceof CSSStyleRule)) {
      return // unknown rule type, ignore
    }

    rule.selectorText = updateSelectorText(rule.selectorText, prefix)
  }
  const scope = hash(stylesheet)
  const retval = `skruv-css-scope-${scope}`
  const prefix = `.${retval}`

  if (styleMap.has(scope)) {
    return retval
  }
  let sheet
  // @ts-ignore TODO: If we don't have any way to parse the css bail out
  if (!self?.CSSOM && !self.document?.implementation) {
    return ''
  }
  // @ts-ignore: TODO: Type confusion between polyfill and native.
  if (self?.CSSOM) {
    // @ts-ignore: TODO: Type confusion between polyfill and native.
    sheet = CSSOM.parse(stylesheet)
  } else {
    // In FF/Chrome we could create the sheet with new CSSStyleSheet(), but that does not work in safari (supported from 16.4 (Released 2023-03-27))
    // TODO: don't recreate each run
    const styleDoc = self.document.implementation.createHTMLDocument('')
    const styleElem = styleDoc.createElement('style')
    styleElem.innerText = stylesheet
    styleDoc.body.append(styleElem)
    sheet = styleElem.sheet
    styleDoc.body.removeChild(styleElem)
  }
  Array.from(sheet?.cssRules || []).forEach(e =>
    // @ts-ignore: TODO: Type confusion between polyfill and native.
    upgradeRule(e, prefix)
  )
  const upgradedStyles = Array.from(sheet?.cssRules || []).map(e =>
    e.cssText || ''
  )
    .join('')
  styleMap.set(scope, upgradedStyles)
  resolveStyles()
  return retval
}

/**
 * @returns {AsyncGenerator<string>}
 */
export async function * cssTextGenerator () {
  yield Array.from(styleMap.values()).join('')
  while (true) {
    await promiseStyles
    yield Array.from(styleMap.values()).join('')
    promiseStyles = new Promise(resolve => { resolveStyles = resolve })
  }
}
