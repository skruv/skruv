#!/usr/bin/env node
import * as esbuild from "esbuild-wasm"

import httpPlugin from "./esbuildHttpPlugin.js"
import inlineFile from "./esbuildInlineFile.js"
import minifyCssLiteral from "./esbuildMinifyCssLiteral.js"

const input = process.argv[2]
const output = process.argv[3]

if (!input || !output) {
  console.error("please supply one input file and one output path")
  process.exit(1)
}

;(async () => {
  await esbuild.build({
    bundle: true,
    minify: true,
    format: "esm",
    sourcemap: "linked",
    entryPoints: [input],
    jsx: "automatic",
    jsxImportSource: "@skruv/jsx-react",
    define: {
      ...JSON.parse(process.env.BUILD_DEFINES || "{}"),
    },
    plugins: [inlineFile, httpPlugin, minifyCssLiteral],
    outfile: output,
  })
})()
