import { renderNode } from '../../vDOM.js'
import { body, h1, div } from '../../html.js'
import { createState } from '../../state.js'

let root = document.body

export const sub = createState({
  input: 'Global',
  error: false
})

;(async () => {
  for await (const state of sub) {
    root = await renderNode(body({
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

