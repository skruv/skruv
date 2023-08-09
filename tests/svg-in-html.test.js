/* global SVGElement HTMLElement */
import '../utils/minidom.js'

import assert from 'node:assert'
import test from 'node:test'

import { elementFactory, render } from '../index.js'

const { body, svg, html, polygon, foreignObject, div, line } = elementFactory

test('svg-in-html', async () => {
  render(
    html(
      body(
        svg(
          polygon({ points: '5,5 195,10 185,185 10,195' }),
          foreignObject(
            div('Back in HTML!')
          ),
          line({ x1: '0', y1: '80', x2: '100', y2: '20', stroke: 'black' })
        )
      )
    )
  )
  assert.strictEqual(
    document.documentElement.innerHTML,
    // eslint-disable-next-line max-len
    '<!DOCTYPE html><html><body><svg xmlns="http://www.w3.org/2000/svg"><polygon points="5,5 195,10 185,185 10,195"></polygon><foreignObject><div>Back in HTML!</div></foreignObject><line x1="0" y1="80" x2="100" y2="20" stroke="black"></line></svg></body></html>'
  )
  assert(document.documentElement.childNodes[0].childNodes[0] instanceof SVGElement)
  assert(document.documentElement.childNodes[0].childNodes[0].childNodes[0] instanceof SVGElement)
  assert(document.documentElement.childNodes[0].childNodes[0].childNodes[1] instanceof SVGElement)
  assert(document.documentElement.childNodes[0].childNodes[0].childNodes[1].childNodes[0] instanceof HTMLElement)
  assert(document.documentElement.childNodes[0].childNodes[0].childNodes[2] instanceof SVGElement)
})
