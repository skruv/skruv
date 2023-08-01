import '../utils/minidom.js'

import assert from 'node:assert'
import test from 'node:test'

import { elementFactory, render } from '../index.js'
import wait from '../utils/generators/waitPromise.js'

const { body, html, div } = elementFactory

test('key', async () => {
  const testKeys = [{ i: 0 }, { i: 0 }, { i: 0 }, { i: 0 }, { i: 0 }, { i: 0 }, { i: 0 }, { i: 0 }, { i: 0 }, { i: 0 }]
  const arrayKey = [1]
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
      ),
      // Check that we don't purge any children not created by skruv unless key changes
      div({ 'data-skruv-key': arrayKey, oncreate: /** @param {HTMLElement} e */ async e => { e.textContent = 'arrayKey' } }, '')
    )
  )

  // Microsleep to allow the scheduled oncreate to run
  await wait(0)
  const initialElements = [...document.documentElement.childNodes[0].childNodes]
  const arrayKeyedElem = document.documentElement.childNodes[1]
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
  assert(document.documentElement.childNodes[1] === undefined)

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
      div({ 'data-skruv-key': testKeys[9] }, 'Key9-noupdate'),
      div({ 'data-skruv-key': arrayKey })
    )
  )
  assert(initialElements[9] === document.documentElement.childNodes[1])
  // @ts-ignore: TS thinks the node is "never", if so the test will fail
  assert(document.documentElement.childNodes[1].textContent === 'Key9')
  assert(document.documentElement.childNodes[2].textContent === 'arrayKey')
  assert(document.documentElement.childNodes[2] === arrayKeyedElem)
  assert(!initialElements.includes(document.documentElement.childNodes[0].childNodes[0]))

  arrayKey.push(2)
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
      div({ 'data-skruv-key': testKeys[9] }, 'Key9-noupdate'),
      div({ 'data-skruv-key': arrayKey }, 'arrayKey-update')
    )
  )
  assert(document.documentElement.childNodes[2] === arrayKeyedElem)
  // @ts-ignore: TS thinks the node is "never", if so the test will fail
  assert(document.documentElement.childNodes[2].textContent === 'arrayKey-update')
})
