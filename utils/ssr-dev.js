#!/usr/bin/env node
/* global Location */
import esbuild from 'esbuild'
import { randomBytes } from 'node:crypto'
import { readFile } from 'node:fs/promises'
import { createServer } from 'node:http'

import httpPlugin from './esbuildHttpPlugin.js'
import minifyCssLiteral from './esbuildMinifyCssLiteral.js'
import { reset, toHTML } from './minidom.js'

// This file is meant to work with both node and deno
// @ts-expect-error: Check both deno and node arguments
const input = globalThis?.process?.argv?.[2] || globalThis?.Deno?.args?.[0]
// @ts-expect-error: Check both deno and node arguments
const output = globalThis?.process?.argv?.[3] || globalThis?.Deno?.args?.[1]

if (!input || !output) {
  console.error('please supply one input file and one output path')
  // @ts-expect-error: Deno and node compat
  if (globalThis?.process) { globalThis.process.exit(1) } else if (globalThis?.Deno) { globalThis.Deno.exit(1) }
}

/** @type {Array<Function>} */
const listeners = []

/** @type {esbuild.Plugin} */
const SSEPlugin = {
  name: 'example',
  setup (build) {
    build.onEnd(result => {
      console.log(`build ended with ${result.errors.length} errors`)
      listeners.forEach(l => l())
    })
  }
}

; (async () => {
  const ctx = await esbuild.context({
    bundle: true,
    minify: true,
    format: 'esm',
    sourcemap: 'inline',
    entryPoints: [input],
    jsx: 'automatic',
    jsxImportSource: '@skruv/jsx',
    banner: {
      js: ' (() => new EventSource("/_skruv_sse_reload").addEventListener("reload", () => { location.reload() }))();'
    },
    plugins: [
      httpPlugin,
      minifyCssLiteral,
      SSEPlugin
    ],
    outfile: output
  })
  await ctx.watch()
})()

const server = createServer()
server.on('request', async (req, res) => {
  if (req.url === '/_skruv_sse_reload') {
    res.statusCode = 200
    res.setHeader('content-type', 'text/event-stream; charset=utf-8')
    const listener = () => {
      try {
        res.write(
          'retry: 1000\nevent: reload\ndata: reload\n\n\n'
        )
      } catch (e) {
        listeners.splice(listeners.indexOf(listener), 1)
      }
    }
    listeners.push(listener)
    setTimeout(() => {
      try {
        res.write(
          'retry: 1000\nevent: ping\n\n\n'
        )
      } catch (e) {
        listeners.splice(listeners.indexOf(listener), 1)
      }
    }, 1000)
  } else {
    // @ts-expect-error
    globalThis.location = new Location(new URL(req.url, `http://${req.headers.host}`))
    // @ts-expect-error
    globalThis.skruvSSRScript = await readFile(output, 'utf8')
    // Force reexecution for each run by appending a query-string
    const frontend = await import(process.cwd() + '/' + output + '?' + randomBytes(32).toString('hex'))
    // TODO: Should not be needed when top-level-await is properly supported
    if (frontend.default instanceof Function) { await frontend.default() }
    /** @type {Record<string, string>} */
    const headers = {}
    // @ts-expect-error
    const responseBody = toHTML(document.documentElement, '', headers)
    reset()
    res.statusCode = parseInt(headers.status) || 200
    for (const key in headers) {
      res.setHeader(key, headers[key])
    }
    res.end(responseBody)
  }
})

server.listen(process.env.PORT || 8000)

console.log(`listening on http://127.0.0.1:${process.env.PORT || 8000}. Change port with the environment variable PORT`)
