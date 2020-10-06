# skruv

<img src="./icon.svg">

Somewhat simple framework for js applications

[Docs](https://skruv.io)

Features:

* No buildtime or runtime dependencies. Only testing/linting requires dependencies.
* Pretty small: 2kb vDOM, 1kb State management, 2kb HTML/SVG helpers. All sizes non-minified but gziped.
* Useable (and meant to be used) without bundling/compilation/transpilation
* Optionally does not block the main thread on large DOMs (has a backoff system to allow input events etc. to be run
while rendering)
* Somewhat Readable code: 300 LOC vDOM with comments
* Fast enough for most usecases, PR for benchmarks here: https://github.com/krausest/js-framework-benchmark/pull/791
* Works with web components and has helpers for building isolated sub-trees

Values/rules/guidelines/ideals/goals/stuff:

* No build steps, no parsing templates and no build or runtime dependencies. The way you write code should be the way it
runs, without transpilation.
* It should be small enough that minification is an optional optimization step, not mandatory or always recommended.
* Readability and useability are more important than performance, although too bad performance means it is not useable.
* Size matters, but only if it makes the code more understandable. We're not playing golf here.
* Try to be easily forkable: Be small enough to maintain, simple enough to evolve and stable enough to not have to
change unless you want to.
* Parts (like state, cache, vDOM) should be separated and alternative implementations of them should be possible.
* Add type info (via typescript jsdoc) but do not depend on the typescript compiler to build.
