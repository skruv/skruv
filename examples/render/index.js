import { renderNode } from 'https://unpkg.com/skruv@0.0.12/vDOM.js'
import { h1, body } from 'https://unpkg.com/skruv@0.0.12/html.js'

renderNode(body({}, [
  h1({}, 'Testing!')
]), document.body)
