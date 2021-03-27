# skruv

<img src="https://skruv.io/icon.svg">

Somewhat simple framework for js applications.

* [Github](https://github.com/skruv/skruv)
* [NPM](https://npmjs.com/skruv)
* [Docs/Examples](https://skruv.io)

`npm install skruv`

## Features:

* No buildtime or runtime dependencies, only testing/linting dependencies
* Pretty small: ~3kb vDOM, ~2kb State management, ~3kb HTML/SVG helpers (sizes non-minified but gziped)
* Useable (and meant to be used) without bundling/compilation/transpilation
* Hopefully grokable/understandable code:
  * Sorta small
  * Somewhat commented
  * Not playing too much golf
* Fast enough for most normal usecases: https://krausest.github.io/js-framework-benchmark/index.html
* Works with web components
* Use async components for partial updates (like `import()` for components and generators for isolated sub-tree updates)

## Values/rules/guidelines/ideals/goals/stuff:

* No build steps, no parsing templates and no build or runtime dependencies: the way you write code should be the way it runs
* It should be small enough that minification is a optional optimization step
* Size matters, but only to a certain point: we're not playing golf here
* Try to be easily forkable: Be small enough to maintain and simple enough to evolve
* Parts (like state, html, vDOM) should be possible to exchange for alternative implementations: no internal references between core components should be allowed

## Why create another JS framework?

I wanted a framework that:

* had no build-time or run-time dependencies (for both the framework and apps built in it)
* worked with async components (like dynamic imports and async generators)
* has simple state management (state is usable/imitates a normal object)
* uses plain JS for building up the vDOM tree (normal functions, no JSX or template tags)
* allows for or implements css scoping (without compilation)
* was small enough to be hackable and understandable

No framework that I have found satisfies more than two or three of those, so I built my own.
I think skruv mostly satisfies the above points.
