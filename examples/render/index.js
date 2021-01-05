import { renderNode } from 'https://unpkg.com/skruv@0.1.4/vDOM.js'
import { h1, body } from 'https://unpkg.com/skruv@0.1.4/html.js'

renderNode(body({}, [
  h1({}, 'Testing!')
]), document.body)
