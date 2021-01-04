import { renderNode } from 'https://unpkg.com/skruv@0.1.3/vDOM.js'
import { body, h1, div } from 'https://unpkg.com/skruv@0.1.3/html.js'
import { createState } from 'https://unpkg.com/skruv@0.1.3/state.js'

let root = document.body

export const sub = createState({
  input: 'Global',
  error: false
})

;(async () => {
  for await (const state of sub) {
    root = renderNode(body({
      onskruverror: (err) => {
        state.error = err
        console.error(err)
      }
    },
    state.error ? div({ class: 'error' }, 'Error!') : [
      h1({}, state.input),
      import('./components/one.js').then(i => i.default())
    ]
    ), root)
  }
})()
