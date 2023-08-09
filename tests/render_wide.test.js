import '../utils/minidom.js'

import assert from 'node:assert'
import test from 'node:test'

import { elementFactory, render } from '../skruv.js'
const { html, body, div } = elementFactory

test('render multiple elements', async () => {
  render(
    html(
      body(
        div(div('wide1')),
        div(div('wide2')),
        div(div('wide3')),
        div(div('wide4')),
        div(div('wide5')),
        div(div('wide6'))
      )
    )
  )
  assert.strictEqual(document.documentElement.childNodes[0].childNodes[5].childNodes[0].childNodes[0].textContent, 'wide6')
})
