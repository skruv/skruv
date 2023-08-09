import '../utils/minidom.js'

import assert from 'node:assert'
import test from 'node:test'

import { elementFactory, render } from '../skruv.js'
const { html, body, div } = elementFactory

test('render deep elements', async () => {
  render(
    html(
      body(
        div(
          div(
            div('deep')
          )
        )
      )
    )
  )
  assert.strictEqual(document.documentElement.childNodes[0].childNodes[0].childNodes[0].childNodes[0].childNodes[0].textContent, 'deep')
})
