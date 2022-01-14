/*! For license information please see main.js.LICENSE.txt */
(()=>{"use strict";var e,t,n={895:(e,t,n)=>{n.d(t,{Uw:()=>l,fo:()=>a});const r=(e=>e.CapacitorPlatforms=(e=>{const t=new Map;t.set("web",{name:"web"});const n=e.CapacitorPlatforms||{currentPlatform:{name:"web"},platforms:t};return n.addPlatform=(e,t)=>{n.platforms.set(e,t)},n.setPlatform=e=>{n.platforms.has(e)&&(n.currentPlatform=n.platforms.get(e))},n})(e))("undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:void 0!==n.g?n.g:{});var i;r.addPlatform,r.setPlatform,function(e){e.Unimplemented="UNIMPLEMENTED",e.Unavailable="UNAVAILABLE"}(i||(i={}));class o extends Error{constructor(e,t){super(e),this.message=e,this.code=t}}const s=(e=>e.Capacitor=(e=>{var t,n,r,s,a;const l=e.CapacitorCustomPlatform||null,d=e.Capacitor||{},c=d.Plugins=d.Plugins||{},u=e.CapacitorPlatforms,m=(null===(t=null==u?void 0:u.currentPlatform)||void 0===t?void 0:t.getPlatform)||(()=>null!==l?l.name:(e=>{var t,n;return(null==e?void 0:e.androidBridge)?"android":(null===(n=null===(t=null==e?void 0:e.webkit)||void 0===t?void 0:t.messageHandlers)||void 0===n?void 0:n.bridge)?"ios":"web"})(e)),f=(null===(n=null==u?void 0:u.currentPlatform)||void 0===n?void 0:n.isNativePlatform)||(()=>"web"!==m()),v=(null===(r=null==u?void 0:u.currentPlatform)||void 0===r?void 0:r.isPluginAvailable)||(e=>{const t=w.get(e);return!!(null==t?void 0:t.platforms.has(m()))||!!p(e)}),p=(null===(s=null==u?void 0:u.currentPlatform)||void 0===s?void 0:s.getPluginHeader)||(e=>{var t;return null===(t=d.PluginHeaders)||void 0===t?void 0:t.find((t=>t.name===e))}),w=new Map,g=(null===(a=null==u?void 0:u.currentPlatform)||void 0===a?void 0:a.registerPlugin)||((e,t={})=>{const n=w.get(e);if(n)return console.warn(`Capacitor plugin "${e}" already registered. Cannot register plugins twice.`),n.proxy;const r=m(),s=p(e);let a;const u=n=>{let c;const u=(...u)=>{const m=(async()=>(!a&&r in t?a=a="function"==typeof t[r]?await t[r]():t[r]:null!==l&&!a&&"web"in t&&(a=a="function"==typeof t.web?await t.web():t.web),a))().then((t=>{const a=((t,n)=>{var a,l;if(!s){if(t)return null===(l=t[n])||void 0===l?void 0:l.bind(t);throw new o(`"${e}" plugin is not implemented on ${r}`,i.Unimplemented)}{const r=null==s?void 0:s.methods.find((e=>n===e.name));if(r)return"promise"===r.rtype?t=>d.nativePromise(e,n.toString(),t):(t,r)=>d.nativeCallback(e,n.toString(),t,r);if(t)return null===(a=t[n])||void 0===a?void 0:a.bind(t)}})(t,n);if(a){const e=a(...u);return c=null==e?void 0:e.remove,e}throw new o(`"${e}.${n}()" is not implemented on ${r}`,i.Unimplemented)}));return"addListener"===n&&(m.remove=async()=>c()),m};return u.toString=()=>`${n.toString()}() { [capacitor code] }`,Object.defineProperty(u,"name",{value:n,writable:!1,configurable:!1}),u},f=u("addListener"),v=u("removeListener"),g=(e,t)=>{const n=f({eventName:e},t),r=async()=>{const r=await n;v({eventName:e,callbackId:r},t)},i=new Promise((e=>n.then((()=>e({remove:r})))));return i.remove=async()=>{console.warn("Using addListener() without 'await' is deprecated."),await r()},i},h=new Proxy({},{get(e,t){switch(t){case"$$typeof":return;case"toJSON":return()=>({});case"addListener":return s?g:f;case"removeListener":return v;default:return u(t)}}});return c[e]=h,w.set(e,{name:e,proxy:h,platforms:new Set([...Object.keys(t),...s?[r]:[]])}),h});return d.convertFileSrc||(d.convertFileSrc=e=>e),d.getPlatform=m,d.handleError=t=>e.console.error(t),d.isNativePlatform=f,d.isPluginAvailable=v,d.pluginMethodNoop=(e,t,n)=>Promise.reject(`${n} does not have an implementation of "${t}".`),d.registerPlugin=g,d.Exception=o,d.DEBUG=!!d.DEBUG,d.isLoggingEnabled=!!d.isLoggingEnabled,d.platform=d.getPlatform(),d.isNative=d.isNativePlatform(),d})(e))("undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:void 0!==n.g?n.g:{}),a=s.registerPlugin;s.Plugins;class l{constructor(e){this.listeners={},this.windowListeners={},e&&(console.warn(`Capacitor WebPlugin "${e.name}" config object was deprecated in v3 and will be removed in v4.`),this.config=e)}addListener(e,t){this.listeners[e]||(this.listeners[e]=[]),this.listeners[e].push(t);const n=this.windowListeners[e];n&&!n.registered&&this.addWindowListener(n);const r=async()=>this.removeListener(e,t),i=Promise.resolve({remove:r});return Object.defineProperty(i,"remove",{value:async()=>{console.warn("Using addListener() without 'await' is deprecated."),await r()}}),i}async removeAllListeners(){this.listeners={};for(const e in this.windowListeners)this.removeWindowListener(this.windowListeners[e]);this.windowListeners={}}notifyListeners(e,t){const n=this.listeners[e];n&&n.forEach((e=>e(t)))}hasListeners(e){return!!this.listeners[e].length}registerWindowListener(e,t){this.windowListeners[t]={registered:!1,windowEventName:e,pluginEventName:t,handler:e=>{this.notifyListeners(t,e)}}}unimplemented(e="not implemented"){return new s.Exception(e,i.Unimplemented)}unavailable(e="not available"){return new s.Exception(e,i.Unavailable)}async removeListener(e,t){const n=this.listeners[e];if(!n)return;const r=n.indexOf(t);this.listeners[e].splice(r,1),this.listeners[e].length||this.removeWindowListener(this.windowListeners[e])}addWindowListener(e){window.addEventListener(e.windowEventName,e.handler),e.registered=!0}removeWindowListener(e){e&&(window.removeEventListener(e.windowEventName,e.handler),e.registered=!1)}}}},r={};function i(e){var t=r[e];if(void 0!==t)return t.exports;var o=r[e]={exports:{}};return n[e](o,o.exports,i),o.exports}i.m=n,i.d=(e,t)=>{for(var n in t)i.o(t,n)&&!i.o(e,n)&&Object.defineProperty(e,n,{enumerable:!0,get:t[n]})},i.f={},i.e=e=>Promise.all(Object.keys(i.f).reduce(((t,n)=>(i.f[n](e,t),t)),[])),i.u=e=>e+".main.js",i.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"==typeof window)return window}}(),i.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),e={},t="time2bee:",i.l=(n,r,o,s)=>{if(e[n])e[n].push(r);else{var a,l;if(void 0!==o)for(var d=document.getElementsByTagName("script"),c=0;c<d.length;c++){var u=d[c];if(u.getAttribute("src")==n||u.getAttribute("data-webpack")==t+o){a=u;break}}a||(l=!0,(a=document.createElement("script")).charset="utf-8",a.timeout=120,i.nc&&a.setAttribute("nonce",i.nc),a.setAttribute("data-webpack",t+o),a.src=n),e[n]=[r];var m=(t,r)=>{a.onerror=a.onload=null,clearTimeout(f);var i=e[n];if(delete e[n],a.parentNode&&a.parentNode.removeChild(a),i&&i.forEach((e=>e(r))),t)return t(r)},f=setTimeout(m.bind(null,void 0,{type:"timeout",target:a}),12e4);a.onerror=m.bind(null,a.onerror),a.onload=m.bind(null,a.onload),l&&document.head.appendChild(a)}},i.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},(()=>{var e;i.g.importScripts&&(e=i.g.location+"");var t=i.g.document;if(!e&&t&&(t.currentScript&&(e=t.currentScript.src),!e)){var n=t.getElementsByTagName("script");n.length&&(e=n[n.length-1].src)}if(!e)throw new Error("Automatic publicPath is not supported in this browser");e=e.replace(/#.*$/,"").replace(/\?.*$/,"").replace(/\/[^\/]+$/,"/"),i.p=e})(),(()=>{var e={179:0};i.f.j=(t,n)=>{var r=i.o(e,t)?e[t]:void 0;if(0!==r)if(r)n.push(r[2]);else{var o=new Promise(((n,i)=>r=e[t]=[n,i]));n.push(r[2]=o);var s=i.p+i.u(t),a=new Error;i.l(s,(n=>{if(i.o(e,t)&&(0!==(r=e[t])&&(e[t]=void 0),r)){var o=n&&("load"===n.type?"missing":n.type),s=n&&n.target&&n.target.src;a.message="Loading chunk "+t+" failed.\n("+o+": "+s+")",a.name="ChunkLoadError",a.type=o,a.request=s,r[1](a)}}),"chunk-"+t,t)}};var t=(t,n)=>{var r,o,[s,a,l]=n,d=0;if(s.some((t=>0!==e[t]))){for(r in a)i.o(a,r)&&(i.m[r]=a[r]);l&&l(i)}for(t&&t(n);d<s.length;d++)o=s[d],i.o(e,o)&&e[o]&&e[o][0](),e[o]=0},n=self.webpackChunktime2bee=self.webpackChunktime2bee||[];n.forEach(t.bind(null,0)),n.push=t.bind(null,n.push.bind(n))})(),(()=>{var e,t=i(895);!function(e){e.UPC_A="UPC_A",e.UPC_E="UPC_E",e.UPC_EAN_EXTENSION="UPC_EAN_EXTENSION",e.EAN_8="EAN_8",e.EAN_13="EAN_13",e.CODE_39="CODE_39",e.CODE_39_MOD_43="CODE_39_MOD_43",e.CODE_93="CODE_93",e.CODE_128="CODE_128",e.CODABAR="CODABAR",e.ITF="ITF",e.ITF_14="ITF_14",e.AZTEC="AZTEC",e.DATA_MATRIX="DATA_MATRIX",e.MAXICODE="MAXICODE",e.PDF_417="PDF_417",e.QR_CODE="QR_CODE",e.RSS_14="RSS_14",e.RSS_EXPANDED="RSS_EXPANDED"}(e||(e={}));const n=(0,t.fo)("BarcodeScanner",{web:()=>i.e(640).then(i.bind(i,640)).then((e=>new e.BarcodeScannerWeb))});confirm("Do you want to scan a barcode?")&&(async()=>{n.hideBackground();const e=await n.startScan();e.hasContent&&console.log(e.content)})()})()})();