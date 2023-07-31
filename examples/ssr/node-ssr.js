/* global Location */
import { readFile } from 'node:fs/promises'
import { createServer } from 'node:http'

import { reset, toHTML } from '../../utils/minidom.js'

const server = createServer()
server.on('request', async (req, res) => {
  globalThis.location = new Location(new URL(req.url, `http://${req.headers.host}`))
  globalThis.skruvSSRScript = await readFile('./index.min.js', 'utf8')
  const frontend = await import('./index.js')
  await frontend.doRender()
  /** @type {Record<string, string>} */
  const headers = {}
  const responseBody = toHTML(document.documentElement, '', headers)
  reset()
  if (!headers['content-type']) { headers['content-type'] = 'text/html' }
  res.statusCode = parseInt(headers.status) || 200
  for (const key in headers) {
    res.setHeader(key, headers[key])
  }
  res.end(responseBody)
})

server.listen(8000)
