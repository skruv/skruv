import { renderNode } from 'https://unpkg.com/skruv@0.0.11/vDOM.js'
import { body, h1, input } from 'https://unpkg.com/skruv@0.0.11/html.js'
import { createState } from 'https://unpkg.com/skruv@0.0.11/state.js'

let root = document.body
let state = {
  test1: { test2: { test3: { test4: { input: 'Testing!' } } } }
}

const render = () => {
  root = renderNode(body({}, [
    h1({}, state.test1.test2.test3.test4.input),
    input({ value: state.test1.test2.test3.test4.input, oninput: e => { state.test1.test2.test3.test4.input = e.target.value } })
  ]), root)
}

state = createState(state, render)

render()
