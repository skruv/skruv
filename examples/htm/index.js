import htm from 'https://unpkg.com/htm?module'

import { elementFactory, render } from '../../skruv.js'
const html = htm.bind((type, props, ...children) => elementFactory[type](props || {}, children))

const styles = /* css */`
:root {
  color: white;
  background: #0f0f0f;
}
`

render(html`
  <html lang="en-US">
    <head>
      <title>htm</title>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <style>${styles}</style>
    </head>
    <body>
      <div>
        <p>Hello world</p>
      </div>
    </body>
  </html>
`)
