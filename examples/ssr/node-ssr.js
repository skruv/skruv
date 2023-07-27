import { readFile } from 'node:fs/promises'
import { createServer } from 'node:http'

import { reset, toHTML } from '../../utils/minidom.js'

// This file should work with both node and deno, but the deno example is more suited to denos conventions

const server = createServer()
server.on('request', async (req, res) => {
  // @ts-ignore: TODO: How to construct a location?
  globalThis.location = new URL(req.url, `http://${req.headers.host}`)
  // @ts-ignore: Internal flag to wait for all generators before returning
  globalThis.SkruvWaitForAsync = true
  globalThis.skruvSSRScript = await readFile('./index.min.js', 'utf8')

  await import('./index.min.js')

  // TODO: Check why we need a microsleep here
  await new Promise(resolve => setTimeout(resolve, 0))
  /** @type {{ [key: string]: string; }} */
  const headers = {}
  const responseBody = toHTML(document.documentElement, '', headers)
  reset()

  if (!headers['content-type']) { headers['content-type'] = 'text/html' }
  res.statusCode = 200
  for (const key in headers) {
    res.setHeader(key, headers[key])
  }
  res.end(responseBody)
})

server.listen(8000)
