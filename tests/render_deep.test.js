/* global test expect */
import { body, div } from '../elements.js'
import render from '../render.js'

test('render deep elements', async () => {
  const html = document.createElement('html')
  const root = document.createElement('body')
  html.appendChild(root)
  render(
    body({},
      div({},
        div({}, 'deep')
      )
    ), root
  )
  expect(html.childNodes[0].childNodes[0].childNodes[0].textContent).toBe('deep')
})
