import { serve } from 'https://deno.land/std@0.131.0/http/server.ts'

import { reset, toHTML } from './minidom.js'

/**
 * @param {Request} req
 * @returns {Promise<Response>}
 */
const handler = async req => {
  const reqUrl = req.headers.get('x-url')
  if (!reqUrl) {
    return new Response('No url in request', { status: 400 })
  }
  // @ts-ignore: TODO: How to construct a location?
  globalThis.location = new URL(reqUrl)
  // @ts-ignore: Internal flag to wait for all generators before returning
  globalThis.SkruvWaitForAsync = true

  const frontend = await import('../examples/todo/index.js')
  await frontend.doRender()

  // TODO: Check why we need a microsleep here
  await new Promise(resolve => setTimeout(resolve, 0))
  /** @type {{ [key: string]: string; }} */
  const headers = {}
  const responseBody = toHTML(globalThis.document.documentElement, '', headers)
  reset()

  if (!headers['content-type']) { headers['content-type'] = 'text/html' }

  return new Response(
    responseBody,
    {
      status: 200,
      headers
    }
  )
}

serve(handler)
