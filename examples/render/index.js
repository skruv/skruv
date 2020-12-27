import { renderNode } from '../../vDOM.js'
import { h1, body } from '../../html.js'

renderNode(body({}, [
  h1({}, 'Testing!')
]), document.body)
