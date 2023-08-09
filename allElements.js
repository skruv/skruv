/* global copy */
/* eslint max-len: 0 */
const elements = {
  HTML: {
    elementGroups: [
      { name: 'TransparentContent', children: ['a', 'ins', 'del', 'object', 'video', 'audio', 'map', 'noscript', 'slot', 'canvas'] },
      { name: 'FlowContent', children: ['a', 'abbr', 'address', 'area', 'article', 'aside', 'audio', 'b', 'bdi', 'bdo', 'blockquote', 'br', 'button', 'canvas', 'cite', 'code', 'data', 'datalist', 'del', 'details', 'dfn', 'dialog', 'div', 'dl', 'em', 'embed', 'fieldset', 'figure', 'footer', 'form', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'header', 'hgroup', 'hr', 'i', 'iframe', 'img', 'input', 'ins', 'kbd', 'label', 'link', 'main', 'map', 'mark', 'math', 'menu', 'meta', 'meter', 'nav', 'noscript', 'object', 'ol', 'output', 'p', 'picture', 'pre', 'progress', 'q', 'ruby', 's', 'samp', 'script', 'search', 'section', 'select', 'slot', 'small', 'span', 'strong', 'sub', 'sup', 'svg', 'table', 'template', 'textarea', 'time', 'u', 'ul', 'var', 'video', 'wbr'] },
      { name: 'HeadingContent', children: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'hgroup'] },
      { name: 'SectioningContent', children: ['article', 'aside', 'nav', 'section'] },
      { name: 'MetadataContent', children: ['base', 'link', 'meta', 'noscript', 'script', 'style', 'template', 'title'] },
      { name: 'InteractiveContent', children: ['a', 'audio', 'button', 'details', 'embed', 'iframe', 'img', 'input', 'label', 'object', 'select', 'textarea', 'video'] },
      { name: 'PhrasingContent', children: ['a', 'abbr', 'area', 'audio', 'b', 'bdi', 'bdo', 'br', 'button', 'canvas', 'cite', 'code', 'data', 'datalist', 'del', 'dfn', 'em', 'embed', 'i', 'iframe', 'img', 'input', 'ins', 'kbd', 'label', 'link', 'map', 'mark', 'math', 'meta', 'meter', 'noscript', 'object', 'output', 'picture', 'progress', 'q', 'ruby', 's', 'samp', 'script', 'select', 'slot', 'small', 'span', 'strong', 'sub', 'sup', 'svg', 'template', 'textarea', 'time', 'u', 'var', 'video', 'wbr'] },
      { name: 'EmbeddedContent', children: ['audio', 'canvas', 'embed', 'iframe', 'img', 'math', 'object', 'picture', 'svg', 'video'] },
      { name: 'OtherContent', children: ['html', 'head', 'body', 'li', 'dl', 'dt', 'dd', 'figcaption', 'rt', 'rp', 'source', 'track', 'caption', 'colgroup', 'col', 'tbody', 'thead', 'tfoot', 'tr', 'td', 'th', 'optgroup', 'option', 'legend', 'summary'] }
    ],
    namespace: 'http://www.w3.org/1999/xhtml',
    elements: {
      html: {
        comment: 'The <html> HTML element represents the root (top-level element) of an HTML document, so it is also referred to as the root element. All other elements must be descendants of this element.',
        attributes: [
          {
            name: 'manifest',
            comment: 'Specifies the URI of a resource manifest indicating resources that should be cached locally.'
          },
          {
            name: 'version',
            comment: 'Specifies the version of the HTML Document Type Definition that governs the current document. This attribute is not needed, because it is redundant with the version information in the document type declaration.'
          },
          {
            name: 'xmlns',
            comment: 'Specifies the XML Namespace of the document. Default value is "http://www.w3.org/1999/xhtml". This is required in documents parsed with XML parsers, and optional in text/html documents.'
          }
        ],
        permittedContent: 'AnyHTMLContent'
      },
      base: {
        comment: 'The <base> HTML element specifies the base URL to use for all relative URLs in a document. There can be only one <base> element in a document.',
        attributes: [
          {
            name: 'href',
            comment: 'The base URL to be used throughout the document for relative URLs. Absolute and relative URLs are allowed.'
          },
          {
            name: 'target',
            comment: 'A keyword or author-defined name of the default browsing context to show the results of navigation from <a>, <area>, or <form> elements without explicit target attributes. The following keywords have special meanings:\n \n _self (default): Show the result in the current browsing context.\n _blank: Show the result in a new, unnamed browsing context.\n _parent: Show the result in the parent browsing context of the current one, if the current page is inside a frame. If there is no parent, acts the same as _self.\n _top: Show the result in the topmost browsing context (the browsing context that is an ancestor of the current one and has no parent). If there is no parent, acts the same as _self.'
          }
        ],
        permittedContent: 'void'
      },
      head: {
        comment: 'The <head> HTML element contains machine-readable information (metadata) about the document, like its title, scripts, and style sheets.',
        attributes: [
          {
            name: 'profile',
            comment: 'The URIs of one or more metadata profiles, separated by white space.'
          }
        ],
        permittedContent: 'SkruvHTMLMetadataContentGroup'
      },
      title: {
        comment: "The <title> HTML element defines the document's title that is shown in a browser's title bar or a page's tab. It only contains text; tags within the element are ignored.",
        attributes: [],
        permittedContent: 'string'
      },
      script: {
        comment: "The <script> HTML element is used to embed executable code or data; this is typically used to embed or refer to JavaScript code. The <script> element can also be used with other languages, such as WebGL's GLSL shader programming language and JSON.",
        attributes: [
          {
            name: 'async',
            comment: 'For classic scripts, if the async attribute is present, then the classic script will be fetched in parallel to parsing and evaluated as soon as it is available.\n For module scripts, if the async attribute is present then the scripts and all their dependencies will be executed in the defer queue, therefore they will get fetched in parallel to parsing and evaluated as soon as they are available.\n This attribute allows the elimination of parser-blocking JavaScript where the browser would have to load and evaluate scripts before continuing to parse. defer has a similar effect in this case.\n This is a boolean attribute: the presence of a boolean attribute on an element represents the true value, and the absence of the attribute represents the false value.\n See Browser compatibility for notes on browser support. See also Async scripts for asm.js.'
          },
          {
            name: 'crossorigin',
            comment: 'Normal script elements pass minimal information to the window.onerror for scripts which do not pass the standard CORS checks. To allow error logging for sites which use a separate domain for static media, use this attribute. See CORS settings attributes for a more descriptive explanation of its valid arguments.'
          },
          {
            name: 'defer',
            comment: 'This Boolean attribute is set to indicate to a browser that the script is meant to be executed after the document has been parsed, but before firing DOMContentLoaded.\n Scripts with the defer attribute will prevent the DOMContentLoaded event from firing until the script has loaded and finished evaluating.\n \n Warning: This attribute must not be used if the src attribute is absent (i.e. for inline scripts), in this case it would have no effect.\n The defer attribute has no effect on module scripts — they defer by default.\n \n Scripts with the defer attribute will execute in the order in which they appear in the document.\n This attribute allows the elimination of parser-blocking JavaScript where the browser would have to load and evaluate scripts before continuing to parse. async has a similar effect in this case.'
          },
          {
            name: 'fetchpriority',
            comment: 'Provides a hint of the relative priority to use when fetching an external script. Allowed values:\n \n high\n \n Signals a high-priority fetch relative to other external scripts.\n \n low\n \n Signals a low-priority fetch relative to other external scripts.\n \n auto\n \n Default: Signals automatic determination of fetch priority relative to other external scripts.'
          },
          {
            name: 'integrity',
            comment: 'This attribute contains inline metadata that a user agent can use to verify that a fetched resource has been delivered free of unexpected manipulation. See Subresource Integrity.'
          },
          {
            name: 'nomodule',
            comment: 'This Boolean attribute is set to indicate that the script should not be executed in browsers that support ES modules — in effect, this can be used to serve fallback scripts to older browsers that do not support modular JavaScript code.'
          },
          {
            name: 'nonce',
            comment: "A cryptographic nonce (number used once) to allow scripts in a script-src Content-Security-Policy. The server must generate a unique nonce value each time it transmits a policy. It is critical to provide a nonce that cannot be guessed as bypassing a resource's policy is otherwise trivial."
          },
          {
            name: 'referrerpolicy',
            comment: "Indicates which referrer to send when fetching the script, or resources fetched by the script:\n \n no-referrer: The Referer header will not be sent.\n no-referrer-when-downgrade: The Referer header will not be sent to origins without TLS (HTTPS).\n origin: The sent referrer will be limited to the origin of the referring page: its scheme, host, and port.\n origin-when-cross-origin: The referrer sent to other origins will be limited to the scheme, the host, and the port. Navigations on the same origin will still include the path.\n same-origin: A referrer will be sent for same origin, but cross-origin requests will contain no referrer information.\n strict-origin: Only send the origin of the document as the referrer when the protocol security level stays the same (HTTPS→HTTPS), but don't send it to a less secure destination (HTTPS→HTTP).\n strict-origin-when-cross-origin (default): Send a full URL when performing a same-origin request, only send the origin when the protocol security level stays the same (HTTPS→HTTPS), and send no header to a less secure destination (HTTPS→HTTP).\n unsafe-url: The referrer will include the origin and the path (but not the fragment, password, or username). This value is unsafe, because it leaks origins and paths from TLS-protected resources to insecure origins.\n \n \n Note: An empty string value (\"\") is both the default value, and a fallback value if referrerpolicy is not supported. If referrerpolicy is not explicitly specified on the <script> element, it will adopt a higher-level referrer policy, i.e. one set on the whole document or domain. If a higher-level policy is not available, the empty string is treated as being equivalent to strict-origin-when-cross-origin."
          },
          {
            name: 'src',
            comment: 'This attribute specifies the URI of an external script; this can be used as an alternative to embedding a script directly within a document.'
          },
          {
            name: 'type',
            comment: "This attribute indicates the type of script represented.\n The value of this attribute will be one of the following:\n \n \n Attribute is not set (default), an empty string, or a JavaScript MIME type\n \n \n Indicates that the script is a \"classic script\", containing JavaScript code.\n Authors are encouraged to omit the attribute if the script refers to JavaScript code rather than specify a MIME type.\n JavaScript MIME types are listed in the IANA media types specification.\n \n \n module\n \n \n This value causes the code to be treated as a JavaScript module.\n The processing of the script contents is deferred.\n The charset and defer attributes have no effect.\n For information on using module, see our JavaScript modules guide.\n Unlike classic scripts, module scripts require the use of the CORS protocol for cross-origin fetching.\n \n \n importmap\n \n \n This value indicates that the body of the element contains an import map.\n The import map is a JSON object that developers can use to control how the browser resolves module specifiers when importing JavaScript modules.\n \n \n Any other value\n \n \n The embedded content is treated as a data block, and won't be processed by the browser.\n Developers must use a valid MIME type that is not a JavaScript MIME type to denote data blocks.\n All of the other attributes will be ignored, including the src attribute."
          },
          {
            name: 'blocking',
            comment: 'This attribute explicitly indicates that certain operations should be blocked on the fetching of the script. The operations that are to be blocked must be a space-separated list of blocking attributes listed below.\n \n render: The rendering of content on the screen is blocked.'
          }
        ],
        permittedContent: 'string'
      },
      style: {
        comment: 'The <style> HTML element contains style information for a document, or part of a document. It contains CSS, which is applied to the contents of the document containing the <style> element.',
        attributes: [
          {
            name: 'media',
            comment: 'This attribute defines which media the style should be applied to. Its value is a media query, which defaults to all if the attribute is missing.'
          },
          {
            name: 'nonce',
            comment: "A cryptographic nonce (number used once) used to allow inline styles in a style-src Content-Security-Policy. The server must generate a unique nonce value each time it transmits a policy. It is critical to provide a nonce that cannot be guessed as bypassing a resource's policy is otherwise trivial."
          },
          {
            name: 'title',
            comment: 'This attribute specifies alternative style sheet sets.'
          },
          {
            name: 'blocking',
            comment: 'This attribute explicitly indicates that certain operations should be blocked on the fetching of critical subresources. @import-ed stylesheets are generally considered as critical subresources, whereas background-image and fonts are not.\n \n render: The rendering of content on the screen is blocked.'
          }
        ],
        permittedContent: 'string'
      },
      link: {
        comment: 'The <link> HTML element specifies relationships between the current document and an external resource.\n This element is most commonly used to link to stylesheets, but is also used to establish site icons (both "favicon" style icons and icons for the home screen and apps on mobile devices) among other things.',
        attributes: [
          {
            name: 'as',
            comment: 'This attribute is required when rel="preload" has been set on the <link> element, optional when rel="modulepreload" has been set, and otherwise should not be used.\n It specifies the type of content being loaded by the <link>, which is necessary for request matching, application of correct content security policy, and setting of correct Accept request header.\n \n \n Furthermore, rel="preload" uses this as a signal for request prioritization.\n The table below lists the valid values for this attribute and the elements or resources they apply to.\n \n \n \n \n Value\n Applies To\n \n \n \n \n audio\n <audio> elements\n \n \n document\n <iframe> and <frame> elements\n \n \n embed\n <embed> elements\n \n \n fetch\n \n fetch, XHR\n \n \n Note: This value also requires\n <link> to contain the crossorigin attribute.\n \n \n \n \n \n font\n CSS @font-face\n \n \n image\n \n <img> and <picture> elements with\n srcset or imageset attributes, SVG <image> elements,\n CSS *-image rules\n \n \n \n object\n <object> elements\n \n \n script\n <script> elements, Worker importScripts\n \n \n style\n \n <link rel=stylesheet> elements, CSS\n @import\n \n \n \n track\n <track> elements\n \n \n video\n <video> elements\n \n \n worker\n Worker, SharedWorker'
          },
          {
            name: 'crossorigin',
            comment: 'This enumerated attribute indicates whether CORS must be used when fetching the resource.\n CORS-enabled images can be reused in the <canvas> element without being tainted.\n The allowed values are:\n \n \n anonymous\n \n \n A cross-origin request (i.e. with an Origin HTTP header) is performed, but no credential is sent (i.e. no cookie, X.509 certificate, or HTTP Basic authentication).\n If the server does not give credentials to the origin site (by not setting the Access-Control-Allow-Origin HTTP header) the resource will be tainted and its usage restricted.\n \n \n use-credentials\n \n \n A cross-origin request (i.e. with an Origin HTTP header) is performed along with a credential sent (i.e. a cookie, certificate, and/or HTTP Basic authentication is performed).\n If the server does not give credentials to the origin site (through Access-Control-Allow-Credentials HTTP header), the resource will be tainted and its usage restricted.\n \n \n \n \n If the attribute is not present, the resource is fetched without a CORS request (i.e. without sending the Origin HTTP header), preventing its non-tainted usage. If invalid, it is handled as if the enumerated keyword anonymous was used.\n See CORS settings attributes for additional information.'
          },
          {
            name: 'disabled',
            comment: "For rel=\"stylesheet\" only, the disabled Boolean attribute indicates whether the described stylesheet should be loaded and applied to the document.\n If disabled is specified in the HTML when it is loaded, the stylesheet will not be loaded during page load.\n Instead, the stylesheet will be loaded on-demand, if and when the disabled attribute is changed to false or removed.\n \n Setting the disabled property in the DOM causes the stylesheet to be removed from the document's Document.styleSheets list."
          },
          {
            name: 'fetchpriority',
            comment: 'Provides a hint of the relative priority to use when fetching a preloaded resource. Allowed values:\n \n high\n \n Signals a high-priority fetch relative to other resources of the same type.\n \n low\n \n Signals a low-priority fetch relative to other resources of the same type.\n \n auto\n \n Default: Signals automatic determination of fetch priority relative to other resources of the same type.'
          },
          {
            name: 'href',
            comment: 'This attribute specifies the URL of the linked resource. A URL can be absolute or relative.'
          },
          {
            name: 'hreflang',
            comment: 'This attribute indicates the language of the linked resource.\n It is purely advisory.\n Allowed values are specified by RFC 5646: Tags for Identifying Languages (also known as BCP 47).\n Use this attribute only if the href attribute is present.'
          },
          {
            name: 'imagesizes',
            comment: 'For rel="preload" and as="image" only, the imagesizes attribute is a sizes attribute that indicates to preload the appropriate resource used by an img element with corresponding values for its srcset and sizes attributes.'
          },
          {
            name: 'imagesrcset',
            comment: 'For rel="preload" and as="image" only, the imagesrcset attribute is a sourceset attribute that indicates to preload the appropriate resource used by an img element with corresponding values for its srcset and sizes attributes.'
          },
          {
            name: 'integrity',
            comment: "Contains inline metadata — a base64-encoded cryptographic hash of the resource (file) you're telling the browser to fetch.\n The browser can use this to verify that the fetched resource has been delivered free of unexpected manipulation.\n See Subresource Integrity."
          },
          {
            name: 'media',
            comment: "This attribute specifies the media that the linked resource applies to. Its value must be a media type / media query.\n This attribute is mainly useful when linking to external stylesheets — it allows the user agent to pick the best adapted one for the device it runs on.\n \n \n Note:\n \n \n In HTML 4, this can only be a simple white-space-separated list of media description literals, i.e., media types and groups, where defined and allowed as values for this attribute, such as print, screen, aural, braille.\n HTML5 extended this to any kind of media queries, which are a superset of the allowed values of HTML 4.\n \n Browsers not supporting CSS Media Queries won't necessarily recognize the adequate link; do not forget to set fallback links, the restricted set of media queries defined in HTML 4."
          },
          {
            name: 'prefetch',
            comment: 'Identifies a resource that might be required by the next navigation and that the user agent should retrieve it.\n This allows the user agent to respond faster when the resource is requested in the future.'
          },
          {
            name: 'referrerpolicy',
            comment: "A string indicating which referrer to use when fetching the resource:\n \n no-referrer means that the Referer header will not be sent.\n \n no-referrer-when-downgrade means that no Referer header will be sent when navigating to an origin without TLS (HTTPS).\n This is a user agent's default behavior, if no policy is otherwise specified.\n \n origin means that the referrer will be the origin of the page, which is roughly the scheme, the host, and the port.\n origin-when-cross-origin means that navigating to other origins will be limited to the scheme, the host, and the port, while navigating on the same origin will include the referrer's path.\n \n unsafe-url means that the referrer will include the origin and the path (but not the fragment, password, or username).\n This case is unsafe because it can leak origins and paths from TLS-protected resources to insecure origins."
          },
          {
            name: 'rel',
            comment: 'This attribute names a relationship of the linked document to the current document. The attribute must be a space-separated list of link type values.'
          },
          {
            name: 'sizes',
            comment: "This attribute defines the sizes of the icons for visual media contained in the resource.\n It must be present only if the rel contains a value of icon or a non-standard type such as Apple's apple-touch-icon.\n It may have the following values:\n \n \n any, meaning that the icon can be scaled to any size as it is in a vector format, like image/svg+xml.\n a white-space separated list of sizes, each in the format <width in pixels>x<height in pixels> or <width in pixels>X<height in pixels>. Each of these sizes must be contained in the resource.\n \n \n \n Note: Most icon formats are only able to store one single icon; therefore, most of the time, the sizes attribute contains only one entry.\n MS's ICO format does, as well as Apple's ICNS. ICO is more ubiquitous, so you should use this format if cross-browser support is a concern (especially for old IE versions)."
          },
          {
            name: 'title',
            comment: 'The title attribute has special semantics on the <link> element.\n When used on a <link rel="stylesheet"> it defines a default or an alternate stylesheet.'
          },
          {
            name: 'type',
            comment: 'This attribute is used to define the type of the content linked to.\n The value of the attribute should be a MIME type such as text/html, text/css, and so on.\n The common use of this attribute is to define the type of stylesheet being referenced (such as text/css), but given that CSS is the only stylesheet language used on the web, not only is it possible to omit the type attribute, but is actually now recommended practice.\n It is also used on rel="preload" link types, to make sure the browser only downloads file types that it supports.'
          },
          {
            name: 'blocking',
            comment: 'This attribute explicitly indicates that certain operations should be blocked on the fetching of an external resource. The operations that are to be blocked must be a space-separated list of blocking attributes listed below.\n \n render: The rendering of content on the screen is blocked.'
          }
        ],
        permittedContent: 'void'
      },
      meta: {
        comment: 'The <meta> HTML element represents metadata that cannot be represented by other HTML meta-related elements, like <base>, <link>, <script>, <style> or <title>.',
        attributes: [
          {
            name: 'charset',
            comment: "This attribute declares the document's character encoding. If the attribute is present, its value must be an ASCII case-insensitive match for the string \"utf-8\", because UTF-8 is the only valid encoding for HTML5 documents. <meta> elements which declare a character encoding must be located entirely within the first 1024 bytes of the document."
          },
          {
            name: 'content',
            comment: 'This attribute contains the value for the http-equiv or name attribute, depending on which is used.'
          },
          {
            name: 'http-equiv',
            comment: "Defines a pragma directive. The attribute is named http-equiv(alent) because all the allowed values are names of particular HTTP headers:\n \n \n content-security-policy\n Allows page authors to define a content policy for the current page. Content policies mostly specify allowed server origins and script endpoints which help guard against cross-site scripting attacks.\n \n \n content-type\n Declares the MIME type and the document's character encoding. The content attribute must have the value \"text/html; charset=utf-8\" if specified. This is equivalent to a <meta> element with the charset attribute specified and carries the same restriction on placement within the document. Note: Can only be used in documents served with a text/html — not in documents served with an XML MIME type.\n \n \n default-style\n Sets the name of the default CSS style sheet set.\n \n \n x-ua-compatible\n If specified, the content attribute must have the value \"IE=edge\". User agents are required to ignore this pragma.\n \n refresh This instruction specifies:\n \n The number of seconds until the page should be reloaded - only if the content attribute contains a non-negative integer.\n The number of seconds until the page should redirect to another - only if the content attribute contains a non-negative integer followed by the string ';url=', and a valid URL.\n \n \n Warning:\n Pages set with a refresh value run the risk of having the time interval being too short. People navigating with the aid of assistive technology such as a screen reader may be unable to read through and understand the page's content before being automatically redirected. The abrupt, unannounced updating of the page content may also be disorienting for people experiencing low vision conditions.\n \n MDN Understanding WCAG, Guideline 2.2 explanations\n MDN Understanding WCAG, Guideline 3.2 explanations\n Understanding Success Criterion 2.2.1 | W3C Understanding WCAG 2.0\n Understanding Success Criterion 2.2.4 | W3C Understanding WCAG 2.0\n Understanding Success Criterion 3.2.5 | W3C Understanding WCAG 2.0"
          },
          {
            name: 'name',
            comment: 'The name and content attributes can be used together to provide document metadata in terms of name-value pairs, with the name attribute giving the metadata name, and the content attribute giving the value.\n See standard metadata names for details about the set of standard metadata names defined in the HTML specification.'
          }
        ],
        permittedContent: 'void'
      },
      body: {
        comment: 'The <body> HTML element represents the content of an HTML document. There can be only one <body> element in a document.',
        attributes: [],
        permittedContent: 'SkruvHTMLFlowContentGroup'
      },
      address: {
        comment: 'The <address> HTML element indicates that the enclosed HTML provides contact information for a person or people, or for an organization.',
        attributes: [],
        permittedContent: 'SkruvHTMLFlowContentGroup'
      },
      article: {
        comment: 'The <article> HTML element represents a self-contained composition in a document, page, application, or site, which is intended to be independently distributable or reusable (e.g., in syndication). Examples include: a forum post, a magazine or newspaper article, or a blog entry, a product card, a user-submitted comment, an interactive widget or gadget, or any other independent item of content.',
        attributes: [],
        permittedContent: 'SkruvHTMLFlowContentGroup'
      },
      aside: {
        comment: "The <aside> HTML element represents a portion of a document whose content is only indirectly related to the document's main content. Asides are frequently presented as sidebars or call-out boxes.",
        attributes: [],
        permittedContent: 'SkruvHTMLFlowContentGroup'
      },
      footer: {
        comment: 'The <footer> HTML element represents a footer for its nearest ancestor sectioning content or sectioning root element. A <footer> typically contains information about the author of the section, copyright data or links to related documents.',
        attributes: [],
        permittedContent: 'SkruvHTMLFlowContentGroup'
      },
      h1: {
        comment: 'The <h1> to <h6> HTML elements represent six levels of section headings. <h1> is the highest section level and <h6> is the lowest.',
        attributes: [],
        permittedContent: 'SkruvHTMLPhrasingContentGroup'
      },
      h2: {
        comment: 'The <h1> to <h6> HTML elements represent six levels of section headings. <h1> is the highest section level and <h6> is the lowest.',
        attributes: [],
        permittedContent: 'SkruvHTMLPhrasingContentGroup'
      },
      h3: {
        comment: 'The <h1> to <h6> HTML elements represent six levels of section headings. <h1> is the highest section level and <h6> is the lowest.',
        attributes: [],
        permittedContent: 'SkruvHTMLPhrasingContentGroup'
      },
      h4: {
        comment: 'The <h1> to <h6> HTML elements represent six levels of section headings. <h1> is the highest section level and <h6> is the lowest.',
        attributes: [],
        permittedContent: 'SkruvHTMLPhrasingContentGroup'
      },
      h5: {
        comment: 'The <h1> to <h6> HTML elements represent six levels of section headings. <h1> is the highest section level and <h6> is the lowest.',
        attributes: [],
        permittedContent: 'SkruvHTMLPhrasingContentGroup'
      },
      h6: {
        comment: 'The <h1> to <h6> HTML elements represent six levels of section headings. <h1> is the highest section level and <h6> is the lowest.',
        attributes: [],
        permittedContent: 'SkruvHTMLPhrasingContentGroup'
      },
      header: {
        comment: 'The <header> HTML element represents introductory content, typically a group of introductory or navigational aids. It may contain some heading elements but also a logo, a search form, an author name, and other elements.',
        attributes: [],
        permittedContent: 'SkruvHTMLFlowContentGroup'
      },
      hgroup: {
        comment: 'The <hgroup> HTML element represents a heading and related content. It groups a single <h1>–<h6> element with one or more <p>.',
        attributes: [],
        permittedContent: 'SkruvPHTMLElement | SkruvH1HTMLElement | SkruvH2HTMLElement | SkruvH3HTMLElement | SkruvH4HTMLElement | SkruvH5HTMLElement | SkruvH6HTMLElement'
      },
      main: {
        comment: 'The <main> HTML element represents the dominant content of the <body> of a document. The main content area consists of content that is directly related to or expands upon the central topic of a document, or the central functionality of an application.',
        attributes: [],
        permittedContent: 'SkruvHTMLFlowContentGroup'
      },
      nav: {
        comment: 'The <nav> HTML element represents a section of a page whose purpose is to provide navigation links, either within the current document or to other documents. Common examples of navigation sections are menus, tables of contents, and indexes.',
        attributes: [],
        permittedContent: 'SkruvHTMLFlowContentGroup'
      },
      section: {
        comment: "The <section> HTML element represents a generic standalone section of a document, which doesn't have a more specific semantic element to represent it. Sections should always have a heading, with very few exceptions.",
        attributes: [],
        permittedContent: 'SkruvHTMLFlowContentGroup'
      },
      search: {
        comment: "The <search> HTML element is a container representing the parts of the document or application with form controls or other content related to performing a search or filtering operation. The <search> element semantically identifies the purpose of the element's contents as having search or filtering capabilities. The search or filtering functionality can be for the website or application, the current web page or document, or the entire Internet or subsection thereof.",
        attributes: [],
        permittedContent: 'SkruvHTMLFlowContentGroup'
      },
      blockquote: {
        comment: 'The <blockquote> HTML element indicates that the enclosed text is an extended quotation. Usually, this is rendered visually by indentation (see Notes for how to change it). A URL for the source of the quotation may be given using the cite attribute, while a text representation of the source can be given using the <cite> element.',
        attributes: [
          {
            name: 'cite',
            comment: 'A URL that designates a source document or message for the information quoted. This attribute is intended to point to information explaining the context or the reference for the quote.'
          }
        ],
        permittedContent: 'SkruvHTMLFlowContentGroup'
      },
      cite: {
        comment: 'The <cite> HTML element is used to mark up the title of a cited creative work. The reference may be in an abbreviated form according to context-appropriate conventions related to citation metadata.',
        attributes: [],
        permittedContent: 'SkruvHTMLPhrasingContentGroup'
      },
      dd: {
        comment: 'The <dd> HTML element provides the description, definition, or value for the preceding term (<dt>) in a description list (<dl>).',
        attributes: [
          {
            name: 'nowrap',
            comment: 'If the value of this attribute is set to yes, the definition text will not wrap. The default value is no.'
          }
        ],
        permittedContent: 'SkruvHTMLFlowContentGroup'
      },
      dt: {
        comment: 'The <dt> HTML element specifies a term in a description or definition list, and as such must be used inside a <dl> element. It is usually followed by a <dd> element; however, multiple <dt> elements in a row indicate several terms that are all defined by the immediate next <dd> element.',
        attributes: [],
        permittedContent: 'Exclude<Exclude<Exclude<Exclude<SkruvHTMLFlowContentGroup, SkruvFooterHTMLElement>, SkruvHeaderHTMLElement>, SkruvHTMLSectioningContentGroup>, SkruvHTMLHeadingContentGroup>'
      },
      dl: {
        comment: 'The <dl> HTML element represents a description list. The element encloses a list of groups of terms (specified using the <dt> element) and descriptions (provided by <dd> elements). Common uses for this element are to implement a glossary or to display metadata (a list of key-value pairs).',
        attributes: [],
        permittedContent: 'SkruvDtHTMLElement | SkruvDdHTMLElement | SkruvScriptHTMLElement | SkruvTemplateHTMLElement'
      },
      div: {
        comment: 'The <div> HTML element is the generic container for flow content. It has no effect on the content or layout until styled in some way using CSS (e.g. styling is directly applied to it, or some kind of layout model like Flexbox is applied to its parent element).',
        attributes: [],
        permittedContent: 'SkruvHTMLFlowContentGroup | SkruvDtHTMLElement | SkruvDdHTMLElement'
      },
      figcaption: {
        comment: 'The <figcaption> HTML element represents a caption or legend describing the rest of the contents of its parent <figure> element.',
        attributes: [],
        permittedContent: 'SkruvHTMLFlowContentGroup'
      },
      figure: {
        comment: 'The <figure> HTML element represents self-contained content, potentially with an optional caption, which is specified using the <figcaption> element. The figure, its caption, and its contents are referenced as a single unit.',
        attributes: [],
        permittedContent: 'SkruvFigcaptionHTMLElement | SkruvHTMLFlowContentGroup'
      },
      hr: {
        comment: 'The <hr> HTML element represents a thematic break between paragraph-level elements: for example, a change of scene in a story, or a shift of topic within a section.',
        attributes: [
          {
            name: 'align',
            comment: 'Sets the alignment of the rule on the page. If no value is specified, the default value is left.'
          },
          {
            name: 'color',
            comment: 'Sets the color of the rule through color name or hexadecimal value.'
          },
          {
            name: 'noshade',
            comment: 'Sets the rule to have no shading.'
          },
          {
            name: 'size',
            comment: 'Sets the height, in pixels, of the rule.'
          },
          {
            name: 'width',
            comment: 'Sets the length of the rule on the page through a pixel or percentage value.'
          }
        ],
        permittedContent: 'void'
      },
      li: {
        comment: 'The <li> HTML element is used to represent an item in a list. It must be contained in a parent element: an ordered list (<ol>), an unordered list (<ul>), or a menu (<menu>). In menus and unordered lists, list items are usually displayed using bullet points. In ordered lists, they are usually displayed with an ascending counter on the left, such as a number or letter.',
        attributes: [
          {
            name: 'value',
            comment: 'This integer attribute indicates the current ordinal value of the list item as defined by the <ol> element. The only allowed value for this attribute is a number, even if the list is displayed with Roman numerals or letters. List items that follow this one continue numbering from the value set. The value attribute has no meaning for unordered lists (<ul>) or for menus (<menu>).'
          }
        ],
        permittedContent: 'SkruvHTMLFlowContentGroup'
      },
      ol: {
        comment: 'The <ol> HTML element represents an ordered list of items — typically rendered as a numbered list.',
        attributes: [
          {
            name: 'reversed',
            comment: "This Boolean attribute specifies that the list's items are in reverse order. Items will be numbered from high to low."
          },
          {
            name: 'start',
            comment: 'An integer to start counting from for the list items. Always an Arabic numeral (1, 2, 3, etc.), even when the numbering type is letters or Roman numerals. For example, to start numbering elements from the letter "d" or the Roman numeral "iv," use start="4".'
          }
        ],
        permittedContent: 'SkruvLiHTMLElement | SkruvScriptHTMLElement | SkruvTemplateHTMLElement'
      },
      ul: {
        comment: 'The <ul> HTML element represents an unordered list of items, typically rendered as a bulleted list.',
        attributes: [],
        permittedContent: 'SkruvLiHTMLElement | SkruvScriptHTMLElement | SkruvTemplateHTMLElement'
      },
      menu: {
        comment: 'The <menu> HTML element is described in the HTML specification as a semantic alternative to <ul>, but treated by browsers (and exposed through the accessibility tree) as no different than <ul>. It represents an unordered list of items (which are represented by <li> elements).',
        attributes: [],
        permittedContent: 'SkruvLiHTMLElement | SkruvScriptHTMLElement | SkruvTemplateHTMLElement'
      },
      p: {
        comment: 'The <p> HTML element represents a paragraph. Paragraphs are usually represented in visual media as blocks of text separated from adjacent blocks by blank lines and/or first-line indentation, but HTML paragraphs can be any structural grouping of related content, such as images or form fields.',
        attributes: [],
        permittedContent: 'SkruvHTMLPhrasingContentGroup'
      },
      pre: {
        comment: 'The <pre> HTML element represents preformatted text which is to be presented exactly as written in the HTML file. The text is typically rendered using a non-proportional, or monospaced, font. Whitespace inside this element is displayed as written.',
        attributes: [],
        permittedContent: 'SkruvHTMLPhrasingContentGroup'
      },
      a: {
        comment: 'The <a> HTML element (or anchor element), with its href attribute, creates a hyperlink to web pages, files, email addresses, locations in the same page, or anything else a URL can address.',
        attributes: [
          {
            name: 'download',
            comment: 'Causes the browser to treat the linked URL as a download. Can be used with or without a filename value:\n \n Without a value, the browser will suggest a filename/extension, generated from various sources:\n \n The Content-Disposition HTTP header\n The final segment in the URL path\n The media type (from the Content-Type header, the start of a data: URL, or Blob.type for a blob: URL)\n \n \n filename: defining a value suggests it as the filename. / and \\ characters are converted to underscores (_). Filesystems may forbid other characters in filenames, so browsers will adjust the suggested name if necessary.\n \n \n Note:\n \n download only works for same-origin URLs, or the blob: and data: schemes.\n How browsers treat downloads varies by browser, user settings, and other factors. The user may be prompted before a download starts, or the file may be saved automatically, or it may open automatically, either in an external application or in the browser itself.\n If the Content-Disposition header has different information from the download attribute, resulting behavior may differ:\n \n If the header specifies a filename, it takes priority over a filename specified in the download attribute.\n If the header specifies a disposition of inline, Chrome and Firefox prioritize the attribute and treat it as a download. Old Firefox versions (before 82) prioritize the header and will display the content inline.'
          },
          {
            name: 'href',
            comment: 'The URL that the hyperlink points to. Links are not restricted to HTTP-based URLs — they can use any URL scheme supported by browsers:\n \n Sections of a page with document fragments\n Specific text portions with text fragments\n Pieces of media files with media fragments\n Telephone numbers with tel: URLs\n Email addresses with mailto: URLs\n While web browsers may not support other URL schemes, websites can with registerProtocolHandler()'
          },
          {
            name: 'hreflang',
            comment: 'Hints at the human language of the linked URL. No built-in functionality. Allowed values are the same as the global lang attribute.'
          },
          {
            name: 'ping',
            comment: 'A space-separated list of URLs. When the link is followed, the browser will send POST requests with the body PING to the URLs. Typically for tracking.'
          },
          {
            name: 'referrerpolicy',
            comment: "How much of the referrer to send when following the link.\n \n no-referrer: The Referer header will not be sent.\n no-referrer-when-downgrade: The Referer header will not be sent to origins without TLS (HTTPS).\n origin: The sent referrer will be limited to the origin of the referring page: its scheme, host, and port.\n origin-when-cross-origin: The referrer sent to other origins will be limited to the scheme, the host, and the port. Navigations on the same origin will still include the path.\n same-origin: A referrer will be sent for same origin, but cross-origin requests will contain no referrer information.\n strict-origin: Only send the origin of the document as the referrer when the protocol security level stays the same (HTTPS→HTTPS), but don't send it to a less secure destination (HTTPS→HTTP).\n strict-origin-when-cross-origin (default): Send a full URL when performing a same-origin request, only send the origin when the protocol security level stays the same (HTTPS→HTTPS), and send no header to a less secure destination (HTTPS→HTTP).\n unsafe-url: The referrer will include the origin and the path (but not the fragment, password, or username). This value is unsafe, because it leaks origins and paths from TLS-protected resources to insecure origins."
          },
          {
            name: 'rel',
            comment: 'The relationship of the linked URL as space-separated link types.'
          },
          {
            name: 'target',
            comment: "Where to display the linked URL, as the name for a browsing context (a tab, window, or <iframe>). The following keywords have special meanings for where to load the URL:\n \n _self: the current browsing context. (Default)\n _blank: usually a new tab, but users can configure browsers to open a new window instead.\n _parent: the parent browsing context of the current one. If no parent, behaves as _self.\n _top: the topmost browsing context (the \"highest\" context that's an ancestor of the current one). If no ancestors, behaves as _self.\n \n \n Note: Setting target=\"_blank\" on <a> elements implicitly provides the same rel behavior as setting rel=\"noopener\" which does not set window.opener."
          },
          {
            name: 'type',
            comment: "Hints at the linked URL's format with a MIME type. No built-in functionality."
          }
        ],
        permittedContent: 'SkruvHTMLPhrasingContentGroup'
      },
      abbr: {
        comment: 'The <abbr> HTML element represents an abbreviation or acronym.',
        attributes: [],
        permittedContent: 'SkruvHTMLPhrasingContentGroup'
      },
      b: {
        comment: "The <b> HTML element is used to draw the reader's attention to the element's contents, which are not otherwise granted special importance. This was formerly known as the Boldface element, and most browsers still draw the text in boldface. However, you should not use <b> for styling text or granting importance. If you wish to create boldface text, you should use the CSS font-weight property. If you wish to indicate an element is of special importance, you should use the <strong> element.",
        attributes: [],
        permittedContent: 'SkruvHTMLPhrasingContentGroup'
      },
      bdi: {
        comment: "The <bdi> HTML element tells the browser's bidirectional algorithm to treat the text it contains in isolation from its surrounding text. It's particularly useful when a website dynamically inserts some text and doesn't know the directionality of the text being inserted.",
        attributes: [],
        permittedContent: 'SkruvHTMLPhrasingContentGroup'
      },
      bdo: {
        comment: 'The <bdo> HTML element overrides the current directionality of text, so that the text within is rendered in a different direction.',
        attributes: [
          {
            name: 'dir',
            comment: "The direction in which text should be rendered in this element's contents. Possible values are:\n \n ltr: Indicates that the text should go in a left-to-right direction.\n rtl: Indicates that the text should go in a right-to-left direction."
          }
        ],
        permittedContent: 'SkruvHTMLPhrasingContentGroup'
      },
      br: {
        comment: 'The <br> HTML element produces a line break in text (carriage-return). It is useful for writing a poem or an address, where the division of lines is significant.',
        attributes: [],
        permittedContent: 'void'
      },
      code: {
        comment: "The <code> HTML element displays its contents styled in a fashion intended to indicate that the text is a short fragment of computer code. By default, the content text is displayed using the user agent's default monospace font.",
        attributes: [],
        permittedContent: 'SkruvHTMLPhrasingContentGroup'
      },
      data: {
        comment: 'The <data> HTML element links a given piece of content with a machine-readable translation. If the content is time- or date-related, the <time> element must be used.',
        attributes: [
          {
            name: 'value',
            comment: 'This attribute specifies the machine-readable translation of the content of the element.'
          }
        ],
        permittedContent: 'SkruvHTMLPhrasingContentGroup'
      },
      dfn: {
        comment: 'The <dfn> HTML element is used to indicate the term being defined within the context of a definition phrase or sentence. The ancestor <p> element, the <dt>/<dd> pairing, or the nearest <section> ancestor of the <dfn> element, is considered to be the definition of the term.',
        attributes: [],
        permittedContent: 'SkruvHTMLPhrasingContentGroup'
      },
      em: {
        comment: 'The <em> HTML element marks text that has stress emphasis. The <em> element can be nested, with each level of nesting indicating a greater degree of emphasis.',
        attributes: [],
        permittedContent: 'SkruvHTMLPhrasingContentGroup'
      },
      i: {
        comment: 'The <i> HTML element represents a range of text that is set off from the normal text for some reason, such as idiomatic text, technical terms, taxonomical designations, among others. Historically, these have been presented using italicized type, which is the original source of the <i> naming of this element.',
        attributes: [],
        permittedContent: 'SkruvHTMLPhrasingContentGroup'
      },
      kbd: {
        comment: 'The <kbd> HTML element represents a span of inline text denoting textual user input from a keyboard, voice input, or any other text entry device. By convention, the user agent defaults to rendering the contents of a <kbd> element using its default monospace font, although this is not mandated by the HTML standard.',
        attributes: [],
        permittedContent: 'SkruvHTMLPhrasingContentGroup'
      },
      mark: {
        comment: "The <mark> HTML element represents text which is marked or highlighted for reference or notation purposes due to the marked passage's relevance in the enclosing context.",
        attributes: [],
        permittedContent: 'SkruvHTMLPhrasingContentGroup'
      },
      q: {
        comment: "The <q> HTML element indicates that the enclosed text is a short inline quotation. Most modern browsers implement this by surrounding the text in quotation marks. This element is intended for short quotations that don't require paragraph breaks; for long quotations use the <blockquote> element.",
        attributes: [
          {
            name: 'cite',
            comment: 'The value of this attribute is a URL that designates a source document or message for the information quoted. This attribute is intended to point to information explaining the context or the reference for the quote.'
          }
        ],
        permittedContent: 'SkruvHTMLPhrasingContentGroup'
      },
      rp: {
        comment: "The <rp> HTML element is used to provide fall-back parentheses for browsers that do not support display of ruby annotations using the <ruby> element. One <rp> element should enclose each of the opening and closing parentheses that wrap the <rt> element that contains the annotation's text.",
        attributes: [],
        permittedContent: 'string'
      },
      ruby: {
        comment: 'The <ruby> HTML element represents small annotations that are rendered above, below, or next to base text, usually used for showing the pronunciation of East Asian characters. It can also be used for annotating other kinds of text, but this usage is less common.',
        attributes: [],
        permittedContent: 'SkruvHTMLPhrasingContentGroup'
      },
      rt: {
        comment: 'The <rt> HTML element specifies the ruby text component of a ruby annotation, which is used to provide pronunciation, translation, or transliteration information for East Asian typography. The <rt> element must always be contained within a <ruby> element.',
        attributes: [],
        permittedContent: 'SkruvHTMLPhrasingContentGroup'
      },
      s: {
        comment: 'The <s> HTML element renders text with a strikethrough, or a line through it. Use the <s> element to represent things that are no longer relevant or no longer accurate. However, <s> is not appropriate when indicating document edits; for that, use the <del> and <ins> elements, as appropriate.',
        attributes: [],
        permittedContent: 'SkruvHTMLPhrasingContentGroup'
      },
      samp: {
        comment: "The <samp> HTML element is used to enclose inline text which represents sample (or quoted) output from a computer program. Its contents are typically rendered using the browser's default monospaced font (such as Courier or Lucida Console).",
        attributes: [],
        permittedContent: 'SkruvHTMLPhrasingContentGroup'
      },
      small: {
        comment: 'The <small> HTML element represents side-comments and small print, like copyright and legal text, independent of its styled presentation. By default, it renders text within it one font-size smaller, such as from small to x-small.',
        attributes: [],
        permittedContent: 'SkruvHTMLPhrasingContentGroup'
      },
      span: {
        comment: 'The <span> HTML element is a generic inline container for phrasing content, which does not inherently represent anything. It can be used to group elements for styling purposes (using the class or id attributes), or because they share attribute values, such as lang. It should be used only when no other semantic element is appropriate. <span> is very much like a <div> element, but <div> is a block-level element whereas a <span> is an inline-level element.',
        attributes: [],
        permittedContent: 'SkruvHTMLPhrasingContentGroup'
      },
      strong: {
        comment: 'The <strong> HTML element indicates that its contents have strong importance, seriousness, or urgency. Browsers typically render the contents in bold type.',
        attributes: [],
        permittedContent: 'SkruvHTMLPhrasingContentGroup'
      },
      sub: {
        comment: 'The <sub> HTML element specifies inline text which should be displayed as subscript for solely typographical reasons. Subscripts are typically rendered with a lowered baseline using smaller text.',
        attributes: [],
        permittedContent: 'SkruvHTMLPhrasingContentGroup'
      },
      sup: {
        comment: 'The <sup> HTML element specifies inline text which is to be displayed as superscript for solely typographical reasons. Superscripts are usually rendered with a raised baseline using smaller text.',
        attributes: [],
        permittedContent: 'SkruvHTMLPhrasingContentGroup'
      },
      time: {
        comment: 'The <time> HTML element represents a specific period in time. It may include the datetime attribute to translate dates into machine-readable format, allowing for better search engine results or custom features such as reminders.',
        attributes: [
          {
            name: 'datetime',
            comment: 'This attribute indicates the time and/or date of the element and must be in one of the formats described below.'
          }
        ],
        permittedContent: 'SkruvHTMLPhrasingContentGroup'
      },
      u: {
        comment: 'The <u> HTML element represents a span of inline text which should be rendered in a way that indicates that it has a non-textual annotation. This is rendered by default as a simple solid underline, but may be altered using CSS.',
        attributes: [],
        permittedContent: 'SkruvHTMLPhrasingContentGroup'
      },
      var: {
        comment: "The <var> HTML element represents the name of a variable in a mathematical expression or a programming context. It's typically presented using an italicized version of the current typeface, although that behavior is browser-dependent.",
        attributes: [],
        permittedContent: 'SkruvHTMLPhrasingContentGroup'
      },
      wbr: {
        comment: 'The <wbr> HTML element represents a word break opportunity—a position within text where the browser may optionally break a line, though its line-breaking rules would not otherwise create a break at that location.',
        attributes: [],
        permittedContent: 'void'
      },
      area: {
        comment: 'The <area> HTML element defines an area inside an image map that has predefined clickable areas. An image map allows geometric areas on an image to be associated with hypertext links.',
        attributes: [
          {
            name: 'alt',
            comment: 'A text string alternative to display on browsers that do not display images.\n The text should be phrased so that it presents the user with the same kind of choice as the image would offer when displayed without the alternative text.\n This attribute is required only if the href attribute is used.'
          },
          {
            name: 'coords',
            comment: 'The coords attribute details the coordinates of the shape attribute in size, shape, and placement of an <area>.\n This attribute must not be used if shape is set to default.\n \n \n \n rect: the value is x1,y1,x2,y2.\n The value specifies the coordinates of the top-left and bottom-right corner of the rectangle.\n For example, in <area shape="rect" coords="0,0,253,27" href="#" target="_blank" alt="Mozilla"> the coordinates are 0,0 and 253,27, indicating the top-left and bottom-right corners of the rectangle, respectively.\n \n \n circle: the value is x,y,radius. Value specifies the coordinates of the circle center and the radius.\n For example: <area shape="circle" coords="130,136,60" href="#" target="_blank" alt="MDN">\n \n \n poly: the value is x1,y1,x2,y2,..,xn,yn. Value specifies the coordinates of the edges of the polygon.\n If the first and last coordinate pairs are not the same, the browser will add the last coordinate pair to close the polygon\n \n \n The values are numbers of CSS pixels.'
          },
          {
            name: 'download',
            comment: 'This attribute, if present, indicates that the author intends the hyperlink to be used for downloading a resource.\n See <a> for a full description of the download attribute.'
          },
          {
            name: 'href',
            comment: 'The hyperlink target for the area.\n Its value is a valid URL.\n This attribute may be omitted; if so, the <area> element does not represent a hyperlink.'
          },
          {
            name: 'hreflang',
            comment: 'Indicates the language of the linked resource. Allowed values are defined by RFC 5646: Tags for Identifying Languages (also known as BCP 47).\n Use this attribute only if the href attribute is present.'
          },
          {
            name: 'ping',
            comment: 'Contains a space-separated list of URLs to which, when the hyperlink is followed, POST requests with the body PING will be sent by the browser (in the background).\n Typically used for tracking.'
          },
          {
            name: 'referrerpolicy',
            comment: "A string indicating which referrer to use when fetching the resource:\n \n no-referrer: The Referer header will not be sent.\n no-referrer-when-downgrade: The Referer header will not be sent to origins without TLS (HTTPS).\n origin: The sent referrer will be limited to the origin of the referring page: its scheme, host, and port.\n origin-when-cross-origin: The referrer sent to other origins will be limited to the scheme, the host, and the port. Navigations on the same origin will still include the path.\n same-origin: A referrer will be sent for same origin, but cross-origin requests will contain no referrer information.\n strict-origin: Only send the origin of the document as the referrer when the protocol security level stays the same (HTTPS→HTTPS), but don't send it to a less secure destination (HTTPS→HTTP).\n strict-origin-when-cross-origin (default): Send a full URL when performing a same-origin request, only send the origin when the protocol security level stays the same (HTTPS→HTTPS), and send no header to a less secure destination (HTTPS→HTTP).\n \n unsafe-url: The referrer will include the origin and the path (but not the fragment, password, or username).\n This value is unsafe, because it leaks origins and paths from TLS-protected resources to insecure origins."
          },
          {
            name: 'rel',
            comment: 'For anchors containing the href attribute, this attribute specifies the relationship of the target object to the link object.\n The value is a space-separated list of link types.\n The values and their semantics will be registered by some authority that might have meaning to the document author.\n The default relationship, if no other is given, is void. Use this attribute only if the href attribute is present.'
          },
          {
            name: 'shape',
            comment: 'The shape of the associated hot spot. The specifications for HTML defines the values rect, which defines a rectangular region; circle, which defines a circular region; poly, which defines a polygon; and default, which indicates the entire region beyond any defined shapes.'
          },
          {
            name: 'target',
            comment: 'A keyword or author-defined name of the browsing context to display the linked resource.\n The following keywords have special meanings:\n \n \n _self (default): Show the resource in the current browsing context.\n _blank: Show the resource in a new, unnamed browsing context.\n \n _parent: Show the resource in the parent browsing context of the current one, if the current page is inside a frame.\n If there is no parent, acts the same as _self.\n \n \n _top: Show the resource in the topmost browsing context (the browsing context that is an ancestor of the current one and has no parent).\n If there is no parent, acts the same as _self.\n \n \n Use this attribute only if the href attribute is present.\n \n Note: Setting target="_blank" on <area> elements implicitly provides the same rel behavior as setting rel="noopener" which does not set window.opener. See browser compatibility for support status.'
          }
        ],
        permittedContent: 'void'
      },
      audio: {
        comment: 'The <audio> HTML element is used to embed sound content in documents. It may contain one or more audio sources, represented using the src attribute or the <source> element: the browser will choose the most suitable one. It can also be the destination for streamed media, using a MediaStream.',
        attributes: [
          {
            name: 'autoplay',
            comment: 'A Boolean attribute: if specified, the audio will automatically begin playback as soon as it can do so, without waiting for the entire audio file to finish downloading.\n \n Note: Sites that automatically play audio (or videos with an audio track) can be an unpleasant experience for users, so should be avoided when possible. If you must offer autoplay functionality, you should make it opt-in (requiring a user to specifically enable it). However, this can be useful when creating media elements whose source will be set at a later time, under user control. See our autoplay guide for additional information about how to properly use autoplay.'
          },
          {
            name: 'controls',
            comment: 'If this attribute is present, the browser will offer controls to allow the user to control audio playback, including volume, seeking, and pause/resume playback.'
          },
          {
            name: 'controlslist',
            comment: 'The controlslist attribute, when specified, helps the browser select what controls to show for the audio element whenever the browser shows its own set of controls (that is, when the controls attribute is specified).\n The allowed values are nodownload, nofullscreen and noremoteplayback.'
          },
          {
            name: 'crossorigin',
            comment: 'This enumerated attribute indicates whether to use CORS to fetch the related audio file. CORS-enabled resources can be reused in the <canvas> element without being tainted. The allowed values are:\n \n anonymous\n \n Sends a cross-origin request without a credential. In other words, it sends the Origin: HTTP header without a cookie, X.509 certificate, or performing HTTP Basic authentication. If the server does not give credentials to the origin site (by not setting the Access-Control-Allow-Origin: HTTP header), the resource will be tainted, and its usage restricted.\n \n use-credentials\n \n Sends a cross-origin request with a credential. In other words, it sends the Origin: HTTP header with a cookie, a certificate, or performing HTTP Basic authentication. If the server does not give credentials to the origin site (through Access-Control-Allow-Credentials: HTTP header), the resource will be tainted and its usage restricted.\n \n \n When not present, the resource is fetched without a CORS request (i.e. without sending the Origin: HTTP header), preventing its non-tainted use in <canvas> elements. If invalid, it is handled as if the enumerated keyword anonymous was used. See CORS settings attributes for additional information.'
          },
          {
            name: 'disableremoteplayback',
            comment: 'A Boolean attribute used to disable the capability of remote playback in devices that are attached using wired (HDMI, DVI, etc.) and wireless technologies (Miracast, Chromecast, DLNA, AirPlay, etc.). See this proposed specification for more information.\n \n Note: In Safari, you can use x-webkit-airplay="deny" as a fallback.'
          },
          {
            name: 'loop',
            comment: 'A Boolean attribute: if specified, the audio player will automatically seek back to the start upon reaching the end of the audio.'
          },
          {
            name: 'muted',
            comment: 'A Boolean attribute that indicates whether the audio will be initially silenced. Its default value is false.'
          },
          {
            name: 'preload',
            comment: 'This enumerated attribute is intended to provide a hint to the browser about what the author thinks will lead to the best user experience. It may have one of the following values:\n \n none: Indicates that the audio should not be preloaded.\n metadata: Indicates that only audio metadata (e.g. length) is fetched.\n auto: Indicates that the whole audio file can be downloaded, even if the user is not expected to use it.\n empty string: A synonym of the auto value.\n \n The default value is different for each browser. The spec advises it to be set to metadata.\n \n Note:\n \n The autoplay attribute has precedence over preload. If autoplay is specified, the browser would obviously need to start downloading the audio for playback.\n The browser is not forced by the specification to follow the value of this attribute; it is a mere hint.'
          },
          {
            name: 'src',
            comment: 'The URL of the audio to embed. This is subject to HTTP access controls. This is optional; you may instead use the <source> element within the audio block to specify the audio to embed.'
          }
        ],
        permittedContent: 'SkruvHTMLTransparentContentGroup | SkruvTrackHTMLElement | SkruvSourceHTMLElement'
      },
      img: {
        comment: 'The <img> HTML element embeds an image into the document.',
        attributes: [
          {
            name: 'alt',
            comment: "Defines an alternative text description of the image.\n \n Note: Browsers do not always display images. There are a number of situations in which a browser might not display images, such as:\n \n Non-visual browsers (such as those used by people with visual impairments)\n The user chooses not to display images (saving bandwidth, privacy reasons)\n The image is invalid or an unsupported type\n \n In these cases, the browser may replace the image with the text in the element's alt attribute. For these reasons and others, provide a useful value for alt whenever possible.\n \n Setting this attribute to an empty string (alt=\"\") indicates that this image is not a key part of the content (it's decoration or a tracking pixel), and that non-visual browsers may omit it from rendering. Visual browsers will also hide the broken image icon if the alt is empty and the image failed to display.\n This attribute is also used when copying and pasting the image to text, or saving a linked image to a bookmark."
          },
          {
            name: 'crossorigin',
            comment: "Indicates if the fetching of the image must be done using a CORS request. Image data from a CORS-enabled image returned from a CORS request can be reused in the <canvas> element without being marked \"tainted\".\n If the crossorigin attribute is not specified, then a non-CORS request is sent (without the Origin request header), and the browser marks the image as tainted and restricts access to its image data, preventing its usage in <canvas> elements.\n If the crossorigin attribute is specified, then a CORS request is sent (with the Origin request header); but if the server does not opt into allowing cross-origin access to the image data by the origin site (by not sending any Access-Control-Allow-Origin response header, or by not including the site's origin in any Access-Control-Allow-Origin response header it does send), then the browser blocks the image from loading, and logs a CORS error to the devtools console.\n Allowed values:\n \n anonymous\n \n A CORS request is sent with credentials omitted (that is, no cookies, X.509 certificates, or Authorization request header).\n \n use-credentials\n \n The CORS request is sent with any credentials included (that is, cookies, X.509 certificates, and the Authorization request header). If the server does not opt into sharing credentials with the origin site (by sending back the Access-Control-Allow-Credentials: true response header), then the browser marks the image as tainted and restricts access to its image data.\n \n \n If the attribute has an invalid value, browsers handle it as if the anonymous value was used. See CORS settings attributes for additional information."
          },
          {
            name: 'decoding',
            comment: 'Provides an image decoding hint to the browser. Allowed values:\n \n sync\n \n Decode the image synchronously, for atomic presentation with other content.\n \n async\n \n Decode the image asynchronously, to reduce delay in presenting other content.\n \n auto\n \n Default: no preference for the decoding mode. The browser decides what is best for the user.'
          },
          {
            name: 'elementtiming',
            comment: 'Marks the image for observation by the PerformanceElementTiming API. The value given becomes an identifier for the observed image element. See also the elementtiming attribute page.'
          },
          {
            name: 'fetchpriority',
            comment: 'Provides a hint of the relative priority to use when fetching the image. Allowed values:\n \n high\n \n Signals a high-priority fetch relative to other images.\n \n low\n \n Signals a low-priority fetch relative to other images.\n \n auto\n \n Default: Signals automatic determination of fetch priority relative to other images.'
          },
          {
            name: 'height',
            comment: 'The intrinsic height of the image, in pixels. Must be an integer without a unit.\n \n Note: Including height and width enables the aspect ratio of the image to be calculated by the browser prior to the image being loaded. This aspect ratio is used to reserve the space needed to display the image, reducing or even preventing a layout shift when the image is downloaded and painted to the screen. Reducing layout shift is a major component of good user experience and web performance.'
          },
          {
            name: 'ismap',
            comment: 'This Boolean attribute indicates that the image is part of a server-side map. If so, the coordinates where the user clicked on the image are sent to the server.\n \n Note: This attribute is allowed only if the <img> element is a descendant of an <a> element with a valid href attribute. This gives users without pointing devices a fallback destination.'
          },
          {
            name: 'loading',
            comment: "Indicates how the browser should load the image:\n \n eager\n \n Loads the image immediately, regardless of whether or not the image is currently within the visible viewport (this is the default value).\n \n lazy\n \n Defers loading the image until it reaches a calculated distance from the viewport, as defined by the browser. The intent is to avoid the network and storage bandwidth needed to handle the image until it's reasonably certain that it will be needed. This generally improves the performance of the content in most typical use cases.\n \n \n \n Note: Loading is only deferred when JavaScript is enabled. This is an anti-tracking measure, because if a user agent supported lazy loading when scripting is disabled, it would still be possible for a site to track a user's approximate scroll position throughout a session, by strategically placing images in a page's markup such that a server can track how many images are requested and when."
          },
          {
            name: 'referrerpolicy',
            comment: "A string indicating which referrer to use when fetching the resource:\n \n no-referrer: The Referer header will not be sent.\n no-referrer-when-downgrade: The Referer header will not be sent to origins without TLS (HTTPS).\n origin: The sent referrer will be limited to the origin of the referring page: its scheme, host, and port.\n origin-when-cross-origin: The referrer sent to other origins will be limited to the scheme, the host, and the port. Navigations on the same origin will still include the path.\n same-origin: A referrer will be sent for same origin, but cross-origin requests will contain no referrer information.\n strict-origin: Only send the origin of the document as the referrer when the protocol security level stays the same (HTTPS→HTTPS), but don't send it to a less secure destination (HTTPS→HTTP).\n strict-origin-when-cross-origin (default): Send a full URL when performing a same-origin request, only send the origin when the protocol security level stays the same (HTTPS→HTTPS), and send no header to a less secure destination (HTTPS→HTTP).\n unsafe-url: The referrer will include the origin and the path (but not the fragment, password, or username). This value is unsafe, because it leaks origins and paths from TLS-protected resources to insecure origins."
          },
          {
            name: 'sizes',
            comment: "One or more strings separated by commas, indicating a set of source sizes. Each source size consists of:\n \n A media condition. This must be omitted for the last item in the list.\n A source size value.\n \n Media Conditions describe properties of the viewport, not of the image. For example, (max-height: 500px) 1000px proposes to use a source of 1000px width, if the viewport is not higher than 500px.\n Source size values specify the intended display size of the image. User agents use the current source size to select one of the sources supplied by the srcset attribute, when those sources are described using width (w) descriptors. The selected source size affects the intrinsic size of the image (the image's display size if no CSS styling is applied). If the srcset attribute is absent, or contains no values with a width descriptor, then the sizes attribute has no effect."
          },
          {
            name: 'src',
            comment: 'The image URL. Mandatory for the <img> element. On browsers supporting srcset, src is treated like a candidate image with a pixel density descriptor 1x, unless an image with this pixel density descriptor is already defined in srcset, or unless srcset contains w descriptors.'
          },
          {
            name: 'srcset',
            comment: 'One or more strings separated by commas, indicating possible image sources for the user agent to use. Each string is composed of:\n \n A URL to an image\n Optionally, whitespace followed by one of:\n \n A width descriptor (a positive integer directly followed by w). The width descriptor is divided by the source size given in the sizes attribute to calculate the effective pixel density.\n A pixel density descriptor (a positive floating point number directly followed by x).\n \n \n \n If no descriptor is specified, the source is assigned the default descriptor of 1x.\n It is incorrect to mix width descriptors and pixel density descriptors in the same srcset attribute. Duplicate descriptors (for instance, two sources in the same srcset which are both described with 2x) are also invalid.\n If the srcset attribute uses width descriptors, the sizes attribute must also be present, or the srcset itself will be ignored.\n The user agent selects any of the available sources at its discretion. This provides them with significant leeway to tailor their selection based on things like user preferences or bandwidth conditions. See our Responsive images tutorial for an example.'
          },
          {
            name: 'width',
            comment: 'The intrinsic width of the image in pixels. Must be an integer without a unit.'
          },
          {
            name: 'usemap',
            comment: 'The partial URL (starting with #) of an image map associated with the element.\n \n Note: You cannot use this attribute if the <img> element is inside an <a> or <button> element.'
          }
        ],
        permittedContent: 'void'
      },
      map: {
        comment: 'The <map> HTML element is used with <area> elements to define an image map (a clickable link area).',
        attributes: [
          {
            name: 'name',
            comment: 'The name attribute gives the map a name so that it can be referenced. The attribute must be present and must have a non-empty value with no space characters. The value of the name attribute must not be equal to the value of the name attribute of another <map> element in the same document. If the id attribute is also specified, both attributes must have the same value.'
          }
        ],
        permittedContent: 'SkruvHTMLTransparentContentGroup'
      },
      track: {
        comment: 'The <track> HTML element is used as a child of the media elements, <audio> and <video>. It lets you specify timed text tracks (or time-based data), for example to automatically handle subtitles. The tracks are formatted in WebVTT format (.vtt files) — Web Video Text Tracks.',
        attributes: [
          {
            name: 'default',
            comment: "This attribute indicates that the track should be enabled unless the user's preferences indicate that another track is more appropriate. This may only be used on one track element per media element."
          },
          {
            name: 'kind',
            comment: "How the text track is meant to be used. If omitted the default kind is subtitles. If the attribute contains an invalid value, it will use metadata (Versions of Chrome earlier than 52 treated an invalid value as subtitles). The following keywords are allowed:\n \n subtitles\n \n Subtitles provide translation of content that cannot be understood by the viewer. For example speech or text that is not English in an English language film.\n Subtitles may contain additional content, usually extra background information. For example the text at the beginning of the Star Wars films, or the date, time, and location of a scene.\n \n \n captions\n \n Closed captions provide a transcription and possibly a translation of audio.\n It may include important non-verbal information such as music cues or sound effects. It may indicate the cue's source (e.g. music, text, character).\n Suitable for users who are deaf or when the sound is muted.\n \n \n descriptions\n \n Textual description of the video content.\n Suitable for users who are blind or where the video cannot be seen.\n \n \n chapters\n \n Chapter titles are intended to be used when the user is navigating the media resource.\n \n \n metadata\n \n Tracks used by scripts. Not visible to the user."
          },
          {
            name: 'label',
            comment: 'A user-readable title of the text track which is used by the browser when listing available text tracks.'
          },
          {
            name: 'src',
            comment: 'Address of the track (.vtt file). Must be a valid URL. This attribute must be specified and its URL value must have the same origin as the document — unless the <audio> or <video> parent element of the track element has a crossorigin attribute.'
          },
          {
            name: 'srclang',
            comment: 'Language of the track text data. It must be a valid BCP 47 language tag. If the kind attribute is set to subtitles, then srclang must be defined.'
          }
        ],
        permittedContent: 'void'
      },
      video: {
        comment: 'The <video> HTML element embeds a media player which supports video playback into the document. You can use <video> for audio content as well, but the <audio> element may provide a more appropriate user experience.',
        attributes: [
          {
            name: 'autoplay',
            comment: "A Boolean attribute; if specified, the video automatically begins to play back as soon as it can do so without stopping to finish loading the data.\n \n Note: Sites that automatically play audio (or videos with an audio track) can be an unpleasant experience for users, so should be avoided when possible. If you must offer autoplay functionality, you should make it opt-in (requiring a user to specifically enable it). However, this can be useful when creating media elements whose source will be set at a later time, under user control. See our autoplay guide for additional information about how to properly use autoplay.\n \n To disable video autoplay, autoplay=\"false\" will not work; the video will autoplay if the attribute is there in the <video> tag at all. To remove autoplay, the attribute needs to be removed altogether.\n In some browsers (e.g. Chrome 70.0) autoplay doesn't work if no muted attribute is present."
          },
          {
            name: 'controls',
            comment: 'If this attribute is present, the browser will offer controls to allow the user to control video playback, including volume, seeking, and pause/resume playback.'
          },
          {
            name: 'controlslist',
            comment: 'The controlslist attribute, when specified, helps the browser select what controls to show for the video element whenever the browser shows its own set of controls (that is, when the controls attribute is specified).\n The allowed values are nodownload, nofullscreen and noremoteplayback.\n Use the disablepictureinpicture attribute if you want to disable the Picture-In-Picture mode (and the control).'
          },
          {
            name: 'crossorigin',
            comment: 'This enumerated attribute indicates whether to use CORS to fetch the related video. CORS-enabled resources can be reused in the <canvas> element without being tainted. The allowed values are:\n \n anonymous\n \n Sends a cross-origin request without a credential. In other words, it sends the Origin: HTTP header without a cookie, X.509 certificate, or performing HTTP Basic authentication. If the server does not give credentials to the origin site (by not setting the Access-Control-Allow-Origin: HTTP header), the resource will be tainted, and its usage restricted.\n \n use-credentials\n \n Sends a cross-origin request with a credential. In other words, it sends the Origin: HTTP header with a cookie, a certificate, or performing HTTP Basic authentication. If the server does not give credentials to the origin site (through Access-Control-Allow-Credentials: HTTP header), the resource will be tainted and its usage restricted.\n \n \n When not present, the resource is fetched without a CORS request (i.e. without sending the Origin: HTTP header), preventing its non-tainted use in <canvas> elements. If invalid, it is handled as if the enumerated keyword anonymous was used. See CORS settings attributes for additional information.'
          },
          {
            name: 'disablepictureinpicture',
            comment: 'Prevents the browser from suggesting a Picture-in-Picture context menu or to request Picture-in-Picture automatically in some cases.'
          },
          {
            name: 'disableremoteplayback',
            comment: 'A Boolean attribute used to disable the capability of remote playback in devices that are attached using wired (HDMI, DVI, etc.) and wireless technologies (Miracast, Chromecast, DLNA, AirPlay, etc.).\n In Safari, you can use x-webkit-airplay="deny" as a fallback.'
          },
          {
            name: 'height',
            comment: "The height of the video's display area, in CSS pixels (absolute values only; no percentages)."
          },
          {
            name: 'loop',
            comment: 'A Boolean attribute; if specified, the browser will automatically seek back to the start upon reaching the end of the video.'
          },
          {
            name: 'muted',
            comment: 'A Boolean attribute that indicates the default setting of the audio contained in the video. If set, the audio will be initially silenced. Its default value is false, meaning that the audio will be played when the video is played.'
          },
          {
            name: 'playsinline',
            comment: "A Boolean attribute indicating that the video is to be played \"inline\", that is within the element's playback area. Note that the absence of this attribute does not imply that the video will always be played in fullscreen."
          },
          {
            name: 'poster',
            comment: "A URL for an image to be shown while the video is downloading. If this attribute isn't specified, nothing is displayed until the first frame is available, then the first frame is shown as the poster frame."
          },
          {
            name: 'preload',
            comment: 'This enumerated attribute is intended to provide a hint to the browser about what the author thinks will lead to the best user experience regarding what content is loaded before the video is played. It may have one of the following values:\n \n none: Indicates that the video should not be preloaded.\n metadata: Indicates that only video metadata (e.g. length) is fetched.\n auto: Indicates that the whole video file can be downloaded, even if the user is not expected to use it.\n empty string: Synonym of the auto value.\n \n The default value is different for each browser. The spec advises it to be set to metadata.\n \n Note:\n \n The autoplay attribute has precedence over preload. If autoplay is specified, the browser would obviously need to start downloading the video for playback.\n The specification does not force the browser to follow the value of this attribute; it is a mere hint.'
          },
          {
            name: 'src',
            comment: 'The URL of the video to embed. This is optional; you may instead use the <source> element within the video block to specify the video to embed.'
          },
          {
            name: 'width',
            comment: "The width of the video's display area, in CSS pixels (absolute values only; no percentages)."
          }
        ],
        permittedContent: 'SkruvHTMLTransparentContentGroup | SkruvTrackHTMLElement | SkruvSourceHTMLElement'
      },
      embed: {
        comment: 'The <embed> HTML element embeds external content at the specified point in the document. This content is provided by an external application or other source of interactive content such as a browser plug-in.',
        attributes: [
          {
            name: 'height',
            comment: 'The displayed height of the resource, in CSS pixels. This must be an absolute value; percentages are not allowed.'
          },
          {
            name: 'src',
            comment: 'The URL of the resource being embedded.'
          },
          {
            name: 'type',
            comment: 'The MIME type to use to select the plug-in to instantiate.'
          },
          {
            name: 'width',
            comment: 'The displayed width of the resource, in CSS pixels. This must be an absolute value; percentages are not allowed.'
          }
        ],
        permittedContent: 'void'
      },
      iframe: {
        comment: 'The <iframe> HTML element represents a nested browsing context, embedding another HTML page into the current one.',
        attributes: [
          {
            name: 'allow',
            comment: "Specifies a Permissions Policy for the <iframe>. The policy defines what features are available to the <iframe> (for example, access to the microphone, camera, battery, web-share, etc.) based on the origin of the request.\n \n Note: A Permissions Policy specified by the allow attribute implements a further restriction on top of the policy specified in the Permissions-Policy header. It doesn't replace it."
          },
          {
            name: 'credentialless',
            comment: "Set to true to make the <iframe> credentialless, meaning that its content will be loaded in a new, ephemeral context. It doesn't have access to the network, cookies, and storage data associated with its origin. It uses a new context local to the top-level document lifetime. In return, the Cross-Origin-Embedder-Policy (COEP) embedding rules can be lifted, so documents with COEP set can embed third-party documents that do not. See IFrame credentialless for more details."
          },
          {
            name: 'csp',
            comment: 'A Content Security Policy enforced for the embedded resource. See HTMLIFrameElement.csp for details.'
          },
          {
            name: 'height',
            comment: 'The height of the frame in CSS pixels. Default is 150.'
          },
          {
            name: 'loading',
            comment: 'Indicates how the browser should load the iframe:\n \n eager: Load the iframe immediately, regardless if it is outside the visible viewport (this is the default value).\n lazy: Defer loading of the iframe until it reaches a calculated distance from the viewport, as defined by the browser.'
          },
          {
            name: 'name',
            comment: 'A targetable name for the embedded browsing context. This can be used in the target attribute of the <a>, <form>, or <base> elements; the formtarget attribute of the <input> or <button> elements; or the windowName parameter in the window.open() method.'
          },
          {
            name: 'referrerpolicy',
            comment: "Indicates which referrer to send when fetching the frame's resource:\n \n no-referrer: The Referer header will not be sent.\n no-referrer-when-downgrade: The Referer header will not be sent to origins without TLS (HTTPS).\n origin: The sent referrer will be limited to the origin of the referring page: its scheme, host, and port.\n origin-when-cross-origin: The referrer sent to other origins will be limited to the scheme, the host, and the port. Navigations on the same origin will still include the path.\n same-origin: A referrer will be sent for same origin, but cross-origin requests will contain no referrer information.\n strict-origin: Only send the origin of the document as the referrer when the protocol security level stays the same (HTTPS→HTTPS), but don't send it to a less secure destination (HTTPS→HTTP).\n strict-origin-when-cross-origin (default): Send a full URL when performing a same-origin request, only send the origin when the protocol security level stays the same (HTTPS→HTTPS), and send no header to a less secure destination (HTTPS→HTTP).\n unsafe-url: The referrer will include the origin and the path (but not the fragment, password, or username). This value is unsafe, because it leaks origins and paths from TLS-protected resources to insecure origins."
          },
          {
            name: 'sandbox',
            comment: 'Controls the restrictions applied to the content embedded in the <iframe>. The value of the attribute can either be empty to apply all restrictions, or space-separated tokens to lift particular restrictions:\n \n allow-downloads: Allows downloading files through an <a> or <area> element with the download attribute, as well as through the navigation that leads to a download of a file. This works regardless of whether the user clicked on the link, or JS code initiated it without user interaction.\n allow-downloads-without-user-activation \n Experimental\n: Allows for downloads to occur without a gesture from the user.\n allow-forms: Allows the page to submit forms. If this keyword is not used, form will be displayed as normal, but submitting it will not trigger input validation, sending data to a web server or closing a dialog.\n allow-modals: Allows the page to open modal windows by Window.alert(), Window.confirm(), Window.print() and Window.prompt(), while opening a <dialog> is allowed regardless of this keyword. It also allows the page to receive BeforeUnloadEvent event.\n allow-orientation-lock: Lets the resource lock the screen orientation.\n allow-pointer-lock: Allows the page to use the Pointer Lock API.\n allow-popups: Allows popups (like from Window.open(), target="_blank", Window.showModalDialog()). If this keyword is not used, that functionality will silently fail.\n allow-popups-to-escape-sandbox: Allows a sandboxed document to open new windows without forcing the sandboxing flags upon them. This will allow, for example, a third-party advertisement to be safely sandboxed without forcing the same restrictions upon the page the ad links to.\n allow-presentation: Allows embedders to have control over whether an iframe can start a presentation session.\n allow-same-origin: If this token is not used, the resource is treated as being from a special origin that always fails the same-origin policy (potentially preventing access to data storage/cookies and some JavaScript APIs).\n allow-scripts: Allows the page to run scripts (but not create pop-up windows). If this keyword is not used, this operation is not allowed.\n allow-storage-access-by-user-activation \n Experimental\n: Allows a document loaded in the <iframe> to use the Storage Access API to request access to unpartitioned cookies.\n allow-top-navigation: Lets the resource navigate the top-level browsing context (the one named _top).\n allow-top-navigation-by-user-activation: Lets the resource navigate the top-level browsing context, but only if initiated by a user gesture.\n allow-top-navigation-to-custom-protocols: Allows navigations to non-http protocols built into browser or registered by a website. This feature is also activated by allow-popups or allow-top-navigation keyword.\n \n \n Note:\n \n When the embedded document has the same origin as the embedding page, it is strongly discouraged to use both allow-scripts and allow-same-origin, as that lets the embedded document remove the sandbox attribute — making it no more secure than not using the sandbox attribute at all.\n Sandboxing is useless if the attacker can display content outside a sandboxed iframe — such as if the viewer opens the frame in a new tab. Such content should be also served from a separate origin to limit potential damage.'
          },
          {
            name: 'src',
            comment: "The URL of the page to embed. Use a value of about:blank to embed an empty page that conforms to the same-origin policy. Also note that programmatically removing an <iframe>'s src attribute (e.g. via Element.removeAttribute()) causes about:blank to be loaded in the frame in Firefox (from version 65), Chromium-based browsers, and Safari/iOS."
          },
          {
            name: 'srcdoc',
            comment: 'Inline HTML to embed, overriding the src attribute. If a browser does not support the srcdoc attribute, it will fall back to the URL in the src attribute.'
          },
          {
            name: 'width',
            comment: 'The width of the frame in CSS pixels. Default is 300.'
          }
        ],
        permittedContent: 'void'
      },
      object: {
        comment: 'The <object> HTML element represents an external resource, which can be treated as an image, a nested browsing context, or a resource to be handled by a plugin.',
        attributes: [
          {
            name: 'archive',
            comment: 'A space-separated list of URIs for archives of resources for the object.'
          },
          {
            name: 'border',
            comment: 'The width of a border around the control, in pixels.'
          },
          {
            name: 'classid',
            comment: "The URI of the object's implementation. It can be used together with, or in place of, the data attribute."
          },
          {
            name: 'codebase',
            comment: 'The base path used to resolve relative URIs specified by classid, data, or archive. If not specified, the default is the base URI of the current document.'
          },
          {
            name: 'codetype',
            comment: 'The content type of the data specified by classid.'
          },
          {
            name: 'data',
            comment: 'The address of the resource as a valid URL. At least one of data and type must be defined.'
          },
          {
            name: 'declare',
            comment: 'The presence of this Boolean attribute makes this element a declaration only. The object must be instantiated by a subsequent <object> element. Repeat the <object> element completely each time the resource is reused.'
          },
          {
            name: 'form',
            comment: 'The form element, if any, that the object element is associated with (its form owner). The value of the attribute must be an ID of a <form> element in the same document.'
          },
          {
            name: 'height',
            comment: 'The height of the displayed resource, in CSS pixels. — (Absolute values only. NO percentages)'
          },
          {
            name: 'name',
            comment: 'The name of valid browsing context (HTML5), or the name of the control (HTML 4).'
          },
          {
            name: 'standby',
            comment: "A message that the browser can show while loading the object's implementation and data."
          },
          {
            name: 'type',
            comment: 'The content type of the resource specified by data. At least one of data and type must be defined.'
          },
          {
            name: 'usemap',
            comment: "A hash-name reference to a <map> element; that is a '#' followed by the value of a name of a map element."
          },
          {
            name: 'width',
            comment: 'The width of the display resource, in CSS pixels. — (Absolute values only. NO percentages)'
          }
        ],
        permittedContent: 'SkruvHTMLTransparentContentGroup'
      },
      picture: {
        comment: 'The <picture> HTML element contains zero or more <source> elements and one <img> element to offer alternative versions of an image for different display/device scenarios.',
        attributes: [],
        permittedContent: 'SkruvSourceHTMLElement | SkruvImgHTMLElement'
      },
      source: {
        comment: 'The <source> HTML element specifies multiple media resources for the <picture>, the <audio> element, or the <video> element. It is a void element, meaning that it has no content and does not have a closing tag. It is commonly used to offer the same media content in multiple file formats in order to provide compatibility with a broad range of browsers given their differing support for image file formats and media file formats.',
        attributes: [
          {
            name: 'type',
            comment: 'The MIME media type of the image or other media type, optionally with a codecs parameter.'
          },
          {
            name: 'src',
            comment: "Required if the source element's parent is an <audio> and <video> element, but not allowed if the source element's parent is a <picture> element.\n Address of the media resource."
          },
          {
            name: 'srcset',
            comment: "Required if the source element's parent is a <picture> element, but not allowed if the source element's parent is an <audio> or <video> element.\n A list of one or more strings, separated by commas, indicating a set of possible images represented by the source for the browser to use. Each string is composed of:\n \n One URL specifying an image.\n A width descriptor, which consists of a string containing a positive integer directly followed by \"w\", such as 300w. The default value, if missing, is the infinity.\n A pixel density descriptor, that is a positive floating number directly followed by \"x\". The default value, if missing, is 1x.\n \n Each string in the list must have at least a width descriptor or a pixel density descriptor to be valid. The two types of descriptors should not be mixed together and only one should be used consistently throughout the list. Among the list, the value of each descriptor must be unique. The browser chooses the most adequate image to display at a given point of time. If the sizes attribute is present, then a width descriptor must be specified for each string. If the browser does not support srcset, then src will be used for the default source."
          },
          {
            name: 'sizes',
            comment: "Allowed if the source element's parent is a <picture> element, but not allowed if the source element's parent is an <audio> or <video> element.\n A list of source sizes that describes the final rendered width of the image represented by the source. Each source size consists of a comma-separated list of media condition-length pairs. Before laying the page out, the browser uses this information to determine which image is defined in srcset to use. Please note that sizes will have its effect only if width dimension descriptors are provided with srcset instead of pixel ratio values (200w instead of 2x for example)."
          },
          {
            name: 'media',
            comment: "Allowed if the source element's parent is a <picture> element, but not allowed if the source element's parent is an <audio> or <video> element.\n Media query of the resource's intended media."
          },
          {
            name: 'height',
            comment: "Allowed if the source element's parent is a <picture> element, but not allowed if the source element's parent is an <audio> or <video> element.\n The intrinsic height of the image, in pixels. Must be an integer without a unit."
          },
          {
            name: 'width',
            comment: "Allowed if the source element's parent is a <picture> element, but not allowed if the source element's parent is an <audio> or <video> element.\n The intrinsic width of the image in pixels. Must be an integer without a unit."
          }
        ],
        permittedContent: 'void'
      },
      portal: {
        comment: 'Experimental: This is an experimental technologyCheck the Browser compatibility table carefully before using this in production.',
        attributes: [
          {
            name: 'referrerpolicy',
            comment: 'Sets the referrer policy to use when requesting the page at the URL given as the value of the src attribute.'
          },
          {
            name: 'src',
            comment: 'The URL of the page to embed.'
          }
        ],
        permittedContent: 'void'
      },
      canvas: {
        comment: 'Use the HTML <canvas> element with either the canvas scripting API or the WebGL API to draw graphics and animations.',
        attributes: [
          {
            name: 'height',
            comment: 'The height of the coordinate space in CSS pixels. Defaults to 150.'
          },
          {
            name: 'width',
            comment: 'The width of the coordinate space in CSS pixels. Defaults to 300.'
          }
        ],
        permittedContent: 'AnyHTMLContent'
      },
      noscript: {
        comment: 'The <noscript> HTML element defines a section of HTML to be inserted if a script type on the page is unsupported or if scripting is currently turned off in the browser.',
        attributes: [],
        permittedContent: 'AnyHTMLContent'
      },
      del: {
        comment: 'The <del> HTML element represents a range of text that has been deleted from a document. This can be used when rendering "track changes" or source code diff information, for example. The <ins> element can be used for the opposite purpose: to indicate text that has been added to the document.',
        attributes: [
          {
            name: 'cite',
            comment: 'A URI for a resource that explains the change (for example, meeting minutes).'
          },
          {
            name: 'datetime',
            comment: 'This attribute indicates the time and date of the change and must be a valid date string with an optional time. If the value cannot be parsed as a date with an optional time string, the element does not have an associated timestamp. For the format of the string without a time, see Date strings. The format of the string if it includes both date and time is covered in Local date and time strings.'
          }
        ],
        permittedContent: 'SkruvHTMLTransparentContentGroup'
      },
      ins: {
        comment: 'The <ins> HTML element represents a range of text that has been added to a document. You can use the <del> element to similarly represent a range of text that has been deleted from the document.',
        attributes: [
          {
            name: 'cite',
            comment: 'This attribute defines the URI of a resource that explains the change, such as a link to meeting minutes or a ticket in a troubleshooting system.'
          },
          {
            name: 'datetime',
            comment: 'This attribute indicates the time and date of the change and must be a valid date with an optional time string. If the value cannot be parsed as a date with an optional time string, the element does not have an associated timestamp. For the format of the string without a time, see Format of a valid date string. The format of the string if it includes both date and time is covered in Format of a valid local date and time string.'
          }
        ],
        permittedContent: 'SkruvHTMLTransparentContentGroup'
      },
      caption: {
        comment: 'The <caption> HTML element specifies the caption (or title) of a table.',
        attributes: [],
        permittedContent: 'SkruvHTMLFlowContentGroup'
      },
      col: {
        comment: 'The <col> HTML element defines a column within a table and is used for defining common semantics on all common cells. It is generally found within a <colgroup> element.',
        attributes: [
          {
            name: 'span',
            comment: 'This attribute contains a positive integer indicating the number of consecutive columns the <col> element spans. If not present, its default value is 1.'
          }
        ],
        permittedContent: 'void'
      },
      colgroup: {
        comment: 'The <colgroup> HTML element defines a group of columns within a table.',
        attributes: [
          {
            name: 'span',
            comment: 'This attribute contains a positive integer indicating the number of consecutive columns the <colgroup> element spans. If not present, its default value is 1.\n The span attribute is not permitted if there are one or more <col> elements within the <colgroup>.'
          }
        ],
        permittedContent: 'SkruvColHTMLElement'
      },
      table: {
        comment: 'The <table> HTML element represents tabular data — that is, information presented in a two-dimensional table comprised of rows and columns of cells containing data.',
        attributes: [],
        permittedContent: 'SkruvCaptionHTMLElement | SkruvColgroupHTMLElement | SkruvTheadHTMLElement | SkruvTbodyHTMLElement | SkruvTrHTMLElement | SkruvTfootHTMLElement'
      },
      tbody: {
        comment: 'The <tbody> HTML element encapsulates a set of table rows (<tr> elements), indicating that they comprise the body of the table (<table>).',
        attributes: [],
        permittedContent: 'SkruvTrHTMLElement'
      },
      tr: {
        comment: "The <tr> HTML element defines a row of cells in a table. The row's cells can then be established using a mix of <td> (data cell) and <th> (header cell) elements.",
        attributes: [],
        permittedContent: 'SkruvTdHTMLElement | SkruvThHTMLElement | SkruvScriptHTMLElement | SkruvTemplateHTMLElement'
      },
      td: {
        comment: 'The <td> HTML element defines a cell of a table that contains data. It participates in the table model.',
        attributes: [
          {
            name: 'colspan',
            comment: 'This attribute contains a non-negative integer value that indicates for how many columns the cell extends. Its default value is 1. Values higher than 1000 will be considered as incorrect and will be set to the default value (1).'
          },
          {
            name: 'headers',
            comment: 'This attribute contains a list of space-separated strings, each corresponding to the id attribute of the <th> elements that apply to this element.'
          },
          {
            name: 'rowspan',
            comment: 'This attribute contains a non-negative integer value that indicates for how many rows the cell extends. Its default value is 1; if its value is set to 0, it extends until the end of the table section (<thead>, <tbody>, <tfoot>, even if implicitly defined), that the cell belongs to. Values higher than 65534 are clipped down to 65534.'
          }
        ],
        permittedContent: 'SkruvHTMLFlowContentGroup'
      },
      tfoot: {
        comment: 'The <tfoot> HTML element defines a set of rows summarizing the columns of the table.',
        attributes: [],
        permittedContent: 'SkruvTrHTMLElement'
      },
      th: {
        comment: 'The <th> HTML element defines a cell as the header of a group of table cells. The exact nature of this group is defined by the scope and headers attributes.',
        attributes: [
          {
            name: 'abbr',
            comment: "This attribute contains a short abbreviated description of the cell's content. Some user-agents, such as speech readers, may present this description before the content itself."
          },
          {
            name: 'colspan',
            comment: 'This attribute contains a non-negative integer value that indicates for how many columns the cell extends. Its default value is 1. Values higher than 1000 will be considered as incorrect and will be set to the default value (1).'
          },
          {
            name: 'headers',
            comment: 'This attribute contains a list of space-separated strings, each corresponding to the id attribute of the <th> elements that apply to this element.'
          },
          {
            name: 'rowspan',
            comment: 'This attribute contains a non-negative integer value that indicates for how many rows the cell extends. Its default value is 1; if its value is set to 0, it extends until the end of the table section (<thead>, <tbody>, <tfoot>, even if implicitly defined), that the cell belongs to. Values higher than 65534 are clipped down to 65534.'
          },
          {
            name: 'scope',
            comment: 'This enumerated attribute defines the cells that the header (defined in the <th>) element relates to. It may have the following values:\n \n row: The header relates to all cells of the row it belongs to.\n col: The header relates to all cells of the column it belongs to.\n rowgroup: The header belongs to a rowgroup and relates to all of its cells.\n colgroup: The header belongs to a colgroup and relates to all of its cells.\n \n If the scope attribute is not specified, or its value is not row, col, or rowgroup, or colgroup, then browsers automatically select the set of cells to which the header cell applies.'
          }
        ],
        permittedContent: 'Exclude<Exclude<Exclude<Exclude<SkruvHTMLFlowContentGroup, SkruvFooterHTMLElement>, SkruvHeaderHTMLElement>, SkruvHTMLSectioningContentGroup>, SkruvHTMLHeadingContentGroup>'
      },
      thead: {
        comment: 'The <thead> HTML element defines a set of rows defining the head of the columns of the table.',
        attributes: [],
        permittedContent: 'SkruvTrHTMLElement'
      },
      button: {
        comment: 'The <button> HTML element is an interactive element activated by a user with a mouse, keyboard, finger, voice command, or other assistive technology. Once activated, it then performs an action, such as submitting a form or opening a dialog.',
        attributes: [
          {
            name: 'autofocus',
            comment: 'This Boolean attribute specifies that the button should have input focus when the page loads. Only one element in a document can have this attribute.'
          },
          {
            name: 'autocomplete',
            comment: 'This attribute on a <button> is nonstandard and Firefox-specific. Unlike other browsers, Firefox persists the dynamic disabled state of a <button> across page loads. Setting autocomplete="off" on the button disables this feature; see Firefox bug 654072.'
          },
          {
            name: 'disabled',
            comment: 'This Boolean attribute prevents the user from interacting with the button: it cannot be pressed or focused.\n Firefox, unlike other browsers, persists the dynamic disabled state of a <button> across page loads. To control this feature, use the autocomplete attribute.'
          },
          {
            name: 'form',
            comment: 'The <form> element to associate the button with (its form owner). The value of this attribute must be the id of a <form> in the same document. (If this attribute is not set, the <button> is associated with its ancestor <form> element, if any.)\n This attribute lets you associate <button> elements to <form>s anywhere in the document, not just inside a <form>. It can also override an ancestor <form> element.'
          },
          {
            name: 'formaction',
            comment: "The URL that processes the information submitted by the button. Overrides the action attribute of the button's form owner. Does nothing if there is no form owner."
          },
          {
            name: 'formenctype',
            comment: "If the button is a submit button (it's inside/associated with a <form> and doesn't have type=\"button\"), specifies how to encode the form data that is submitted. Possible values:\n \n application/x-www-form-urlencoded: The default if the attribute is not used.\n multipart/form-data: Used to submit <input> elements with their type attributes set to file.\n text/plain: Specified as a debugging aid; shouldn't be used for real form submission.\n \n If this attribute is specified, it overrides the enctype attribute of the button's form owner."
          },
          {
            name: 'formmethod',
            comment: "If the button is a submit button (it's inside/associated with a <form> and doesn't have type=\"button\"), this attribute specifies the HTTP method used to submit the form. Possible values:\n \n post: The data from the form are included in the body of the HTTP request when sent to the server. Use when the form contains information that shouldn't be public, like login credentials.\n get: The form data are appended to the form's action URL, with a ? as a separator, and the resulting URL is sent to the server. Use this method when the form has no side effects, like search forms.\n dialog: This method is used to indicate that the button closes the dialog with which it is associated, and does not transmit the form data at all.\n \n If specified, this attribute overrides the method attribute of the button's form owner."
          },
          {
            name: 'formnovalidate',
            comment: "If the button is a submit button, this Boolean attribute specifies that the form is not to be validated when it is submitted. If this attribute is specified, it overrides the novalidate attribute of the button's form owner.\n This attribute is also available on <input type=\"image\"> and <input type=\"submit\"> elements."
          },
          {
            name: 'formtarget',
            comment: "If the button is a submit button, this attribute is an author-defined name or standardized, underscore-prefixed keyword indicating where to display the response from submitting the form. This is the name of, or keyword for, a browsing context (a tab, window, or <iframe>). If this attribute is specified, it overrides the target attribute of the button's form owner. The following keywords have special meanings:\n \n _self: Load the response into the same browsing context as the current one. This is the default if the attribute is not specified.\n _blank: Load the response into a new unnamed browsing context — usually a new tab or window, depending on the user's browser settings.\n _parent: Load the response into the parent browsing context of the current one. If there is no parent, this option behaves the same way as _self.\n _top: Load the response into the top-level browsing context (that is, the browsing context that is an ancestor of the current one, and has no parent). If there is no parent, this option behaves the same way as _self."
          },
          {
            name: 'name',
            comment: "The name of the button, submitted as a pair with the button's value as part of the form data, when that button is used to submit the form."
          },
          {
            name: 'popovertarget',
            comment: 'Turns a <button> element into a popover control button; takes the ID of the popover element to control as its value. See the Popover API landing page for more details.'
          },
          {
            name: 'popovertargetaction',
            comment: 'Specifies the action to be performed on a popover element being controlled by a control <button>. Possible values are:\n \n "hide"\n \n The button will hide a shown popover. If you try to hide an already hidden popover, no action will be taken.\n \n "show"\n \n The button will show a hidden popover. If you try to show an already showing popover, no action will be taken.\n \n "toggle"\n \n The button will toggle a popover between showing and hidden. If the popover is hidden, it will be shown; if the popover is showing, it will be hidden. If popovertargetaction is omitted, "toggle" is the default action that will be performed by the control button.'
          },
          {
            name: 'type',
            comment: "The default behavior of the button. Possible values are:\n \n submit: The button submits the form data to the server. This is the default if the attribute is not specified for buttons associated with a <form>, or if the attribute is an empty or invalid value.\n reset: The button resets all the controls to their initial values, like <input type=\"reset\">. (This behavior tends to annoy users.)\n button: The button has no default behavior, and does nothing when pressed by default. It can have client-side scripts listen to the element's events, which are triggered when the events occur."
          },
          {
            name: 'value',
            comment: "Defines the value associated with the button's name when it's submitted with the form data. This value is passed to the server in params when the form is submitted using this button."
          }
        ],
        permittedContent: 'SkruvHTMLPhrasingContentGroup'
      },
      datalist: {
        comment: 'The <datalist> HTML element contains a set of <option> elements that represent the permissible or recommended options available to choose from within other controls.',
        attributes: [],
        permittedContent: 'SkruvHTMLPhrasingContentGroup | SkruvOptionHTMLElement'
      },
      option: {
        comment: 'The <option> HTML element is used to define an item contained in a <select>, an <optgroup>, or a <datalist> element. As such, <option> can represent menu items in popups and other lists of items in an HTML document.',
        attributes: [
          {
            name: 'disabled',
            comment: "If this Boolean attribute is set, this option is not checkable. Often browsers grey out such control and it won't receive any browsing event, like mouse clicks or focus-related ones. If this attribute is not set, the element can still be disabled if one of its ancestors is a disabled <optgroup> element."
          },
          {
            name: 'label',
            comment: "This attribute is text for the label indicating the meaning of the option. If the label attribute isn't defined, its value is that of the element text content."
          },
          {
            name: 'selected',
            comment: 'If present, this Boolean attribute indicates that the option is initially selected. If the <option> element is the descendant of a <select> element whose multiple attribute is not set, only one single <option> of this <select> element may have the selected attribute.'
          },
          {
            name: 'value',
            comment: 'The content of this attribute represents the value to be submitted with the form, should this option be selected. If this attribute is omitted, the value is taken from the text content of the option element.'
          }
        ],
        permittedContent: 'string'
      },
      fieldset: {
        comment: 'The <fieldset> HTML element is used to group several controls as well as labels (<label>) within a web form.',
        attributes: [
          {
            name: 'disabled',
            comment: "If this Boolean attribute is set, all form controls that are descendants of the <fieldset>, are disabled, meaning they are not editable and won't be submitted along with the <form>. They won't receive any browsing events, like mouse clicks or focus-related events. By default browsers display such controls grayed out. Note that form elements inside the <legend> element won't be disabled."
          },
          {
            name: 'form',
            comment: 'This attribute takes the value of the id attribute of a <form> element you want the <fieldset> to be part of, even if it is not inside the form. Please note that usage of this is confusing — if you want the <input> elements inside the <fieldset> to be associated with the form, you need to use the form attribute directly on those elements. You can check which elements are associated with a form via JavaScript, using HTMLFormElement.elements.'
          },
          {
            name: 'name',
            comment: 'The name associated with the group.\n \n Note: The caption for the fieldset is given by the first <legend> element nested inside it.'
          }
        ],
        permittedContent: 'SkruvLegendHTMLElement'
      },
      label: {
        comment: 'The <label> HTML element represents a caption for an item in a user interface.',
        attributes: [
          {
            name: 'for',
            comment: 'The value of the for attribute must be a single id for a labelable form-related element in the same document as the <label> element. So, any given label element can be associated with only one form control.\n \n Note: To programmatically set the for attribute, use htmlFor.\n \n The first element in the document with an id attribute matching the value of the for attribute is the labeled control for this label element — if the element with that id is actually a labelable element. If it is not a labelable element, then the for attribute has no effect. If there are other elements that also match the id value, later in the document, they are not considered.\n Multiple label elements can be given the same value for their for attribute; doing so causes the associated form control (the form control that for value references) to have multiple labels.\n \n Note: A <label> element can have both a for attribute and a contained control element, as long as the for attribute points to the contained control element.'
          }
        ],
        permittedContent: 'SkruvHTMLPhrasingContentGroup'
      },
      form: {
        comment: 'The <form> HTML element represents a document section containing interactive controls for submitting information.',
        attributes: [
          {
            name: 'accept-charset',
            comment: 'Space-separated character encodings the server accepts. The browser uses them in the order in which they are listed. The default value means the same encoding as the page.\n (In previous versions of HTML, character encodings could also be delimited by commas.)'
          },
          {
            name: 'autocapitalize',
            comment: 'A nonstandard attribute used by iOS Safari that controls how textual form elements should be automatically capitalized. autocapitalize attributes on a form elements override it on <form>. Possible values:\n \n none: No automatic capitalization.\n sentences (default): Capitalize the first letter of each sentence.\n words: Capitalize the first letter of each word.\n characters: Capitalize all characters — that is, uppercase.'
          },
          {
            name: 'autocomplete',
            comment: 'Indicates whether input elements can by default have their values automatically completed by the browser. autocomplete attributes on form elements override it on <form>. Possible values:\n \n off: The browser may not automatically complete entries. (Browsers tend to ignore this for suspected login forms; see The autocomplete attribute and login fields.)\n on: The browser may automatically complete entries.'
          },
          {
            name: 'name',
            comment: 'The name of the form. The value must not be the empty string, and must be unique among the form elements in the forms collection that it is in, if any.'
          },
          {
            name: 'rel',
            comment: 'Controls the annotations and what kinds of links the form creates. Annotations include external, nofollow, opener, noopener, and noreferrer. Link types include help, prev, next, search, and license. The rel value is a space-separated list of these enumerated values.'
          }
        ],
        permittedContent: 'SkruvHTMLFlowContentGroup'
      },
      input: {
        comment: 'The <input> HTML element is used to create interactive controls for web-based forms in order to accept data from the user; a wide variety of types of input data and control widgets are available, depending on the device and user agent. The <input> element is one of the most powerful and complex in all of HTML due to the sheer number of combinations of input types and attributes.',
        attributes: [
          {
            name: 'accept',
            comment: 'Hint for expected file type in file upload controls'
          },
          {
            name: 'alt',
            comment: 'alt attribute for the image type. Required for accessibility'
          },
          {
            name: 'autocomplete',
            comment: 'Hint for form autofill feature'
          },
          {
            name: 'capture',
            comment: 'Media capture input method in file upload controls'
          },
          {
            name: 'checked',
            comment: 'Whether the command or control is checked'
          },
          {
            name: 'dirname',
            comment: "Name of form field to use for sending the element's directionality in form submission"
          },
          {
            name: 'disabled',
            comment: 'Whether the form control is disabled'
          },
          {
            name: 'form',
            comment: 'Associates the control with a form element'
          },
          {
            name: 'formaction',
            comment: 'URL to use for form submission'
          },
          {
            name: 'formenctype',
            comment: 'Form data set encoding type to use for form submission'
          },
          {
            name: 'formmethod',
            comment: 'HTTP method to use for form submission'
          },
          {
            name: 'formnovalidate',
            comment: 'Bypass form control validation for form submission'
          },
          {
            name: 'formtarget',
            comment: 'Browsing context for form submission'
          },
          {
            name: 'height',
            comment: 'Same as height attribute for <img>; vertical dimension'
          },
          {
            name: 'list',
            comment: 'Value of the id attribute of the <datalist> of autocomplete options'
          },
          {
            name: 'max',
            comment: 'Maximum value'
          },
          {
            name: 'maxlength',
            comment: 'Maximum length (number of characters) of value'
          },
          {
            name: 'min',
            comment: 'Minimum value'
          },
          {
            name: 'minlength',
            comment: 'Minimum length (number of characters) of value'
          },
          {
            name: 'multiple',
            comment: 'Boolean. Whether to allow multiple values'
          },
          {
            name: 'name',
            comment: 'Name of the form control. Submitted with the form as part of a name/value pair'
          },
          {
            name: 'pattern',
            comment: 'Pattern the value must match to be valid'
          },
          {
            name: 'placeholder',
            comment: 'Text that appears in the form control when it has no value set'
          },
          {
            name: 'popovertarget',
            comment: 'Designates an <input type="button"> as a control for a popover element'
          },
          {
            name: 'popovertargetaction',
            comment: 'Specifies the action that a popover control should perform'
          },
          {
            name: 'readonly',
            comment: 'Boolean. The value is not editable'
          },
          {
            name: 'required',
            comment: 'Boolean. A value is required or must be checked for the form to be submittable'
          },
          {
            name: 'size',
            comment: 'Size of the control'
          },
          {
            name: 'src',
            comment: 'Same as src attribute for <img>; address of image resource'
          },
          {
            name: 'step',
            comment: 'Incremental values that are valid'
          },
          {
            name: 'type',
            comment: 'Type of form control'
          },
          {
            name: 'value',
            comment: 'The initial value of the control'
          },
          {
            name: 'width',
            comment: 'Same as width attribute for <img>'
          }
        ],
        permittedContent: 'void'
      },
      legend: {
        comment: 'The <legend> HTML element represents a caption for the content of its parent <fieldset>.',
        attributes: [],
        permittedContent: 'SkruvHTMLPhrasingContentGroup | SkruvH1HTMLElement | SkruvH2HTMLElement | SkruvH3HTMLElement | SkruvH4HTMLElement | SkruvH5HTMLElement | SkruvH6HTMLElement'
      },
      meter: {
        comment: 'The <meter> HTML element represents either a scalar value within a known range or a fractional value.',
        attributes: [
          {
            name: 'value',
            comment: "The current numeric value. This must be between the minimum and maximum values (min attribute and max attribute) if they are specified. If unspecified or malformed, the value is 0. If specified, but not within the range given by the min attribute and max attribute, the value is equal to the nearest end of the range.\n \n Note: Unless the value attribute is between 0 and 1 (inclusive), the min and max attributes should define the range so that the value attribute's value is within it."
          },
          {
            name: 'min',
            comment: 'The lower numeric bound of the measured range. This must be less than the maximum value (max attribute), if specified. If unspecified, the minimum value is 0.'
          },
          {
            name: 'max',
            comment: 'The upper numeric bound of the measured range. This must be greater than the minimum value (min attribute), if specified. If unspecified, the maximum value is 1.'
          },
          {
            name: 'low',
            comment: 'The upper numeric bound of the low end of the measured range. This must be greater than the minimum value (min attribute), and it also must be less than the high value and maximum value (high attribute and max attribute, respectively), if any are specified. If unspecified, or if less than the minimum value, the low value is equal to the minimum value.'
          },
          {
            name: 'high',
            comment: 'The lower numeric bound of the high end of the measured range. This must be less than the maximum value (max attribute), and it also must be greater than the low value and minimum value (low attribute and min attribute, respectively), if any are specified. If unspecified, or if greater than the maximum value, the high value is equal to the maximum value.'
          },
          {
            name: 'optimum',
            comment: "This attribute indicates the optimal numeric value. It must be within the range (as defined by the min attribute and max attribute). When used with the low attribute and high attribute, it gives an indication where along the range is considered preferable. For example, if it is between the min attribute and the low attribute, then the lower range is considered preferred. The browser may color the meter's bar differently depending on whether the value is less than or equal to the optimum value."
          },
          {
            name: 'form',
            comment: 'This optional attribute is used to explicitly set a <form> owner for the <meter> element. If omitted, the <meter> is associated with its ancestor <form> element or the form association set by the form attribute on another ancestor element, such as on a <fieldset>, if any. If included, the value must be the id of a <form> in the same tree.'
          }
        ],
        permittedContent: 'SkruvHTMLPhrasingContentGroup'
      },
      optgroup: {
        comment: 'The <optgroup> HTML element creates a grouping of options within a <select> element.',
        attributes: [
          {
            name: 'disabled',
            comment: "If this Boolean attribute is set, none of the items in this option group is selectable. Often browsers grey out such control and it won't receive any browsing events, like mouse clicks or focus-related ones."
          },
          {
            name: 'label',
            comment: 'The name of the group of options, which the browser can use when labeling the options in the user interface. This attribute is mandatory if this element is used.'
          }
        ],
        permittedContent: 'SkruvOptionHTMLElement'
      },
      select: {
        comment: 'The <select> HTML element represents a control that provides a menu of options.',
        attributes: [
          {
            name: 'autocomplete',
            comment: "A string providing a hint for a user agent's autocomplete feature. See The HTML autocomplete attribute for a complete list of values and details on how to use autocomplete."
          },
          {
            name: 'autofocus',
            comment: 'This Boolean attribute lets you specify that a form control should have input focus when the page loads. Only one form element in a document can have the autofocus attribute.'
          },
          {
            name: 'disabled',
            comment: 'This Boolean attribute indicates that the user cannot interact with the control. If this attribute is not specified, the control inherits its setting from the containing element, for example <fieldset>; if there is no containing element with the disabled attribute set, then the control is enabled.'
          },
          {
            name: 'form',
            comment: 'The <form> element to associate the <select> with (its form owner). The value of this attribute must be the id of a <form> in the same document. (If this attribute is not set, the <select> is associated with its ancestor <form> element, if any.)\n This attribute lets you associate <select> elements to <form>s anywhere in the document, not just inside a <form>. It can also override an ancestor <form> element.'
          },
          {
            name: 'multiple',
            comment: 'This Boolean attribute indicates that multiple options can be selected in the list. If it is not specified, then only one option can be selected at a time. When multiple is specified, most browsers will show a scrolling list box instead of a single line dropdown.'
          },
          {
            name: 'name',
            comment: 'This attribute is used to specify the name of the control.'
          },
          {
            name: 'required',
            comment: 'A Boolean attribute indicating that an option with a non-empty string value must be selected.'
          },
          {
            name: 'size',
            comment: 'If the control is presented as a scrolling list box (e.g. when multiple is specified), this attribute represents the number of rows in the list that should be visible at one time. Browsers are not required to present a select element as a scrolled list box. The default value is 0.\n \n Note: According to the HTML specification, the default value for size should be 1; however, in practice, this has been found to break some websites, and no other browser currently does that, so Mozilla has opted to continue to return 0 for the time being with Firefox.'
          }
        ],
        permittedContent: 'SkruvOptionHTMLElement | HTMLOptGroupElement'
      },
      output: {
        comment: 'The <output> HTML element is a container element into which a site or app can inject the results of a calculation or the outcome of a user action.',
        attributes: [
          {
            name: 'for',
            comment: "A space-separated list of other elements' ids, indicating that those elements contributed input values to (or otherwise affected) the calculation."
          },
          {
            name: 'form',
            comment: 'The <form> element to associate the output with (its form owner). The value of this attribute must be the id of a <form> in the same document. (If this attribute is not set, the <output> is associated with its ancestor <form> element, if any.)\n This attribute lets you associate <output> elements to <form>s anywhere in the document, not just inside a <form>. It can also override an ancestor <form> element.'
          },
          {
            name: 'name',
            comment: "The element's name. Used in the form.elements API."
          }
        ],
        permittedContent: 'SkruvHTMLPhrasingContentGroup'
      },
      progress: {
        comment: 'The <progress> HTML element displays an indicator showing the completion progress of a task, typically displayed as a progress bar.',
        attributes: [
          {
            name: 'max',
            comment: 'This attribute describes how much work the task indicated by the progress element requires. The max attribute, if present, must have a value greater than 0 and be a valid floating point number. The default value is 1.'
          },
          {
            name: 'value',
            comment: 'This attribute specifies how much of the task that has been completed. It must be a valid floating point number between 0 and max, or between 0 and 1 if max is omitted. If there is no value attribute, the progress bar is indeterminate; this indicates that an activity is ongoing with no indication of how long it is expected to take.'
          }
        ],
        permittedContent: 'SkruvHTMLPhrasingContentGroup'
      },
      textarea: {
        comment: 'The <textarea> HTML element represents a multi-line plain-text editing control, useful when you want to allow users to enter a sizeable amount of free-form text, for example a comment on a review or feedback form.',
        attributes: [
          {
            name: 'autocomplete',
            comment: "This attribute indicates whether the value of the control can be automatically completed by the browser. Possible values are:\n \n off: The user must explicitly enter a value into this field for every use, or the document provides its own auto-completion method; the browser does not automatically complete the entry.\n on: The browser can automatically complete the value based on values that the user has entered during previous uses.\n \n If the autocomplete attribute is not specified on a <textarea> element, then the browser uses the autocomplete attribute value of the <textarea> element's form owner. The form owner is either the <form> element that this <textarea> element is a descendant of or the form element whose id is specified by the form attribute of the input element. For more information, see the autocomplete attribute in <form>."
          },
          {
            name: 'autocorrect',
            comment: 'A string which indicates whether to activate automatic spelling correction and processing of text substitutions (if any are configured) while the user is editing this textarea. Permitted values are:\n \n on\n \n Enable automatic spelling correction and text substitutions.\n \n off\n \n Disable automatic spelling correction and text substitutions.'
          },
          {
            name: 'autofocus',
            comment: 'This Boolean attribute lets you specify that a form control should have input focus when the page loads. Only one form-associated element in a document can have this attribute specified.'
          },
          {
            name: 'cols',
            comment: 'The visible width of the text control, in average character widths. If it is specified, it must be a positive integer. If it is not specified, the default value is 20.'
          },
          {
            name: 'dirname',
            comment: 'This attribute is used to indicate the text directionality of the element contents similar to the dirname attribute of the <input> element.\n For more information, see the dirname attribute.'
          },
          {
            name: 'disabled',
            comment: 'This Boolean attribute indicates that the user cannot interact with the control. If this attribute is not specified, the control inherits its setting from the containing element, for example <fieldset>; if there is no containing element when the disabled attribute is set, the control is enabled.'
          },
          {
            name: 'form',
            comment: 'The form element that the <textarea> element is associated with (its "form owner"). The value of the attribute must be the id of a form element in the same document. If this attribute is not specified, the <textarea> element must be a descendant of a form element. This attribute enables you to place <textarea> elements anywhere within a document, not just as descendants of form elements.'
          },
          {
            name: 'maxlength',
            comment: "The maximum string length (measured in UTF-16 code units) that the user can enter. If this value isn't specified, the user can enter an unlimited number of characters."
          },
          {
            name: 'minlength',
            comment: 'The minimum string length (measured in UTF-16 code units) required that the user should enter.'
          },
          {
            name: 'name',
            comment: 'The name of the control.'
          },
          {
            name: 'placeholder',
            comment: 'A hint to the user of what can be entered in the control. Carriage returns or line-feeds within the placeholder text must be treated as line breaks when rendering the hint.\n \n Note: Placeholders should only be used to show an example of the type of data that should be entered into a form; they are not a substitute for a proper <label> element tied to the input. See <input> labels for a full explanation.'
          },
          {
            name: 'readonly',
            comment: 'This Boolean attribute indicates that the user cannot modify the value of the control. Unlike the disabled attribute, the readonly attribute does not prevent the user from clicking or selecting in the control. The value of a read-only control is still submitted with the form.'
          },
          {
            name: 'required',
            comment: 'This attribute specifies that the user must fill in a value before submitting a form.'
          },
          {
            name: 'rows',
            comment: 'The number of visible text lines for the control. If it is specified, it must be a positive integer. If it is not specified, the default value is 2.'
          },
          {
            name: 'spellcheck',
            comment: "Specifies whether the <textarea> is subject to spell checking by the underlying browser/OS. The value can be:\n \n true: Indicates that the element needs to have its spelling and grammar checked.\n default : Indicates that the element is to act according to a default behavior, possibly based on the parent element's own spellcheck value.\n false : Indicates that the element should not be spell checked."
          },
          {
            name: 'wrap',
            comment: 'Indicates how the control should wrap the value for form submission. Possible values are:\n \n hard: The browser automatically inserts line breaks (CR+LF) so that each line is no longer than the width of the control; the cols attribute must be specified for this to take effect\n soft: The browser ensures that all line breaks in the entered value are a CR+LF pair, but no additional line breaks are added to the value.\n off \n Non-standard\n: Like soft but changes appearance to white-space: pre so line segments exceeding cols are not wrapped and the <textarea> becomes horizontally scrollable.\n \n If this attribute is not specified, soft is its default value.'
          }
        ],
        permittedContent: 'string'
      },
      details: {
        comment: 'The <details> HTML element creates a disclosure widget in which information is visible only when the widget is toggled into an "open" state. A summary or label must be provided using the <summary> element.',
        attributes: [
          {
            name: 'open',
            comment: 'This Boolean attribute indicates whether the details — that is, the contents of the <details> element — are currently visible. The details are shown when this attribute exists, or hidden when this attribute is absent. By default this attribute is absent which means the details are not visible.\n \n Note: You have to remove this attribute entirely to make the details hidden. open="false" makes the details visible because this attribute is Boolean.'
          }
        ],
        permittedContent: 'SkruvSummaryHTMLElement | SkruvHTMLFlowContentGroup'
      },
      summary: {
        comment: "The <summary> HTML element specifies a summary, caption, or legend for a <details> element's disclosure box. Clicking the <summary> element toggles the state of the parent <details> element open and closed.",
        attributes: [],
        permittedContent: 'SkruvHTMLPhrasingContentGroup | SkruvHTMLHeadingContentGroup'
      },
      dialog: {
        comment: 'The <dialog> HTML element represents a dialog box or other interactive component, such as a dismissible alert, inspector, or subwindow.',
        attributes: [
          {
            name: 'open',
            comment: "Indicates that the dialog is active and can be interacted with. When the open attribute is not set, the dialog shouldn't be shown to the user.\n It is recommended to use the .show() or .showModal() methods to render dialogs, rather than the open attribute. If a <dialog> is opened using the open attribute, it will be non-modal."
          }
        ],
        permittedContent: 'SkruvHTMLFlowContentGroup'
      },
      slot: {
        comment: 'The <slot> HTML element—part of the Web Components technology suite—is a placeholder inside a web component that you can fill with your own markup, which lets you create separate DOM trees and present them together.',
        attributes: [
          {
            name: 'name',
            comment: "The slot's name.\n A named slot is a <slot> element with a name attribute."
          }
        ],
        permittedContent: 'AnyHTMLContent'
      },
      template: {
        comment: 'The <template> HTML element is a mechanism for holding HTML that is not to be rendered immediately when a page is loaded but may be instantiated subsequently during runtime using JavaScript.',
        attributes: [],
        permittedContent: 'AnyHTMLContent'
      }
    }
  },
  SVG: {
    namespace: 'http://www.w3.org/2000/svg',
    elementGroups: [
      {
        name: 'AnimationElements',
        children: [
          'animate',
          'animateMotion',
          'animateTransform',
          'mpath',
          'set'
        ]
      },
      {
        name: 'BasicShapes',
        children: [
          'circle',
          'ellipse',
          'line',
          'polygon',
          'polyline',
          'rect'
        ]
      },
      {
        name: 'ContainerElements',
        children: [
          'a',
          'defs',
          'g',
          'marker',
          'mask',
          'pattern',
          'svg',
          'switch',
          'symbol'
        ]
      },
      {
        name: 'DescriptiveElements',
        children: [
          'desc',
          'metadata',
          'title'
        ]
      },
      {
        name: 'FilterPrimitiveElements',
        children: [
          'feBlend',
          'feColorMatrix',
          'feComponentTransfer',
          'feComposite',
          'feConvolveMatrix',
          'feDiffuseLighting',
          'feDisplacementMap',
          'feDropShadow',
          'feFlood',
          'feFuncA',
          'feFuncB',
          'feFuncG',
          'feFuncR',
          'feGaussianBlur',
          'feImage',
          'feMerge',
          'feMergeNode',
          'feMorphology',
          'feOffset',
          'feSpecularLighting',
          'feTile',
          'feTurbulence'
        ]
      },
      {
        name: 'GradientElements',
        children: [
          'linearGradient',
          'radialGradient',
          'stop'
        ]
      },
      {
        name: 'GraphicsElements',
        children: [
          'circle',
          'ellipse',
          'image',
          'line',
          'path',
          'polygon',
          'polyline',
          'rect',
          'text',
          'use'
        ]
      },
      {
        name: 'GraphicsReferencingElements',
        children: [
          'use'
        ]
      },
      {
        name: 'LightSourceElements',
        children: [
          'feDistantLight',
          'fePointLight',
          'feSpotLight'
        ]
      },
      {
        name: 'NeverRenderedElements',
        children: [
          'clipPath',
          'defs',
          'linearGradient',
          'marker',
          'mask',
          'metadata',
          'pattern',
          'radialGradient',
          'script',
          'style',
          'symbol',
          'title'
        ]
      },
      {
        name: 'PaintServerElements',
        children: [
          'linearGradient',
          'pattern',
          'radialGradient'
        ]
      },
      {
        name: 'RenderableElements',
        children: [
          'a',
          'circle',
          'ellipse',
          'foreignObject',
          'g',
          'image',
          'line',
          'path',
          'polygon',
          'polyline',
          'rect',
          'svg',
          'switch',
          'symbol',
          'text',
          'textPath',
          'tspan',
          'use'
        ]
      },
      {
        name: 'ShapeElements',
        children: [
          'circle',
          'ellipse',
          'line',
          'path',
          'polygon',
          'polyline',
          'rect'
        ]
      },
      {
        name: 'StructuralElements',
        children: [
          'defs',
          'g',
          'svg',
          'symbol',
          'use'
        ]
      },
      {
        name: 'TextContentElements',
        children: [
          'textPath',
          'text',
          'tspan'
        ]
      },
      {
        name: 'TextContentChildElements',
        children: [
          'textPath',
          'tspan'
        ]
      },
      {
        name: 'UncategorizedElements',
        children: [
          'clipPath',
          'filter',
          'foreignObject',
          'script',
          'style',
          'view'
        ]
      }
    ],
    elements: {
      a: {
        comment: "The <a> SVG element creates a hyperlink to other web pages, files, locations in the same page, email addresses, or any other URL. It is very similar to HTML's <a> element.",
        extendsAttributes: ['SVGPresentationAttributes'],
        attributes: [
          {
            name: 'download',
            comment: 'Instructs browsers to download a URL instead of navigating to it, so the user will be prompted to save it as a local file.\n Value type: <string> ; Default value: none; Animatable: no'
          },
          {
            name: 'href',
            comment: 'The URL or URL fragment the hyperlink points to.\n Value type: <URL> ; Default value: none; Animatable: yes'
          },
          {
            name: 'hreflang',
            comment: 'The human language of the URL or URL fragment that the hyperlink points to.\n Value type: <string> ; Default value: none; Animatable: yes'
          },
          {
            name: 'ping',
            comment: 'A space-separated list of URLs to which, when the hyperlink is followed, POST requests with the body PING will be sent by the browser (in the background). Typically used for tracking. For a more widely-supported feature addressing the same use cases, see Navigator.sendBeacon().\n Value type: <list-of-URLs> ; Default value: none; Animatable: no'
          },
          {
            name: 'referrerpolicy',
            comment: 'Which referrer to send when fetching the URL.\n Value type: no-referrer|no-referrer-when-downgrade|same-origin|origin|strict-origin|origin-when-cross-origin|strict-origin-when-cross-origin|unsafe-url ; Default value: none; Animatable: no'
          },
          {
            name: 'rel',
            comment: 'The relationship of the target object to the link object.\n Value type: <list-of-Link-Types> ; Default value: none; Animatable: yes'
          },
          {
            name: 'target',
            comment: 'Where to display the linked URL.\n Value type: _self|_parent|_top|_blank|<name> ; Default value: _self; Animatable: yes'
          },
          {
            name: 'type',
            comment: 'A MIME type for the linked URL.\n Value type: <string> ; Default value: none; Animatable: yes'
          }
        ],
        permittedContent: 'AnySVGElement'
      },
      animate: {
        comment: 'The SVG <animate> element provides a way to animate an attribute of an element over time.',
        extendsAttributes: ['SVGAnimationAttributes'],
        attributes: [],
        permittedContent: 'SkruvSVGDescriptiveElementsGroup'
      },
      animateMotion: {
        comment: 'The SVG <animateMotion> element provides a way to define how an element moves along a motion path.',
        extendsAttributes: ['SVGAnimationAttributes'],
        attributes: [
          {
            name: 'keyPoints',
            comment: 'This attribute indicate, in the range [0,1], how far is the object along the path for each keyTimes associated values.\n Value type: <number>*; Default value: none; Animatable: no'
          },
          {
            name: 'path',
            comment: 'This attribute defines the path of the motion, using the same syntax as the d attribute.\n Value type: <string>; Default value: none; Animatable: no'
          },
          {
            name: 'rotate',
            comment: 'This attribute defines a rotation applied to the element animated along a path, usually to make it pointing in the direction of the animation.\n Value type: <number>|auto|auto-reverse; Default value: 0; Animatable: no'
          }
        ],
        permittedContent: 'SkruvSVGDescriptiveElementsGroup'
      },
      animateTransform: {
        comment: 'The animateTransform element animates a transformation attribute on its target element, thereby allowing animations to control translation, scaling, rotation, and/or skewing.',
        extendsAttributes: ['SVGAnimationAttributes'],
        attributes: [],
        permittedContent: 'SkruvSVGDescriptiveElementsGroup'
      },
      circle: {
        comment: 'The <circle> SVG element is an SVG basic shape, used to draw circles based on a center point and a radius.',
        extendsAttributes: ['SVGAnimationAttributes'],
        attributes: [
          {
            name: 'cx',
            comment: 'The x-axis coordinate of the center of the circle.\n Value type: <length>|<percentage> ; Default value: 0; Animatable: yes'
          },
          {
            name: 'cy',
            comment: 'The y-axis coordinate of the center of the circle.\n Value type: <length>|<percentage> ; Default value: 0; Animatable: yes'
          },
          {
            name: 'r',
            comment: 'The radius of the circle. A value lower or equal to zero disables rendering of the circle.\n Value type: <length>|<percentage> ; Default value: 0; Animatable: yes'
          },
          {
            name: 'pathLength',
            comment: "The total length for the circle's circumference, in user units.\n Value type: <number> ; Default value: none; Animatable: yes"
          }
        ],
        permittedContent: 'SkruvSVGAnimationElementsGroup | SkruvSVGDescriptiveElementsGroup'
      },
      clipPath: {
        comment: 'The <clipPath> SVG element defines a clipping path, to be used by the clip-path property.',
        extendsAttributes: ['SVGPresentationAttributes'],
        attributes: [
          {
            name: 'clipPathUnits',
            comment: 'Defines the coordinate system for the contents of the <clipPath> element.\n Value type: userSpaceOnUse|objectBoundingBox ; Default value: userSpaceOnUse; Animatable: yes'
          }
        ],
        permittedContent: 'SkruvSVGDescriptiveElementsGroup | SkruvSVGAnimationElementsGroup | SkruvTextSVGElement | SkruvUseSVGElement'
      },
      defs: {
        comment: 'The <defs> element is used to store graphical objects that will be used at a later time. Objects created inside a <defs> element are not rendered directly. To display them you have to reference them (with a <use> element for example).',
        extendsAttributes: ['SVGPresentationAttributes'],
        attributes: [],
        permittedContent: 'AnySVGElement'
      },
      desc: {
        comment: 'The <desc> element provides an accessible, long-text description of any SVG container element or graphics element.',
        attributes: [],
        permittedContent: 'AnySVGElement'
      },
      ellipse: {
        comment: 'The <ellipse> element is an SVG basic shape, used to create ellipses based on a center coordinate, and both their x and y radius.',
        extendsAttributes: ['SVGPresentationAttributes'],
        attributes: [
          {
            name: 'cx',
            comment: 'The x position of the center of the ellipse.\n Value type: <length>|<percentage> ; Default value: 0; Animatable: yes'
          },
          {
            name: 'cy',
            comment: 'The y position of the center of the ellipse.\n Value type: <length>|<percentage> ; Default value: 0; Animatable: yes'
          },
          {
            name: 'rx',
            comment: 'The radius of the ellipse on the x axis.\n Value type: auto|<length>|<percentage> ; Default value: auto; Animatable: yes'
          },
          {
            name: 'ry',
            comment: 'The radius of the ellipse on the y axis.\n Value type: auto|<length>|<percentage> ; Default value: auto; Animatable: yes'
          },
          {
            name: 'pathLength',
            comment: 'This attribute lets specify the total length for the path, in user units.\n Value type: <number> ; Default value: none; Animatable: yes'
          }
        ],
        permittedContent: 'SkruvSVGDescriptiveElementsGroup | SkruvSVGAnimationElementsGroup'
      },
      feBlend: {
        comment: 'The <feBlend> SVG filter primitive composes two objects together ruled by a certain blending mode. This is similar to what is known from image editing software when blending two layers. The mode is defined by the mode attribute.',
        extendsAttributes: ['SVGPresentationAttributes', 'SVGFilterAttributes'],
        attributes: [
          { name: 'in' },
          { name: 'in2' },
          { name: 'mode' }
        ],
        permittedContent: 'SkruvAnimateSVGElement | SkruvSetSVGElement'
      },
      feColorMatrix: {
        comment: "The <feColorMatrix> SVG filter element changes colors based on a transformation matrix. Every pixel's color value [R,G,B,A] is matrix multiplied by a 5 by 5 color matrix to create new color [R',G',B',A'].",
        extendsAttributes: ['SVGPresentationAttributes', 'SVGFilterAttributes'],
        attributes: [
          { name: 'in' },
          { name: 'type' },
          { name: 'values' }
        ],
        permittedContent: 'SkruvAnimateSVGElement | SkruvSetSVGElement'
      },
      feComponentTransfer: {
        comment: 'The <feComponentTransfer> SVG filter primitive performs color-component-wise remapping of data for each pixel. It allows operations like brightness adjustment, contrast adjustment, color balance or thresholding.',
        extendsAttributes: ['SVGPresentationAttributes', 'SVGFilterAttributes'],
        attributes: [
          { name: 'in' }
        ],
        permittedContent: 'SkruvFefuncaSVGElement | SkruvFefuncbSVGElement | SkruvFefuncgSVGElement | SkruvFefuncrSVGElement'
      },
      feComposite: {
        comment: 'The <feComposite> SVG filter primitive performs the combination of two input images pixel-wise in image space using one of the Porter-Duff compositing operations: over, in, atop, out, xor, lighter, or arithmetic.',
        extendsAttributes: ['SVGPresentationAttributes', 'SVGFilterAttributes'],
        attributes: [
          { name: 'in' },
          { name: 'in2' },
          { name: 'operator' },
          { name: 'k1' },
          { name: 'k2' },
          { name: 'k3' },
          { name: 'k4' }
        ],
        permittedContent: 'SkruvAnimateSVGElement | SkruvSetSVGElement'
      },
      feConvolveMatrix: {
        comment: 'The <feConvolveMatrix> SVG filter primitive applies a matrix convolution filter effect. A convolution combines pixels in the input image with neighboring pixels to produce a resulting image. A wide variety of imaging operations can be achieved through convolutions, including blurring, edge detection, sharpening, embossing and beveling.',
        extendsAttributes: ['SVGPresentationAttributes', 'SVGFilterAttributes'],
        attributes: [
          { name: 'in' },
          { name: 'order' },
          { name: 'kernelMatrix' },
          { name: 'divisor' },
          { name: 'bias' },
          { name: 'targetX' },
          { name: 'targetY' },
          { name: 'edgeMode' },
          { name: 'kernelUnitLength' },
          { name: 'preserveAlpha' }
        ],
        permittedContent: 'SkruvAnimateSVGElement | SkruvSetSVGElement'
      },
      feDiffuseLighting: {
        comment: 'The <feDiffuseLighting> SVG filter primitive lights an image using the alpha channel as a bump map. The resulting image, which is an RGBA opaque image, depends on the light color, light position and surface geometry of the input bump map.',
        extendsAttributes: ['SVGPresentationAttributes', 'SVGFilterAttributes'],
        attributes: [
          { name: 'in' },
          { name: 'surfaceScale' },
          { name: 'diffuseConstant' },
          { name: 'kernelUnitLength' }
        ],
        permittedContent: 'SkruvSVGLightSourceElementsGroup | SkruvSVGDescriptiveElementsGroup'
      },
      feDisplacementMap: {
        comment: 'The <feDisplacementMap> SVG filter primitive uses the pixel values from the image from in2 to spatially displace the image from in.',
        extendsAttributes: ['SVGPresentationAttributes', 'SVGFilterAttributes'],
        attributes: [
          { name: 'in' },
          { name: 'in2' },
          { name: 'scale' },
          { name: 'xChannelSelector' },
          { name: 'yChannelSelector' }
        ],
        permittedContent: 'SkruvAnimateSVGElement | SkruvSetSVGElement'
      },
      feDistantLight: {
        comment: 'The <feDistantLight> filter primitive defines a distant light source that can be used within a lighting filter primitive: <feDiffuseLighting> or <feSpecularLighting>.',
        extendsAttributes: ['SVGPresentationAttributes', 'SVGFilterAttributes'],
        attributes: [
          { name: 'azimuth' },
          { name: 'elevation' }
        ],
        permittedContent: 'SkruvAnimateSVGElement | SkruvSetSVGElement'
      },
      feDropShadow: {
        comment: 'The SVG <feDropShadow> filter primitive creates a drop shadow of the input image. It can only be used inside a <filter> element.',
        extendsAttributes: ['SVGPresentationAttributes', 'SVGFilterAttributes'],
        attributes: [
          {
            name: 'dx',
            comment: 'This attribute defines the x offset of the drop shadow.\n Value type: <number>; Default value: 2; Animatable: yes'
          },
          {
            name: 'dy',
            comment: 'This attribute defines the y offset of the drop shadow.\n Value type: <number>; Default value: 2; Animatable: yes'
          },
          {
            name: 'stdDeviation',
            comment: 'This attribute defines the standard deviation for the blur operation in the drop shadow.\n Value type: <number>; Default value: 2; Animatable: yes'
          }
        ],
        permittedContent: 'SkruvAnimateSVGElement | SkruvSetSVGElement | SkruvScriptSVGElement'
      },
      feFlood: {
        comment: 'The <feFlood> SVG filter primitive fills the filter subregion with the color and opacity defined by flood-color and flood-opacity.',
        extendsAttributes: ['SVGPresentationAttributes', 'SVGFilterAttributes'],
        attributes: [
          { name: 'flood-color' },
          { name: 'flood-opacity' }

        ],
        permittedContent: 'SkruvAnimateSVGElement | SkruvSetSVGElement'
      },
      feFuncA: {
        comment: 'The <feFuncA> SVG filter primitive defines the transfer function for the alpha component of the input graphic of its parent <feComponentTransfer> element.',
        extendsAttributes: ['SVGPresentationAttributes', 'SVGFilterAttributes'],
        attributes: [],
        permittedContent: 'SkruvAnimateSVGElement | SkruvSetSVGElement'
      },
      feFuncB: {
        comment: 'The <feFuncB> SVG filter primitive defines the transfer function for the blue component of the input graphic of its parent <feComponentTransfer> element.',
        extendsAttributes: ['SVGPresentationAttributes', 'SVGFilterAttributes'],
        attributes: [],
        permittedContent: 'SkruvAnimateSVGElement | SkruvSetSVGElement'
      },
      feFuncG: {
        comment: 'The <feFuncG> SVG filter primitive defines the transfer function for the green component of the input graphic of its parent <feComponentTransfer> element.',
        extendsAttributes: ['SVGPresentationAttributes', 'SVGFilterAttributes'],
        attributes: [],
        permittedContent: 'SkruvAnimateSVGElement | SkruvSetSVGElement'
      },
      feFuncR: {
        comment: 'The <feFuncR> SVG filter primitive defines the transfer function for the red component of the input graphic of its parent <feComponentTransfer> element.',
        extendsAttributes: ['SVGPresentationAttributes', 'SVGFilterAttributes'],
        attributes: [],
        permittedContent: 'SkruvAnimateSVGElement | SkruvSetSVGElement'
      },
      feGaussianBlur: {
        comment: 'The <feGaussianBlur> SVG filter primitive blurs the input image by the amount specified in stdDeviation, which defines the bell-curve.',
        extendsAttributes: ['SVGPresentationAttributes', 'SVGFilterAttributes'],
        attributes: [
          { name: 'in' },
          { name: 'stdDeviation' },
          { name: 'edgeMode' }
        ],
        permittedContent: 'SkruvAnimateSVGElement | SkruvSetSVGElement'
      },
      feImage: {
        comment: 'The <feImage> SVG filter primitive fetches image data from an external source and provides the pixel data as output (meaning if the external source is an SVG image, it is rasterized.)',
        extendsAttributes: ['SVGPresentationAttributes', 'SVGFilterAttributes'],
        attributes: [
          { name: 'crossorigin' },
          { name: 'preserveAspectRatio' }

        ],
        permittedContent: 'SkruvAnimateSVGElement | SkruvSetSVGElement | SkruvAnimatetransformSVGElement'
      },
      feMerge: {
        comment: 'The <feMerge> SVG element allows filter effects to be applied concurrently instead of sequentially. This is achieved by other filters storing their output via the result attribute and then accessing it in a <feMergeNode> child.',
        extendsAttributes: ['SVGPresentationAttributes', 'SVGFilterAttributes'],
        attributes: [],
        permittedContent: 'SkruvFemergenodeSVGElement'
      },
      feMergeNode: {
        comment: 'The feMergeNode takes the result of another filter to be processed by its parent <feMerge>.',
        extendsAttributes: ['SVGPresentationAttributes', 'SVGFilterAttributes'],
        attributes: [
          { name: 'in' }
        ],
        permittedContent: 'SkruvAnimateSVGElement | SkruvSetSVGElement'
      },
      feMorphology: {
        comment: 'The <feMorphology> SVG filter primitive is used to erode or dilate the input image. Its usefulness lies especially in fattening or thinning effects.',
        extendsAttributes: ['SVGPresentationAttributes', 'SVGFilterAttributes'],
        attributes: [
          { name: 'in' },
          { name: 'operator' },
          { name: 'radius' }
        ],
        permittedContent: 'SkruvAnimateSVGElement | SkruvSetSVGElement'
      },
      feOffset: {
        comment: 'The <feOffset> SVG filter primitive allows to offset the input image. The input image as a whole is offset by the values specified in the dx and dy attributes.',
        extendsAttributes: ['SVGPresentationAttributes', 'SVGFilterAttributes'],
        attributes: [
          { name: 'in' },
          { name: 'dx' },
          { name: 'dy' }
        ],
        permittedContent: 'SkruvAnimateSVGElement | SkruvSetSVGElement'
      },
      fePointLight: {
        comment: 'The <fePointLight> filter primitive defines a light source which allows to create a point light effect. It that can be used within a lighting filter primitive: <feDiffuseLighting> or <feSpecularLighting>.',
        extendsAttributes: ['SVGPresentationAttributes', 'SVGFilterAttributes'],
        attributes: [
          { name: 'x' },
          { name: 'y' },
          { name: 'z' }
        ],
        permittedContent: 'SkruvAnimateSVGElement | SkruvSetSVGElement'
      },
      feSpecularLighting: {
        comment: 'The <feSpecularLighting> SVG filter primitive lights a source graphic using the alpha channel as a bump map. The resulting image is an RGBA image based on the light color. The lighting calculation follows the standard specular component of the Phong lighting model. The resulting image depends on the light color, light position and surface geometry of the input bump map. The result of the lighting calculation is added. The filter primitive assumes that the viewer is at infinity in the z direction.',
        extendsAttributes: ['SVGPresentationAttributes', 'SVGFilterAttributes'],
        attributes: [
          { name: 'in' },
          { name: 'surfaceScale' },
          { name: 'specularConstant' },
          { name: 'specularExponent' },
          { name: 'kernelUnitLength' }
        ],
        permittedContent: 'SkruvSVGLightSourceElementsGroup | SkruvSVGDescriptiveElementsGroup'
      },
      feSpotLight: {
        comment: 'The <feSpotLight> SVG filter primitive defines a light source that can be used to create a spotlight effect.\n It is used within a lighting filter primitive: <feDiffuseLighting> or <feSpecularLighting>.',
        extendsAttributes: ['SVGPresentationAttributes', 'SVGFilterAttributes'],
        attributes: [
          { name: 'x' },
          { name: 'y' },
          { name: 'z' },
          { name: 'pointsAtX' },
          { name: 'pointsAtY' },
          { name: 'pointsAtZ' },
          { name: 'specularExponent' },
          { name: 'limitingConeAngle' }
        ],
        permittedContent: 'SkruvAnimateSVGElement | SkruvSetSVGElement'
      },
      feTile: {
        comment: 'The <feTile> SVG filter primitive allows to fill a target rectangle with a repeated, tiled pattern of an input image. The effect is similar to the one of a <pattern>.',
        extendsAttributes: ['SVGPresentationAttributes', 'SVGFilterAttributes'],
        attributes: [
          { name: 'in' }
        ],
        permittedContent: 'SkruvAnimateSVGElement | SkruvSetSVGElement'
      },
      feTurbulence: {
        comment: 'The <feTurbulence> SVG filter primitive creates an image using the Perlin turbulence function. It allows the synthesis of artificial textures like clouds or marble. The resulting image will fill the entire filter primitive subregion.',
        extendsAttributes: ['SVGPresentationAttributes', 'SVGFilterAttributes'],
        attributes: [
          { name: 'baseFrequency' },
          { name: 'numOctaves' },
          { name: 'seed' },
          { name: 'stitchTiles' },
          { name: 'type' }
        ],
        permittedContent: 'SkruvAnimateSVGElement | SkruvSetSVGElement'
      },
      filter: {
        comment: 'The <filter> SVG element defines a custom filter effect by grouping atomic filter primitives. It is never rendered itself, but must be used by the filter attribute on SVG elements, or the filter CSS property for SVG/HTML elements.',
        extendsAttributes: ['SVGPresentationAttributes'],
        attributes: [
          { name: 'x' },
          { name: 'y' },
          { name: 'width' },
          { name: 'height' },
          { name: 'filterUnits' },
          { name: 'primitiveUnits' }
        ],
        permittedContent: 'SkruvSVGDescriptiveElementsGroup | SkruvSVGFilterPrimitiveElementsGroup | SkruvAnimateSVGElement | SkruvSetSVGElement'
      },
      foreignObject: {
        comment: 'The <foreignObject> SVG element includes elements from a different XML namespace. In the context of a browser, it is most likely (X)HTML.',
        extendsAttributes: ['SVGPresentationAttributes'],
        attributes: [
          {
            name: 'height',
            comment: 'The height of the foreignObject.\n Value type: <length>|<percentage> ; Default value: auto; Animatable: yes'
          },
          {
            name: 'width',
            comment: 'The width of the foreignObject.\n Value type: <length>|<percentage> ; Default value: auto; Animatable: yes'
          },
          {
            name: 'x',
            comment: 'The x coordinate of the foreignObject.\n Value type: <length>|<percentage> ; Default value: 0; Animatable: yes'
          },
          {
            name: 'y',
            comment: 'The y coordinate of the foreignObject.\n Value type: <length>|<percentage> ; Default value: 0; Animatable: yes'
          }
        ],
        permittedContent: 'AnyContent'
      },
      g: {
        comment: 'The <g> SVG element is a container used to group other SVG elements.',
        extendsAttributes: ['SVGPresentationAttributes'],
        attributes: [],
        permittedContent: 'AnySVGContent'
      },
      image: {
        comment: 'The <image> SVG element includes images inside SVG documents. It can display raster image files or other SVG files.',
        attributes: [],
        extendsAttributes: ['SVGPresentationAttributes'],
        permittedContent: 'SkruvSVGDescriptiveElementsGroup | SkruvSVGAnimationElementsGroup'
      },
      line: {
        comment: 'The <line> element is an SVG basic shape used to create a line connecting two points.',
        extendsAttributes: ['SVGPresentationAttributes'],
        attributes: [
          {
            name: 'x1',
            comment: 'Defines the x-axis coordinate of the line starting point.\n Value type: <length>|<percentage>|<number> ; Default value: 0; Animatable: yes'
          },
          {
            name: 'x2',
            comment: 'Defines the x-axis coordinate of the line ending point.\n Value type: <length>|<percentage>|<number> ; Default value: 0; Animatable: yes'
          },
          {
            name: 'y1',
            comment: 'Defines the y-axis coordinate of the line starting point.\n Value type: <length>|<percentage>|<number> ; Default value: 0; Animatable: yes'
          },
          {
            name: 'y2',
            comment: 'Defines the y-axis coordinate of the line ending point.\n Value type: <length>|<percentage>|<number> ; Default value: 0; Animatable: yes'
          },
          {
            name: 'pathLength',
            comment: 'Defines the total path length in user units.\n Value type: <number> ; Default value: none; Animatable: yes'
          }
        ],
        permittedContent: 'SkruvSVGDescriptiveElementsGroup | SkruvSVGAnimationElementsGroup'
      },
      linearGradient: {
        comment: 'The <linearGradient> element lets authors define linear gradients to apply to other SVG elements.',
        extendsAttributes: ['SVGPresentationAttributes'],
        attributes: [
          {
            name: 'gradientUnits',
            comment: 'This attribute defines the coordinate system for attributes x1, x2, y1, y2\n Value type: userSpaceOnUse|objectBoundingBox ; Default value: objectBoundingBox; Animatable: yes'
          },
          {
            name: 'gradientTransform',
            comment: 'This attribute provides additional transformation to the gradient coordinate system.\n Value type: <transform-list> ; Default value: identity transform; Animatable: yes'
          },
          {
            name: 'href',
            comment: 'This attribute defines a reference to another <linearGradient> element that will be used as a template.\n Value type: <URL> ; Default value: none; Animatable: yes'
          },
          {
            name: 'spreadMethod',
            comment: 'This attribute indicates how the gradient behaves if it starts or ends inside the bounds of the shape containing the gradient.\n Value type: pad|reflect|repeat ; Default value: pad; Animatable: yes'
          },
          {
            name: 'x1',
            comment: 'This attribute defines the x coordinate of the starting point of the vector gradient along which the linear gradient is drawn.\n Value type: <length-percentage> | <number>; Default value: 0%; Animatable: yes'
          },
          {
            name: 'x2',
            comment: 'This attribute defines the x coordinate of the ending point of the vector gradient along which the linear gradient is drawn.\n Value type: <length-percentage> | <number>; Default value: 100%; Animatable: yes'
          },
          {
            name: 'y1',
            comment: 'This attribute defines the y coordinate of the starting point of the vector gradient along which the linear gradient is drawn.\n Value type: <length-percentage> | <number>; Default value: 0%; Animatable: yes'
          },
          {
            name: 'y2',
            comment: 'This attribute defines the y coordinate of the ending point of the vector gradient along which the linear gradient is drawn.\n Value type: <length-percentage> | <number>; Default value: 0%; Animatable: yes'
          }
        ],
        permittedContent: 'SkruvSVGDescriptiveElementsGroup | SkruvAnimateSVGElement | SkruvAnimatetransformSVGElement | SkruvSetSVGElement | SkruvStopSVGElement'
      },
      marker: {
        comment: 'The <marker> element defines a graphic used for drawing arrowheads or polymarkers on a given <path>, <line>, <polyline> or <polygon> element.',
        extendsAttributes: ['SVGPresentationAttributes'],
        attributes: [
          {
            name: 'markerHeight',
            comment: 'This attribute defines the height of the marker viewport.\n Value type: <length> ; Default value: 3; Animatable: yes'
          },
          {
            name: 'markerUnits',
            comment: 'This attribute defines the coordinate system for the attributes markerWidth, markerHeight and the contents of the <marker>.\n Value type: userSpaceOnUse|strokeWidth ; Default value: strokeWidth; Animatable: yes'
          },
          {
            name: 'markerWidth',
            comment: 'This attribute defines the width of the marker viewport.\n Value type: <length> ; Default value: 3; Animatable: yes'
          },
          {
            name: 'orient',
            comment: 'This attribute defines the orientation of the marker relative to the shape it is attached to.\n Value type: auto|auto-start-reverse|<angle> ; Default value: 0; Animatable: yes'
          },
          {
            name: 'preserveAspectRatio',
            comment: 'This attribute defines how the svg fragment must be deformed if it is embedded in a container with a different aspect ratio.\n Value type: (none| xMinYMin| xMidYMin| xMaxYMin| xMinYMid| xMidYMid| xMaxYMid| xMinYMax| xMidYMax| xMaxYMax) (meet|slice)? ; Default value: xMidYMid meet; Animatable: yes'
          },
          {
            name: 'refX',
            comment: 'This attribute defines the x coordinate for the reference point of the marker.\n Value type: left|center|right|<coordinate> ; Default value: 0; Animatable: yes'
          },
          {
            name: 'refY',
            comment: 'This attribute defines the y coordinate for the reference point of the marker.\n Value type: top|center|bottom|<coordinate> ; Default value: 0; Animatable: yes'
          },
          {
            name: 'viewBox',
            comment: 'This attribute defines the bound of the SVG viewport for the current SVG fragment.\n Value type: <list-of-numbers> ; Default value: none; Animatable: yes'
          }
        ],
        permittedContent: 'AnySVGElement'
      },
      mask: {
        comment: 'The <mask> element defines an alpha mask for compositing the current object into the background. A mask is used/referenced using the mask property.',
        extendsAttributes: ['SVGPresentationAttributes'],
        attributes: [
          {
            name: 'height',
            comment: 'This attribute defines the height of the masking area.\n Value type: <length> ; Default value: 120%; Animatable: yes'
          },
          {
            name: 'maskContentUnits',
            comment: 'This attribute defines the coordinate system for the contents of the <mask>.\n Value type: userSpaceOnUse|objectBoundingBox ; Default value: userSpaceOnUse; Animatable: yes'
          },
          {
            name: 'maskUnits',
            comment: 'This attribute defines the coordinate system for attributes x, y, width and height on the <mask>.\n Value type: userSpaceOnUse|objectBoundingBox ; Default value: objectBoundingBox; Animatable: yes'
          },
          {
            name: 'x',
            comment: 'This attribute defines the x-axis coordinate of the top-left corner of the masking area.\n Value type: <coordinate> ; Default value: -10%; Animatable: yes'
          },
          {
            name: 'y',
            comment: 'This attribute defines the y-axis coordinate of the top-left corner of the masking area.\n Value type: <coordinate> ; Default value: -10%; Animatable: yes'
          },
          {
            name: 'width',
            comment: 'This attribute defines the width of the masking area.\n Value type: <length> ; Default value: 120%; Animatable: yes'
          }
        ],
        permittedContent: 'AnySVGElement'
      },
      metadata: {
        comment: 'The <metadata> SVG element adds metadata to SVG content. Metadata is structured information about data. The contents of <metadata> should be elements from other XML namespaces such as RDF, FOAF, etc.',
        attributes: [],
        permittedContent: 'AnyElement'
      },
      mpath: {
        comment: 'The <mpath> sub-element for the <animateMotion> element provides the ability to reference an external <path> element as the definition of a motion path.',
        attributes: [],
        permittedContent: 'SkruvSVGDescriptiveElementsGroup'
      },
      path: {
        comment: 'The <path> SVG element is the generic element to define a shape. All the basic shapes can be created with a path element.',
        extendsAttributes: ['SVGPresentationAttributes'],
        attributes: [
          {
            name: 'd',
            comment: "This attribute defines the shape of the path.\n Value type: <string> ; Default value: ''; Animatable: yes"
          },
          {
            name: 'pathLength',
            comment: 'This attribute lets authors specify the total length for the path, in user units.\n Value type: <number> ; Default value: none; Animatable: yes'
          }
        ],
        permittedContent: 'SkruvSVGDescriptiveElementsGroup | SkruvSVGAnimationElementsGroup'
      },
      pattern: {
        comment: 'The <pattern> element defines a graphics object which can be redrawn at repeated x- and y-coordinate intervals ("tiled") to cover an area.',
        extendsAttributes: ['SVGPresentationAttributes'],
        attributes: [
          {
            name: 'height',
            comment: 'This attribute determines the height of the pattern tile.\n Value type: <length>|<percentage>; Default value: 0; Animatable: yes'
          },
          {
            name: 'href',
            comment: 'This attribute reference a template pattern that provides default values for the <pattern> attributes.\n Value type: <URL>; Default value: none; Animatable: yes'
          },
          {
            name: 'patternContentUnits',
            comment: 'This attribute defines the coordinate system for the contents of the <pattern>.\n Value type: userSpaceOnUse|objectBoundingBox; Default value: userSpaceOnUse; Animatable: yes\n \n \n Note: This attribute has no effect if a viewBox attribute is specified on the <pattern> element.'
          },
          {
            name: 'patternTransform',
            comment: 'This attribute contains the definition of an optional additional transformation from the pattern coordinate system onto the target coordinate system.\n Value type: <transform-list>; Default value: none; Animatable: yes'
          },
          {
            name: 'patternUnits',
            comment: 'This attribute defines the coordinate system for attributes x, y, width, and height.\n Value type: userSpaceOnUse|objectBoundingBox; Default value: objectBoundingBox; Animatable: yes'
          },
          {
            name: 'preserveAspectRatio',
            comment: 'This attribute defines how the SVG fragment must be deformed if it is embedded in a container with a different aspect ratio.\n Value type: (none| xMinYMin| xMidYMin| xMaxYMin| xMinYMid| xMidYMid| xMaxYMid| xMinYMax| xMidYMax| xMaxYMax) (meet|slice)? ; Default value: xMidYMid meet; Animatable: yes'
          },
          {
            name: 'viewBox',
            comment: 'This attribute defines the bound of the SVG viewport for the pattern fragment.\n Value type: <list-of-numbers> ; Default value: none; Animatable: yes'
          },
          {
            name: 'width',
            comment: 'This attribute determines the width of the pattern tile.\n Value type: <length>|<percentage> ; Default value: 0; Animatable: yes'
          },
          {
            name: 'x',
            comment: 'This attribute determines the x coordinate shift of the pattern tile.\n Value type: <length>|<percentage> ; Default value: 0; Animatable: yes'
          },
          {
            name: 'y',
            comment: 'This attribute determines the y coordinate shift of the pattern tile.\n Value type: <length>|<percentage> ; Default value: 0; Animatable: yes'
          }
        ],
        permittedContent: 'AnySVGElement'
      },
      polygon: {
        comment: 'The <polygon> element defines a closed shape consisting of a set of connected straight line segments. The last point is connected to the first point.',
        extendsAttributes: ['SVGPresentationAttributes'],
        attributes: [
          {
            name: 'points',
            comment: 'This attribute defines the list of points (pairs of x,y absolute coordinates) required to draw the polygon.\n Value type: <number>+ ; Default value: ""; Animatable: yes'
          },
          {
            name: 'pathLength',
            comment: 'This attribute lets specify the total length for the path, in user units.\n Value type: <number> ; Default value: none; Animatable: yes'
          }
        ],
        permittedContent: 'SkruvSVGDescriptiveElementsGroup | SkruvSVGAnimationElementsGroup'
      },
      polyline: {
        comment: "The <polyline> SVG element is an SVG basic shape that creates straight lines connecting several points. Typically a polyline is used to create open shapes as the last point doesn't have to be connected to the first point. For closed shapes see the <polygon> element.",
        extendsAttributes: ['SVGPresentationAttributes'],
        attributes: [
          {
            name: 'points',
            comment: 'This attribute defines the list of points (pairs of x,y absolute coordinates) required to draw the polyline\n Value type: <number>+ ; Default value: ""; Animatable: yes'
          },
          {
            name: 'pathLength',
            comment: 'This attribute lets specify the total length for the path, in user units.\n Value type: <number> ; Default value: none; Animatable: yes'
          }
        ],
        permittedContent: 'SkruvSVGDescriptiveElementsGroup | SkruvSVGAnimationElementsGroup'
      },
      radialGradient: {
        comment: 'The <radialGradient> element lets authors define radial gradients that can be applied to fill or stroke of graphical elements.',
        extendsAttributes: ['SVGPresentationAttributes'],
        attributes: [
          {
            name: 'cx',
            comment: 'This attribute defines the x coordinate of the end circle of the radial gradient.\n Value type: <length> ; Default value: 50%; Animatable: yes'
          },
          {
            name: 'cy',
            comment: 'This attribute defines the y coordinate of the end circle of the radial gradient.\n Value type: <length> ; Default value: 50%; Animatable: yes'
          },
          {
            name: 'fr',
            comment: 'This attribute defines the radius of the start circle of the radial gradient. The gradient will be drawn such that the 0% <stop> is mapped to the perimeter of the start circle.\n Value type: <length> ; Default value: 0%; Animatable: yes'
          },
          {
            name: 'fx',
            comment: 'This attribute defines the x coordinate of the start circle of the radial gradient.\n Value type: <length> ; Default value: Same as cx; Animatable: yes'
          },
          {
            name: 'fy',
            comment: 'This attribute defines the y coordinate of the start circle of the radial gradient.\n Value type: <length> ; Default value: Same as cy; Animatable: yes'
          },
          {
            name: 'gradientUnits',
            comment: 'This attribute defines the coordinate system for attributes cx, cy, r, fx, fy, fr\n Value type: userSpaceOnUse|objectBoundingBox ; Default value: objectBoundingBox; Animatable: yes'
          },
          {
            name: 'gradientTransform',
            comment: 'This attribute provides additional transformation to the gradient coordinate system.\n Value type: <transform-list> ; Default value: identity transform; Animatable: yes'
          },
          {
            name: 'href',
            comment: 'This attribute defines a reference to another <radialGradient> element that will be used as a template.\n Value type: <URL> ; Default value: none; Animatable: yes'
          },
          {
            name: 'r',
            comment: 'This attribute defines the radius of the end circle of the radial gradient. The gradient will be drawn such that the 100% <stop> is mapped to the perimeter of the end circle.\n Value type: <length> ; Default value: 50%; Animatable: yes'
          },
          {
            name: 'spreadMethod',
            comment: 'This attribute indicates how the gradient behaves if it starts or ends inside the bounds of the shape containing the gradient.\n Value type: pad|reflect|repeat ; Default value: pad; Animatable: yes'
          }
        ],
        permittedContent: 'SkruvSVGDescriptiveElementsGroup | SkruvAnimateSVGElement | SkruvAnimatetransformSVGElement | SkruvSetSVGElement | SkruvStopSVGElement'
      },
      rect: {
        comment: 'The <rect> element is a basic SVG shape that draws rectangles, defined by their position, width, and height. The rectangles may have their corners rounded.',
        extendsAttributes: ['SVGPresentationAttributes'],
        attributes: [
          {
            name: 'x',
            comment: 'The x coordinate of the rect.\n Value type: <length>|<percentage> ; Default value: 0; Animatable: yes'
          },
          {
            name: 'y',
            comment: 'The y coordinate of the rect.\n Value type: <length>|<percentage> ; Default value: 0; Animatable: yes'
          },
          {
            name: 'width',
            comment: 'The width of the rect.\n Value type: auto|<length>|<percentage> ; Default value: auto; Animatable: yes'
          },
          {
            name: 'height',
            comment: 'The height of the rect.\n Value type: auto|<length>|<percentage> ; Default value: auto; Animatable: yes'
          },
          {
            name: 'rx',
            comment: 'The horizontal corner radius of the rect. Defaults to ry if it is specified.\n Value type: auto|<length>|<percentage> ; Default value: auto; Animatable: yes'
          },
          {
            name: 'ry',
            comment: 'The vertical corner radius of the rect. Defaults to rx if it is specified.\n Value type: auto|<length>|<percentage> ; Default value: auto; Animatable: yes'
          },
          {
            name: 'pathLength',
            comment: "The total length of the rectangle's perimeter, in user units.\n Value type: <number> ; Default value: none; Animatable: yes"
          }
        ],
        permittedContent: 'SkruvSVGDescriptiveElementsGroup | SkruvSVGAnimationElementsGroup'
      },
      script: {
        comment: 'The SVG script element allows to add scripts to an SVG document.',
        attributes: [
          {
            name: 'crossorigin',
            comment: 'This attribute defines CORS settings as define for the HTML <script> element.\n Value type: <string>; Default value: ?; Animatable: yes'
          },
          {
            name: 'href',
            comment: 'The URL to the script to load.\n Value type: <URL> ; Default value: none; Animatable: no'
          },
          {
            name: 'type',
            comment: 'This attribute defines type of the script language to use.\n Value type: <string>; Default value: application/ecmascript; Animatable: no'
          }
        ],
        permittedContent: 'string'
      },
      set: {
        comment: 'The SVG <set> element provides a simple means of just setting the value of an attribute for a specified duration.',
        extendsAttributes: ['SVGAnimationAttributes'],
        attributes: [
          {
            name: 'to',
            comment: 'This attribute defines the value to be applied to the target attribute for the duration of the animation. The value must match the requirements of the target attribute.\n Value type: <anything>; Default value: none; Animatable: no'
          }
        ],
        permittedContent: 'SkruvSVGDescriptiveElementsGroup'
      },
      stop: {
        comment: 'The SVG <stop> element defines a color and its position to use on a gradient. This element is always a child of a <linearGradient> or <radialGradient> element.',
        extendsAttributes: ['SVGPresentationAttributes'],
        attributes: [
          {
            name: 'offset',
            comment: 'This attribute defines where the gradient stop is placed along the gradient vector.\n Value type: <number>|<percentage>; Default value: 0; Animatable: yes'
          },
          {
            name: 'stop-color',
            comment: 'This attribute defines the color of the gradient stop. It can be used as a CSS property.\n Value type: currentcolor|<color>|<icccolor>; Default value: black; Animatable: yes'
          },
          {
            name: 'stop-opacity',
            comment: 'This attribute defines the opacity of the gradient stop. It can be used as a CSS property.\n Value type: <opacity>; Default value: 1; Animatable: yes'
          }
        ],
        permittedContent: 'SkruvAnimateSVGElement | SkruvSetSVGElement'
      },
      style: {
        comment: 'The SVG <style> element allows style sheets to be embedded directly within SVG content.',
        attributes: [
          {
            name: 'type',
            comment: 'This attribute defines type of the style sheet language to use as a media type string.\n Value type: <string>; Default value: text/css; Animatable: no'
          },
          {
            name: 'media',
            comment: 'This attribute defines to which media the style applies.\n Value type: <string>; Default value: all; Animatable: no'
          },
          {
            name: 'title',
            comment: 'This attribute the title of the style sheet which can be used to switch between alternate style sheets.\n Value type: <string>; Default value: none; Animatable: no'
          }
        ],
        permittedContent: 'string'
      },
      svg: {
        comment: 'The svg element is a container that defines a new coordinate system and viewport. It is used as the outermost element of SVG documents, but it can also be used to embed an SVG fragment inside an SVG or HTML document.',
        extendsAttributes: ['SVGPresentationAttributes'],
        attributes: [
          {
            name: 'baseProfile',
            comment: 'The minimum SVG language profile that the document requires.\n Value type: <string> ; Default value: none; Animatable: no'
          },
          {
            name: 'contentScriptType',
            comment: 'The default scripting language used by the SVG fragment.\n Value type: <string> ; Default value: application/ecmascript; Animatable: no'
          },
          {
            name: 'contentStyleType',
            comment: 'The default style sheet language used by the SVG fragment.\n Value type: <string> ; Default value: text/css; Animatable: no'
          },
          {
            name: 'height',
            comment: 'The displayed height of the rectangular viewport. (Not the height of its coordinate system.)\n Value type: <length>|<percentage> ; Default value: auto; Animatable: yes'
          },
          {
            name: 'preserveAspectRatio',
            comment: 'How the svg fragment must be deformed if it is displayed with a different aspect ratio.\n Value type: (none| xMinYMin| xMidYMin| xMaxYMin| xMinYMid| xMidYMid| xMaxYMid| xMinYMax| xMidYMax| xMaxYMax) (meet|slice)? ; Default value: xMidYMid meet; Animatable: yes'
          },
          {
            name: 'version',
            comment: 'Which version of SVG is used for the inner content of the element.\n Value type: <number> ; Default value: none; Animatable: no'
          },
          {
            name: 'viewBox',
            comment: 'The SVG viewport coordinates for the current SVG fragment.\n Value type: <list-of-numbers> ; Default value: none; Animatable: yes'
          },
          {
            name: 'width',
            comment: 'The displayed width of the rectangular viewport. (Not the width of its coordinate system.)\n Value type: <length>|<percentage> ; Default value: auto; Animatable: yes'
          },
          {
            name: 'x',
            comment: 'The displayed x coordinate of the svg container. No effect on outermost svg elements.\n Value type: <length>|<percentage> ; Default value: 0; Animatable: yes'
          },
          {
            name: 'y',
            comment: 'The displayed y coordinate of the svg container. No effect on outermost svg elements.\n Value type: <length>|<percentage> ; Default value: 0; Animatable: yes'
          }
        ],
        permittedContent: 'AnySVGElement'
      },
      switch: {
        comment: 'The <switch> SVG element evaluates any requiredFeatures, requiredExtensions and systemLanguage attributes on its direct child elements in order, and then renders the first child where these attributes evaluate to true.',
        extendsAttributes: ['SVGPresentationAttributes'],
        attributes: [],
        permittedContent: 'AnySVGElement'
      },
      symbol: {
        comment: 'The <symbol> element is used to define graphical template objects which can be instantiated by a <use> element.',
        extendsAttributes: ['SVGPresentationAttributes'],
        attributes: [
          {
            name: 'height',
            comment: 'This attribute determines the height of the symbol.\n Value type: <length>|<percentage> ; Default value: auto; Animatable: yes'
          },
          {
            name: 'preserveAspectRatio',
            comment: 'This attribute defines how the svg fragment must be deformed if it is embedded in a container with a different aspect ratio.\n Value type: (none| xMinYMin| xMidYMin| xMaxYMin| xMinYMid| xMidYMid| xMaxYMid| xMinYMax| xMidYMax| xMaxYMax) (meet|slice)? ; Default value: xMidYMid meet; Animatable: yes'
          },
          {
            name: 'refX',
            comment: 'This attribute determines the x coordinate of the reference point of the symbol.\n Value type: <length>|<percentage>|left|center|right ; Default value: None; Animatable: yes'
          },
          {
            name: 'refY',
            comment: 'This attribute determines the y coordinate of the reference point of the symbol.\n Value type: <length>|<percentage>|top|center|bottom ; Default value: None; Animatable: yes'
          },
          {
            name: 'viewBox',
            comment: 'This attribute defines the bound of the SVG viewport for the current symbol.\n Value type: <list-of-numbers> ; Default value: none; Animatable: yes'
          },
          {
            name: 'width',
            comment: 'This attribute determines the width of the symbol.\n Value type: <length>|<percentage> ; Default value: auto; Animatable: yes'
          },
          {
            name: 'x',
            comment: 'This attribute determines the x coordinate of the symbol.\n Value type: <length>|<percentage> ; Default value: 0; Animatable: yes'
          },
          {
            name: 'y',
            comment: 'This attribute determines the y coordinate of the symbol.\n Value type: <length>|<percentage> ; Default value: 0; Animatable: yes'
          }
        ],
        permittedContent: 'AnySVGElement'
      },
      text: {
        comment: "The SVG <text> element draws a graphics element consisting of text. It's possible to apply a gradient, pattern, clipping path, mask, or filter to <text>, like any other SVG graphics element.",
        extendsAttributes: ['SVGPresentationAttributes'],
        attributes: [
          {
            name: 'x',
            comment: 'The x coordinate of the starting point of the text baseline.\n Value type: <length>|<percentage> ; Default value: 0; Animatable: yes'
          },
          {
            name: 'y',
            comment: 'The y coordinate of the starting point of the text baseline.\n Value type: <length>|<percentage> ; Default value: 0; Animatable: yes'
          },
          {
            name: 'dx',
            comment: 'Shifts the text position horizontally from a previous text element.\n Value type: <length>|<percentage> ; Default value: none; Animatable: yes'
          },
          {
            name: 'dy',
            comment: 'Shifts the text position vertically from a previous text element.\n Value type: <length>|<percentage> ; Default value: none; Animatable: yes'
          },
          {
            name: 'rotate',
            comment: 'Rotates orientation of each individual glyph. Can rotate glyphs individually.\n Value type: <list-of-number> ; Default value: none; Animatable: yes'
          },
          {
            name: 'lengthAdjust',
            comment: 'How the text is stretched or compressed to fit the width defined by the textLength attribute.\n Value type: spacing|spacingAndGlyphs; Default value: spacing; Animatable: yes'
          },
          {
            name: 'textLength',
            comment: 'A width that the text should be scaled to fit.\n Value type: <length>|<percentage> ; Default value: none; Animatable: yes'
          }
        ],
        permittedContent: 'AnySVGElement'
      },
      textPath: {
        comment: 'To render text along the shape of a <path>, enclose the text in a <textPath> element that has an href attribute with a reference to the <path> element.',
        extendsAttributes: ['SVGPresentationAttributes'],
        attributes: [
          {
            name: 'href',
            comment: 'The URL to the path or basic shape on which to render the text. If the path attribute is set, href has no effect.\n Value type: <URL> ; Default value: none; Animatable: yes'
          },
          {
            name: 'lengthAdjust',
            comment: 'Where length adjustment should be applied to the text: the space between glyphs, or both the space and the glyphs themselves.\n Value type: spacing|spacingAndGlyphs; Default value: spacing; Animatable: yes'
          },
          {
            name: 'method',
            comment: 'Which method to render individual glyphs along the path.\n Value type: align|stretch ; Default value: align; Animatable: yes'
          },
          {
            name: 'path',
            comment: 'The path on which the text should be rendered.\n Value type: <path_data> ; Default value: none; Animatable: yes'
          },
          {
            name: 'side',
            comment: 'Which side of the path the text should be rendered.\n Value type: left|right ; Default value: left; Animatable: yes'
          },
          {
            name: 'spacing',
            comment: 'How space between glyphs should be handled.\n Value type: auto|exact ; Default value: exact; Animatable: yes'
          },
          {
            name: 'startOffset',
            comment: 'How far the beginning of the text should be offset from the beginning of the path.\n Value type: <length>|<percentage>|<number> ; Default value: 0; Animatable: yes'
          },
          {
            name: 'textLength',
            comment: 'The width of the space into which the text will render.\n Value type: <length>|<percentage>|<number> ; Default value: auto; Animatable: yes'
          }
        ],
        permittedContent: 'AnySVGElement'
      },
      title: {
        comment: 'The <title> element provides an accessible, short-text description of any SVG container element or graphics element.',
        attributes: [],
        permittedContent: 'AnySVGElement'
      },
      tspan: {
        comment: 'The SVG <tspan> element defines a subtext within a <text> element or another <tspan> element. It allows for adjustment of the style and/or position of that subtext as needed.',
        extendsAttributes: ['SVGPresentationAttributes'],
        attributes: [
          {
            name: 'x',
            comment: 'The x coordinate of the starting point of the text baseline.\n Value type: <length>|<percentage> ; Default value: none; Animatable: yes'
          },
          {
            name: 'y',
            comment: 'The y coordinate of the starting point of the text baseline.\n Value type: <length>|<percentage> ; Default value: none; Animatable: yes'
          },
          {
            name: 'dx',
            comment: 'Shifts the text position horizontally from a previous text element.\n Value type: <length>|<percentage> ; Default value: none; Animatable: yes'
          },
          {
            name: 'dy',
            comment: 'Shifts the text position vertically from a previous text element.\n Value type: <length>|<percentage> ; Default value: none; Animatable: yes'
          },
          {
            name: 'rotate',
            comment: 'Rotates orientation of each individual glyph. Can rotate glyphs individually.\n Value type: <list-of-number> ; Default value: none; Animatable: yes'
          },
          {
            name: 'lengthAdjust',
            comment: 'How the text is stretched or compressed to fit the width defined by the textLength attribute.\n Value type: spacing|spacingAndGlyphs; Default value: spacing; Animatable: yes'
          },
          {
            name: 'textLength',
            comment: 'A width that the text should be scaled to fit.\n Value type: <length>|<percentage> ; Default value: none; Animatable: yes'
          }
        ],
        permittedContent: 'SkruvSVGDescriptiveElementsGroup | SkruvASVGElement | SkruvAnimateSVGElement | SkruvSetSVGElement | SkruvTspanSVGElement'
      },
      use: {
        comment: 'The <use> element takes nodes from within the SVG document, and duplicates them somewhere else.\n The effect is the same as if the nodes were deeply cloned into a non-exposed DOM, then pasted where the use element is, much like cloned template elements.',
        extendsAttributes: ['SVGPresentationAttributes'],
        attributes: [
          {
            name: 'href',
            comment: 'The URL to an element/fragment that needs to be duplicated.Value type: <URL> ; Default value: none; Animatable: yes'
          },
          {
            name: 'x',
            comment: 'The x coordinate of an additional final offset transformation applied to the <use> element.Value type: <coordinate> ; Default value: 0; Animatable: yes'
          },
          {
            name: 'y',
            comment: 'The y coordinate of an additional final offset transformation applied to the <use> element.Value type: <coordinate> ; Default value: 0; Animatable: yes'
          },
          {
            name: 'width',
            comment: 'The width of the use element.Value type: <length> ; Default value: 0; Animatable: yes'
          },
          {
            name: 'height',
            comment: 'The height of the use element.Value type: <length> ; Default value: 0; Animatable: yes'
          }
        ],
        permittedContent: 'SkruvSVGDescriptiveElementsGroup | SkruvSVGAnimationElementsGroup'
      },
      view: {
        comment: 'A view is a defined way to view the image, like a zoom level or a detail view.',
        attributes: [
          { name: 'viewBox' },
          { name: 'preserveAspectRatio' }
        ],
        permittedContent: 'AnySVGElement'
      }
    }
  },
  MathML: {
    namespace: 'http://www.w3.org/1998/Math/MathML',
    elements: {
      math: {
        comment: 'The <math> MathML element is the top-level MathML element, used to write a single mathematical formula. It can be placed in HTML content where flow content is permitted.',
        attributes: [
          {
            name: 'display',
            comment: 'This enumerated attribute specifies how the enclosed MathML markup should be rendered. It can have one of the following values:\n \n block, which means that this element will be displayed in its own block outside the current span of text and with math-style set to normal.\n inline, which means that this element will be displayed inside the current span of text and with math-style set to compact.\n \n If not present, its default value is inline.'
          }
        ],
        permittedContent: 'AnyMathMLElement'
      },
      semantics: {
        comment: 'The <semantics> MathML element associates annotations with a MathML expression, for example its text source as a lightweight markup language or mathematical meaning expressed in a special XML dialect. Typically, its structure is:',
        attributes: [
          {
            name: 'encoding',
            comment: 'The encoding of the semantic information in the annotation (e.g. "MathML-Content", "MathML-Presentation", "application/openmath+xml", "image/png")'
          },
          {
            name: 'src',
            comment: 'The location of an external source for semantic information.'
          }
        ],
        permittedContent: 'AnyMathMLElement'
      },
      menclose: {
        comment: 'Non-standard: This feature is non-standard and is not on a standards track. Do not use it on production sites facing the Web: it will not work for every user. There may also be large incompatibilities between implementations and the behavior may change in the future.',
        attributes: [
          {
            name: 'notation',
            comment: 'A list of notations, separated by white space, to apply to the child elements. The symbols are each drawn as if the others are not present, and therefore may overlap.'
          }
        ],
        permittedContent: 'AnyMathMLElement'
      },
      merror: {
        comment: 'The <merror> MathML element is used to display contents as error messages. The intent of this element is to provide a standard way for programs that generate MathML from other input to report syntax errors.',
        attributes: [],
        permittedContent: 'AnyMathMLElement'
      },
      mfrac: {
        comment: 'The <mfrac> MathML element is used to display fractions. It can also be used\n to mark up fraction-like objects such as\n binomial coefficients\n and Legendre symbols.',
        attributes: [
          {
            name: 'denomalign',
            comment: 'The alignment of the denominator under the fraction. Possible values are: left, center (default), and right.'
          },
          {
            name: 'linethickness',
            comment: 'A <length-percentage> indicating the thickness of the horizontal fraction line.'
          },
          {
            name: 'numalign',
            comment: 'The alignment of the numerator over the fraction. Possible values are: left, center (default), and right.'
          }
        ],
        permittedContent: 'AnyMathMLElement'
      },
      mi: {
        comment: 'The <mi> MathML element indicates that the content should be rendered as an identifier such as function names, variables or symbolic constants. You can also have arbitrary text in it to mark up terms.',
        attributes: [],
        permittedContent: 'string'
      },
      mmultiscripts: {
        comment: 'The <mmultiscripts> MathML element is used to attach an arbitrary number of subscripts and superscripts to an expression at once, generalizing the <msubsup> element. Scripts can be either prescripts (placed before the expression) or postscripts (placed after it).',
        attributes: [
          {
            name: 'subscriptshift',
            comment: 'A <length-percentage> indicating the minimum amount to shift the baseline of the subscript down.'
          },
          {
            name: 'superscriptshift',
            comment: 'A <length-percentage> indicating the minimum amount to shift the baseline of the superscript up.'
          }
        ],
        permittedContent: 'AnyMathMLElement'
      },
      mn: {
        comment: 'The <mn> MathML element represents a numeric literal which is normally a sequence of digits with a possible separator (a dot or a comma). However, it is also allowed to have arbitrary text in it which is actually a numeric quantity, for example "eleven".',
        attributes: [],
        permittedContent: 'number'
      },
      mo: {
        comment: 'The <mo> MathML element represents an operator in a broad sense. Besides operators in strict mathematical meaning, this element also includes "operators" like parentheses, separators like comma and semicolon, or "absolute value" bars.',
        attributes: [
          {
            name: 'accent',
            comment: 'A <boolean> indicating whether the operator should be treated as an accent when used as an under- or overscript (i.e. drawn bigger and closer to the base expression).'
          },
          {
            name: 'fence',
            comment: 'A <boolean> indicating whether the operator is a fence (such as parentheses). There is no visual effect for this attribute.'
          },
          {
            name: 'largeop',
            comment: 'A <boolean> indicating whether the operator should be drawn bigger when math-style is set to normal.'
          },
          {
            name: 'lspace',
            comment: 'A <length-percentage> indicating the amount of space before the operator.'
          },
          {
            name: 'maxsize',
            comment: 'A <length-percentage> indicating the maximum size of the operator when it is stretchy.'
          },
          {
            name: 'minsize',
            comment: 'A <length-percentage> indicating the minimum size of the operator when it is stretchy.'
          },
          {
            name: 'movablelimits',
            comment: 'A <boolean> indicating whether attached under- and overscripts move to sub- and superscript positions when math-style is set to compact.'
          },
          {
            name: 'rspace',
            comment: 'A <length-percentage> indicating the amount of space after the operator.'
          },
          {
            name: 'separator',
            comment: 'A <boolean> indicating whether the operator is a separator (such as commas). There is no visual effect for this attribute.'
          },
          {
            name: 'stretchy',
            comment: 'A <boolean> indicating whether the operator stretches to the size of the adjacent element.'
          },
          {
            name: 'symmetric',
            comment: 'A <boolean> indicating whether a stretchy operator should be vertically symmetric around the imaginary math axis (centered fraction line).'
          }
        ],
        permittedContent: 'string'
      },
      mover: {
        comment: 'The <mover> MathML element is used to attach an accent or a limit over an expression. Use the following syntax: <mover> base overscript </mover>',
        attributes: [
          {
            name: 'accent',
            comment: 'A <boolean> indicating whether the over script should be treated as an accent (i.e. drawn bigger and closer to the base expression).'
          }
        ],
        permittedContent: 'AnyMathMLElement'
      },
      mpadded: {
        comment: 'The <mpadded> MathML element is used to add extra padding and to set the general adjustment of position and size of enclosed contents.',
        attributes: [
          {
            name: 'depth',
            comment: 'A <length-percentage> indicating the desired depth (below the baseline) of the <mpadded> element.'
          },
          {
            name: 'height',
            comment: 'A <length-percentage> indicating the desired height (above the baseline) of the <mpadded> element.'
          },
          {
            name: 'lspace',
            comment: 'A <length-percentage> indicating the horizontal location of the positioning point of the child content with respect to the positioning point of the <mpadded> element.'
          },
          {
            name: 'voffset',
            comment: 'A <length-percentage> indicating the vertical location of the positioning point of the child content with respect to the positioning point of the <mpadded> element.'
          },
          {
            name: 'width',
            comment: 'A <length-percentage> indicating the desired depth (below the baseline) of the <mpadded> element.'
          }
        ],
        permittedContent: 'AnyMathMLElement'
      },
      mphantom: {
        comment: 'The <mphantom> MathML element is rendered invisibly, but dimensions (such as height, width, and baseline position) are still kept.',
        attributes: [],
        permittedContent: 'AnyMathMLElement'
      },
      mroot: {
        comment: 'The <mroot> MathML element is used to display roots with an explicit index. Two arguments are accepted, which leads to the syntax: <mroot> base index </mroot>.',
        attributes: [],
        permittedContent: 'AnyMathMLElement'
      },
      mrow: {
        comment: 'The <mrow> MathML element is used to group sub-expressions, which usually contain one or more operators with their respective operands (such as <mi> and <mn>). This element renders as a horizontal row containing its arguments.',
        attributes: [],
        permittedContent: 'AnyMathMLElement'
      },
      ms: {
        comment: 'The <ms> MathML element represents a string literal meant to be interpreted by programming languages and computer algebra systems.',
        attributes: [
          {
            name: 'lquote',
            comment: 'The opening quote to enclose the content. The default value is &quot;.'
          },
          {
            name: 'rquote',
            comment: 'The closing quote to enclose the content. The default value is &quot;.'
          }
        ],
        permittedContent: 'string'
      },
      mspace: {
        comment: 'The <mspace> MathML element is used to display a blank space, whose size is set by its attributes.',
        attributes: [
          {
            name: 'depth',
            comment: 'A <length-percentage> indicating the desired depth (below the baseline) of the space.'
          },
          {
            name: 'height',
            comment: 'A <length-percentage> indicating the desired height (above the baseline) of the space.'
          },
          {
            name: 'width',
            comment: 'A <length-percentage> indicating the desired width of the space.'
          }
        ],
        permittedContent: 'void'
      },
      msqrt: {
        comment: 'The <msqrt> MathML element is used to display square roots (no index is displayed). The square root accepts only one argument, which leads to the following syntax: <msqrt> base </msqrt>.',
        attributes: [],
        permittedContent: 'AnyMathMLElement'
      },
      mstyle: {
        comment: 'The <mstyle> MathML element is used to change the style of its children.',
        attributes: [
          {
            name: 'scriptminsize',
            comment: 'Specifies a minimum font size allowed due to changes in scriptlevel. The default value is 8pt.'
          },
          {
            name: 'scriptsizemultiplier',
            comment: 'Specifies the multiplier to be used to adjust font size due to changes in scriptlevel. The default value is 0.71.'
          }
        ],
        permittedContent: 'AnyMathMLElement'
      },
      msub: {
        comment: 'The <msub> MathML element is used to attach a subscript to an expression.',
        attributes: [
          {
            name: 'subscriptshift',
            comment: 'A <length-percentage> indicating the minimum amount to shift the baseline of the subscript down.'
          }
        ],
        permittedContent: 'AnyMathMLElement'
      },
      msup: {
        comment: 'The <msup> MathML element is used to attach a superscript to an expression.',
        attributes: [
          {
            name: 'superscriptshift',
            comment: 'A <length-percentage> indicating the minimum amount to shift the baseline of the superscript up.'
          }
        ],
        permittedContent: 'AnyMathMLElement'
      },
      msubsup: {
        comment: 'The <msubsup> MathML element is used to attach both a subscript and a superscript, together, to an expression.',
        attributes: [
          {
            name: 'subscriptshift',
            comment: 'A <length-percentage> indicating the minimum amount to shift the baseline of the subscript down.'
          },
          {
            name: 'superscriptshift',
            comment: 'A <length-percentage> indicating the minimum amount to shift the baseline of the superscript up.'
          }
        ],
        permittedContent: 'AnyMathMLElement'
      },
      mtable: {
        comment: 'The <mtable> MathML element allows you to create tables or matrices. Its children are <mtr> elements (representing rows), each of them having <mtd> elements as its children (representing cells). These elements are similar to <table>, <tr> and <td> elements of HTML.',
        attributes: [
          {
            name: 'align',
            comment: "Specifies the vertical alignment of the table with respect to its environment.\n Possible values are:\n \n \n axis (default): The vertical center of the table aligns on the environment's axis (typically the minus sign).\n baseline: The vertical center of the table aligns on the environment's baseline.\n bottom: The bottom of the table aligns on the environments baseline.\n center: See baseline.\n top: The top of the table aligns on the environments baseline.\n \n In addition, values of the align attribute can end with a rownumber (e.g. align=\"center 3\"). This allows you to align the specified row of the table rather than the whole table. A negative Integer value counts rows from the bottom of the table."
          },
          {
            name: 'columnalign',
            comment: 'Specifies the horizontal alignment of the cells. Multiple values separated by space are allowed and apply to the corresponding columns (e.g. columnalign="left right center"). Possible values are: left, center (default) and right.'
          },
          {
            name: 'columnlines',
            comment: 'Specifies column borders. Multiple values separated by space are allowed and apply to the corresponding columns (e.g. columnlines="none none solid"). Possible values are: none (default), solid and dashed.'
          },
          {
            name: 'columnspacing',
            comment: 'Specifies the space between table columns. Multiple values separated by space are allowed and apply to the corresponding columns (e.g. columnspacing="1em 2em"). Possible values are <length-percentage>.'
          },
          {
            name: 'frame',
            comment: 'Specifies borders of the entire table. Possible values are: none (default), solid and dashed.'
          },
          {
            name: 'framespacing',
            comment: 'Specifies additional space added between the table and frame. The first value specifies the spacing on the right and left; the second value specifies the spacing above and below. Possible values are <length-percentage>.'
          },
          {
            name: 'rowalign',
            comment: 'Specifies the vertical alignment of the cells. Multiple values separated by space are allowed and apply to the corresponding rows (e.g. rowalign="top bottom axis"). Possible values are: axis, baseline (default), bottom, center and top.'
          },
          {
            name: 'rowlines',
            comment: 'Specifies row borders. Multiple values separated by space are allowed and apply to the corresponding rows (e.g. rowlines="none none solid"). Possible values are: none (default), solid and dashed.'
          },
          {
            name: 'rowspacing',
            comment: 'Specifies the space between table rows. Multiple values separated by space are allowed and apply to the corresponding rows (e.g. rowspacing="1em 2em"). Possible values are <length-percentage>.'
          },
          {
            name: 'width',
            comment: 'A <length-percentage> indicating the width of the entire table.'
          }
        ],
        permittedContent: 'SkruvMtrMathMLElement'
      },
      mtd: {
        comment: 'The <mtd> MathML element represents a cell in a table or a matrix. It may only appear in a <mtr> element. This element is similar to the <td> element of HTML.',
        attributes: [
          {
            name: 'columnspan',
            comment: 'A non-negative integer value that indicates on how many columns does the cell extend.'
          },
          {
            name: 'rowspan',
            comment: 'A non-negative integer value that indicates on how many rows does the cell extend.'
          },
          {
            name: 'columnalign',
            comment: 'Specifies the horizontal alignment of this cell and overrides values specified by <mtable> or <mtr>.\n Possible values are: left, center and right.'
          },
          {
            name: 'rowalign',
            comment: 'Specifies the vertical alignment of this cell and overrides values specified by <mtable> or <mtr>.\n Possible values are: axis, baseline, bottom, center and top.'
          }
        ],
        permittedContent: 'AnyMathMLElement'
      },
      mtext: {
        comment: 'The <mtext> MathML element is used to render arbitrary text with no notational meaning, such as comments or annotations.',
        attributes: [],
        permittedContent: 'string'
      },
      mtr: {
        comment: 'The <mtr> MathML element represents a row in a table or a matrix. It may only appear in a <mtable> element and its children are <mtd> elements representing cells. This element is similar to the <tr> element of HTML.',
        attributes: [
          {
            name: 'columnalign',
            comment: 'Overrides the horizontal alignment of cells specified by <mtable> for this row. Multiple values separated by space are allowed and apply to the corresponding columns (e.g. columnalign="left center right"). Possible values are: left, center and right.'
          },
          {
            name: 'rowalign',
            comment: 'Overrides the vertical alignment of cells specified by <mtable> for this row. Possible values are: axis, baseline, bottom, center and top.'
          }
        ],
        permittedContent: 'SkruvMtdMathMLElement'
      },
      munder: {
        comment: 'The <munder> MathML element is used to attach an accent or a limit under an expression. It uses the following syntax: <munder> base underscript </munder>',
        attributes: [
          {
            name: 'accentunder',
            comment: 'A <boolean> indicating whether the under script should be treated as an accent (i.e. drawn bigger and closer to the base expression).'
          }
        ],
        permittedContent: 'AnyMathMLElement'
      },
      munderover: {
        comment: 'The <munderover> MathML element is used to attach accents or limits both under and over an expression.',
        attributes: [
          {
            name: 'accent',
            comment: 'A <boolean> indicating whether the over script should be treated as an accent (i.e. drawn bigger and closer to the base expression).'
          },
          {
            name: 'accentunder',
            comment: 'A <boolean> indicating whether the under script should be treated as an accent (i.e. drawn bigger and closer to the base expression).'
          }
        ],
        permittedContent: 'AnyMathMLElement'
      }
    }
  },
  Atom: {
    namespace: 'http://www.w3.org/2005/Atom',
    elements: {
      feed: {
        comment: '',
        permittedContent: 'SkruvIdAtomElement | SkruvTitleAtomElement | SkruvUpdatedAtomElement | SkruvAuthorAtomElement | SkruvLinkAtomElement | SkruvCategoryAtomElement | SkruvContributorAtomElement | SkruvGeneratorAtomElement | SkruvIconAtomElement | SkruvLogoAtomElement | SkruvRightsAtomElement | SkruvSubtitleAtomElement | SkruvEntryAtomElement',
        attributes: []
      },
      entry: {
        comment: '',
        permittedContent: 'SkruvAuthorAtomElement | SkruvContentAtomElement | SkruvLinkAtomElement | SkruvSummaryAtomElement | SkruvCategoryAtomElement | SkruvContributorAtomElement | SkruvGeneratorAtomElement | SkruvIconAtomElement | SkruvPublishedAtomElement | SkruvRightsAtomElement | SkruvSourceAtomElement | SkruvTitleAtomElement',
        attributes: []
      },
      id: { comment: '', permittedContent: 'string', attributes: [] },
      title: { comment: '', permittedContent: 'string', attributes: [{ name: 'type' }] },
      updated: { comment: '', permittedContent: 'string', attributes: [] },
      author: {
        comment: '',
        permittedContent: 'SkruvNameAtomElement | SkruvUriAtomElement | SkruvEmailAtomElement',
        attributes: []
      },
      name: { comment: '', permittedContent: 'string', attributes: [] },
      uri: { comment: '', permittedContent: 'string', attributes: [] },
      email: { comment: '', permittedContent: 'string', attributes: [] },
      link: {
        comment: '',
        permittedContent: 'void',
        attributes: [
          { name: 'href' },
          { name: 'rel' },
          { name: 'type' },
          { name: 'hreflang' },
          { name: 'title' },
          { name: 'length' }
        ]
      },
      category: {
        comment: '',
        permittedContent: 'void',
        attributes: [
          { name: 'term' },
          { name: 'scheme' },
          { name: 'label' }
        ]
      },
      contributor: {
        comment: '',
        permittedContent: 'SkruvNameAtomElement | SkruvUriAtomElement | SkruvEmailAtomElement',
        attributes: []
      },
      generator: {
        comment: '',
        permittedContent: 'string',
        attributes: [
          { name: 'uri' },
          { name: 'version' }
        ]
      },
      icon: { comment: '', permittedContent: 'string', attributes: [] },
      logo: { comment: '', permittedContent: 'string', attributes: [] },
      rights: { comment: '', permittedContent: 'string', attributes: [{ name: 'type' }] },
      subtitle: { comment: '', permittedContent: 'string', attributes: [] },
      content: {
        comment: '',
        permittedContent: 'string',
        attributes: [
          { name: 'type' },
          { name: 'src' }
        ]
      },
      summary: { comment: '', permittedContent: 'string', attributes: [{ name: 'type' }] },
      published: { comment: '', permittedContent: 'string', attributes: [] },
      source: { comment: '', permittedContent: 'AnyMathMLContent', attributes: [] }
    }
  },
  Sitemap: {
    namespace: 'http://www.sitemaps.org/schemas/sitemap/0.9',
    elements: {
      urlset: {
        comment: '',
        permittedContent: 'SkruvUrlSitemapElement',
        attributes: []
      },
      url: {
        comment: '',
        permittedContent: 'SkruvLocSitemapElement | SkruvLastmodSitemapElement | SkruvChangefreqSitemapElement | SkruvPrioritySitemapElement',
        attributes: []
      },
      loc: {
        comment: '',
        permittedContent: 'string',
        attributes: []
      },
      lastmod: {
        comment: '',
        permittedContent: 'string',
        attributes: []
      },
      changefreq: {
        comment: '',
        permittedContent: 'string',
        attributes: []
      },
      priority: {
        comment: '',
        permittedContent: 'string',
        attributes: []
      },
      sitemapindex: {
        comment: '',
        permittedContent: 'SkruvSitemapSitemapElement',
        attributes: []
      },
      sitemap: {
        comment: '',
        permittedContent: 'SkruvLocSitemapElement | SkruvLastmodSitemapElement',
        attributes: []
      }
    }
  }
}

