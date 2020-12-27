import { div, progress } from 'https://unpkg.com/skruv@0.1.0/html.js'

// TODO: how to handle restarting the component? Or how to prevent restarting it?
async function * componentWithLoader () {
  yield progress()
  const component = await import('./subAndModify.js').then(res => res.default())
  yield div({}, component)
}

export default () => div({}, componentWithLoader)
