# skruv

<img src="./icon.svg">

Somewhat simple framework for js applications.

[Docs](https://skruv.io)

## Features:

* No buildtime or runtime dependencies, only testing/linting requires dependencies
* Pretty small: 2kb vDOM, 1kb State management, 2kb HTML/SVG helpers (sizes non-minified but gziped)
* Useable (and meant to be used) without bundling/compilation/transpilation
* Somewhat Readable code: ~300 LOC vDOM, ~100 LOC state
* Fast enough for most normal usecases: https://krausest.github.io/js-framework-benchmark/index.html
* Works with web components
* Use async components for partial updates (like `import()` for components and generators for isolated sub-tree updates)

## Values/rules/guidelines/ideals/goals/stuff:

* No build steps, no parsing templates and no build or runtime dependencies: the way you write code should be the way it runs, without transpilation
* It should be small enough that minification is an optional optimization step, not always mandatory or even recommended
* Useability are more important than performance, although too bad performance means it is not useable
* Size matters, but only to a certain point: we're not playing golf here
* Try to be easily forkable: Be small enough to maintain and simple enough to evolve
* Parts (like state, html, cache, vDOM) should be possible to exchange for alternative implementations: no internal references between core components should be allowed

## Why create another JS framework?

I wanted a framework that:

* had no build-time or run-time dependencies (for both the framework and apps built in it)
* worked with async components (like dynamic imports and async generators)
* has simple state management (state usable/imitates as a normal object)
* uses plain JS for building up the vDOM tree (normal functions, no JSX or template tags)
* allows for or implements css scoping

No framework that I have found satisfies more than two or three of those, so I built my own.
