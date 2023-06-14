import { elements, render } from 'skruv'
const { css } = elements

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
  <html lang="en-US">
    <head>
      <title>jsx</title>
      <meta name="viewport" content="width=device-width, initial-scale=1"/>
      <style>{rootStyles}</style>
    </head>
    <body>
      <div>
        <style scoped>{scopedStyles}</style>
        <p>blue text</p>
      </div>
      <div>
        <p>default text</p>
      </div>
    </body>
  </html>
)
