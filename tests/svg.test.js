/* global SVGElement HTMLElement */
import '../utils/minidom.js'

import assert from 'node:assert'
import test from 'node:test'

import { elementFactory, render } from '../skruv.js'

const { svg, polygon, foreignObject, div, line } = elementFactory

test('svg', async () => {
  render(
    svg(
      polygon({ points: '5,5 195,10 185,185 10,195' }),
      foreignObject(
        div('Back in HTML!')
      ),
      line({ x1: '0', y1: '80', x2: '100', y2: '20', stroke: 'black' })
    )
  )
  assert.strictEqual(
    document.documentElement.innerHTML,
    // eslint-disable-next-line max-len
    '<?xml version="1.0" encoding="UTF-8"?><svg xmlns="http://www.w3.org/2000/svg"><polygon points="5,5 195,10 185,185 10,195"></polygon><foreignObject><div>Back in HTML!</div></foreignObject><line x1="0" y1="80" x2="100" y2="20" stroke="black"></line></svg>'
  )
  assert(document.documentElement instanceof SVGElement)
  assert(document.documentElement.childNodes[0] instanceof SVGElement)
  assert(document.documentElement.childNodes[1] instanceof SVGElement)
  assert(document.documentElement.childNodes[1].childNodes[0] instanceof HTMLElement)
  assert(document.documentElement.childNodes[2] instanceof SVGElement)
})
