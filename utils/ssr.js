#!/usr/bin/env node
/* global Location */
import { randomBytes } from "node:crypto"
import { readFile } from "node:fs/promises"
import { createServer } from "node:http"

import { reset, toHTML } from "./minidom.js"

const input = process.argv[2]

const server = createServer()
server.on("request", async (req, res) => {
  globalThis.location = new Location(
    // @ts-expect-error
    new URL(req.url, `http://${req.headers.host}`),
  )
  // @ts-expect-error
  globalThis.skruvSSRScript = await readFile(input, "utf8")
  // Force reexecution for each run by appending a query-string
  const frontend = await import(
    `${process.cwd()}/${input}?${randomBytes(32).toString("hex")}`
  )
  // TODO: Should not be needed when top-level-await is properly supported
  if (frontend.default instanceof Function) {
    await frontend.default()
  }
  /** @type {Record<string, string>} */
  const headers = {}
  // @ts-expect-error
  const responseBody = toHTML(document.documentElement, "", headers)
  reset()
  res.statusCode = parseInt(headers.status, 10) || 200
  for (const key in headers) {
    res.setHeader(key, headers[key])
  }
  res.end(responseBody)
})

server.listen(process.env.PORT || 8000)

console.log(
  `listening on http://127.0.0.1:${process.env.PORT || 8000}. Change port with the environment variable PORT`,
)
