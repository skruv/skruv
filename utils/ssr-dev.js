#!/usr/bin/env node
/* global Location */
import esbuild from 'esbuild-wasm'
import { randomBytes } from 'node:crypto'
import fs from 'node:fs/promises'
import { createServer } from 'node:https'
import path from 'node:path'

import httpPlugin from './esbuildHttpPlugin.js'
import { reset, toHTML } from './minidom.js'

// This file is meant to work with both node and deno
// @ts-expect-error: Check both deno and node arguments
const input = globalThis?.process?.argv?.[2] || globalThis?.Deno?.args?.[0]
// @ts-expect-error: Check both deno and node arguments
const output = globalThis?.process?.argv?.[3] || globalThis?.Deno?.args?.[1]

const baseHost = globalThis?.process?.argv?.[4]

if (!input || !output || !baseHost) {
  console.error('please supply one input file and one output path and one base host url')
  // @ts-expect-error: Deno and node compat
  if (globalThis?.process) { globalThis.process.exit(1) } else if (globalThis?.Deno) { globalThis.Deno.exit(1) }
}

/** @type {Array<Function>} */
const listeners = []

const mimeType = {
  '.html': 'text/html',
  '.js': 'text/javascript',
  '.json': 'application/json',
  '.css': 'text/css',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.svg': 'image/svg+xml',
}

export const existsFile = async path => {
  try {
    const fileInfo = await fs.stat(path)
    if (!fileInfo.isFile()) return false
    return true
  } catch (_e) {
    return false
  }
}

export async function* readStream(stream) {
  let reader = stream.getReader();

  try {
    while (true) {
      let result = await reader.read();
      if (result.done) break;
      yield result.value;
    }
  } finally {
    reader.releaseLock();
  }
}

/** @type {esbuild.Plugin} */
const SSEPlugin = {
  name: 'example',
  setup(build) {
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
        js: `
(() => {
  const c = new EventSource("https://127.0.0.1:${process.env.PORT || 8000}/_skruv_sse_reload")
  c.addEventListener("reload", () => { location.reload() })
  addEventListener("beforeunload", () => { if (c) c.close() });
})();`
      },
      plugins: [
        httpPlugin,
        SSEPlugin
      ],
      outfile: output
    })
    await ctx.watch()
  })()

const options = {
  key: await fs.readFile("server.key"),
  cert: await fs.readFile("server.cert"),
};
const server = createServer(options)
server.on('request', async (req, res) => {
  if (req.url === '/_skruv_sse_reload') {
    res.statusCode = 200
    res.setHeader('Access-Control-Allow-Origin', '*');
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
    return
  }
  let pathname = path.join(process.cwd(), req.url);
  if (await existsFile(pathname)) {
    const ext = path.parse(pathname).ext;
    res.setHeader('Content-type', mimeType[ext] || 'application/octet-stream');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.end(await fs.readFile(pathname));
    return
  }
  // @ts-expect-error
  globalThis.location = new Location(new URL(req.url, `https://${baseHost}`))
  // @ts-expect-error
  globalThis.skruvSSRScript = await fs.readFile(output, 'utf8')
  globalThis.isSkruvSSR = true
  globalThis.skruvHost = `https://${baseHost}`
  // Force reexecution for each run by appending a query-string
  const frontend = await import(process.cwd() + '/' + output + '?' + randomBytes(32).toString('hex'))
  if (globalThis.finish) await globalThis.finish()
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

})

server.listen(process.env.PORT || 8000)

console.log(`listening on https://127.0.0.1:${process.env.PORT || 8000}. Change port with the environment variable PORT`)


