const kebabize = str => str.replace(/[A-Z]+(?![a-z])|[A-Z]/g, ($, ofs) => (ofs ? '-' : '') + $.toLowerCase())

// eslint-disable-next-line import/no-unused-modules
export const Fragment = '#fragment'

// eslint-disable-next-line import/no-unused-modules
export const jsx = (nodeName, attributes = {}) => jsxs(nodeName, { ...attributes, children: [attributes.children] })

// eslint-disable-next-line import/no-unused-modules
export const jsxs = (nodeName, attributes = {}) => {
  if (nodeName === Fragment) { return attributes.children }
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
  return ({ nodeName, attributes: attrs || {}, childNodes: children })
}
