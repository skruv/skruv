import assert from 'node:assert'
import test from 'node:test'

import { elementFactory, render } from '../skruv.js'
import wait from '../utils/generators/waitPromise.js'
import { toHTML } from '../utils/minidom.js'

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
      div({ 'data-skruv-key': arrayKey, 'data-skruv-after-create': /** @param {HTMLElement} e */ async e => { e.textContent = 'arrayKey' } }, '')
    )
  )

  // Microsleep to allow the scheduled data-skruv-after-create to run
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
  // @ts-expect-error: TS thinks the node is "never", if so the test will fail
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
  // @ts-expect-error: TS thinks the node is "never", if so the test will fail
  assert(document.documentElement.childNodes[2].textContent === 'arrayKey-update')

  // insertBefore test
  render(
    html(
      body(
        div(),
        div({ 'data-skruv-key': testKeys[2] }, 'Key2'),
        div({ 'data-skruv-key': testKeys[4] }, 'Key4'),
        div({ 'data-skruv-key': testKeys[5] }, 'Key5'),
        div({ 'data-skruv-key': testKeys[6] }, 'Key6'),
        div({ 'data-skruv-key': testKeys[7] }, 'Key7'),
        div({ 'data-skruv-key': testKeys[8] }, 'Key8'),
        div()
      ),
      div({ 'data-skruv-key': testKeys[9] }, 'Key9-noupdate'),
      div({ 'data-skruv-key': testKeys[3] }, 'Key3'),
      div({ 'data-skruv-key': arrayKey }, 'arrayKey-update'),
      elementFactory['skruv-comment'](['Testing a comment, with special chars!<>"&\'']),
      elementFactory['skruv-raw'](
        div('raw nodes are removed when rendering to html')
      ),
      elementFactory['skruv-header']({ name: 'X-My-Header', value: '1' }),
      elementFactory['skruv-header']({ name: 'X-My-Other-Header', value: '2' })
    )
  )
  assert(document.documentElement.childNodes[2] === initialElements[3])
  assert(document.documentElement.childNodes[3] === arrayKeyedElem)
  // eslint-disable-next-line max-len
  assert.equal(document.documentElement.innerHTML, '<!DOCTYPE html><html><body><div></div><div>Key2</div><div>Key4</div><div>Key5</div><div>Key6</div><div>Key7</div><div>Key8</div><div></div></body><div>Key9</div><div>Key3</div><div>arrayKey-update</div><!--Testing a comment, with special chars!&amp;lt;&amp;gt;&amp;quot;&amp;amp;&amp;#39;--><div>raw nodes are removed when rendering to html</div></html>')
  const headers = {}
  // @ts-expect-error
  toHTML(document.documentElement, '', headers)
  assert.deepEqual(headers, { 'content-type': 'text/html', 'X-My-Header': '1', 'X-My-Other-Header': '2' })
})
