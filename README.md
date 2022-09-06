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

<iframe
  src="./examples/todo/index.html"
  style="width:100%"
  frameborder="0"
  onload="this.style.height = `${this.contentWindow.document.documentElement.scrollHeight}px`"
>

```js
import { createState, elements, render } from 'https://skruv.github.io/skruv/skruv.js'
const {
  html,
  head,
  title,
  meta,
  script,
  body,
  main,
  h1,
  div,
  form,
  input,
  ul,
  li,
  button
} = elements

const state = createState({
  todos: ['Write todos'],
  value: ''
})

render(
  html({ lang: 'en-US' },
    head({},
      title({}, state.todos.getGenerator(0)),
      meta({ name: 'viewport', content: 'width=device-width, initial-scale=1' }),
      script({ src: './index.js' })
    ),
    body({},
      main({},
        h1({}, state.todos.getGenerator(0)),
        async function * () {
          yield div({ 'data-skruv-finished': true }, 'Loading')
          for await (const currentState of state) {
            yield form(
              {
                onsubmit: e => {
                  e.preventDefault()
                  currentState.todos.unshift(currentState.value)
                }
              },
              input({
                type: 'text',
                value: currentState.value,
                oninput: e => { currentState.value = e.target.value }
              }),
              ul({},
                currentState.todos.map(todo => li({}, todo))
              ),
              button({}, 'New!')
            )
          }
        }
      )
    )
  )
)

```
