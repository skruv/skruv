import { renderNode } from 'https://unpkg.com/skruv@0.1.4/vDOM.js'
import { body, div } from 'https://unpkg.com/skruv@0.1.4/html.js'
import { createState } from 'https://unpkg.com/skruv@0.1.4/state.js'

export const sub = createState({
  error: {}
})

let root = document.body

;(async () => {
  for await (const state of sub) {
    root = renderNode(body({
      onskruverror: (err) => {
        state.error = err
        console.error(err)
      }
    },
    state.error.msg ? div({ class: 'error' }, 'Error!') : div({},
      import('./components/localState.js').then(i => i.default())
    )
    ), root)
  }
})()
