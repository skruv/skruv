#!/usr/bin/env node
/* global Location */
import "./minidom.js"

import { readFile, writeFile } from "node:fs/promises"

;(async () => {
  const location = process.argv[2]
  const input = process.argv[3]
  const output = process.argv[4]

  if (!location || !input || !output) {
    console.error(
      "please supply a location url, one input file and one output path",
    )
    process.exit(1)
  }

  // @ts-expect-error
  globalThis.location = new Location(location)
  // @ts-expect-error
  globalThis.skruvSSRScript = await readFile(input, "utf8")
  const frontend = await import(`${process.cwd()}/${input}`)
  if (frontend.default instanceof Function) {
    await frontend.default()
  }
  await writeFile(output, document.documentElement.innerHTML)
})()
