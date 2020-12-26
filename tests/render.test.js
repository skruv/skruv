/* global test expect */
import { renderNode } from '../vDOM.js'
import { body } from '../html.js'

test('simple render', () => {
  const html = document.createElement('html')
  const root = document.createElement('body')
  html.appendChild(root)
  renderNode(body({}, 'test'), root)
  expect(html.childNodes[0].textContent).toBe('test')
})
