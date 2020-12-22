/* global HTMLElement customElements CustomEvent */
import { h } from '../html.js'
import { createState } from '../state.js'
import { renderNode } from '../vDOM.js'

export const stateful = (name, attributes, dom, ...children) => {
  const elementName = `skruv-stateful-${name}`
  if (!customElements.get(elementName)) {
    let state
    customElements.define(elementName, class extends HTMLElement {
      /* Keeping this here for best practice and clarity */
      // eslint-disable-next-line
        constructor () {
        super()
      }

      connectedCallback () {
        this.root = this.attachShadow({ mode: 'open' })
        state = {
          ...this.initState,
          ...this.getAttributeNames().reduce((prev, curr) => { prev[curr] = this.getAttribute(curr); return prev }, {})
        }
        state = createState(
          state,
          this._update.bind(this)
        )
        this._update()
      }

      static get observedAttributes () {
        return Object.keys(attributes)
      }

      attributeChangedCallback (name, oldValue, newValue) {
        if (state && oldValue !== newValue) state[name] = newValue
      }

      _update () {
        const event = new CustomEvent('statechanged', { detail: state })
        this.dispatchEvent(event)
        this.rootDom = renderNode(dom(state), this.rootDom, Infinity, this.root)
      }
    })
  }

  return h(elementName)(attributes, ...children)
}
