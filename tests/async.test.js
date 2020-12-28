/* global test expect */
import { renderNode } from '../vDOM.js'
import { body, div } from '../html.js'

const wait = time => new Promise(resolve => setTimeout(resolve, time))

const async = () => new Promise(resolve => resolve(div({}, 'test')))

test('simple render', async () => {
  const html = document.createElement('html')
  const root = document.createElement('body')
  html.appendChild(root)
  renderNode(body({}, async), root)
  await wait(1)
  expect(html.childNodes[0].textContent).toBe('test')
})
