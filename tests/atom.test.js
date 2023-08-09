import '../utils/minidom.js'

import assert from 'node:assert'
import test from 'node:test'

import { elementFactory, render } from '../index.js'

const { feed, atomTitle: title, entry } = elementFactory

test('svg', async () => {
  render(
    feed(
      title('Test'),
      entry(
        title('Post')
      )
    )
  )
  assert.strictEqual(
    document.documentElement.innerHTML,
    // eslint-disable-next-line max-len
    '<?xml version="1.0" encoding="UTF-8"?><feed xmlns="http://www.w3.org/2005/Atom"><atomTitle>Test</atomTitle><entry><atomTitle>Post</atomTitle></entry></feed>'
  )
})
