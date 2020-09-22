# skruv

Somewhat simple framework for js applications

Features:

* Pretty small: 2kb vDOM, 1kb State management, 1.7kb HTML/SVG helpers (non-minified, gziped)
* Useable (and meant to be used) without bundling/compilation/transpilation
* Optionally does not block the main thread on large DOMs (has a backoff system to allow input events etc. to be run while rendering)
* Somewhat Readable code: 200 LOC vDOM with comments
* Fast enough for most usecases

Values/rules/guidelines:

* No build steps, no parsing templates. The way you write code should be the way it runs, without transpilation. It should be small enough that minification is an optimization step, not mandatory.
* Readability and useability are more important than performance, although too bad performance means it is not useable.
* Size matters, but only if it makes the code more understandable. We're not playing golf here.
* If possible parts (like state, cache, vDOM) should be separated
* If possible embed typescript typings into jsdoc

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

Or for a full impementation of todomvc see [here](https://skruv.io/examples/todomvc)

## Architecture

* state.js is a recursive proxy that can handle mutable objects that implement toString. It takes in an initial state object and a callback and returns a state that will recursivley listen for changes and call the callback on change
* vDOM.js is a function that takes in a vDOM and target root and renders to a DOM node. Since it renders directly to the root (not inside it) it returns a HTMLElement or SVGElement that is a reference to the new root.
* html.js are helper functions to create a vDOM tree. Also exposes a function called `h` and `text` to create arbitrary vDOM nodes
* cache.js is a recursive object cache that can be used to cache expensive function calls. It supports async resolving that notifies a callback to help with dynamic importing.
* State updaters can be implemented as simple functions that modify state. They require nothing special.

## API

Besides the normal attributes and events two lifecycle events are available:

* `oncreate` is called with the element right after it is added to the DOM
* `onremove` is called with the element right before it is removed from the DOM

And two special attributes:

* `key` means that the element will be bound to that key and will be reused even if reordering/moving it. The key is an object and will be keyed in a WeakMap to allow for garbage collection when nessecary.
* `opaque` means that nothing will be done with childNodes on that element (removing/updating/adding will not happen)

With these it should be pretty simple to add external libraries like editors since key & opaque can make skruv leave those libraries DOM alone even when moving the editor and oncreate/onremove means that you have a place to create/destroy instances of them.

The vDOM module takes three params: a vNode to use as a root (use html.js to generate this), the document root (usually document.body) and optionally a timeout. If a timeout is supplied the renderer will try to chunk work into as many miliseconds as supplied to allow for other event handling and browser paint while rendering. This does not work on long lists yet, only DOM's on different depths.

## Examples

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

## Browser support

Requires Modules, Proxies, Map/WeakMap, so Edge 16+, Safari 11+, and modern versions of all other browsers should work. If you still need to support IE or older Edge versions I'd reccommend that you build a separate minimal-functionality app using hyperapp (a great framework) or similar. That's how I have handled legacy support at a large global ecommerce company.

In some examples I use dynamic imports and optional chaining which requires Chromium Edge and Safari 13.1+ and are not supported in for example Samsung Internet, UC Browser and other smaller browsers.

## Why?

I used hyperapp v1 a lot, both professionally and in hobby projects. I loved it's simplicity, and it introduced me to the idea that a complex app does not nessecarily require a complex framework. I wanted to decouple state managment and actions from it though and also make it easier to manually schedule a render for things like dynamic imports. I also find that while hyperapp is small, the code is not easily readable for me (and I like to understand how the tools I use work).

## TODO:

* TODO: Add example of using skruv in skruv with opaque, key and oncreate. Useful for local state and partial rerendering.
* TODO: Add example with separation between view/state/actions
* TODO: Add example of contained component (with style, state, actions and view)
* TODO: Add routing example based on URL and URLSearchParams
* TODO: Add helpers for i18n, devtools, routing, error handling
* TODO: Fix ts-ignores
* TODO: Handle foreign objects in SVG
* TODO: Add testing
* IDEA: use web components to scope styles
* IDEA: Create a separate 'vDom' for CSS
