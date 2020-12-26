import { b, h2 } from '../../../html.js'
import { sub } from '../state.js'

async function * count (subState) {
  for await (const arr of sub[subState]) {
    yield h2({}, JSON.stringify(arr))
  }
}

export default count
