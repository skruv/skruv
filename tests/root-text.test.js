import '../utils/minidom.js'

import assert from 'node:assert'
import test from 'node:test'

import { elementFactory, render } from '../skruv.js'

const { skruvText } = elementFactory

test('root-text', async () => {
  render(
    skruvText(`
User-agent: *
Allow: /
`)
  )
  assert.strictEqual(
    document.documentElement.innerHTML,
    // eslint-disable-next-line max-len
    `
User-agent: *
Allow: /
`
  )
})
