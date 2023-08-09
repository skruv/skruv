#!/usr/bin/env node
/* global Location */
import './minidom.js'

import { readFile, writeFile } from 'node:fs/promises'

(async () => {
  // @ts-ignore: Check both deno and node arguments
  const location = globalThis?.process?.argv?.[2] || globalThis?.Deno?.args?.[0]
  // @ts-ignore: Check both deno and node arguments
  const input = globalThis?.process?.argv?.[3] || globalThis?.Deno?.args?.[1]
  // @ts-ignore: Check both deno and node arguments
  const output = globalThis?.process?.argv?.[4] || globalThis?.Deno?.args?.[2]

  if (!location || !input || !output) {
    console.error('please supply a location url, one input file and one output path')
    // @ts-ignore: Deno and node compat
    if (globalThis?.process) { globalThis.process.exit(1) } else if (globalThis?.Deno) { globalThis.Deno.exit(1) }
  }

  // @ts-ignore
  globalThis.location = new Location(location)
  // @ts-ignore
  globalThis.skruvSSRScript = await readFile(input, 'utf8')
  const frontend = await import(process.cwd() + '/' + input)
  await frontend.doRender()
  await writeFile(output, document.documentElement.innerHTML)
})()
