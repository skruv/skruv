import { renderNode } from 'https://unpkg.com/skruv@0.0.7/vDOM.js'
import { body, h1, input } from 'https://unpkg.com/skruv@0.0.7/html.js'
import { createState } from 'https://unpkg.com/skruv@0.0.7/state.js'

let root = document.body
let state = {
  input: 'Testing!'
}

const render = () => {
  root = renderNode(body({}, [
    h1({}, state.input),
    input({ value: state.input, oninput: e => { state.input = e.target.value } })
  ]), root)
}

state = createState(state, render)

render()
