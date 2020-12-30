import { div, input } from 'https://unpkg.com/skruv@0.1.2/html.js'
import { createState } from 'https://unpkg.com/skruv@0.1.2/state.js'

export const sub = createState({
  arr: []
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
