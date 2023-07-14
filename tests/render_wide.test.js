/* global test expect */
import { htmlFactory, render } from '../index.js'
const { body, div } = htmlFactory
self.SkruvWaitForAsync = true

test('render multiple elements', async () => {
  const html = document.createElement('html')
  const root = document.createElement('body')
  html.appendChild(root)
  render(
    body({},
      div({},
        div({}, 'wide')
      ),
      div({},
        div({}, 'wide2')
      ),
      div({},
        div({}, 'wide3')
      ),
      div({},
        div({}, 'wide4')
      ),
      div({},
        div({}, 'wide5')
      ),
      div({},
        div({}, 'wide6')
      )
    ), root
  )
  expect(html.childNodes[0].childNodes[5].childNodes[0].textContent).toBe('wide6')
})
