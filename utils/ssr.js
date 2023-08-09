#!/usr/bin/env node
/* global Location */
import { readFile } from 'node:fs/promises'
import { createServer } from 'node:http'

import { reset, toHTML } from './minidom.js'

// @ts-expect-error
const input = globalThis?.process?.argv?.[2] || globalThis?.Deno?.args?.[0]

const server = createServer()
server.on('request', async (req, res) => {
  // @ts-expect-error
  globalThis.location = new Location(new URL(req.url, `http://${req.headers.host}`))
  // @ts-expect-error
  globalThis.skruvSSRScript = await readFile(input, 'utf8')
  const frontend = await import(process.cwd() + '/' + input)
  if (frontend.default instanceof Function) { await frontend.default() }
  /** @type {Record<string, string>} */
  const headers = {}
  // @ts-expect-error
  const responseBody = toHTML(document.documentElement, '', headers)
  reset()
  if (!headers['content-type']) { headers['content-type'] = 'text/html' }
  res.statusCode = parseInt(headers.status) || 200
  for (const key in headers) {
    res.setHeader(key, headers[key])
  }
  res.end(responseBody)
})

server.listen()
