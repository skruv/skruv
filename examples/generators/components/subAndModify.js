import { h2, h3, input, div } from 'https://unpkg.com/skruv@0.1.5/html.js'
import { sub } from '../state.js'

async function * subAndModify () {
  for await (const obj of sub.obj) {
    yield div({},
      h2({}, 'subComponent'),
      h3({}, obj.obj2.nest),
      input({
        value: obj.obj2.nest,
        oninput: e => {
          obj.obj2.nest = e.target.value
          sub.arr.push(e.target.value)
        }
      })
    )
  }
}

export default subAndModify