const types = {
  long: 'number',
  title: 'string',
  dir: 'string',
  designMode: 'string',
  lang: 'string',
  translate: 'boolean',
  or: 'boolean',
  inert: 'boolean',
  accessKey: 'string',
  draggable: 'boolean',
  spellcheck: 'boolean',
  autocapitalize: 'string',
  popover: 'string',
  autofocus: 'boolean',
  tabIndex: 'number',
  text: 'string',
  href: 'string',
  target: 'string',
  crossOrigin: 'string',
  rel: 'string',
  as: 'string',
  media: 'string',
  integrity: 'string',
  hreflang: 'string',
  uri: 'string',
  type: 'string',
  imageSrcset: 'string',
  imageSizes: 'string',
  referrerPolicy: 'string',
  disabled: 'boolean',
  fetchPriority: 'string',
  name: 'string',
  httpEquiv: 'string',
  content: 'string',
  cite: 'string',
  reversed: 'boolean',
  start: 'number',
  value: 'number | string',
  download: 'string',
  ping: 'string',
  dateTime: 'string',
  protocol: 'string',
  username: 'string',
  password: 'string',
  host: 'string',
  hostname: 'string',
  port: 'string',
  pathname: 'string',
  search: 'string',
  hash: 'string',
  src: 'string',
  srcset: 'string',
  sizes: 'string',
  alt: 'string',
  useMap: 'string',
  isMap: 'boolean',
  decoding: 'string',
  loading: 'string',
  srcdoc: 'string',
  allow: 'string',
  allowFullscreen: 'boolean',
  width: ' number | string',
  height: 'string',
  data: 'string',
  poster: 'string',
  playsInline: 'boolean',
  kind: 'string',
  srclang: 'string',
  label: 'string',
  default: 'boolean',
  preload: 'string',
  autoplay: 'boolean',
  loop: 'number | boolean',
  controls: 'boolean',
  defaultMuted: 'boolean',
  coords: 'string',
  shape: 'string',
  headers: 'string',
  scope: 'string',
  abbr: 'string',
  acceptCharset: 'string',
  action: 'string',
  autocomplete: 'string',
  enctype: 'string',
  encoding: 'string',
  method: 'string',
  noValidate: 'boolean',
  htmlFor: 'string',
  accept: 'string',
  defaultChecked: 'boolean',
  dirName: 'string',
  formAction: 'string',
  formEnctype: 'string',
  formMethod: 'string',
  formNoValidate: 'boolean',
  formTarget: 'string',
  max: 'number | string',
  maxLength: 'number',
  min: 'number |  string',
  minLength: 'number',
  multiple: 'boolean',
  pattern: 'string',
  placeholder: 'string',
  readOnly: 'boolean',
  required: 'boolean',
  step: 'string',
  defaultValue: 'string',
  defaultSelected: 'boolean',
  wrap: 'string',
  low: 'number',
  high: 'number',
  optimum: 'number',
  open: 'boolean',
  noModule: 'boolean',
  async: 'boolean',
  defer: 'boolean',
  contentEditable: 'string',
  enterKeyHint: 'string',
  inputMode: 'string',
  popoverTargetAction: 'string',
  behavior: 'string',
  bgColor: 'string',
  direction: 'string',
  trueSpeed: 'boolean',
  cols: 'string',
  rows: 'string',
  scrolling: 'string',
  frameBorder: 'string',
  longDesc: 'string',
  noResize: 'boolean',
  charset: 'string',
  rev: 'string',
  noHref: 'boolean',
  background: 'string',
  clear: 'string',
  align: 'string',
  ch: 'string',
  chOff: 'string',
  vAlign: 'string',
  compact: 'boolean',
  face: 'string',
  size: 'string',
  color: 'string',
  noShade: 'boolean',
  version: 'string',
  lowsrc: 'string',
  scheme: 'string',
  archive: 'string',
  code: 'string',
  declare: 'boolean',
  standby: 'string',
  codeBase: 'string',
  codeType: 'string',
  valueType: 'string',
  event: 'string',
  border: 'string',
  frame: 'string',
  rules: 'string',
  summary: 'string',
  axis: 'string',
  noWrap: 'boolean',
  blocking: "'render'",
  imagesrcset: 'string',
  ismap: 'boolean',
  sandbox: "'allow-downloads' | 'allow-forms' | 'allow-modals' | 'allow-orientation-lock' | 'allow-pointer-lock' | 'allow-popups' | 'allow-popups-to-escape-sandbox' | 'allow-presentation' | 'allow-same-origin' | 'allow-scripts' | 'allow-top-navigation' | 'allow-top-navigation-by-user-activation' | 'allow-top-navigation-to-custom-protocols'",
  form: 'string',
  muted: 'boolean',
  span: 'number',
  colspan: 'number',
  rowspan: 'number',
  checked: 'boolean',
  dirname: 'string',
  formenctype: 'string',
  list: 'string',
  popovertarget: 'string',
  popovertargetaction: "'toggle' | 'show' | 'hide'",
  selected: 'boolean',
  crossorigin: 'string',
  referrerpolicy: 'string',
  imagesizes: 'string',
  fetchpriority: 'string',
  'http-equiv': 'string',
  datetime: 'string',
  usemap: 'string',
  allowfullscreen: 'boolean',
  playsinline: 'boolean',
  'accept-charset': 'string',
  novalidate: 'boolean',
  for: 'string',
  formaction: 'string',
  formmethod: 'string',
  formnovalidate: 'boolean',
  formtarget: 'string',
  maxlength: 'number',
  minlength: 'number',
  readonly: 'boolean',
  nomodule: 'boolean',

  manifest: 'string | number | boolean',
  xmlns: 'string | number | boolean',
  profile: 'string | number | boolean',
  nonce: 'string | number | boolean',
  prefetch: 'string | number | boolean',
  nowrap: 'string | number | boolean',
  noshade: 'string | number | boolean',
  controlslist: 'string | number | boolean',
  disableremoteplayback: 'string | number | boolean',
  elementtiming: 'string | number | boolean',
  disablepictureinpicture: 'string | number | boolean',
  credentialless: 'string | number | boolean',
  csp: 'string | number | boolean',
  classid: 'string | number | boolean',
  codebase: 'string | number | boolean',
  codetype: 'string | number | boolean',
  capture: 'string | number | boolean',
  autocorrect: 'string | number | boolean',

  keyPoints: 'string | number | boolean',
  path: 'string | number | boolean',
  rotate: 'string | number | boolean',
  cx: 'string | number | boolean',
  cy: 'string | number | boolean',
  r: 'string | number | boolean',
  pathLength: 'string | number | boolean',
  clipPathUnits: 'string | number | boolean',
  rx: 'string | number | boolean',
  ry: 'string | number | boolean',
  in: 'string | number | boolean',
  in2: 'string | number | boolean',
  mode: 'string | number | boolean',
  values: 'string | number | boolean',
  operator: 'string | number | boolean',
  k1: 'string | number | boolean',
  k2: 'string | number | boolean',
  k3: 'string | number | boolean',
  k4: 'string | number | boolean',
  order: 'string | number | boolean',
  kernelMatrix: 'string | number | boolean',
  divisor: 'string | number | boolean',
  bias: 'string | number | boolean',
  targetX: 'string | number | boolean',
  targetY: 'string | number | boolean',
  edgeMode: 'string | number | boolean',
  kernelUnitLength: 'string | number | boolean',
  preserveAlpha: 'string | number | boolean',
  surfaceScale: 'string | number | boolean',
  diffuseConstant: 'string | number | boolean',
  scale: 'string | number | boolean',
  xChannelSelector: 'string | number | boolean',
  yChannelSelector: 'string | number | boolean',
  azimuth: 'string | number | boolean',
  elevation: 'string | number | boolean',
  dx: 'string | number | boolean',
  dy: 'string | number | boolean',
  stdDeviation: 'string | number | boolean',
  'flood-color': 'string | number | boolean',
  'flood-opacity': 'string | number | boolean',
  preserveAspectRatio: 'string | number | boolean',
  radius: 'string | number | boolean',
  d: 'string | number | boolean',
  x: 'string | number | boolean',
  y: 'string | number | boolean',
  z: 'string | number | boolean',
  specularConstant: 'string | number | boolean',
  specularExponent: 'string | number | boolean',
  pointsAtX: 'string | number | boolean',
  pointsAtY: 'string | number | boolean',
  pointsAtZ: 'string | number | boolean',
  limitingConeAngle: 'string | number | boolean',
  baseFrequency: 'string | number | boolean',
  numOctaves: 'string | number | boolean',
  seed: 'string | number | boolean',
  stitchTiles: 'string | number | boolean',
  x1: 'string | number | boolean',
  x2: 'string | number | boolean',
  y1: 'string | number | boolean',
  y2: 'string | number | boolean',
  gradientUnits: 'string | number | boolean',
  gradientTransform: 'string | number | boolean',
  spreadMethod: 'string | number | boolean',
  markerHeight: 'string | number | boolean',
  markerUnits: 'string | number | boolean',
  markerWidth: 'string | number | boolean',
  orient: 'string | number | boolean',
  refX: 'string | number | boolean',
  refY: 'string | number | boolean',
  viewBox: 'string | number | boolean',
  maskContentUnits: 'string | number | boolean',
  maskUnits: 'string | number | boolean',
  patternContentUnits: 'string | number | boolean',
  patternTransform: 'string | number | boolean',
  patternUnits: 'string | number | boolean',
  points: 'string | number | boolean',
  fr: 'string | number | boolean',
  fx: 'string | number | boolean',
  fy: 'string | number | boolean',
  to: 'string | number | boolean',
  offset: 'string | number | boolean',
  'stop-color': 'string | number | boolean',
  'stop-opacity': 'string | number | boolean',
  baseProfile: 'string | number | boolean',
  contentScriptType: 'string | number | boolean',
  contentStyleType: 'string | number | boolean',
  lengthAdjust: 'string | number | boolean',
  side: 'string | number | boolean',
  spacing: 'string | number | boolean',
  startOffset: 'string | number | boolean',
  textLength: 'string | number | boolean',
  filterUnits: 'string | number | boolean',
  primitiveUnits: 'string | number | boolean',

  display: 'string | number | boolean',
  notation: 'string | number | boolean',
  denomalign: 'string | number | boolean',
  linethickness: 'string | number | boolean',
  numalign: 'string | number | boolean',
  subscriptshift: 'string | number | boolean',
  superscriptshift: 'string | number | boolean',
  accent: 'string | number | boolean',
  fence: 'string | number | boolean',
  largeop: 'string | number | boolean',
  lspace: 'string | number | boolean',
  maxsize: 'string | number | boolean',
  minsize: 'string | number | boolean',
  movablelimits: 'string | number | boolean',
  rspace: 'string | number | boolean',
  separator: 'string | number | boolean',
  stretchy: 'string | number | boolean',
  symmetric: 'string | number | boolean',
  depth: 'string | number | boolean',
  voffset: 'string | number | boolean',
  lquote: 'string | number | boolean',
  rquote: 'string | number | boolean',
  scriptminsize: 'string | number | boolean',
  scriptsizemultiplier: 'string | number | boolean',
  columnalign: 'string | number | boolean',
  columnlines: 'string | number | boolean',
  columnspacing: 'string | number | boolean',
  columnspan: 'string | number | boolean',
  framespacing: 'string | number | boolean',
  rowalign: 'string | number | boolean',
  rowlines: 'string | number | boolean',
  rowspacing: 'string | number | boolean',
  accentunder: 'string | number | boolean',

  length: 'string | number | boolean',
  term: 'string | number | boolean'

}

