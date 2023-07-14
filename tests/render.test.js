/* global test expect */
import { htmlFactory, render } from '../index.js'
const { body } = htmlFactory
self.SkruvWaitForAsync = true

test('simple render', async () => {
  const html = document.createElement('html')
  const root = document.createElement('body')
  html.appendChild(root)
  render(body({}, 'test'), root)
  expect(html.childNodes[0].textContent).toBe('test')
})
