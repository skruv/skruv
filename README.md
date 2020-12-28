# skruv

<img src="./icon.svg">

Somewhat simple framework for js applications

[Docs](https://skruv.io)

Features:

* No buildtime or runtime dependencies. Only testing/linting requires dependencies.
* Pretty small: 2kb vDOM, 1kb State management, 2kb HTML/SVG helpers. All sizes non-minified but gziped.
* Useable (and meant to be used) without bundling/compilation/transpilation
* Somewhat Readable code: 300 LOC vDOM with comments
* Fast enough for most usecases, PR for benchmarks here: https://github.com/krausest/js-framework-benchmark/pull/791
* Works with web components and has helpers for building isolated sub-trees
* Use async components for partial updates (like `import()` for components and generators for sub-tree updates)

Values/rules/guidelines/ideals/goals/stuff:

* No build steps, no parsing templates and no build or runtime dependencies. The way you write code should be the way it runs, without transpilation.
* It should be small enough that minification is an optional optimization step, not mandatory or even recommended.
* Readability and useability are more important than performance, although too bad performance means it is not useable.
* Size matters, but only to a certain point. We're not playing golf here.
* Try to be easily forkable: Be small enough to maintain and simple enough to evolve.
* Parts (like state, cache, vDOM) should be possible to exchange for alternative implementations.
