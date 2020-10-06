import { renderNode } from 'https://unpkg.com/skruv@0.0.7-1/vDOM.js'
import { body, input, button, ul, li } from 'https://unpkg.com/skruv@0.0.7-1/html.js'
import { createState } from 'https://unpkg.com/skruv@0.0.7-1/state.js'

let root = document.body

const render = () => {
  root = renderNode(body({},
    input({ type: 'text', oninput: e => { state.value = e.target.value }, value: state.value }),
    button({ onclick: () => { state.todos = state.todos.concat(state.value) } }, 'Add'),
    ul({},
      state.todos.map((todo) => li({}, todo))
    )
  ), root)
}

export const state = createState({
  todos: [],
  value: ''
}, render)

render()
