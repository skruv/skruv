import '../utils/minidom.js'

import assert from 'node:assert'
import test from 'node:test'

import { elementFactory, render } from '../index.js'

const { body, html, div } = elementFactory

test('key', async () => {
  const testKeys = [{ i: 0 }, { i: 0 }, { i: 0 }, { i: 0 }, { i: 0 }, { i: 0 }, { i: 0 }, { i: 0 }, { i: 0 }, { i: 0 }]

  render(
    html(
      body(
        div({ 'data-skruv-key': testKeys[0] }, 'Key0'),
        div({ 'data-skruv-key': testKeys[1] }, 'Key1'),
        div({ 'data-skruv-key': testKeys[2] }, 'Key2'),
        div({ 'data-skruv-key': testKeys[3] }, 'Key3'),
        div({ 'data-skruv-key': testKeys[4] }, 'Key4'),
        div({ 'data-skruv-key': testKeys[5] }, 'Key5'),
        div({ 'data-skruv-key': testKeys[6] }, 'Key6'),
        div({ 'data-skruv-key': testKeys[7] }, 'Key7'),
        div({ 'data-skruv-key': testKeys[8] }, 'Key8'),
        div({ 'data-skruv-key': testKeys[9] }, 'Key9')
      )
    )
  )
  const initialElements = [...document.documentElement.childNodes[0].childNodes]
  testKeys.forEach(k => k.i++)
  render(
    html(
      body(
        div({ 'data-skruv-key': testKeys[9] }, 'Key9'),
        div({ 'data-skruv-key': testKeys[1] }, 'Key1-update'),
        div({ 'data-skruv-key': testKeys[2] }, 'Key2'),
        div({ 'data-skruv-key': testKeys[3] }, 'Key3'),
        div({ 'data-skruv-key': testKeys[4] }, 'Key4'),
        div({ 'data-skruv-key': testKeys[5] }, 'Key5'),
        div({ 'data-skruv-key': testKeys[6] }, 'Key6'),
        div({ 'data-skruv-key': testKeys[7] }, 'Key7'),
        div({ 'data-skruv-key': testKeys[8] }, 'Key8'),
        div({ 'data-skruv-key': testKeys[0] }, 'Key0')
      )
    )
  )

  assert(document.documentElement.childNodes[0].childNodes[1].textContent === 'Key1-update')
  assert(initialElements[0] === document.documentElement.childNodes[0].childNodes[9])
  assert(initialElements[9] === document.documentElement.childNodes[0].childNodes[0])

  render(
    html(
      body(
        div(),
        div({ 'data-skruv-key': testKeys[2] }, 'Key2'),
        div({ 'data-skruv-key': testKeys[3] }, 'Key3'),
        div({ 'data-skruv-key': testKeys[4] }, 'Key4'),
        div({ 'data-skruv-key': testKeys[5] }, 'Key5'),
        div({ 'data-skruv-key': testKeys[6] }, 'Key6'),
        div({ 'data-skruv-key': testKeys[7] }, 'Key7'),
        div({ 'data-skruv-key': testKeys[8] }, 'Key8'),
        div()
      ),
      div({ 'data-skruv-key': testKeys[9] }, 'Key9-noupdate')
    )
  )
  assert(initialElements[9] === document.documentElement.childNodes[1])
  assert(document.documentElement.childNodes[1].textContent === 'Key9')
  assert(!initialElements.includes(document.documentElement.childNodes[0].childNodes[0]))
})
