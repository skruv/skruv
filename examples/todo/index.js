import { renderNode } from '../../vDOM.js'
import { body, input, button, ul, li } from '../../html.js'
import { createState } from '../../state.js'

let root = document.body
const sub = createState({
  todos: [],
  value: ''
})

;(async () => {
  for await (const state of sub) {
    root = await renderNode(body({},
      input({ type: 'text', oninput: e => { state.value = e.target.value }, value: state.value }),
      button({ onclick: () => { state.todos.push(state.value) } }, 'Add'),
      ul({},
        state.todos.map((todo) => li({}, todo))
      )
    ), root)
  }
})()
