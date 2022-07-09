/* global test expect */
import { body } from '../elements.js'
import render from '../render.js'

test('simple render', async () => {
  const html = document.createElement('html')
  const root = document.createElement('body')
  html.appendChild(root)
  render(body({}, 'test'), root)
  expect(html.childNodes[0].textContent).toBe('test')
})
