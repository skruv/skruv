/* global Location */
import '../../utils/minidom.js'

import { readFile, writeFile } from 'node:fs/promises'

(async () => {
  globalThis.location = new Location('http://127.0.0.1:8000')
  globalThis.SkruvWaitForAsync = true
  globalThis.skruvSSRScript = await readFile('./index.min.js', 'utf8')
  const frontend = await import('./index.min.js')
  await frontend.doRender()
  await writeFile('./index.html', document.documentElement.innerHTML)
})()
