#!/usr/bin/env node
import * as esbuild from 'esbuild'

import httpPlugin from './esbuildHttpPlugin.js'
import inlineFile from './esbuildInlineFile.js'
import minifyCssLiteral from './esbuildMinifyCssLiteral.js'

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

; (async () => {
  await esbuild.build({
    bundle: true,
    minify: true,
    format: 'esm',
    sourcemap: 'linked',
    entryPoints: [input],
    jsx: 'automatic',
    jsxImportSource: '@skruv/jsx',
    define: {
      ...JSON.parse(process.env.BUILD_DEFINES || '{}')
    },
    plugins: [
      inlineFile,
      httpPlugin,
      minifyCssLiteral
    ],
    outfile: output
  })
})()
