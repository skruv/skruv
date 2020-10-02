import { input, h2, div, button } from 'https://unpkg.com/skruv@0.0.6/html.js'
import { createState } from 'https://unpkg.com/skruv@0.0.6/state.js'
import { render, state as globalState } from '../index.js'

/** @param {string} name */
export default (name) => {
  const randomize = () => {
    state.input = Math.random()
  }

  const state = createState({
    input: `${name}`
  }, render)

  return () => div({},
    h2({}, `${name} has ${state.input} and global has ${globalState.input}`),
    input({
      value: state.input,
      /**
       * @param {Object} e
       * @param {HTMLInputElement} e.target
       */
      oninput: e => { state.input = e.target.value }
    }),
    button({
      onclick: randomize
    }, 'randomize')
  )
}
