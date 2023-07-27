#!/usr/bin/env node
import * as esbuild from 'esbuild'
import { readFile } from 'node:fs/promises'
import http from 'node:http'
import https from 'node:https'

// This file is meant to work with both node and deno

// From https://esbuild.github.io/plugins/#http-plugin
const httpPlugin = {
  name: 'http',
  setup (build) {
    // Intercept import paths starting with "http:" and "https:" so
    // esbuild doesn't attempt to map them to a file system location.
    // Tag them with the "http-url" namespace to associate them with
    // this plugin.
    build.onResolve({ filter: /^https?:\/\// }, args => ({
      path: args.path,
      namespace: 'http-url'
    }))

    // We also want to intercept all import paths inside downloaded
    // files and resolve them against the original URL. All of these
    // files will be in the "http-url" namespace. Make sure to keep
    // the newly resolved URL in the "http-url" namespace so imports
    // inside it will also be resolved as URLs recursively.
    build.onResolve({ filter: /.*/, namespace: 'http-url' }, args => ({
      path: new URL(args.path, args.importer).toString(),
      namespace: 'http-url'
    }))

    // When a URL is loaded, we want to actually download the content
    // from the internet. This has just enough logic to be able to
    // handle the example import from unpkg.com but in reality this
    // would probably need to be more complex.
    build.onLoad({ filter: /.*/, namespace: 'http-url' }, async args => {
      const contents = await new Promise((resolve, reject) => {
        function fetch (url) {
          console.log(`Downloading: ${url}`)
          const lib = url.startsWith('https') ? https : http
          const req = lib.get(url, res => {
            if ([301, 302, 307].includes(res.statusCode)) {
              fetch(new URL(res.headers.location, url).toString())
              req.abort()
            } else if (res.statusCode === 200) {
              const chunks = []
              res.on('data', chunk => chunks.push(chunk))
              res.on('end', () => resolve(Buffer.concat(chunks)))
            } else {
              reject(new Error(`GET ${url} failed: status ${res.statusCode}`))
            }
          }).on('error', reject)
        }
        fetch(args.path)
      })
      return { contents }
    })
  }
}

/** @type {esbuild.Plugin} */
const minifyCssLiteral = {
  name: 'minify-css-literal',
  setup (build) {
    const tag = 'css'
    /** @type {esbuild.Message[]} */
    let warnings

    /**
     * @param {string} css
     * @returns {Promise<string>}
     */
    const parse = async css => {
      const result = await esbuild.transform(css, {
        loader: 'css',
        minify: true
      })
      if (result.warnings.length) {
        warnings = result.warnings
        return ''
      }
      return result.code
    }

    /**
     * @param {{contents: string}} arg
     * @returns
     */
    const transformContents = async ({ contents }) => {
      let searchStart = 0
      while (true) {
        const index = contents.indexOf(tag + '`', searchStart)
        if (index === -1) { break }
        const start = index + tag.length + 1
        const end = contents.indexOf('`', start)
        const css = contents.slice(start, end)
        const newCss = await parse(css)

        if (warnings) { return { warnings } }

        contents = contents.slice(0, start) + newCss.trim() +
          contents.slice(end)
        searchStart = start + newCss.length
      }
      // Default to TSX to allow for ts and jsx
      // TODO: Check how we can autodetect the correct loader
      return { contents, loader: 'tsx' }
    }

    build.onLoad({ filter: /.*/, namespace: '' }, async args => {
      const contents = await readFile(args.path, 'utf8')

      return await transformContents({ contents })
    })
  }
}

const input = globalThis?.process?.argv?.[2] || globalThis?.Deno?.args?.[0]
const output = globalThis?.process?.argv?.[3] || globalThis?.Deno?.args?.[1]

if (!input || !output) {
  console.log('please supply one input file and one output path')
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
