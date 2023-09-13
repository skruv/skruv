import fs from 'node:fs/promises'
import path from 'node:path'

const namespace = '_' + Math.random().toString(36)
  .slice(2, 9)
const filter = /^inline:/

// Adapted from https://github.com/claviska/esbuild-plugin-inline-import
/** @type {import('esbuild').Plugin} */
const inlineFile = {
  name: 'esbuild-inline-plugin',
  setup (build) {
    build.onResolve({ filter }, args => {
      const realPath = args.path.replace(filter, '')
      return {
        path: path.resolve(args.resolveDir, realPath),
        namespace
      }
    })

    build.onLoad({ filter: /.*/, namespace }, async args => {
      return {
        contents: await fs.readFile(args.path, 'utf8'),
        loader: 'text'
      }
    })
  }
}

export default inlineFile
