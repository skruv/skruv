<markdown-rendered href="./README.md"></markdown-rendered>

## Example app

<example-code language="js" href="./examples/todo/index.js"></example-code>
Result ([Open by itself](./examples/todo)):
<iframe src="./examples/todo"></iframe>

Or for a full impementation of todomvc see [here](./examples/todomvc)

## Architecture

* state.js is a recursive proxy for plain objects and arrays. It takes in an initial state object and can then be used as a generator to listen for changes. It is recursive, so subobjects or subarrays can also be listened to.
* vDOM.js is a function that takes in a vDOM and target root and renders to a DOM node. Since it renders directly to the root (not inside it) it returns a HTMLElement or SVGElement that is a reference to the new root. Either set this as the new root or use `querySelector()` to find the root each render.
* html.js are helper functions to create a vDOM tree. Also exposes a function called `h` and `textNode` to create arbitrary vDOM nodes and a tagged template function called `css` to help with creating styles. The HTML element `var` and the SVG element `switch` are suffixed by Elem (`varElem` and `switchElem`) because the names are reserved in js.

## API

Besides the normal attributes and events two lifecycle events are available:

* `oncreate` is called with the element right after it is added to the DOM
* `onremove` is called with the element right before it is removed from the DOM

And two special attributes:

* `key` means that the element will be bound to that key and will be reused even if reordering/moving it. The key is either a object or a scalar value. It is stored in either a weakmap or a map.
* `opaque` means that nothing will be done with childNodes on that element (removing/updating/adding will not happen)

With these it should be pretty simple to add external libraries like editors since key & opaque can make skruv leave those libraries DOM alone even when moving the editor and oncreate/onremove means that you have a place to create/destroy instances of them.

The vDOM module takes two params: a vNode to use as a root (use html.js to generate this), the document root (usually document.body).

## Examples

All these examples should be runnable with this HTML and after running `npm install skruv` in the same directory:

<example-code language="markup" href="./examples/todo/index.html"></example-code>

Where index.js contains the example code shown.

These examples use `https://unpkg.com/skruv@latest/` as the source but you can load it locally by just changing that to `./node_modules/skruv/`.

Examples shown here are marked by a red border to indicate them.

### Rendering

To render you use the renderNode function. It takes two arguments, the vDOM to render and the node to render to. It returns the new root node, since skruv renders directly to the node, not within it.

<example-code language="js" href="./examples/render/index.js"></example-code>
Result ([Open by itself](./examples/render)):
<iframe src="./examples/render"></iframe>

### State handling

You create state with the createState function. The state will then be a proxy and a async generator that you can subscribe to updates from or set new values. In this example we also wrap renderNode in `for await (const state of sub) {}` to make it rerender on state updates. This is the normal way to handle rerendering on state changes.

<example-code language="js" href="./examples/state/index.js"></example-code>
Result ([Open by itself](./examples/state)):
<iframe src="./examples/state"></iframe>

### Using generators

You can use generators to handle async loaders or situations where you want to output a stream of events. In this example the generator Timer will first output a loader and then return the count upwards each second. Generators give you a lot of freedom of when to rerender a component without having to trigger updates via state.

Generators act as mini-apps in that rerendering within a generator will not trigger a diff of the whole app so using them for animations should be reasonably performant.

If you are unfamiliar with generators and want to find out more I recommend you read [MDN's docs.](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Iterators_and_Generators#generator_functions)

<example-code language="js" href="./examples/generators/index.js"></example-code>
Result ([Open by itself](./examples/generators)):
<iframe src="./examples/generators"></iframe>

### Using generators with fetch

A good use case for using generators is when you are fetching data from an external resource and want to show a loader while you wait. You can do the same with dynamic imports or other async work.

<example-code language="js" href="./examples/fetch/index.js"></example-code>
<example-code language="js" href="./examples/fetch/components/componentWithLoader.js"></example-code>
<example-code language="js" href="./examples/fetch/example.json"></example-code>
Result ([Open by itself](./examples/fetch)):
<iframe src="./examples/fetch"></iframe>

### Routing

There is no built in router, but a simple one can be constructed as below. The routes are defined as an object with regex keys and it allows for named matchers to be passed to the imported components. The component `Link.js` creates an `a` tag that sets new urls on navigation. The router in this example is also a good way to show how to use state outside of components.

<example-code language="js" href="./examples/routing/index.js"></example-code>
<example-code language="js" href="./examples/routing/router.js"></example-code>
<example-code language="js" href="./examples/routing/state.js"></example-code>
<example-code language="js" href="./examples/routing/components/Link.js"></example-code>
<example-code language="js" href="./examples/routing/components/index.js"></example-code>
<example-code language="js" href="./examples/routing/components/page1.js"></example-code>
<example-code language="js" href="./examples/routing/components/page2.js"></example-code>
<example-code language="js" href="./examples/routing/components/404.js"></example-code>
Result ([Open by itself](./examples/routing)):
<iframe src="./examples/routing"></iframe>

### CSS scoping

CSS scoping can be done by setting the `'data-shadowed'` attribute to true. Skruv will then set the children in a shadow DOM that scopes styles to that component. In this example we define a global style to set all divs to green and define a variable. In the local (scoped) styles we set the divs to red and use the variable to set the font size. The scoping goes both ways (global CSS does not leak into the component and the components CSS does not leak out to global) but variables from the global scope can be used in the local scope.

<example-code language="js" href="./examples/css-scoping/index.js"></example-code>
Result ([Open by itself](./examples/css-scoping)):
<iframe src="./examples/css-scoping"></iframe>

### SVG

SVG works too (including foreignObjects).

<example-code language="js" href="./examples/svg-foreignobject/index.js"></example-code>
Result ([Open by itself](./examples/svg-foreignobject)):
<iframe src="./examples/svg-foreignobject"></iframe>

## Browser support

Requires modules, proxies, map/weakMap, generators, async/await, shadow DOM, optional chaining so Safari 13.1+ and modern versions of firefox and chromium based browsers should work. If you still need to support IE or older Edge versions I'd reccommend that you build a separate minimal-functionality app using hyperapp (a great framework) or similar.

Some backwards compatability with older versions might be possible by compiling with babel.

## Webcomponents

Webcomponents should work normally by creating them with `h` like this: `h('my-web-component', {myattribute: 'value', opaque: true}, div({}, 'childnode'))`. Be sure to set opaque to true so that skruv does not try to handle the elements shadow dom.

<script src="https://unpkg.com/marked@1.2.0/marked.min.js"></script>
<link href="https://unpkg.com/prismjs@1.21.0/themes/prism.css" rel="stylesheet" />
<script src="https://unpkg.com/prismjs@1.21.0/components/prism-core.min.js"></script>
<script src="https://unpkg.com/prismjs@1.21.0/plugins/autoloader/prism-autoloader.min.js"></script>

<link href="./docs/index.css" rel="stylesheet" />
<script src="./docs/index.js"></script>
