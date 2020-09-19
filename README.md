# skruv

Somewhat simple framework for js applications

* Small: 2kb vDOM, 1kb State management, 1.7kb HTML/SVG helpers (non-minified, gziped)
* Useable (and meant to be used) without bundling/compilation/transpilation
* Does not block the main thread on large DOMs (has a backoff system to allow input events etc. to be run while rendering)
* Somewhat Readable code: 200 LOC vDOM with comments
* No legacy browser support (this simplifies the code and allows me to use modern features)
* Rendering, state management and updating are separated. Take what you want and leave the rest

## Example app

[see it live](https://skruv.io/examples/todo)

```js
import { renderNode } from './node_modules/skruv/vDOM.js'
import { body, input, button, ul, li } from './node_modules/skruv/html.js'
import { createState } from './node_modules/skruv/state.js'

let root = document.body

const render = () => {
  root = renderNode(body({},
    input({ type: "text", oninput: e => state.value = e.target.value, value: state.value }),
    button({ onclick: () => state.todos = state.todos.concat(state.value) }, "Add"),
    ul({},
      state.todos.map((todo) => li({}, todo))
    ),
  ), root)
}

let scheduled = false
export const view = () => {
  if (scheduled) return
  scheduled = true
  window.requestAnimationFrame(() => {
    scheduled = false
    render()
  })
}

export const state = createState({
  todos: [],
  value: ""
}, view)

view()
```

## Browser support

Requires Modules, Proxies, Map/WeakMap, so Edge 16+, Safari 11+, and modern versions of all other browsers should work. If you still need to support IE or older Edge versions I'd reccommend that you build a separate minimal-functionality app using hyperapp (a great framework) or similar. That's how I have handled legacy support at a large global ecommerce company.

In some examples I use dynamic imports and optional chaining which requires Chromium Edge and Safari 13.1+ and are not supported in for example Samsung Internet, UC Browser and other smaller browsers.

## Why?

I used hyperapp v1 a lot, both professionally and in hobby projects. I loved it's simplicity, and it introduced me to the idea that a complex app does not require a complex framework. I have also used hyperapp v2, but did not find it to fit as well into my use-cases as v1.

## Arch

* state.js is a recursive proxy that can handle mutable objects that implement toString. It takes in an initial state object and a callback and returns a state that will recursivley listen for changes and call the callback on change
* vDOM.js is a function that takes in a vDOM and target root and renders to a DOM node
* html.js are helper functions to create a vDOM tree. Also exposes a function called `h` and `text` to create arbitrary vDOM nodes
* cache.js is a recursive object cache that can be used to cache expensive function calls. It supports async resolving that notifies a callback to help with dynamic importing.
* State updaters can be implemented as simple functions that modify state. They require nothing special.

## API

All these examples should be runnable with this HTML:

```html
<!DOCTYPE html>
<title>My title</title>
<script type="module" src="/index.js"></script>
```

Where index.js contains the example code shown.

### Rendering

To do a onetime render of a single h1 on a root (in this case the body element) you can do:

[see it live](https://skruv.io/examples/render)

```js
import { renderNode } from './node_modules/skruv/vDOM.js'
import { h1, body } from './node_modules/skruv/html.js'

renderNode(body({}, [
  h1({}, 'Testing!')
]), document.body)
```

### State management

To handle state updates we use the state helper which will call the supplied callback when state changes:

[see it live](https://skruv.io/examples/state)

```js
import { renderNode } from './node_modules/skruv/vDOM.js'
import { body, h1, input } from './node_modules/skruv/html.js'
import { createState } from './node_modules/skruv/state.js'

let root = document.body
let state = {
  input: 'Testing!'
}

const render = () => {
  root = renderNode(body({}, [
    h1({}, state.input),
    input({ value: state.input, oninput: e => { state.input = e.target.value } })
  ]), root)
}

state = createState(state, render)

render()
```

This also works with deep constructs:

[see it live](https://skruv.io/examples/state-deep)

```js
import { renderNode } from './node_modules/skruv/vDOM.js'
import { body, h1, input } from './node_modules/skruv/html.js'
import { createState } from './node_modules/skruv/state.js'

let root = document.body
let state = {
  test1: {test2: {test3: {test4: {input: 'Testing!'}}} }
}

const render = () => {
  root = renderNode(body({}, [
    h1({}, state.test1.test2.test3.test4.input),
    input({ value: state.test1.test2.test3.test4.input, oninput: e => { state.test1.test2.test3.test4.input = e.target.value } })
  ]), root)
}

state = createState(state, render)

render()
```

And most objects that implement `toString()` (which is how the state can tell if a method changed the object):

[see it live](https://skruv.io/examples/state-url)

```js
import { renderNode } from './node_modules/skruv/vDOM.js'
import { body, h1, input } from './node_modules/skruv/html.js'
import { createState } from './node_modules/skruv/state.js'

let root = document.body
let state = {
  objtest: new URLSearchParams('?test')
}

const render = () => {
  root = renderNode(body({}, [
    h1({}, state.objtest.toString()),
    input({
      value: state.objtest.toString(),
      oninput: e => { state.objtest.append('input', e.target.value) }
    })
  ]), root)
}

state = createState(state, render)

render()
```

### Dynamically importing components

* TODO: Add example of errorhandling 

There is a small utility called the importer that helps with async imports and caches the imported modules:

[see it live](https://skruv.io/examples/dynamic-import)

```js
import { renderNode } from './node_modules/skruv/vDOM.js'
import { body, h1, input, progress } from './node_modules/skruv/html.js'
import { createState } from './node_modules/skruv/state.js'
import { importer } from './utils/importer.js'

let root = document.body
export let state = {
  input: 'Testing!'
}

// Normalize the url so it is not relative to the importer
const importUrl = (url) => (new URL(url, import.meta.url)).href

const render = () => {
  root = renderNode(body({}, [
    h1({}, state.input),
    input({ value: state.input, oninput: e => { state.input = e.target.value } }),
    importer(importUrl('./components/one.js'), render) || progress(),
  ]), root)
}

state = createState(state, render)

render()
```

And components/one.js looks like this:

```js
import { h2 } from '../node_modules/skruv/html.js'
import { state } from '../index.js'

export default () => () => h2({}, state.input)
```

We use double wrapped function because one sets up the module (useful for creating local state) and one is the render function called on each render.

## TODO:

* TODO: Add example with separation between view/state/actions
* TODO: Add example of stateful component
* TODO: Add example of contained component (with style, state, actions and view)
* TODO: Add routing example based on URL and URLSearchParams
* TODO: Add helpers for i18n, devtools, error handling
* TODO: Make render timeout configurable
* TODO: Fix ts-ignore
* IDEA: use web components to scope styles
* IDEA: Create a separate 'vdom' for CSS
* IDEA: Chunked rendering in a webworker (pass pack partial segments after a timeout)