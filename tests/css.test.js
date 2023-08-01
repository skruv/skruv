import '../utils/minidom.js'

import assert from 'node:assert'
import test from 'node:test'

import { css, cssTextGenerator } from '../utils/css.js'

test('scoped css', async () => {
  const style1 = css`
:scope {
  color: pink;
}
.foo, .baz, div + div + div, [data-test], :not(div) {
  color: black;
}
`
  const style11 = css`
:scope {
  color: pink;
}
.foo, .baz, div + div + div, [data-test], :not(div) {
  color: black;
}
`

  const style2 = css`
.bar {
  color: white;
}
`
  const cssGen = cssTextGenerator()
  assert.strictEqual(style1, 'skruv-css-scope--1293785199')
  assert.strictEqual(style11, 'skruv-css-scope--1293785199')
  assert.strictEqual(style2, 'skruv-css-scope-326637340')
  const allCss = (await cssGen.next()).value
  assert.strictEqual(
    allCss,
    // eslint-disable-next-line max-len
    '.skruv-css-scope--1293785199 {color: pink;}.skruv-css-scope--1293785199 .foo, .skruv-css-scope--1293785199  .baz, .skruv-css-scope--1293785199  div + div + div, .skruv-css-scope--1293785199  [data-test], .skruv-css-scope--1293785199  :not(div) {color: black;}.skruv-css-scope-326637340 .bar {color: white;}'
  )
  const additionalStyle = css`
.baz {
  color: white;
}
:scope :checked {
  color: test;
}
.test:not(:scope) {
  color: test;
}
@media(min-width:1200px){
  .test {
    color: test;
  }
}
`
  const additionalStyle2 = css`
.bar {
  color: white;
}
`
  assert.strictEqual(additionalStyle, 'skruv-css-scope--1479299720')
  assert.strictEqual(additionalStyle2, 'skruv-css-scope-326637340')

  const allCss2 = (await cssGen.next()).value
  assert.strictEqual(
    allCss2,
    // eslint-disable-next-line max-len
    '.skruv-css-scope--1293785199 {color: pink;}.skruv-css-scope--1293785199 .foo, .skruv-css-scope--1293785199  .baz, .skruv-css-scope--1293785199  div + div + div, .skruv-css-scope--1293785199  [data-test], .skruv-css-scope--1293785199  :not(div) {color: black;}.skruv-css-scope-326637340 .bar {color: white;}.skruv-css-scope--1479299720 .baz {color: white;}.skruv-css-scope--1479299720 :checked {color: test;}:not(*) {color: test;}@media (min-width:1200px) {.skruv-css-scope--1479299720 .test {color: test;}}'
  )
})
