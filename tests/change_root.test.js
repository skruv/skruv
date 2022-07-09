/* global test expect */
import { div, header } from '../elements.js'
import render from '../render.js'

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
