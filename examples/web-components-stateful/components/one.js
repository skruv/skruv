import { input, h1, button, slot, div } from 'https://unpkg.com/skruv@0.0.8/html.js'
import { state } from '../index.js'
import { stateful } from 'https://unpkg.com/skruv@0.0.8/webcomponents/stateful.js'

const randomColor = () => {
  var letters = '0123456789ABCDEF'
  var color = '#'
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)]
  }
  return color
}

export default () => () => slot({},
  stateful(
    'test',
    {
      initState: {
        arr: []
      },
      stuff: state.input,
      onstatechanged: e => { state.input = e.detail.stuff }
    },
    state => slot({ name: 'root' }, [
      h1({ style: `color: ${randomColor()}` }, 'Scoped element: ', state.stuff),
      input({
        value: state.stuff,
        oninput: e => { state.stuff = e.target.value }
      }),
      button({ onclick: () => { state.arr.push(Math.random()) } }, 'add'),
      state.arr.map(e => div({}, e))
    ])
  )
)
