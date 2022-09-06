/* global test expect */
import { elements, render } from '../skruv.js'
const { body } = elements

test('simple render', async () => {
  const html = document.createElement('html')
  const root = document.createElement('body')
  html.appendChild(root)
  render(body({}, 'test'), root)
  expect(html.childNodes[0].textContent).toBe('test')
})
