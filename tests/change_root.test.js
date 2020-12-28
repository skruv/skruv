/* global test expect */
import { renderNode } from '../vDOM.js'
import { div, header } from '../html.js'

test('change root node type', async () => {
  const html = document.createElement('body')
  const root = document.createElement('div')
  html.appendChild(root)
  renderNode(
    header({},
      div({},
        div({}, 'test')
      )
    ), root
  )
  expect(html.childNodes[0].nodeName).toBe('HEADER')
})
