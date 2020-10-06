import { input, h2, hr, button, slot } from '../../../html.js'
import { createState } from '../../../state.js'
import { render, state as globalState } from '../index.js'

export default (name) => {
  const randomize = () => {
    state.input = Math.random()
  }

  const state = createState({
    input: 'local state'
  }, render)

  return () => slot({},
    h2({}, `${name} has ${state.input} and global has ${globalState.input}`),
    hr(),
    input({
      value: state.input,
      oninput: e => { state.input = e.target.value }
    }),
    button({
      onclick: randomize
    }, 'randomize')
  )
}