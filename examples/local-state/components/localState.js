import { div, input } from 'https://unpkg.com/skruv@0.1.5/html.js'
import { createState } from 'https://unpkg.com/skruv@0.1.5/state.js'

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
