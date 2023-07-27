import '../utils/minidom.js'

import assert from 'node:assert'
import test from 'node:test'

import { htmlFactory, render } from '../index.js'
globalThis.SkruvWaitForAsync = true
const { html, body } = htmlFactory

test('simple render', async () => {
  render(
    html(
      body('test')
    )
  )
  assert.strictEqual(document.documentElement.childNodes[0].childNodes[0].textContent, 'test')
})
