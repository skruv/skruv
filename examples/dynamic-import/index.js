import { renderNode } from '../../vDOM.js'
import { body, h1, input, div } from '../../html.js'
import { sub } from './state.js'

let root = document.body

;(async () => {
  for await (const state of sub) {
    root = await renderNode(body({
      onskruverror: (err) => {
        state.error = err
        console.error(err)
      }
    },
    state.error ? div({ class: 'error' }, 'Error!') : [
      h1({}, state.obj.obj2.nest),
      input({
        value: state.obj.obj2.nest,
        oninput: e => {
          state.obj.obj2.nest = e.target.value
          state.arr.push(e.target.value)
        }
      }),
      import('./components/one.js').then(i => i.default('obj')),
      import('./components/one.js').then(i => i.default('arr')),
      state.arr.map(a => div({}, a))
    ]
    ), root)
  }
})()
