import { render } from 'skruv'

const styles = /* css */`
  :root {
    color: white;
    background: #0f0f0f;
  }
`
// @ts-ignore
const Component = props => (<div label={props.a}>{props.children}</div>)

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
      <Component a="A component attribute">
        <p>A component child</p>
      </Component>
      <div>
        <p>Hello world</p>
      </div>
    </body>
  </html>
)
