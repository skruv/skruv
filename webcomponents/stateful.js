/* global HTMLElement customElements CustomEvent */
import { h } from '../html.js'
import { createState } from '../state.js'
import { renderNode } from '../vDOM.js'

export const stateful = (name, attributes, dom, ...children) => {
  const elementName = `skruv-stateful-${name}`
  if (!customElements.get(elementName)) {
    customElements.define(elementName, class extends HTMLElement {
      /* Keeping this here for best practice and clarity */
      // eslint-disable-next-line
        constructor () {
        super()
      }

      connectedCallback () {
        this.root = this.attachShadow({ mode: 'open' })
        this.state = createState(
          {
            ...this.initState,
            ...this.getAttributeNames().reduce((prev, curr) => { prev[curr] = this.getAttribute(curr); return prev }, {})
          },
          this._update.bind(this)
        )
        this._update()
      }

      static get observedAttributes () {
        return Object.keys(attributes)
      }

      attributeChangedCallback (name, oldValue, newValue) {
        if (this.state && oldValue !== newValue) this.state[name] = newValue
      }

      _update () {
        const event = new CustomEvent('statechanged', { detail: this.state.toJSON })
        this.dispatchEvent(event)
        this.rootDom = renderNode(dom(this.state), this.rootDom, Infinity, this.root)
      }
    })
  }

  return h(elementName)(attributes, ...children)
}
