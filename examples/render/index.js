import { renderNode } from 'https://unpkg.com/skruv@0.0.10/vDOM.js'
import { h1, body } from 'https://unpkg.com/skruv@0.0.10/html.js'

renderNode(body({}, [
  h1({}, 'Testing!')
]), document.body)