// @ts-ignore
const camelize = s => s.replace(/-./g, x => x[1].toUpperCase())

// @ts-ignore
const toElementName = e => camelize(e.charAt(0).toUpperCase() + e.substr(1).toLowerCase())

const interfaces = Object.entries(elements).map(([k, v]) => {
  const ns = v.namespace
  return Object.entries(v.elements).map(([c, e]) => `
${e.comment ? '/** ' + e.comment.split(/\n/).map(e => e.trim())
      .join('\n * \n * ') + ' */' : ''}
export interface Skruv${toElementName(c)}${k}Element extends ${k}Vnode<'${c}', ${document.createElementNS(ns, c).constructor.name}, AsyncContent<{${e.attributes.map(e => `
${
        // @ts-ignore
        e?.comment ? `/**
 * ` +
          // @ts-ignore
          e.comment.split(/\n/).map(e => e.trim())
            .join('\n * \n * ') + `
 */` : ''}
'${
        // @ts-ignore
        e.name}'?: ${types[e.name] || 'UNKNOWN'} | false`).join('')}
} ${
  // @ts-ignore
  e.extendsAttributes ? ' & ' + e.extendsAttributes.join(' & ') + '>' : '>'}, ${e.permittedContent === 'void' ? e.permittedContent : `AsyncContent<${e.permittedContent} | string | number | boolean>`}> {}`)
    .join('\n') + `

${
  // @ts-ignore
  !v.elementGroups ? '' : v.elementGroups.map(e => `type Skruv${k}${e.name}Group = ${e.children.map(c => `Skruv${toElementName(c)}${k}Element`).join(' | ')}`).join('\n\n')}

export type Any${k}Element = ${Object.entries(v.elements).map(([c, e]) => `Skruv${toElementName(c)}${k}Element`)
      .join(' | ')} | SkruvCommentElement | SkruvRawElement | SkruvMetaElement
export type Any${k}Content = Any${k}Element | string | number | boolean | Any${k}Content[] | AsyncGenerator<Any${k}Content> | Promise<Any${k}Content> | (() => Any${k}Content)

`
})
  .join('\n') + `

export type AsyncContent<T> = T | T[] | AsyncGenerator<T> | Promise<T> | (() => AsyncGenerator<T>) | (() => T)

export interface SkruvMathHTMLElement extends SkruvMathMathMLElement {}
export interface SkruvSvgHTMLElement extends SkruvSvgSVGElement {}

export interface SkruvCommentElement extends HTMLVnode<'#comment', Element, {}, AnyHTMLContent> {}
export interface SkruvRawElement extends HTMLVnode<'#raw', Element, {}, AnyHTMLContent> {}
export interface SkruvMetaElement extends HTMLVnode<'#meta', Element, {}, AnyHTMLContent> {}

export type AnyElement = ${Object.keys(elements).map(k => `Any${k}Element`)
    .join(' | ')} | SkruvCommentElement | SkruvRawElement | SkruvMetaElement
export type AnyContent = ${Object.keys(elements).map(k => `Any${k}Content`)
    .join(' | ')}
export type ElementMap = {
  ${
  // @ts-ignore
  Object.entries(elements).map(([k, v]) => Object.entries(v.elements)
    .map(([c, e]) => `${e.comment ? `/**
 * ` + e.comment.split(/\n/).map(e => e.trim())
        .join('\n * \n * ') + `
 */` : ''}
  '${['title', 'script', 'style', 'link', 'a', 'source', 'summary'].includes(c) && k !== 'HTML' ? `${k.toLowerCase()}${toElementName(c)}` : c}': (...c: Skruv${toElementName(c)}${k}Element['c']) => Skruv${toElementName(c)}${k}Element`)
    .join('\n'))
    .join('\n')}

    // These are special elements that skruv uses for SSR purposes
    '#comment': (...c: SkruvCommentElement['c']) => SkruvCommentElement
    '#raw': (...c: SkruvRawElement['c']) => SkruvRawElement
    '#meta': (...c: SkruvMetaElement['c']) => SkruvMetaElement
} & CustomElements
`
// @ts-ignore
copy(`
// TODO: To do this properly would require https://github.com/microsoft/TypeScript/issues/43826 as we need to always return a type with the generator/proxy but be able to set the original type (or any other type).
// @ts-ignore: TODO: TS thinks we want innerKey as a type
export type State<T> = T & AsyncGenerator<T> & { [key in keyof T]: State<T[key]> } & { getGenerator: (innerKey: string | number) => State<T[innerKey]>, toJSON: () => T };

// Vnode/DOM types

type NotAUnion<T> = [T] extends [infer U] ? _NotAUnion<U, U> : never;
type _NotAUnion<T, U> = U extends any ? [T] extends [U] ? unknown : never : never;
type NotBuiltinEvent = string & NotAUnion<keyof HTMLElementEventMap | keyof SVGElementEventMap | keyof MathMLElementEventMap>
type CustomEvents<T> = Record<\`on\${NotBuiltinEvent}\`, (e: CustomEvent & { currentTarget: T }) => void>

type DataAttributes = Record<\`data-\${string}\`, string | number | boolean> | {}

type SkruvAdditionalAttributes<T> = {
  'data-skruv-after-create'?: (element: T) => void,
  'data-skruv-key'?: object,
  'data-skruv-finished'?: boolean,
  'data-skruv-wait-for-not-empty'?: boolean
}

interface HTMLGlobalAttributes {
  'class'?: string | undefined
  'id'?: string | undefined
  'slot'?: string | undefined
  'accesskey'?: string | undefined
  'autocapitalize'?: 'off' | 'none' | 'on' | 'sentences' | 'words' | 'characters' | undefined
  'autofocus'?: boolean | undefined
  'contenteditable'?: '' | 'true' | 'plaintext-only' | 'false'
  'dir'?: 'ltr' | 'rtl' | 'auto' | undefined
  'draggable'?: 'true' | 'false' | 'auto' | undefined
  'enterkeyhint'?: 'enter' | 'done' | 'go' | 'next' | 'previous' | 'search' | 'send' | undefined
  'hidden'?: 'until-found' | 'hidden' | '' | undefined
  'inert'?: boolean | undefined
  'inputmode'?: 'none' | 'text' | 'tel' | 'url' | 'email' | 'numeric' | 'decimal' | 'search' | undefined
    // "is" is special, see the spec
  '// is'?: string
  'itemid'?: URL | undefined
  'itemprop'?: string | undefined
  'itemref'?: string | undefined // this needs to be a space separated list of valid ID's in the document
  'itemscope'?: boolean | undefined
  'itemtype'?: string | undefined // this needs to be a space separated list of valid URL's
  'lang'?: string | undefined
  'nonce'?: string | undefined
  'popover'?: 'auto' | '' | 'manual' | undefined
  'spellcheck'?: boolean | undefined
  'style'?: string | undefined
  'tabindex'?: number | undefined
  'title'?: string | undefined
  'translate'?: 'yes' | '' | 'no' | undefined
  }
  
  interface SVGGlobalAttributes {
  'class'?: string | undefined
  'style'?: string | undefined
  'id'?: string | undefined
  'lang'?: string | undefined
  'tabindex'?: number | undefined
  'xml:base'?: string | undefined
  'xml:lang'?: string | undefined
  'xml:space'?: 'default' | 'preserve' | undefined
  'requiredExtensions'?: string | undefined
  'requiredFeatures'?: string | undefined
  'systemLanguage'?: string | undefined
  }
  
  interface SVGPresentationAttributes {
  'alignment-baseline'?: string | number | undefined;
  'baseline-shift'?: string | number | undefined;
  'clip'?: string | number | undefined;
  'clip-path'?: string | number | undefined;
  'clip-rule'?: string | number | undefined;
  'color'?: string | number | undefined;
  'color-interpolation'?: string | number | undefined;
  'color-interpolation-filters'?: string | number | undefined;
  'color-profile'?: string | number | undefined;
  'color-rendering'?: string | number | undefined;
  'cursor'?: string | number | undefined;
  'direction'?: string | number | undefined;
  'display'?: string | number | undefined;
  'dominant-baseline'?: string | number | undefined;
  'enable-background'?: string | number | undefined;
  'fill'?: string | number | undefined;
  'fill-opacity'?: string | number | undefined;
  'fill-rule'?: string | number | undefined;
  'filter'?: string | number | undefined;
  'flood-color'?: string | number | undefined;
  'flood-opacity'?: string | number | undefined;
  'font-family'?: string | number | undefined;
  'font-size'?: string | number | undefined;
  'font-size-adjust'?: string | number | undefined;
  'font-stretch'?: string | number | undefined;
  'font-style'?: string | number | undefined;
  'font-variant'?: string | number | undefined;
  'font-weight'?: string | number | undefined;
  'glyph-orientation-horizontal'?: string | number | undefined;
  'glyph-orientation-vertical'?: string | number | undefined;
  'image-rendering'?: string | number | undefined;
  'kerning'?: string | number | undefined;
  'letter-spacing'?: string | number | undefined;
  'lighting-color'?: string | number | undefined;
  'marker-end'?: string | number | undefined;
  'marker-mid'?: string | number | undefined;
  'marker-start'?: string | number | undefined;
  'mask'?: string | number | undefined;
  'opacity'?: string | number | undefined;
  'overflow'?: string | number | undefined;
  'pointer-events'?: string | number | undefined;
  'shape-rendering'?: string | number | undefined;
  'stop-color'?: string | number | undefined;
  'stop-opacity'?: string | number | undefined;
  'stroke'?: string | number | undefined;
  'stroke-dasharray'?: string | number | undefined;
  'stroke-dashoffset'?: string | number | undefined;
  'stroke-linecap'?: string | number | undefined;
  'stroke-linejoin'?: string | number | undefined;
  'stroke-miterlimit'?: string | number | undefined;
  'stroke-opacity'?: string | number | undefined;
  'stroke-width'?: string | number | undefined;
  'text-anchor'?: string | number | undefined;
  'text-decoration'?: string | number | undefined;
  'text-rendering'?: string | number | undefined;
  'transform'?: string | number | undefined;
  'transform-origin'?: string | number | undefined;
  'unicode-bidi'?: string | number | undefined;
  'vector-effect'?: string | number | undefined;
  'visibility'?: string | number | undefined;
  'word-spacing'?: string | number | undefined;
  'writing-mode'?: string | number | undefined;
  }
  
  interface SVGFilterAttributes {
  'height'?: string | number | undefined;
  'result'?: string | number | undefined;
  'width'?: string | number | undefined;
  'x'?: string | number | undefined;
  'y'?: string | number | undefined;
  'type'?: string | number | undefined;
  'tableValues'?: string | number | undefined;
  'slope'?: string | number | undefined;
  'intercept'?: string | number | undefined;
  'amplitude'?: string | number | undefined;
  'exponent'?: string | number | undefined;
  'offset'?: string | number | undefined;
  }
  
  interface SVGAnimationAttributes {
  'href'?: string | number | undefined;
  'attributeType'?: string | number | undefined;
  'attributeName'?: string | number | undefined;
  'begin'?: string | number | undefined;
  'dur'?: string | number | undefined;
  'end'?: string | number | undefined;
  'min'?: string | number | undefined;
  'max'?: string | number | undefined;
  'restart'?: string | number | undefined;
  'repeatCount'?: string | number | undefined;
  'repeatDur'?: string | number | undefined;
  'fill'?: string | number | undefined;
  'calcMode'?: string | number | undefined;
  'values'?: string | number | undefined;
  'keyTimes'?: string | number | undefined;
  'keySplines'?: string | number | undefined;
  'from'?: string | number | undefined;
  'to'?: string | number | undefined;
  'by'?: string | number | undefined;
  'autoReverse'?: string | number | undefined;
  'accelerate'?: string | number | undefined;
  'decelerate'?: string | number | undefined;
  'additive'?: string | number | undefined;
  'accumulate'?: string | number | undefined;
  }
  
interface MathMLGlobalAttributes {
  class?: string | number | undefined;
  dir?: string | number | undefined;
  id?: string | number | undefined;
  mathbackground?: string | number | undefined;
  mathcolor?: string | number | undefined;
  mathsize?: string | number | undefined;
  mathvariant?: string | number | undefined;
  nonce?: string | number | undefined;
  scriptlevel?: string | number | undefined;
  style?: string | number | undefined;
  tabindex?: string | number | undefined;
}

interface AtomGlobalAttributes {}

interface SitemapGlobalAttributes {}

type HTMLEvents<T> = { [key in keyof HTMLElementEventMap as \`on\${key}\`]?: ((e: (HTMLElementEventMap[key] & { currentTarget: T })) => void) }
type SVGEvents<T> = { [key in keyof SVGElementEventMap as \`on\${key}\`]?: ((e: (SVGElementEventMap[key] & { currentTarget: T })) => void) }
type MathMlEvents<T> = { [key in keyof MathMLElementEventMap as \`on\${key}\`]?: ((e: (MathMLElementEventMap[key] & { currentTarget: T })) => void) }

type HTMLAttributes<T, A> = A & CustomEvents<T> & HTMLEvents<T> & DataAttributes & SkruvAdditionalAttributes<T> & HTMLGlobalAttributes & { isSkruvDom?: false }
type SVGAttributes<T, A> = A & CustomEvents<T> & SVGEvents<T> & DataAttributes & SkruvAdditionalAttributes<T> & SVGGlobalAttributes & { isSkruvDom?: false }
type MathMLAttributes<T, A> = A & CustomEvents<T> & MathMlEvents<T> & DataAttributes & SkruvAdditionalAttributes<T> & MathMLGlobalAttributes & { isSkruvDom?: false }

export type BasicVnode<N, T, A, C> = {
  isSkruvDom: true
  t: N
  c: [(HTMLAttributes<T, A> & SVGAttributes<T, A> & MathMLAttributes<T, A> | C)?, ...C[]]
  r?: () => boolean
}

export type HTMLVnode<N, T, A, C> = {
  isSkruvDom: true
  t: N
  c: [(HTMLAttributes<T, A> | C)?, ...C[]]
  r?: () => boolean
}

export type SVGVnode<N, T, A, C> = {
  isSkruvDom: true
  t: N
  c: [(SVGAttributes<T, A> | C)?, ...C[]]
  r?: () => boolean
}

export type MathMLVnode<N, T, A, C> = {
  isSkruvDom: true
  t: N
  c: [(MathMLAttributes<T, A> | C)?, ...C[]]
  r?: () => boolean
}

export type AtomVnode<N, T, A, C> = {
  isSkruvDom: true
  t: N
  c: [(A & { isSkruvDom?: false }| C)?, ...C[]]
  r?: () => boolean
}

export type SitemapVnode<N, T, A, C> = {
  isSkruvDom: true
  t: N
  c: [(A & { isSkruvDom?: false }| C)?, ...C[]]
  r?: () => boolean
}

export type attributes = HTMLAttributes<Record<string, string | number | boolean | object | Function>, HTMLElement> | SVGAttributes<Record<string, string | number | boolean | object | Function>, SVGElement> | MathMLAttributes<Record<string, string | number | boolean | object | Function>, MathMLElement>

export type Vnode = AnyElement
export type children = Vnode['c']

type CustomElements = { [id: \`\${string}-\${string}\`]: getHTMLVnode<Record<string, string | number | boolean | object | Function>, HTMLElement, typeof id, Vnode | string | number | boolean> }

export type getHTMLVnode<N, T, A, C> = (...args: [(HTMLAttributes<T, A> | C), ...C[]]) => HTMLVnode<N, T, A, C>

export type keyedMap = WeakMap<Element|object, Element|object>
export type oldKeysMap = WeakMap<Element, object>
export type attributesMap = WeakMap<Element, Record<string, Function|string|boolean|object>>
export type domCacheObj = Record<string, Element>
export type AnyRealElement = HTMLElement | SVGElement | MathMLElement

export type voidCheck = void

` + interfaces
    // @ts-ignore
    .replaceAll(/ \* \n \* \n/g, ' * \n')
    .replaceAll(/ \* \n \* \n/g, ' * \n')
    .replaceAll(/ \* \n \* \n/g, ' * \n')
    .replaceAll(/ \* \n \* \n/g, ' * \n')
)
