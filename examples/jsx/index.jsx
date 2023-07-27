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
