/* global Deno */
import { reset, toHTML } from '../../utils/minidom.js'

/**
 * @param {Request} req
 * @returns {Promise<Response>}
 */
Deno.serve(async req => {
  // @ts-ignore: TODO: How to construct a location?
  globalThis.location = new URL(req.url)
  // @ts-ignore: Internal flag to wait for all generators before returning
  globalThis.SkruvWaitForAsync = true
  globalThis.skruvSSRScript = await Deno.readTextFile('./index.min.js')

  const frontend = await import('./index.min.js')
  await frontend.doRender()

  // TODO: Check why we need a microsleep here
  await new Promise(resolve => setTimeout(resolve, 0))
  /** @type {{ [key: string]: string; }} */
  const headers = {}
  const responseBody = toHTML(document.documentElement, '', headers)
  reset()

  if (!headers['content-type']) { headers['content-type'] = 'text/html' }

  return new Response(
    responseBody,
    {
      status: 200,
      headers
    }
  )
})
