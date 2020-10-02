import { renderNode } from '../../../vDOM.js'
import { body, h1, input, progress, div } from '../../../html.js'
import { createState } from '../../../state.js'
import { importer } from '../../../utils/importer.js'

/** @type {HTMLElement | SVGElement | Text} */
let root = document.body

/**
 * @typedef State
 * @prop {string} input
 * @prop {boolean | Error} error
 */
/** @type {State} */
export let state = {
  input: 'Global',
  error: false
}

/**
 * Normalize the url so it is not relative to the importer
 * @param {String} url
 * @returns {String}
 */
const importUrl = (url) => (new URL(url, import.meta.url)).href

/** @param {Error} err */
const err = (err) => { state.error = err; console.error(err) }

export const render = () => {
  root = renderNode(body({},
    state.error ? div({ class: 'error' }, 'Error!') : [
      h1({}, state.input),
      input({
        value: state.input,
        /**
         * @param {Object} e
         * @param {HTMLInputElement} e.target
         */
        oninput: e => { state.input = e.target.value }
      }),
      importer(importUrl('./components/one.js'), { success: render, error: err }, 'one') || progress(),
      importer(importUrl('./components/one.js'), { success: render, error: err }, 'two') || progress()
    ]
  ), root)
}

state = createState(state, render)

render()
