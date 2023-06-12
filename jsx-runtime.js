/** @typedef {typeof import("./elements.js").Vnode} Vnode */
/** @typedef {typeof import("./elements.js").VnodeAtrributes} VnodeAtrributes */

/**
 * @typedef {Object} JSXAdditionalProperties
 * @property {[Vnode]} [children]
 *
 * @typedef {VnodeAtrributes & JSXAdditionalProperties} JSXAttributes
 */

/**
 * @param {String} str
 * @returns {String}
 */
const kebabize = str => str.replace(/[A-Z]+(?![a-z])|[A-Z]/g, ($, ofs) => (ofs ? '-' : '') + $.toLowerCase())

// eslint-disable-next-line import/no-unused-modules
export const Fragment = '#fragment'

/**
 * @param {String} nodeName
 * @param {JSXAttributes} [attributes={}]
 * @returns {Vnode | [Vnode?]}
 */
// eslint-disable-next-line import/no-unused-modules
export const jsx = (nodeName, attributes = {}) => {
  if (attributes.children) { return jsxs(nodeName, { ...attributes, children: attributes.children }) }
  return jsxs(nodeName, attributes)
}

/**
 * @param {String} nodeName
 * @param {JSXAttributes} [attributes={}]
 * @returns {Vnode | [Vnode?]}
 */
// eslint-disable-next-line import/no-unused-modules
export const jsxs = (nodeName, attributes = {}) => {
  if (nodeName === Fragment && attributes.children) { return attributes.children }
  if (nodeName === Fragment) { return [] }
  const { children, ...attrs } = attributes
  Object.keys(attrs).forEach(e => {
    attrs[kebabize(e)] = attrs[e]
    delete attrs[e]
  })
  if (attrs['class-name']) {
    attrs.class = attrs['class-name']
    delete attrs['class-name']
  }
  if (attrs['html-for']) {
    attrs.for = attrs['html-for']
    delete attrs['html-for']
  }
  if (children) { return ({ nodeName, attributes: attrs || {}, childNodes: children }) }
  return ({ nodeName, attributes: attrs || {}, childNodes: [] })
}
