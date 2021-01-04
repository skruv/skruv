import { renderNode } from 'https://unpkg.com/skruv@0.1.3/vDOM.js'
import { h1, body } from 'https://unpkg.com/skruv@0.1.3/html.js'

renderNode(body({}, [
  h1({}, 'Testing!')
]), document.body)
