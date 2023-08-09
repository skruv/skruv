#!/usr/bin/env node
/* global Location */
import './minidom.js'

import { readFile, writeFile } from 'node:fs/promises'

(async () => {
  // @ts-expect-error: Check both deno and node arguments
  const location = globalThis?.process?.argv?.[2] || globalThis?.Deno?.args?.[0]
  // @ts-expect-error: Check both deno and node arguments
  const input = globalThis?.process?.argv?.[3] || globalThis?.Deno?.args?.[1]
  // @ts-expect-error: Check both deno and node arguments
  const output = globalThis?.process?.argv?.[4] || globalThis?.Deno?.args?.[2]

  if (!location || !input || !output) {
    console.error('please supply a location url, one input file and one output path')
    // @ts-expect-error: Deno and node compat
    if (globalThis?.process) { globalThis.process.exit(1) } else if (globalThis?.Deno) { globalThis.Deno.exit(1) }
  }

  // @ts-expect-error
  globalThis.location = new Location(location)
  // @ts-expect-error
  globalThis.skruvSSRScript = await readFile(input, 'utf8')
  const frontend = await import(process.cwd() + '/' + input)
  if (frontend.default instanceof Function) { await frontend.default() }
  await writeFile(output, document.documentElement.innerHTML)
})()
