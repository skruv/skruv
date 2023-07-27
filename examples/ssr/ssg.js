import { readFile, writeFile } from 'node:fs/promises'

import { toHTML } from '../../utils/minidom.js'

(async () => {
  // @ts-ignore: TODO: How to construct a location?
  globalThis.location = new URL('http://127.0.0.1:8000')
  // @ts-ignore: Internal flag to wait for all generators before returning
  globalThis.SkruvWaitForAsync = true
  globalThis.skruvSSRScript = await readFile('./index.min.js', 'utf8')

  const frontend = await import('./index.min.js')
  await frontend.doRender()

  // TODO: Check why we need a microsleep here
  await new Promise(resolve => setTimeout(resolve, 0))
  const responseBody = toHTML(document.documentElement, '', {})
  await writeFile('./index.html', responseBody)
})()
