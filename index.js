const s = Symbol.for('skruvDom')

export const h = (t, ...c) => ({
    s,
    t: t.toUpperCase(),
    ...(
        typeof c[0] === 'object' &&
            !Array.isArray(c[0]) &&
            !(c[0] instanceof Function) &&
            !(c[0]?.[Symbol.asyncIterator]) &&
            c[0]?.s !== s
            ? {
                a: c[0],
                c: c.slice(1)
            }
            : {
                a: {},
                c: c
            }
    )
})

const keyed = new WeakMap()

const domCache = {}

export const render = (
    current,
    _currentNode = globalThis.document.documentElement,
    parentNode = _currentNode?.parentNode,
    isSvg = false
) => {
    let currentNode = _currentNode
    let childNodes = []
    let nodeName = currentNode?.nodeName
    if (!currentNode || (nodeName !== current.t && ((typeof current === 'string' || typeof current === 'number') && nodeName !== '#text'))) {
        if (typeof current === 'string' || typeof current === 'number') {
            currentNode = (domCache.text || (domCache.text = parentNode.ownerDocument.createTextNode(''))).cloneNode()
        } else if (isSvg || current.t === 'svg') {
            currentNode = (domCache[current.t] || (domCache[current.t] = parentNode.ownerDocument.createElementNS('http://www.w3.org/2000/svg', current.t))).cloneNode()
        } else {
            currentNode = (domCache[current.t] || (domCache[current.t] = parentNode.ownerDocument.createElement(current.t))).cloneNode()
        }
        if (_currentNode) {
            parentNode.replaceChild(currentNode, _currentNode)
        } else {
            parentNode.appendChild(currentNode)
        }
    } else {
        childNodes = Array.from(currentNode.childNodes)
    }
    if (typeof current === 'string' || typeof current === 'number') {
        if (current.toString() !== currentNode.data.toString()) {
            currentNode.data = current
        }
        return
    }
    console.log(_currentNode, current)
    if(current.s !== s) return
    for (const key in current.a) {
        if (key[0] === "o" && key[1] === "n") {
            if (!currentNode['data-event-' + key] || currentNode['data-event-' + key]?.toString() !== current.a[key]?.toString()) {
                if (currentNode['data-event-' + key]) currentNode.removeEventListener(key.slice(2), currentNode['data-event-' + key])
                currentNode.addEventListener(key.slice(2), current.a[key])
                currentNode['data-event-' + key] = current.a[key]
            } else if (!current.a[key]) {
                currentNode.removeEventListener(key.slice(2), currentNode['data-event-' + key])
            }
        } else if (current.a[key] !== currentNode.getAttribute(key)) {
            if (current.a[key]) {
                currentNode.setAttribute(key, current.a[key])
            } else {
                currentNode.removeAttribute(key)
            }
        }
    }
    if (!current.c.length && childNodes.length) {
        currentNode.replaceChildren()
        return
    }
    if (childNodes.length > current.c.length) {
        for (let i = current.c.length; i < childNodes.length; i++) {
            currentNode.removeChild(childNodes[i])
        }
    }
    for (let i = 0; i < current.c.length; i++) {
        if (keyed.has(current.c[i])) {
            const keyedNode = keyed.get(current.c[i])
            if (keyedNode !== currentNode.childNodes[i]) {
                if (keyedNode === currentNode.childNodes[i + 1]) {
                    currentNode.removeChild(currentNode.childNodes[i])
                } else if (keyed.has(current.c[i + 1]) && keyed.get(current.c[i + 1]) === currentNode.childNodes[i]) {
                    currentNode.insertBefore(keyedNode, currentNode.childNodes[i])
                } else if (currentNode.childNodes[i]) {
                    currentNode.replaceChild(keyedNode, currentNode.childNodes[i])
                } else {
                    currentNode.appendChild(keyedNode)
                }
                keyed.set(current, currentNode)
            }
            continue
        }
        render(current.c[i], childNodes[i] || false, currentNode, isSvg)
    }
    keyed.set(current, currentNode)
    return
}

export const elementFactory = new Proxy({}, { get: (_, name) => (...c) => h(name, ...c) })