import { renderNode } from 'https://unpkg.com/skruv@0.0.11/vDOM.js'
import { body, h1, input, progress, div } from 'https://unpkg.com/skruv@0.0.11/html.js'
import { createState } from 'https://unpkg.com/skruv@0.0.11/state.js'
import { importer } from 'https://unpkg.com/skruv@0.0.11/utils/importer.js'

let root = document.body

export let state = {
  input: 'Global',
  error: false
}

/* Normalize the url so it is not relative to the importer */
const importUrl = (url) => (new URL(url, import.meta.url)).href

const err = (err) => { state.error = err; console.error(err) }

export const render = () => {
  root = renderNode(body({},
    state.error ? div({ class: 'error' }, 'Error!') : [
      h1({}, state.input),
      input({
        value: state.input,
        oninput: e => { state.input = e.target.value }
      }),
      importer(importUrl('./components/one.js'), { success: render, error: err }, 'one') || progress(),
      importer(importUrl('./components/one.js'), { success: render, error: err }, 'two') || progress()
    ]
  ), root)
}

state = createState(state, render)

render()
