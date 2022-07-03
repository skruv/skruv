/* global test expect */
import render from '../render.js'
import { body, div } from '../elements.js'

test('render multiple elements', async () => {
  const html = document.createElement('html')
  const root = document.createElement('body')
  html.appendChild(root)
  render(
    body({},
      div({},
        div({}, 'deep')
      ),
      div({},
        div({}, 'deep2')
      ),
      div({},
        div({}, 'deep3')
      ),
      div({},
        div({}, 'deep4')
      ),
      div({},
        div({}, 'deep5')
      ),
      div({},
        div({}, 'deep6')
      )
    ), root
  )
  expect(html.childNodes[0].childNodes[5].childNodes[0].textContent).toBe('deep6')
})
