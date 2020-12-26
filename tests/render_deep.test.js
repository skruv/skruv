/* global test expect */
import { renderNode } from '../vDOM.js'
import { body, div } from '../html.js'

test('render deep elements', () => {
  const html = document.createElement('html')
  const root = document.createElement('body')
  html.appendChild(root)
  renderNode(
    body({},
      div({},
        div({}, 'deep')
      )
    ), root
  )
  expect(html.childNodes[0].childNodes[0].childNodes[0].textContent).toBe('deep')
})
