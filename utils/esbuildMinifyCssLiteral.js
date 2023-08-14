import * as esbuild from 'esbuild'
import { readFile } from 'node:fs/promises'

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
        loader: 'tsx'
      }
    })
  }
}

export default minifyCssLiteral
