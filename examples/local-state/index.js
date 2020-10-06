import { renderNode } from '../../vDOM.js'
import { body, h1, input, progress, div } from '../../html.js'
import { createState } from '../../state.js'
import { importer } from '../../utils/importer.js'

let root = document.body

export let state = {
  input: 'Global',
  error: false
}

const importUrl = (url) => (new URL(url, import.meta.url)).href

/* Normalize the url so it is not relative to the importer */
const err = (err) => { state.error = err; console.error(err) }

export const render = () => {
  root = renderNode(body({},
    state.error ? div({ class: 'error' }, 'Error!') : [
      h1({}, state.input),
      input({
        value: state.input,
        oninput: e => { state.input = e.target.value }
      }),
      importer(importUrl('./components/one.js'), { success: render, error: err }, 'one') || progress()
    ]
  ), root)
}

state = createState(state, render)

render()
