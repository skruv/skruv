/* global test expect */
import { elements, render } from '../skruv.js'
const { div, header } = elements

test('change root node type', async () => {
  const html = document.createElement('body')
  const root = document.createElement('div')
  html.appendChild(root)
  render(
    header({},
      div({},
        div({}, 'test')
      )
    ), root
  )
  expect(html.childNodes[0].nodeName).toBe('HEADER')
})
