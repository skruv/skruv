/* global MathMLElement HTMLElement */
import '../utils/minidom.js'

import assert from 'node:assert'
import test from 'node:test'

import { elementFactory, render } from '../skruv.js'

const { html, body, math, mfrac, msup, mi, mn } = elementFactory

test('mathml-in-html', async () => {
  render(
    html(
      body(
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
    )
  )
  assert.strictEqual(
    document.documentElement.innerHTML,
    '<!DOCTYPE html><html><body><math xmlns="http://www.w3.org/1998/Math/MathML"><mfrac><msup><mi>π</mi><mn>2</mn></msup><mn>6</mn></mfrac></math></body></html>'
  )
  assert(document.documentElement.childNodes[0] instanceof HTMLElement)
  assert(document.documentElement.childNodes[0].childNodes[0] instanceof MathMLElement)
  assert(document.documentElement.childNodes[0].childNodes[0].childNodes[0] instanceof MathMLElement)
})
