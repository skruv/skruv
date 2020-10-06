/* global MutationObserver HTMLElement customElements fetch Prism marked */
customElements.define('example-code', class extends HTMLElement {
  static get observedAttributes () {
    return ['language', 'href']
  }

  connectedCallback () {
    const language = this.getAttribute('language').trim()
    const codeContainer = document.createElement('code')
    const preContainer = document.createElement('pre')
    preContainer.classList.add(`language-${language}`)

    preContainer.appendChild(codeContainer)
    this.appendChild(preContainer)
    fetch(this.getAttribute('href'))
      .then(res => res.text())
      .then(txt => {
        txt = language !== 'js' ? txt : `// File: ${this.getAttribute('href')}\n${txt}`
        const text = document.createTextNode(txt)
        const p = document.createElement('p')
        p.appendChild(text)
        codeContainer.innerHTML = p.innerHTML
        Prism && Prism.highlightAll()
      })
      .catch(err => { this.innerText = `Error fetching code! ${err.message}` })
  }
})

customElements.define('markdown-rendered', class extends HTMLElement {
  static get observedAttributes () {
    return ['href']
  }

  connectedCallback () {
    const divContainer = document.createElement('div')
    this.appendChild(divContainer)
    fetch(this.getAttribute('href'))
      .then(res => res.text())
      .then(txt => {
        divContainer.innerHTML = marked(txt)
      })
      .catch(err => { this.innerText = `Error fetching code! ${err.message}` })
  }
})

// Extra space for scrollbars, margins and so on.
const extraSpace = 64
const observerConf = { attributes: true, childList: true, subtree: true }
Array.from(document.querySelectorAll('iframe')).forEach(iframe => {
  iframe.addEventListener('load', (evt) => {
    iframe.style.minHeight = iframe.contentDocument.body.scrollHeight + extraSpace + 'px'
    new MutationObserver(() => {
      iframe.style.minHeight = iframe.contentDocument.body.scrollHeight + extraSpace + 'px'
    }).observe(iframe.contentDocument, observerConf)
  })
})
