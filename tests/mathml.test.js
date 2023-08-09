/* global MathMLElement */
import '../utils/minidom.js'

import assert from 'node:assert'
import test from 'node:test'

import { elementFactory, render } from '../index.js'

const { math, mfrac, msup, mi, mn } = elementFactory

test('mathml', async () => {
  render(
    math(
      mfrac(
        msup(
          mi('π'),
          mn(2)
        ),
        mn(6)
      )
    )
  )
  assert.strictEqual(
    document.documentElement.innerHTML,
    '<?xml version="1.0" encoding="UTF-8"?><math xmlns="http://www.w3.org/1998/Math/MathML"><mfrac><msup><mi>π</mi><mn>2</mn></msup><mn>6</mn></mfrac></math>'
  )
  assert(document.documentElement instanceof MathMLElement)
  assert(document.documentElement.childNodes[0].childNodes[0].childNodes[0] instanceof MathMLElement)
})
