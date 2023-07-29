/* global Deno Response Location */
import { reset, toHTML } from '../../utils/minidom.js'

Deno.serve(async req => {
  globalThis.location = new Location(req.url)
  globalThis.skruvSSRScript = await Deno.readTextFile('./index.min.js')
  const frontend = await import('./index.min.js')
  await frontend.doRender()
  const headers = {}
  const responseBody = toHTML(document.documentElement, '', headers)
  reset()
  if (!headers['content-type']) { headers['content-type'] = 'text/html' }
  return new Response(
    responseBody,
    {
      status: headers.status || 200,
      headers
    }
  )
})
