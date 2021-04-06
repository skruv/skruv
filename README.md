![skruv](./icon.svg)

# skruv

No-dependency, no-build, small JS framework.

* [Github](https://github.com/skruv/skruv)
* [NPM](https://npmjs.com/skruv)
* [Documentation](https://skruv.io)

## Features:

* No buildtime or runtime dependencies, no parsers
* Pretty small:
  * ~400 LOC vDOM
  * ~100 LOC State management
  * ~250 LOC HTML/SVG helpers
* Useable without bundling/compilation/transpilation
* Fast enough for most normal usecases: [benchmark](https://krausest.github.io/js-framework-benchmark/index.html)
* Supports async components like `import()` and async generators
* CSS scoping via shadow DOM
* Hopefully grokable/understandable code
<!-- * Works with web components: [tests](https://custom-elements-everywhere.com/libraries/skruv/results/results.html) -->

## Why another JS framework?

I wanted a framework that:

* had no build-time or run-time dependencies (for both the framework and apps built in it)
* worked with async components (like dynamic imports and async generators)
* has easy state management (in skruv the state imitates a normal object)
* uses plain JS for building up the DOM tree (normal functions, no JSX or template tags)
* allows for or implements css scoping
* was small enough to be hackable and understandable

No framework that I have found satisfies more than two or three of those, so I built my own.
I think skruv mostly satisfies the above points.

## Goals:

* No build steps, no parsing templates and no build or runtime dependencies: the way you write code should be the way it runs
* It should be small enough that minification is a optional optimization step
* Size matters, but only to a certain point: we're not playing golf here
* Try to be easily forkable: Be small enough to maintain and simple enough to evolve/change
* Parts (like state, html, vDOM) should be possible to exchange for alternative implementations: no internal references between core components should be allowed
