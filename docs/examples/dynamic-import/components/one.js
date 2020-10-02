/* global HTMLElement */
import { input, h1, h2, div, section, button, b, h, style } from '../../../../html.js'
import { createState } from '../../../../state.js'
import { render, state as globalState } from '../index.js'
import { renderNode } from '../../../../vDOM.js'

class TestingWebComponents extends HTMLElement {
  /* Keeping this here for best practice */
  // eslint-disable-next-line
  constructor () {
    super()
  }

  connectedCallback () {
    this.root = this.attachShadow({ mode: 'open' })
    this._update()
  }

  static get observedAttributes () {
    return ['input']
  }

  attributeChangedCallback () {
    if (this.root) this._update()
  }

  _update () {
    this.rootDom = renderNode(section({}, [
      h1({}, 'Testing!', this.getAttribute('input')),
      h('slot')({ opaque: true }),
      style({}, `
        h1 {color: blue}
      `)
    ]), this.rootDom, Infinity, this.root) // TODO: handle non-elements better?
  }
}

window.customElements.define('testing-web-components', TestingWebComponents)

/** @param {string} name */
export default (name) => {
  const randomize = () => {
    state.input = Math.random()
  }

  const state = createState({
    input: `${name}`
  }, render)

  return () => div({},
    h2({}, `${name} has ${state.input} and global has ${globalState.input}`),
    h('testing-web-components')({ input: state.input }, b({}, state.input)),
    input({
      value: state.input,
      /**
       * @param {Object} e
       * @param {HTMLInputElement} e.target
       */
      oninput: e => { state.input = e.target.value }
    }),
    button({
      onclick: randomize
    }, 'randomize')
  )
}
