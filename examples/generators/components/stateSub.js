import { div } from 'https://unpkg.com/skruv@0.1.0/html.js'
import { sub } from '../state.js'

async function * stateSub () {
  for await (const arr of sub.arr) {
    yield div({}, arr.map(a => div({}, a)))
  }
}

export default div({}, stateSub)
