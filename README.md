![skruv](./icon.svg)

# skruv

No-dependency, no-build, small JS view-library/framework-ish-thing.

[Features](#features) • [Examples](#examples) • [Docs](#docs)

[Github](https://github.com/skruv/skruv) • [NPM](https://npmjs.com/skruv)

## Features

* No dependencies
* Small:
  <!-- * [Smallest js framework in krausest benchmarks](https://krausest.github.io/js-framework-benchmark/index.html) -->
  * ~150 LOC
  * 1kb minified and compressed (1039b with brotli, 1169b with gzip, 2431b uncompressed, 6255b unminified and uncompressed)
* Usable without bundling/compilation/transpilation
<!-- * [Plenty fast enough](https://krausest.github.io/js-framework-benchmark/index.html) -->
* [Works with web components](https://github.com/webcomponents/custom-elements-everywhere/pull/2231)
* Optional helper utilities for
  * State management (state.js)
  * Async generators or promises as components (syncify.js)
  * SSR/SSG without jsdom/puppeteer (minidom.js)
  * CSS scoping (css.js)
  * Optionally supports JSX (jsx-runtime.js)
  * or [HTM](https://github.com/developit/htm) as in [htm example](./examples/htm)
  * Bundling/minification (bundle.js, requires esbuild)

## Examples

### Basic todo-list (with state, css scoping and jsx)
{% include_relative examples/todo/index.md %}
```jsx
import { render } from 'skruv'
import { css, cssTextGenerator } from 'skruv/utils/css.js'
import { createState } from 'skruv/utils/state.js'
import { syncify } from 'skruv/utils/syncify.js'

const state = createState({ todos: ['Write todos'] })

const styles = css`
  :scope {
    color: #f1f1f1;
    background: #0f0f0f;
  }

  body {
    max-width: 40ch;
    margin: 0 auto;
  }

  form { display: flex; }
  input { flex: 1; }
  a { color: #9b9b9b; }
`

render(
  syncify(
    <html lang="en-US" class={styles}>
      <head>
        <title>{state.todos.getGenerator(0)}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <style>{cssTextGenerator}</style>
      </head>
      <body>
        <main>
          <h1>{state.todos.getGenerator(0)}</h1>
          <form
            onsubmit={e => {
              e.preventDefault()
              state.todos.unshift(new FormData(e.target).get('todo'))
              e.target.reset()
            }}
          >
            <input name="todo"></input>
            <button>New!</button>
          </form>
          <ol>
            {async function * () {
              for await (const todos of state.todos) {
                yield todos.map((todo, i) => (
                  <li>{todo} <a
                    href="#"
                    onclick={e => {
                      e.preventDefault()
                      todos.splice(i, 1)
                    }}
                  >x</a>
                  </li>
                ))
              }
            }}
          </ol>
        </main>
      </body>
    </html>
  )
)
```

Same example using just the core library, without bundling:
{% include_relative examples/todo-core/index.md %}
```js
import { elementFactory, render } from '../../index.js'

const { html, head, title, meta, body, main, h1, form, input, button, ol, li, a, style } = elementFactory

const state = {
  todos: ['Write todos']
}

const styles = /* css */`
  :scope {
    color: #f1f1f1;
    background: #0f0f0f;
  }

  body {
    max-width: 40ch;
    margin: 0 auto;
  }

  form { display: flex; }
  input { flex: 1; }
  a { color: #9b9b9b; }
`

const doRender = () => render(
  html({ lang: 'en-US' },
    head(
      title(state.todos[0]),
      meta({ name: 'viewport', content: 'width=device-width, initial-scale=1' }),
      style(styles)
    ),
    body(
      main(
        h1(state.todos[0]),
        form({
          onsubmit: e => {
            e.preventDefault()
            state.todos.unshift(new FormData(e.target).get('todo'))
            e.target.reset()
            doRender()
          }
        },
        input({
          name: 'todo'
        }),
        button('New!')
        ),
        ol(
          state.todos.map((todo, i) => li(
            `${todo} `,
            a({
              href: '#',
              onclick: e => {
                e.preventDefault()
                state.todos.splice(i, 1)
                doRender()
              }
            }, 'x')
          ))
        )
      )
    )
  )
)
doRender()
```


## Docs

The core of skruv is the render function. It takes a structure created by elementFactory and optionally which DOM node to write to.
If the same object is passed to a render it will be moved (if it is not currently at the right place) or not modified, allowing for caching/memoization optimizations.

Besides the normal attributes there are the following:
 * data-skruv-key: This marks a node as non-reusable, so that if any element without the same key tries to render to it it will be replaced instead of reused.
 * data-skruv-finished: If you want to mark the result of a async task as incomplete (like for example a loader icon) you can give it the attribute `data-skruv-finished: false` and it will not be considered complete until we get a new element without that attribute.
 * data-skruv-wait-for-not-empty: If you swap one generator for another or similar async work you might want to keep the old children until new ones are ready to prevent flicker. Tag the parent element with `data-skruv-wait-for-not-empty: true` and skruv will not clear the dom children until there are new children to render.
 * oncreate: Called with the element after it is created. Useful for attaching other libraries to the dom node.

Utilities:
 * css.js: If you want to use scoped css you can import the css [tagged template function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals#tagged_templates) and it's corresponding cssTextGenerator. The result of the `css`\`` call is a classname and cssTextGenerator will resolve with the full css for the application, prefixed with the classname for each scope. The styles are deduplicated so you can use it in components that you might use in multiple places.
    * implementation is adapted from https://github.com/samthor/scoped
 * syncify.js: If you want to use async components you pull in the syncify function that takes care of scheduling render updates. It will only schedule a render on the specific part of the DOM that was affected by the async component, making it quite efficient.
 * state.js: If you want an easy to use state management you pull in the createState function which takes in an object and gives you a recursive generator that will listen to any changes to the state object.
    * createState takes in a object and returns a [proxy](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy) which is also an [async generator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/AsyncGenerator).
    * You modify the state by using normal methods (including things like [`delete`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/delete), [`splice`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/splice), etc.).
    * Where you want to subscribe to state changes you use [for-await-of](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for-await...of).
    * You can subscribe to subobjects with `for await (const bar of state.foo.bar)`.
    * As a shortcut you can call state.getGenerator(key) to subscribe to and output a single value.
      * This is useful to output primitive values (like strings/numbers etc.) in for example text or attributes without requiring a whole generator function
 * minidom.js: SSR/SSG examples are bundled in this repo, they use the minidom utility to polyfill what is needed to use skruv in node/deno and serialize the DOM to HTML.
    * uses cssom.js (ported from https://github.com/NV/CSSOM) to polyfill the CSS object model to work with css.js
 * jsx-runtime.js: jsx-runtime provides the necessary parts to allow for JSX usage via a bundler like esbuild. See example below for details.

## Scoped CSS
{% include_relative examples/scopedcss/index.md %}
```js
import { elementFactory, render } from '../../index.js'
import { css, cssTextGenerator } from '../../utils/css.js'
import { syncify } from '../../utils/syncify.js'

const { title, html, head, meta, body, div, p, style } = elementFactory

const rootStyles = css`
  :scope {
    color: #f1f1f1;
    background: #0f0f0f;
  }
`

const scopedStyles = css`
  :scope { border: 1px solid #aaa; }
  p { color: #aaa; }
`

render(
  syncify(
    html({ lang: 'en-US', class: rootStyles },
      head(
        title('scopedcss'),
        meta({ name: 'viewport', content: 'width=device-width, initial-scale=1' }),
        style(cssTextGenerator)
      ),
      body(
        div({ class: scopedStyles },
          p('Hello')
        ),
        div(
          p('World!')
        )
      )
    )
  )
)

```
## JSX
{% include_relative examples/jsx/index.md %}
Compiled with esbuild:
`esbuild --sourcemap --bundle --minify --format=esm --jsx-import-source=skruv --jsx=automatic index.jsx --outfile=index.js` or with the included bundler script to allow for http imports and css template minification.
```jsx
import { render } from 'skruv'

const styles = /* css */`
  :root {
    color: white;
    background: #0f0f0f;
  }
`

render(
  <html lang="en-US">
    {/* Fragments work too, but are usually not needed. */}
    <>
      <head>
        <title>jsx</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <style>{styles}</style>
      </head>
    </>
    <body>
      <div>
        <p>Hello world</p>
      </div>
    </body>
  </html>
)
```

## SSG/SSR
The example folder ssr contains SSR examples for both node and deno. They both use the minidom util to polyfill a "browser-ish" environment. Primarily it mimics the DOM, the CSS object model, the Location interface, EventSource. It also has utils to stringify the html and reset the DOM.

Since most resulting apps will be very small (this one is under 4kb after compression) we inline it into the html here, but there would be no problem to link the script normally. Weigh the pros and cons for your use-case.

This is the node example (should be easily adaptable to any nodejs server):
```js
/* global Location */
import { readFile } from 'node:fs/promises'
import { createServer } from 'node:http'

import { reset, toHTML } from '../../utils/minidom.js'

const server = createServer()
server.on('request', async (req, res) => {
  globalThis.location = new Location(new URL(req.url, `http://${req.headers.host}`))
    globalThis.skruvSSRScript = await readFile('./index.min.js', 'utf8')
  const frontend = await import('./index.min.js')
  await frontend.doRender()
  const headers = {}
  const responseBody = toHTML(document.documentElement, '', headers)
  reset()
  if (!headers['content-type']) { headers['content-type'] = 'text/html' }
  res.statusCode = headers.status || 200
  for (const key in headers) {
    res.setHeader(key, headers[key])
  }
  res.end(responseBody)
})

server.listen(8000)
```

Or to just render it to a file:
```js
/* global Location */
import '../../utils/minidom.js'

import { readFile, writeFile } from 'node:fs/promises'

(async () => {
  globalThis.location = new Location('http://127.0.0.1:8000')
    globalThis.skruvSSRScript = await readFile('./index.min.js', 'utf8')
  const frontend = await import('./index.min.js')
  await frontend.doRender()
  await writeFile('./index.html', document.documentElement.innerHTML)
})()
```

The index.js used here looks like this:
```js
import { elementFactory, render } from '../../index.js'
import { css, cssTextGenerator } from '../../utils/css.js'
import { createState } from '../../utils/state.js'
import { hydrationPromise, syncify } from '../../utils/syncify.js'

const { html, head, title, meta, link, body, main, h1, form, label, input, button, ol, li, a, style, script } = elementFactory

const state = createState({
  todos: ['Write todos']
})

const styles = css`
  :scope {
    color: #f1f1f1;
    background: #0f0f0f;
  }

  body {
    max-width: 40ch;
    margin: 0 auto;
  }

  form {
    display: flex;
    align-items: end;
  }
  label { flex: 1; }
  input { width: 100%; }
  a { color: #9b9b9b; }
`

const dom = syncify(
  html({ lang: 'en-US', class: styles },
    head(
      title(state.todos.getGenerator(0)),
      meta({ name: 'viewport', content: 'width=device-width, initial-scale=1' }),
      style(cssTextGenerator),
      link({ rel: 'icon', href: '/icon.svg', type: 'image/svg+xml', sizes: 'any' }),
      meta({ name: 'description', content: 'Skruv todo-list' })
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
        label(
          'What do you need to do?',
          input({
            type: 'text',
            name: 'todo'
          })
        ),
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
      ),
      !!globalThis.skruvSSRScript && script({ type: 'module' }, globalThis.skruvSSRScript)
    )
  )
)

export const doRender = async () => {
  await hydrationPromise
  render(dom)
  // Microsleep to allow for rendering to finish
  await new Promise(resolve => setTimeout(resolve, 0))
}

doRender()
```
The important parts are
 * the doRender function which waits for the hydrationPromise from syncify. This makes sure that all async work has finished before rendering, so that we both get a complete document on the server, but also that we don't overwrite any existing parts of the document with incomplete parts on the client.
 * the script which contains globalThis.skruvSSRScript, which injects the js for the application

The result can be seen [here](./examples/ssr/) and a non-built version is [here](./examples/ssr/index-nobuild.html) for comparison. In mobile lighthouse testing the SSR:ed version gets a 100 and the nobuild version gets a 90.

## TODO:

* [ ] Add router, generatorUtils, loader, etc.
* [ ] Add template repo
  * [ ] One basic and one with postgrest backend, nginx frontend and SSR
* [ ] Make headline example (todo) use all features, including CSS scoping, SSR/SSG, JSX, syncify etc. Show on separate page.
* [ ] Error boundaries (custom events that bubble on error so they can be caught in the DOM instead of in the js call stack)
