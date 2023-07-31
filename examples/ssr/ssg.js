/* global Location */
import '../../utils/minidom.js'

import { readFile, writeFile } from 'node:fs/promises'

(async () => {
  // @ts-ignore: minidom makes locations constructible
  globalThis.location = new Location('http://127.0.0.1:8000')
  globalThis.skruvSSRScript = await readFile('./index.min.js', 'utf8')
  const frontend = await import('./index.min.js')
  await frontend.doRender()
  await writeFile('./index.html', document.documentElement.innerHTML)
})()
