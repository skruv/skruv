import { renderNode } from 'https://unpkg.com/skruv@0.0.9/vDOM.js'
import { body, h1, input } from 'https://unpkg.com/skruv@0.0.9/html.js'
import { createState } from 'https://unpkg.com/skruv@0.0.9/state.js'

let root = document.body
let state = {
  objtest: new URLSearchParams('?test')
}

const render = () => {
  root = renderNode(body({}, [
    h1({}, state.objtest.toString()),
    input({
      value: state.objtest.toString(),
      oninput: e => { state.objtest.append('input', e.target.value) }
    })
  ]), root)
}

state = createState(state, render)

render()
