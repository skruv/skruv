// @ts-nocheck: TODO: do this in a separate repo meant for deno
/* global Deno Response Location */
/** @typedef  */
import { reset, toHTML } from '../../utils/minidom.js'

Deno.serve(async req => {
  globalThis.location = new Location(req.url)
  globalThis.skruvSSRScript = await Deno.readTextFile('./index.min.js')
  const frontend = await import('./index.js')
  await frontend.doRender()
  /** @type {Record<string, string>} */
  const headers = {}
  const responseBody = toHTML(document.documentElement, '', headers)
  reset()
  if (!headers['content-type']) { headers['content-type'] = 'text/html' }
  return new Response(
    responseBody,
    {
      status: parseInt(headers.status) || 200,
      headers: Object.fromEntries(Object.entries(headers).filter(([key]) => key !== 'status')
        .map(([key, value]) => [key, value.toString()]))
    }
  )
})
