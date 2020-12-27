import { div, input } from '../../../html.js'
import { createState } from '../../../state.js'

export const sub = createState({
  arr: [],
})

async function * stateSub () {
  for await (const arr of sub.arr) {
    yield div({}, arr.map(a => div({}, a)))
  }
}

export default () => div({}, input({
  oninput: e => {
    sub.arr.push(e.target.value)
  }
}), stateSub)
