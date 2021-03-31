import { renderNode } from 'https://unpkg.com/skruv@0.2.0/vDOM.js'
import { body, input, button, ul, li } from 'https://unpkg.com/skruv@0.2.0/html.js'
import { createState } from 'https://unpkg.com/skruv@0.2.0/state.js'

let root = document.body
const sub = createState({
  todos: [],
  value: ''
})

;(async () => {
  for await (const state of sub) {
    root = renderNode(body({},
      input({ type: 'text', oninput: e => { state.value = e.target.value }, value: state.value }),
      button({ onclick: () => { state.todos.push(state.value) } }, 'Add'),
      ul({},
        state.todos.map((todo) => li({}, todo))
      )
    ), root)
  }
})()
