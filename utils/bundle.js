#!/usr/bin/env node
import * as esbuild from 'esbuild'
import { readFile } from 'node:fs/promises'

// This file is meant to work with both node and deno

// From https://esbuild.github.io/plugins/#http-plugin
/** @type {esbuild.Plugin} */
const httpPlugin = {
  name: 'http',
  setup (build) {
    build.onResolve({ filter: /^https?:\/\// }, args => ({
      path: args.path,
      namespace: 'http-url'
    }))
    build.onResolve({ filter: /.*/, namespace: 'http-url' }, args => ({
      path: new URL(args.path, args.importer).toString(),
      namespace: 'http-url'
    }))
    build.onLoad({ filter: /.*/, namespace: 'http-url' }, async ({ path }) => ({
      contents: await fetch(path).then(res => res.text())
    }))
  }
}

/** @type {esbuild.Plugin} */
const minifyCssLiteral = {
  name: 'minify-css-literal',
  setup (build) {
    build.onLoad({ filter: /.*/, namespace: '' }, async args => {
      let contents = await readFile(args.path, 'utf8')
      for (const tag of ['css', '/*css*/', '/* css */']) {
        let searchStart = 0
        while (true) {
          const index = contents.indexOf(tag + '`', searchStart)
          if (index === -1) { break }
          const start = index + tag.length + 1
          const end = contents.indexOf('`', start)
          const css = contents.slice(start, end)
          const result = await esbuild.transform(css, {
            loader: 'css',
            minify: true
          })
          if (result.warnings.length) {
            return { warnings: result.warnings }
          }
          const newCss = result.code

          contents = contents.slice(0, start) + newCss.trim() +
            contents.slice(end)
          searchStart = start + newCss.length
        }
      }

      return {
        contents,
        // Default to TSX to allow for TS and JSX
        // TODO: Check how we can autodetect the correct loader
        /** @type {esbuild.Loader} */
        loader: 'tsx'
      }
    })
  }
}

// @ts-ignore: Check both deno and node arguments
const input = globalThis?.process?.argv?.[2] || globalThis?.Deno?.args?.[0]
// @ts-ignore: Check both deno and node arguments
const output = globalThis?.process?.argv?.[3] || globalThis?.Deno?.args?.[1]

if (!input || !output) {
  console.error('please supply one input file and one output path')
  // @ts-ignore: Deno and node compat
  globalThis?.process?.exit(1) || globalThis?.Deno?.exit(1)
}

; (async () => {
  await esbuild.build({
    bundle: true,
    minify: true,
    format: 'esm',
    sourcemap: 'linked',
    entryPoints: [input],
    jsx: 'automatic',
    jsxImportSource: 'skruv',
    plugins: [
      httpPlugin,
      minifyCssLiteral
    ],
    outfile: output
  })
})()
