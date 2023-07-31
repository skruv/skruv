import fromCallback from './fromCallback.js'
/** @type {Record<string, EventSource?>} */
const channels = {}
/** @type {Record<string, [string, (evt: MessageEvent) => void][]>} */
const subs = {}

globalThis.addEventListener('beforeunload', () => {
  Object.entries(channels).forEach(([_url, channel]) => {
    if (channel) { channel.close() }
  })
})

globalThis.addEventListener('new_cookie_state', () => {
  Object.entries(channels).forEach(([url, channel]) => {
    if (channel) { channel.close() }
    setup(url)
  })
})
/**
 * @param {string} url
 */
const setup = url => {
  if (channels[url]?.readyState === EventSource.CLOSED) {
    if (channels[url]) { channels[url]?.close() }
    channels[url] = null
  }
  if (!subs[url]) {
    subs[url] = []
  }
  if (!channels[url]) {
    channels[url] = new EventSource(url)

    channels[url]?.addEventListener('error', () => {
      setTimeout(() => setup(url), 1000)
    })

    subs[url].map(([type, callback]) => channels[url]?.addEventListener(type, callback))
  }
}

export default (/** @type {string|URL} */ url, /** @type {string} */ type) =>
  fromCallback((/** @type {(arg0: any) => void} */ resolver) => {
    setup(url.toString())
    const callback = (/** @type {MessageEvent} */ evt) => {
      if (evt.data) { resolver(JSON.parse(evt.data)) }
    }

    subs[url.toString()].push([type, callback])
    channels[url.toString()]?.addEventListener(type, callback)
  })
