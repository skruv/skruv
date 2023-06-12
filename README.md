![skruv](./icon.svg)

# skruv

No-dependency, no-build, small JS framework/view-library.

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

### Basic todo-list

<iframe
  src="./examples/todo/index.html"
  style="width:100%"
  frameborder="0"
  onload="this.style.height = `${this.contentWindow.document.documentElement.scrollHeight + 100}px`"
></iframe>

```js
import { createState, elements, render } from 'https://skruv.github.io/skruv/skruv.js'
const { h, css } = elements

const state = createState({
  todos: ['Write todos']
})

const styles = css`
:root {
  font-family: -apple-system, BlinkMacSystemFont, avenir next, avenir, segoe ui, helvetica neue, helvetica, Cantarell, Ubuntu, roboto, noto, arial, sans-serif;
}

body {
  max-width: 40ch;
  margin: 0 auto;
}

form {
  display: flex;
}

input {
  flex: 1;
}
`

render(
  h('html', { lang: 'en-US' },
    h('head', {},
      h('title', {}, state.todos.getGenerator(0)),
      h('script', { src: './index.js', type: 'module' }),
      h('meta', { name: 'viewport', content: 'width=device-width, initial-scale=1' }),
      styles
    ),
    h('body', {},
      h('main', {},
        h('h1', {}, state.todos.getGenerator(0)),
        h('form',
          {
            onsubmit: e => {
              e.preventDefault()
              state.todos.unshift(new FormData(e.target).get('todo'))
              e.target.reset()
            }
          },
          h('input', {
            type: 'text',
            name: 'todo'
          }),
          h('button', {}, 'New!')
        ),
        async function* () {
          for await (const currentState of state) {
            yield h('ol', {},
              currentState.todos.map((todo, i) => h('li', {},
                todo,
                ' ',
                h('a', {
                  href: '#',
                  onclick: () => {
                    currentState.todos.splice(i, 1)
                  }
                }, 'x')
              ))
            )
          }
        }
      )
    )
  )
)
```

There are three main parts of skruv:

* createState
  * createState takes in a object and returns a [proxy](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy) which is also an [async generator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/AsyncGenerator).
  * You modify the state by using normal methods (including things like [`delete`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/delete), [`splice`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/splice), etc.) or setters on it.
  * Where you want to subscribe to state changes you use [for-await-of](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for-await...of).
    * You can subscribe to subobjects with `for await (const bar of state.foo.bar)`.
  * As a shortcut you can call getGenerator(key) to subscribe to and ouput a single value.
    * This also works as a way to output the value in a attribute.
* render
  * Render takes a structure created by elements and optionally which DOM node to write to.
    * If no DOM node is given it will render the whole document like above.
* elements
  * Elements has the function `h` for generating HTML/SVG elements.
  * An elements children can be functions returning other elements, arrays of elements, generators yielding elements, plain elements, strings.
  * Besides the normal [DOM events](https://developer.mozilla.org/en-US/docs/Web/Events) like `onclick` there are `oncreate` and `onremove` which are called when skruv adds/removes the elements.
  * It also has [tagged template functions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals#tagged_templates) for creating `css` style elements and `scopedcss` for creating scoped css.
    * `scopedcss` behaves like the (unfortunately) removed [HTML feature](https://developer.mozilla.org/en-US/docs/Web/API/HTMLStyleElement/scoped)
  * It also has helpers for each HTML/SVG element so you can get a h1 element helper by doing `const { h1 } = elements`.
  * There is also a jsx-runtime that works with esbuild if you want to use jsx instead of the element helpers.

## Example using scopedcss and html helpers

<iframe
  src="./examples/scopedcss-htmlhelpers/index.html"
  style="width:100%"
  frameborder="0"
  onload="this.style.height = `${this.contentWindow.document.documentElement.scrollHeight + 100}px`"
></iframe>

```js
import { elements, render } from 'https://skruv.github.io/skruv/skruv.js'
const { scopedcss, html, head, meta, body, div, p } = elements

const rootStyles = css`
:root {
  font-family: -apple-system, BlinkMacSystemFont, avenir next, avenir, segoe ui, helvetica neue, helvetica, Cantarell, Ubuntu, roboto, noto, arial, sans-serif;
}
`

const styles = scopedcss`
:scope {
  border: 1px solid;
}

p {
  color: blue;
}
`

render(
  html({ lang: 'en-US' },
    head({},
      title({}, 'scopedcss, HTML helpers'),
      meta({ name: 'viewport', content: 'width=device-width, initial-scale=1' }),
      rootStyles
    ),
    body({},
      div({},
        styles,
        p({}, 'blue text')
      ),
      div({},
        p({}, 'default text')
      )
    )
  )
)
```
