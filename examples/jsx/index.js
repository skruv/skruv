var se=(self==null?void 0:self.requestAnimationFrame)||(e=>setTimeout(e,0));var P=Symbol.for("skruvDom"),C=Symbol.for("skruvDomPrepared"),b=new WeakMap,A=new WeakMap,T=new WeakMap,G=()=>{},Z=new Promise(e=>{G=()=>e()}),w=new Set,u=(self==null?void 0:self.SkruvWaitForAsync)||!!document.querySelector("data-skruv-ssr-rendered");var j=(e,...t)=>{var i,o,l,h,a;return{s:P,t:e,...typeof t[0]=="object"&&!Array.isArray(t[0])&&!(t[0]instanceof Function)&&!(t[0]instanceof Function&&((l=(o=(i=t[0])==null?void 0:i.prototype)==null?void 0:o.toString)==null?void 0:l.call(o))==="[object AsyncGenerator]")&&!((h=t[0])!=null&&h[Symbol.asyncIterator])&&((a=t[0])==null?void 0:a.s)!==P?{_a:t[0],_c:t.slice(1)}:{_a:{},_c:t},r:{r:()=>(u&&!w.size&&(u=!1,G()),!0)}}},R=(e,t,i)=>{var l,h;let o=(a,m)=>{var d;return u&&((d=m==null?void 0:m._a)==null?void 0:d["data-skruv-finished"])!==!1&&(w.delete(a),m&&((m==null?void 0:m.s)===P?x(m):R(m,t,i))),b.set(a,m),t.r.r()};if(b.has(e))return b.get(e);if(typeof e=="object"&&(e==null?void 0:e[Symbol.asyncIterator])){let a=e;return u&&w.add(a),b.set(a,null),(async()=>{for await(let m of a)if(!o(e,m))break})(),!1}else{if(e instanceof Function&&((h=(l=e==null?void 0:e.prototype)==null?void 0:l.toString)==null?void 0:h.call(l))==="[object AsyncGenerator]")return u&&w.add(e),b.set(e,null),(async()=>{for await(let a of e())if(!o(e,a))break})(),!1;if(typeof e=="object"&&e!==null&&(e==null?void 0:e.then)instanceof Function){let a=e;return u&&w.add(e),b.set(a,null),(async()=>o(a,await a))(),!1}else{if(typeof e=="function"&&e.constructor.name==="AsyncFunction")return u&&w.add(e),b.set(e,null),(async()=>o(e,await e()))(),!1;if(typeof e=="function")return i?e():e;if(typeof e=="string"||typeof e=="number")return i?j("#text",{data:e.toString()}):e.toString();if(typeof e=="boolean")return e}}throw new Error("Unkown type in syncify: "+JSON.stringify(e))},V=(e,t)=>{let i=e.flat(1/0).map(o=>(o==null?void 0:o.s)===P?x(o):R(o,t,!0)).flat(1/0).filter(o=>o!==null&&typeof o!="boolean");return i.find(o=>(o==null?void 0:o.p)!==C)?V(i,t):i},x=e=>{let t=Object.fromEntries(Object.entries(e._a).filter(i=>i[1]!==null).map(([i,o])=>i==="data-skruv-key"?[i,o]:[i,R(o,e,!1)]).filter(i=>i[1]!==null));return{p:C,...e,a:t,c:V(e._c,e)}},$=(e,t,i,o)=>{var O;if(e.p!==C)throw new Error("unkown type in render: "+JSON.stringify(e));if(!i||t&&!i.contains(t))return!1;let l=t.ownerDocument,h=l.documentElement;for(let s of t.getAttributeNames().filter(r=>!Object.keys(e.a).includes(r)))t.removeAttribute(s);for(let[s,r]of Object.entries(e.a))if(s!=="data-skruv-key"){if(r===null||r===!1){t.getAttribute(s)&&t.removeAttribute(s);continue}if(s.slice(0,2)==="on"&&r instanceof Function){let p=A.get(t),n=p==null?void 0:p[s];p||(p={},A.set(t,p)),n&&n.toString()!==r.toString()&&(t.removeEventListener(s.slice(2),n),p[s]=null),n||(p[s]=r,t.addEventListener(s.slice(2),r));continue}t.setAttribute(s,r.toString()),s==="value"&&(typeof r=="number"||typeof r=="string")&&t instanceof HTMLInputElement&&(t[s]=r.toString()),(typeof r=="boolean"&&(t instanceof HTMLInputElement&&s==="checked"||t instanceof HTMLOptionElement&&s==="selected")||typeof r=="object")&&(t[s]=r)}if(e.r.r=()=>$(x(e),t,i,o),e.a["data-skruv-opaque"])return!0;let a=Array.from(t.childNodes),m=e.c,d=[],S=(s,r)=>s.nodeName.toLowerCase()===r.t&&!d.includes(s);for(let s=0;s<m.length;s++){let r=m[s],p=r.a["data-skruv-key"]?T.get(r.a["data-skruv-key"]):a.find(n=>S(n,r));p?d[s]=p:d[s]=null}let g=a.filter(s=>!d.includes(s));if(e.c.length||!e.a["data-skruv-wait-for-not-empty"])for(let s of g.filter(r=>!!r))t.removeChild(s),setTimeout(()=>{var r;!(h!=null&&h.contains(s))&&((r=A.get(s))==null?void 0:r.onremove)&&s.dispatchEvent(new CustomEvent("remove"))},1);for(let s=0;s<d.length;s++){let r=e.c[s],p=!1;if(d[s]){if(d[s]!==t.childNodes[s]){let c=d[s];c&&(s===0?t.prepend(c):t.childNodes[s-1].after(c))}}else{let c;e.t==="#comment"?c=l.createComment(""):r.t==="#text"?c=l.createTextNode(""):r.p===C&&(o||r.t==="svg")?c=l.createElementNS("http://www.w3.org/2000/svg",r.t):c=l.createElement(r.t),p=!0,t.childNodes[s]?t.replaceChild(c,t.childNodes[s]):s===0?t.prepend(c):t.childNodes[s-1].after(c)}let n=t.childNodes[s];if(n instanceof Text||n instanceof Comment){n.data!==r.a.data&&(n.data=r.a.data.toString());continue}if(!(n instanceof HTMLElement||n instanceof SVGElement))throw new Error("Child node of unkown type: "+JSON.stringify({childNode:n,child:r}));r.a["data-skruv-key"]&&!T.has(r.a["data-skruv-key"])&&T.set(r.a["data-skruv-key"],n),$(r,n,t,o||e.t==="svg"),p&&((O=A.get(n))==null?void 0:O.oncreate)&&n.dispatchEvent(new CustomEvent("create"))}return!0},W=async(e,t=self.document.documentElement,i=t==null?void 0:t.parentNode,o=!1)=>{if(!i)throw new Error("Skruv: No parent to render to");if(!(i instanceof HTMLElement||i instanceof SVGElement||i instanceof Document||i instanceof Window))throw new Error("Skruv: Parent of wrong type");u&&(x(e).r.r(),await Z),$(x(e),t,i,o)},K={},J=new Proxy(K,{get:(e,t)=>(...i)=>j(t,...i)});var{style:U}=J,Q=new TextEncoder,F=()=>{},q=new Promise(e=>{F=e}),M=new Map,X=e=>[...new Uint8Array(e)].map(t=>t.toString(16).padStart(2,"0")).join(""),Y=async e=>X(await crypto.subtle.digest("SHA-1",Q.encode(e))),L=async(e,...t)=>{var p;let i=e.reduce((n,c,f)=>{var y;return n.push(c),n.push(((y=t==null?void 0:t[f])==null?void 0:y.toString())||""),n},[]).join(""),o=/^\[.*?(?:(["'])(?:.|\\\1)*\1.*)*\]/,l=/([([,]|:scope\b)/,h=/^:scope\b/;function a(n,c){let f=n.search(l);if(f===-1)return{selector:`${c} ${n}`,rest:""};if(n[f]===",")return{selector:`${c} ${n.substring(0,f)}`,rest:n.substring(f+1)};let y=!0,H=!1;f=n.search(/\S/);let k=0;e:for(;f<n.length;++f){let I=n[f];switch(I){case"[":{let v=o.exec(n.substring(f));f+=(v?v[0].length:1)-1;continue}case"(":++k;continue;case":":if(y)if(h.test(n.substring(f))){if(k)return null}else continue;else continue;n=n.substring(0,f)+c+n.substring(f+6),f+=c.length,H=!0,--f;continue;case")":k&&--k;continue}if(!k)switch(I){case",":break e;case" ":case">":case"~":case"+":if(!y)continue;y=!1}}return{selector:(H?"":`${c} `)+n.substring(0,f),rest:n.substring(f+1)}}function m(n,c){let f=[];for(;n;){let y=a(n,c);if(y===null)return":not(*)";f.push(y.selector),n=y.rest}return f.join(", ")}function d(n,c){if(n instanceof CSSMediaRule){let f=n.cssRules.length;for(let y=0;y<f;++y)d(n.cssRules[y],c);return}n instanceof CSSStyleRule&&(n.selectorText=m(n.selectorText,c))}let S=await Y(i),g=`skruv-css-scope-${S}`,O=`.${g}`;if(M.has(S))return g;let s;if(!(self!=null&&self.CSSOM)&&!((p=self.document)!=null&&p.implementation))return"";if(self!=null&&self.CSSOM)s=CSSOM.parse(i);else{let n=self.document.implementation.createHTMLDocument(""),c=n.createElement("style");c.innerText=i,n.body.append(c),s=c.sheet,n.body.removeChild(c)}Array.from((s==null?void 0:s.cssRules)||[]).forEach(n=>d(n,O));let r=Array.from((s==null?void 0:s.cssRules)||[]).map(n=>n.cssText||"").join("");return M.set(S,r),F(),g};async function*z(){for(q=new Promise(e=>{F=e}),yield U(Array.from(M.values()).join(""));;)await q,yield U(Array.from(M.values()).join(""))}var B=e=>e.replace(/[A-Z]+(?![a-z])|[A-Z]/g,(t,i)=>(i?"-":"")+t.toLowerCase()),D="#fragment",_=(e,t={})=>E(e,t),E=(e,t={})=>{if(e===D&&t.children)return t.children;if(e===D)return[];let{children:i,...o}=t;return Object.keys(o).filter(l=>l!==B(l)).forEach(l=>{o[B(l)]=o[l],delete o[l]}),o["class-name"]&&(o.class=o["class-name"],delete o["class-name"]),o["html-for"]&&(o.for=o["html-for"],delete o["html-for"]),i?j(e,o||{},...i):j(e,o||{})};var N=L`
:root {
  font-family: -apple-system, BlinkMacSystemFont, avenir next, avenir, segoe ui, helvetica neue, helvetica, Cantarell, Ubuntu, roboto, noto, arial, sans-serif;
}
`,ee=L`
:scope {
  border: 1px solid;
}

p {
  color: blue;
}
`;W(E("html",{lang:"en-US",class:N,children:[E("head",{children:[_("title",{children:"jsx"}),_("meta",{name:"viewport",content:"width=device-width, initial-scale=1"}),z]}),E("body",{children:[_("div",{class:ee,children:_("p",{children:"blue text"})}),_("div",{children:_("p",{children:"default text"})})]})]}));
//# sourceMappingURL=index.js.map
