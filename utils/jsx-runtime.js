/**
 * @typedef {Vnode|Vnode[]|String|Boolean|Number} SkruvChildNode
 * @typedef {SkruvChildNode[]} SkruvChildNodes
 * @typedef {Record<string,(string|boolean|Function|number|Object)>} VnodeAtrributes
 */
/**
 * @typedef {object} Vnode
 * @prop {Symbol} s
 * @prop {String} t
 * @prop {SkruvChildNodes} c
 * @prop {Record<string,(string|boolean|Function|number|Object)> & {_r:{_r:() => boolean}?}} a
 * @prop {{_r:() => boolean}} [_r]
 */
import { h } from '../index.js'

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

export const Fragment = '#fragment'

/**
 * @param {String} nodeName
 * @param {JSXAttributes} [attributes={}]
 * @returns {Vnode | [Vnode?]}
 */
export const jsx = (nodeName, attributes = {}) => jsxs(nodeName, attributes)

/**
 * @param {String} nodeName
 * @param {JSXAttributes} [attributes={}]
 * @returns {Vnode | [Vnode?]}
 */
export const jsxs = (nodeName, attributes = {}) => {
  if (nodeName === Fragment && attributes.children) { return attributes.children }
  if (nodeName === Fragment) { return [] }
  const { children, ...attrs } = attributes
  Object.keys(attrs).filter(e => e !== kebabize(e))
    .forEach(e => {
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
  if (children) { return h(nodeName, attrs || {}, children) }
  return h(nodeName, attrs || {})
}
