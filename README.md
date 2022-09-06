![skruv](./icon.svg)

# skruv

No-dependency, no-build, small JS framework.

* [Github](https://github.com/skruv/skruv)
* [NPM](https://npmjs.com/skruv)

## Features

* No buildtime or runtime dependencies, no parsers
* Pretty small:
  * ~400 LOC HTML renderer
  * ~150 LOC State management
  * ~400 LOC HTML/SVG helpers (without comments)
* When minified:
  * 20kb
  * 5kb compressed
* Useable without bundling/compilation/transpilation
* Fast enough for most normal usecases: [benchmark](https://krausest.github.io/js-framework-benchmark/index.html)
* Supports async generators as components
* Built in CSS scoping based on <https://github.com/samthor/scoped>
<!-- * Works with web components: [tests](https://custom-elements-everywhere.com/libraries/skruv/results/results.html) -->

## Examples

### Basic TODO

<iframe src="./examples/todo/index.html">
