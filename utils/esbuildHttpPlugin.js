// From https://esbuild.github.io/plugins/#http-plugin
/** @type {import('esbuild').Plugin} */
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

export default httpPlugin
