/* global HTMLElement customElements */
import { h } from '../html.js'
import { renderNode } from '../vDOM.js'

export const stateless = (name, attributes, dom, ...children) => {
  const elementName = `skruv-stateless-${name}`
  if (!customElements.get(elementName)) {
    customElements.define(elementName, class extends HTMLElement {
      /* Keeping this here for best practice and clarity */
      // eslint-disable-next-line
        constructor () {
        super()
      }

      connectedCallback () {
        this.root = this.attachShadow({ mode: 'open' })
        this._update()
      }

      _update () {
        this.rootDom = renderNode(dom(this.initState), this.rootDom, Infinity, this.root)
      }
    })
  }

  return h(elementName)(attributes, ...children)
}
