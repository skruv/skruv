var m=new WeakMap,p=new WeakMap,o=new WeakMap,y=new WeakMap,h=new WeakMap,w=(e,t,r)=>{t==="value"&&(typeof r=="number"||typeof r=="string")&&e instanceof HTMLInputElement&&(e[t]=r.toString()),t==="checked"&&typeof r=="boolean"&&e instanceof HTMLInputElement&&(e[t]=r),t==="selected"&&typeof r=="boolean"&&e instanceof HTMLOptionElement&&(e[t]=r)},A=(e,t,r,c,l)=>{p.set(t,new Set),t.getAttributeNames&&t.getAttributeNames().filter(s=>!Object.keys(e.attributes).includes(s)&&s!=="data-css-scope").forEach(s=>t?.removeAttribute?.(s));for(let[s,n]of Object.entries(e.attributes)){if(s==="key"){!c&&y.set(t,n);continue}if(s==="data-css-for-scope"&&typeof n=="string"&&(r instanceof HTMLElement||r instanceof SVGElement)){let i=(r?.getAttribute?.("data-css-scope")||"").split(" ");i.push(n),!c&&r?.setAttribute?.("data-css-scope",Array.from(new Set(i)).join(" ").trim());continue}if(n?.[Symbol.asyncIterator]||n instanceof Function&&n?.prototype?.toString?.()==="[object AsyncGenerator]"){let i=n;p.get(t).add(i),i.hydrating=c,i.booted||(l?.renderWaiting?.add(i),i.booted=!0,k(i,()=>{if(!p.get(t).has(i))return!1;if(s==="key")return!i.hydrating&&y.set(t,i),!0;if(s==="data-css-for-scope"&&(r instanceof HTMLElement||r instanceof SVGElement)){let u=(r?.getAttribute?.("data-css-scope")||"").split(" ");return u.push(i),!i.hydrating&&r?.setAttribute?.("data-css-scope",Array.from(new Set(u)).join(" ")),!0}return i.result===!1&&t.getAttribute?.(s)?!i.hydrating&&t.removeAttribute&&t.removeAttribute(s):(!i.hydrating&&i.result&&typeof i.result!="function"&&w(t,s,i.result),!i.hydrating&&t.setAttribute&&t.setAttribute(s,i.result?.toString()||""),l?.renderWaiting?.delete(i),l?.checkRender?.()),!0}));continue}else s.slice(0,2)==="on"&&n instanceof Function&&!c?(o.has(t)||o.set(t,{}),o.get(t)[s]&&o.get(t)[s].toString()!==n.toString()&&(t.removeEventListener(s.slice(2),o.get(t)[s]),o.get(t)[s]=null),o.get(t)[s]||(o.get(t)[s]=n,t.addEventListener(s.slice(2),o.get(t)[s]))):(n!==!1&&t.getAttribute?.(s)!==n&&!c&&(n&&typeof n!="function"&&typeof n!="object"&&w(t,s,n),n&&t.setAttribute&&t.setAttribute(s,n.toString())),n===!1&&t.getAttribute?.(s)&&!c&&t.removeAttribute&&t.removeAttribute(s))}},g=(e,t,r)=>{let c=e.ownerDocument||self?.document;return t.nodeName==="#comment"?c.createComment(t.data||""):t.nodeName==="#text"?c.createTextNode(t.data||""):r?c.createElementNS("http://www.w3.org/2000/svg",t.nodeName):c.createElement(t.nodeName)},k=async(e,t)=>{for await(let r of e?.[Symbol.asyncIterator]?e:e())if(e.result=r,!t())break},E=(e,t,r,c,l,s,n=t)=>{let i=t.map(a=>{if(typeof a=="boolean"||typeof a>"u")return!1;if(typeof a=="string"||typeof a=="number")return{nodeName:"#text",attributes:{},childNodes:[],data:a.toString()};if(a?.[Symbol.asyncIterator]||a instanceof Function&&a?.prototype?.toString?.()==="[object AsyncGenerator]"){let u=a;return m.get(r)&&m.get(r).add(u),u.hydrating=l,u.booted||(s.renderWaiting?.add(u),u.booted=!0,k(u,()=>!m.get(r)||m.get(r)&&!m.get(r).has(u)?(s.renderWaiting?.delete(u),!1):(S(e,n,r,c,!!u.hydrating,s),u?.result?.attributes?.["data-skruv-finished"]!==!1&&s.renderWaiting?.delete(u),s.checkRender?.(),!0))),u.result}else{if(typeof a=="function")return a();if(a?.nodeName==="#fragment")return a?.childNodes||[];if(a?.nodeName||Array.isArray(a))return a}return console.log("unkown type in render: ",a),!1}).flat(1/0).filter(a=>!!a);return i.find(a=>!a?.nodeName)?E(e,i,r,c,l,s,n):i},S=(e,t,r,c,l,s)=>{if(!Array.isArray(t))return;m.set(r,new Set);let n=Array.from(r.childNodes),i=E(e,t,r,c,l,s),a=n.slice(i.length);if(i.length||!e.attributes["data-skruv-wait-for-not-empty"])for(let u=0;u<a.length;u++){let f=a[u];!l&&f.parentNode&&f.parentNode.removeChild&&f.parentNode.removeChild(f),!s.isSkruvSSR&&f.dispatchEvent(new CustomEvent("remove"))}for(let u=0;u<i.length;u++){let f=n[u]||null;(f instanceof HTMLElement||f instanceof SVGElement||f instanceof Comment||f instanceof Text||f===null)&&b(i[u],f,r,c,l,s)}},b=(e,t,r,c,l,s)=>{if(!e.nodeName)return;let n;if(e.attributes?.key&&h.has(e.attributes?.key)){let i=h.get(e.attributes?.key);t&&i!==t&&!l&&r.replaceChild&&r.replaceChild(i,t),t||!l&&r.append&&r.append(i),A(e,i,r,l,s),!e?.attributes?.opaque&&(e.childNodes.length||i.childNodes.length)&&S(e,e.childNodes,i,c||e.nodeName==="svg",l,s);return}t?t.nodeName.toLowerCase()!==e.nodeName.toLowerCase()||e.attributes?.key!==y.get(t)?(n=g(r,e,c||e.nodeName==="svg"),!l&&r.replaceChild(n,t),e.attributes?.oncreate&&e.attributes.oncreate(n),!s.isSkruvSSR&&t.dispatchEvent(new CustomEvent("remove",{detail:{newNode:n}}))):((t instanceof Text||t instanceof Comment)&&t.data!==e.data&&!l&&(t.data=e.data||""),n=t):(n=g(r,e,c||e.nodeName==="svg"),!l&&r.append&&r.append(n),e.attributes?.oncreate&&e.attributes.oncreate(n)),e.attributes?.key&&h.set(e.attributes?.key,n),(n instanceof HTMLElement||n instanceof SVGElement)&&A(e,n,r,l,s),(n instanceof HTMLElement||n instanceof SVGElement)&&!e?.attributes?.opaque&&(e.childNodes.length||n.childNodes.length)&&S(e,e.childNodes,n,c||e.nodeName==="svg",l,s)},M=(e,t=self.document.documentElement,r=t.parentNode,c=!1)=>new Promise(l=>{if(!r)throw new Error("Skruv: No parent to render to");if(!(r instanceof HTMLElement||r instanceof SVGElement||r instanceof Document))throw new Error("Skruv: Parent of wrong type");let s=new Set,n=()=>{s?.size===0&&(l("finished render"),b(e,t,r,c,!1,a))},i=self?.isSkruvSSR,a={renderWaiting:s,checkRender:n,isSkruvSSR:i};if(t?.getAttribute?.("data-ssr-rendered")){b(e,t,r,c,!0,a),n();return}b(e,t,r,c,!1,a),n()}),L=M;export{L as default};
