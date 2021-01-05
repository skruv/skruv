import { div, progress } from 'https://unpkg.com/skruv@0.1.4/html.js'

async function * componentWithLoader () {
  yield progress()
  const component = await import('./subAndModify.js').then(res => res.default)
  yield component
}

export default div({}, componentWithLoader)
