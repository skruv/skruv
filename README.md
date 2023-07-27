![skruv](./icon.svg)

# skruv

No-dependency, no-build, small JS framework/view-library.

* [Github](https://github.com/skruv/skruv)
* [NPM](https://npmjs.com/skruv)

## Features

* No buildtime or runtime dependencies, no parsers
* Pretty small:
  * ~400 LOC HTML/SVG renderer
  * ~150 LOC State management
* When minified:
  * ~9kb
  * ~3kb compressed
* Useable without bundling/compilation/transpilation
* Fast enough for most normal usecases: [benchmark](https://krausest.github.io/js-framework-benchmark/index.html)
* Supports async generators as components
* Built in CSS scoping adapted from <https://github.com/samthor/scoped>
  * If used in SSR requires a CSS Object Model polyfill (cssom)
* Optionally supports JSX
  * Requires a build step
* Works with web components: [PR for tests at custom-elements-everywhere](https://github.com/webcomponents/custom-elements-everywhere/pull/2231)
<!-- * Works with web components: [tests at custom-elements-everywhere](https://custom-elements-everywhere.com/libraries/skruv/results/results.html) -->

## TODO:

* [ ] Handle flatifying in render
* [ ] Build a separate SSG example
* [ ] Build example with SSR bundling the request cache
* [ ] Make headline example (todo) use all features, including CSS scoping, SSR/SSG, JSX, syncify etc.
* [ ] In tests run all the examples and validate their output against snapshots
* Bundle in the CSS template tag minifier

## Examples

### Basic todo-list
{% include_relative examples/todo/index.md %}
```js
import { createState, css, cssTextGenerator, htmlFactory, render } from 'https://skruv.io/index.js'

const { html, head, title, script, meta, body, main, h1, form, input, button, ol, li, a, style } = htmlFactory

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
  html({ lang: 'en-US', class: styles },
    head(
      title(state.todos.getGenerator(0)),
      script({ src: './index.js', type: 'module' }),
      meta({ name: 'viewport', content: 'width=device-width, initial-scale=1' }),
      style(cssTextGenerator)
    ),
    body(
      main(
        h1(state.todos.getGenerator(0)),
        form({
          onsubmit: e => {
            e.preventDefault()
            state.todos.unshift(new FormData(e.target).get('todo'))
            e.target.reset()
          }
        },
        input({
          type: 'text',
          name: 'todo'
        }),
        button('New!')
        ),
        async function * () {
          for await (const currentState of state) {
            yield ol(
              currentState.todos.map((todo, i) => li(
                `${todo} `,
                a({
                  href: '#',
                  onclick: e => {
                    e.preventDefault()
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
    * If no DOM node is given it will render the whole document, like in the examples.
* elements
  * Elements has the function `h` for generating HTML/SVG elements.
  * An elements children can be functions returning other elements, arrays of elements, generators yielding elements, plain elements, strings.
  * Besides the normal [DOM events](https://developer.mozilla.org/en-US/docs/Web/Events) like `onclick` there are `oncreate` and `onremove` which are called when skruv adds/removes the elements.
  * Besides the normal html attributes there is an additonal one called `opaque` which makes skruv ignore all children. This is useful for when you want to instansiate a third party library that does its own DOM handling. In that case you would use a element with `opaque` and then `oncreate` to instansiate the library on that DOM node. 
  * has [tagged template functions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals#tagged_templates) `css` to make it easier to write & syntax highlight css
    * Use [es6-string-css](https://marketplace.visualstudio.com/items?itemName=bashmish.es6-string-css) for syntax highlighting in vscode.
  * `style({scoped: true})` and `<style scoped>` behaves like the (unfortunately) removed [HTML feature](https://developer.mozilla.org/en-US/docs/Web/API/HTMLStyleElement/scoped)
  * It also has helpers for each HTML/SVG element so you can get a h1 element helper by doing `const { h1 } = elements`.
  * There is also a jsx-runtime that works with esbuild if you want to use jsx instead of the element helpers.

## Example using scopedcss
{% include_relative examples/scopedcss/index.md %}
```js
import { css, cssTextGenerator, htmlFactory, render } from 'https://skruv.io/index.js'

const { title, html, head, meta, body, div, p, style } = htmlFactory

const rootStyles = css`
:root {
  font-family: -apple-system, BlinkMacSystemFont, avenir next, avenir, segoe ui, helvetica neue, helvetica, Cantarell, Ubuntu, roboto, noto, arial, sans-serif;
}
`

const scopedStyles = css`
:scope {
  border: 1px solid;
}

p {
  color: blue;
}
`

render(
  html({ lang: 'en-US', class: rootStyles },
    head(
      title('scopedcss'),
      meta({ name: 'viewport', content: 'width=device-width, initial-scale=1' }),
      style(cssTextGenerator)
    ),
    body(
      div({ class: scopedStyles },
        p('blue text')
      ),
      div(
        p('default text')
      )
    )
  )
)
```

## Example using JSX
{% include_relative examples/jsx/index.md %}
Same as above, but using JSX. Compiled with esbuild:
`esbuild --sourcemap --bundle --minify --format=esm --jsx-import-source=skruv --jsx=automatic index.jsx --outfile=index.js` 
```jsx
import { css, cssTextGenerator, render } from 'skruv'
const rootStyles = css`
:root {
  font-family: -apple-system, BlinkMacSystemFont, avenir next, avenir, segoe ui, helvetica neue, helvetica, Cantarell, Ubuntu, roboto, noto, arial, sans-serif;
}
`

const scopedStyles = css`
:scope {
  border: 1px solid;
}

p {
  color: blue;
}
`

render(
  <html lang="en-US" class={rootStyles}>
    <head>
      <title>jsx</title>
      <meta name="viewport" content="width=device-width, initial-scale=1"/>
      <style>{cssTextGenerator}</style>
    </head>
    <body>
      <div class={scopedStyles}>
        <p>blue text</p>
      </div>
      <div>
        <p>default text</p>
      </div>
    </body>
  </html>
)
```
