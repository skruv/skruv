import '../utils/minidom.js'

import assert from 'node:assert'
import test from 'node:test'

import { elementFactory, render } from '../index.js'
const { html, body } = elementFactory

test('simple render', async () => {
  render(
    html(
      body('test')
    )
  )
  assert.strictEqual(document.documentElement.childNodes[0].childNodes[0].textContent, 'test')
})
