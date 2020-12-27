<markdown-rendered href="./README.md"></markdown-rendered>

## Example app

<example-code language="js" href="./examples/todo/index.js"></example-code>
Result ([Open by itself](./examples/todo)):
<iframe src="./examples/todo"></iframe>

Or for a full impementation of todomvc see [here](./examples/todomvc)

## Architecture

* state.js is a recursive proxy for plain objects and arrays. It takes in an initial state
object and can then be used as a generator to listen for changes. It is recursive, so subobjects or subarrays can also be listened to.
* vDOM.js is a function that takes in a vDOM and target root and renders to a DOM node. Since it renders directly to the
root (not inside it) it returns a HTMLElement or SVGElement that is a reference to the new root. This is because skruv does not render to a child of the root, instead it renders to the root itself so that for example body can be the root.
* html.js are helper functions to create a vDOM tree. Also exposes a function called `h` and `textNode` to create
arbitrary vDOM nodes and a tagged template function called `css` to help with creating styles. The HTML element `var`
and the SVG element `switch` are suffixed by Elem (`varElem` and `switchElem`) because the names are reserved in js.
* cache.js is a recursive object cache that can be used to cache expensive function calls. It supports async resolving
that notifies a callback to help with dynamic importing.
* State updaters can be implemented as simple functions that modify state. They require nothing special.

## API

Besides the normal attributes and events two lifecycle events are available:

* `oncreate` is called with the element right after it is added to the DOM
* `onremove` is called with the element right before it is removed from the DOM

And two special attributes:

* `key` means that the element will be bound to that key and will be reused even if reordering/moving it. The key is either a object or a scalar value. It is stored in either a weakmap or a map.
* `opaque` means that nothing will be done with childNodes on that element (removing/updating/adding will not happen)

With these it should be pretty simple to add external libraries like editors since key & opaque can make skruv leave
those libraries DOM alone even when moving the editor and oncreate/onremove means that you have a place to
create/destroy instances of them.

The vDOM module takes three params: a vNode to use as a root (use html.js to generate this), the document root (usually
document.body) and optionally a timeout. If a timeout is supplied the renderer will try to chunk work into as many
miliseconds as supplied to allow for other event handling and browser paint while rendering. This does not work on long
lists yet, only DOM's on different depths.

## Webcomponents

Skruv comes with two webcomponents built in, `stateful` and `stateless`. As the names imply `stateful` has internal
state and can be rerendered on changes without rerendering the whole tree. `stateless` has no internal state and will
only be rerendered with the rest of the tree but provides CSS scoping. For usage see the examples below. Both will
trigger a rerender when the parent element does.

`stateful` takes in a initState object for initial state and combines it with any attributes. On state change it will
emit a statechanged event that contains the full state which can be used to communicate state back to global states.

**IMPORTANT**: When using `stateful` components any components of the same name must also use the exact same attribute
keys!

Non-skruv webcomponents should work normally by creating them with `h` like this: `h('my-web-component')({myattribute:
'value'}, div({}, 'childnode'))`

## Examples

All these examples should be runnable with this HTML and after running `npm i skruv` in the same directory. Changing
`./node_modules/skruv/` to `https://unpkg.com/skruv@latest/` works too if you prefer to not install:

<example-code language="markup" href="./examples/todo/index.html"></example-code>

Where index.js contains the example code shown.

Examples shown here are marked by a red border to indicate them.

### Rendering

To do a onetime render of a single h1 on a root (in this case the body element) you can do:

<example-code language="js" href="./examples/render/index.js"></example-code>
Result ([Open by itself](./examples/render)):
<iframe src="./examples/render"></iframe>

### State management

To handle state updates we use the state helper which will call the supplied callback when state changes:

<example-code language="js" href="./examples/state/index.js"></example-code>
Result ([Open by itself](./examples/state)):
<iframe src="./examples/state"></iframe>

This also works with deep constructs:

<example-code language="js" href="./examples/state-deep/index.js"></example-code>
Result ([Open by itself](./examples/state-deep)):
<iframe src="./examples/state-deep"></iframe>

The state can contain non-plain objects, but for changes to them you need to manually tell skruv to rerender:

<example-code language="js" href="./examples/state-url/index.js"></example-code>
Result ([Open by itself](./examples/state-url)):
<iframe src="./examples/state-url"></iframe>

### Dynamically importing components

There is a small utility called the importer that helps with async imports and caches the imported modules:

<example-code language="js" href="./examples/dynamic-import/index.js"></example-code>
<example-code language="js" href="./examples/dynamic-import/components/one.js"></example-code>
Result ([Open by itself](./examples/dynamic-import)):
<iframe src="./examples/dynamic-import"></iframe>

### Components with local state

Components can also have local state, so that you don't have to keep everything in the global state.

<example-code language="js" href="./examples/local-state/index.js"></example-code>
<example-code language="js" href="./examples/local-state/components/one.js"></example-code>
Result ([Open by itself](./examples/local-state)):
<iframe src="./examples/local-state"></iframe>

### Using web-components for partial rendering

Stateful web-components can also have localized rendering. In this example typing in the field will modify the global
state via a change event, but clicking the add button only modifies local state. When only local state is modified only
the component itself is rerendered. Rerendering in this example is indicated by changing the text color.

<example-code language="js" href="./examples/web-components-stateful/index.js"></example-code>
<example-code language="js" href="./examples/web-components-stateful/components/one.js"></example-code>
Result ([Open by itself](./examples/web-components-stateful)):
<iframe src="./examples/web-components-stateful"></iframe>

### Using web-components for CSS scoping

Stateless web-components are useful for scoping CSS to a single subtree. In this case we have css template to make
all h1's pink within the scoped component, but the global h1 is unaffected.

<example-code language="js" href="./examples/web-components-stateless/index.js"></example-code>
<example-code language="js" href="./examples/web-components-stateless/components/one.js"></example-code>
Result ([Open by itself](./examples/web-components-stateless)):
<iframe src="./examples/web-components-stateless"></iframe>

### SVG

SVG works too (including foreignObjects).

<example-code language="js" href="./examples/svg-foreignobject/index.js"></example-code>
Result ([Open by itself](./examples/svg-foreignobject)):
<iframe src="./examples/svg-foreignobject"></iframe>


## Browser support

Requires Modules, Proxies, Map/WeakMap, Generators, async/await so Edge 16+, Safari 11+, and modern versions of all other browsers should work.
If you still need to support IE or older Edge versions I'd reccommend that you build a separate minimal-functionality
app using hyperapp (a great framework) or similar. That's how I have handled legacy support at a large global ecommerce
company.

In some examples I use dynamic imports and optional chaining which requires Chromium Edge and Safari 13.1+ and are not
supported in for example Samsung Internet, UC Browser and other smaller browsers.

## TODO:

* TODO: Add example with combined view/state/actions
* TODO: Add helpers/examples for i18n, devtools, routing, error handling
* TODO: Add more testing
* TODO: Document special/private methods
  * state: skruv_unwrap_proxy
  * state: skruv_resolve (Rename?)
* TODO: Try SRI for docs and add example in docs
* TODO: Should I keep cache and import helpers?

<script src="https://unpkg.com/marked@1.2.0/marked.min.js"></script>
<link href="https://unpkg.com/prismjs@1.21.0/themes/prism.css" rel="stylesheet" />
<script src="https://unpkg.com/prismjs@1.21.0/components/prism-core.min.js"></script>
<script src="https://unpkg.com/prismjs@1.21.0/plugins/autoloader/prism-autoloader.min.js"></script>

<link href="./docs/index.css" rel="stylesheet" />
<script src="./docs/index.js"></script>
