import { renderNode } from 'https://unpkg.com/skruv@0.0.10/vDOM.js'
import { body, h1, input, progress, div } from 'https://unpkg.com/skruv@0.0.10/html.js'
import { createState } from 'https://unpkg.com/skruv@0.0.10/state.js'
import { importer } from 'https://unpkg.com/skruv@0.0.10/utils/importer.js'

const randomColor = () => {
  var letters = '0123456789ABCDEF'
  var color = '#'
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)]
  }
  return color
}

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
      h1({ style: `color: ${randomColor()}` }, state.input),
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
