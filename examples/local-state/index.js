import { renderNode } from '../../vDOM.js'
import { body, div } from '../../html.js'
import { createState } from '../../state.js'

export const sub = createState({
  error: {},
})

let root = document.body

;(async () => {
  for await (const state of sub) {
    root = await renderNode(body({
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
