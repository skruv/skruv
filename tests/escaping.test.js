import '../utils/minidom.js'

import assert from 'node:assert'
import test from 'node:test'

import { elementFactory, render } from '../skruv.js'

const { body, script, html, style, head, div } = elementFactory

// TODO: Test against https://github.com/minimaxir/big-list-of-naughty-strings
test('minidom escaping', async () => {
  render(
    html(
      head(
        style(`
        <script>script inside style</script>
        <style>style inside style</style>
        Ending style tag inside style: </style>
        `)
      ),
      body(
        script({ type: `
          newlines inside attribute
          special chars inside attribute: <>"&'
          <script>script inside attribute</script>
          <style>style inside attribute</style>
        ` }, `
          <script>script inside script</script>
          <style>style inside script</style>
          special chars: <>"&'
          ending script tag inside script: </script>
        `),
        div(`
        <script>script inside div</script>
        <style>style inside div</style>
        special chars: <>"&'
        ending div tag inside div: </div>
      `)
      )
    )
  )

  assert.equal(
    document.documentElement.innerHTML,
    // eslint-disable-next-line no-useless-escape
    // eslint-disable-next-line max-len
    '<!DOCTYPE html><html><head><style>\n        <script>script inside style</script>\n        <style>style inside style<\\/style>\n        Ending style tag inside style: <\\/style>\n        </style></head><body><script type="&#13;          newlines inside attribute&#13;          special chars inside attribute: &lt;&gt;&quot;&amp;&apos;&#13;          &lt;script&gt;script inside attribute&lt;/script&gt;&#13;          &lt;style&gt;style inside attribute&lt;/style&gt;&#13;        ">\n          <script>script inside script<\\/script>\n          <style>style inside script</style>\n          special chars: <>"&\'\n          ending script tag inside script: <\\/script>\n        </script><div>\n        &lt;script&gt;script inside div&lt;/script&gt;\n        &lt;style&gt;style inside div&lt;/style&gt;\n        special chars: &lt;&gt;"&\'\n        ending div tag inside div: &lt;/div&gt;\n      </div></body></html>'
  )
})
