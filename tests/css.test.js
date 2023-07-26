import '../utils/minidom.js'

import assert from 'node:assert'
import test from 'node:test'

import { css, cssTextGenerator } from '../utils/css.js'

test('css', async () => {
  const style1 = css`
.foo {
  color: black;
}
`

  const style2 = css`
.bar {
  color: white;
}
`
  assert.strictEqual(style1, 'skruv-css-scope-816540959')
  assert.strictEqual(style2, 'skruv-css-scope-326637340')
  const allCss = (await cssTextGenerator().next()).value
  assert.strictEqual(allCss, '.skruv-css-scope-816540959 .foo {color: black;}.skruv-css-scope-326637340 .bar {color: white;}')
})
