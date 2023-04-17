/* 
  @package NOTY - Dependency-free notification library 
  @version version: 3.2.0-beta 
  @contributors https://github.com/needim/noty/graphs/contributors 
  @documentation Examples and Documentation - https://ned.im/noty 
  @license Licensed under the MIT licenses: http://www.opensource.org/licenses/mit-license.php 
*/
!function(t,e){"object"==typeof exports&&"object"==typeof module?module.exports=e():"function"==typeof define&&define.amd?define("Noty",[],e):"object"==typeof exports?exports.Noty=e():t.Noty=e()}(this,(function(){return function(t){function e(o){if(n[o])return n[o].exports;var i=n[o]={i:o,l:!1,exports:{}};return t[o].call(i.exports,i,i.exports,e),i.l=!0,i.exports}var n={};return e.m=t,e.c=n,e.i=function(t){return t},e.d=function(t,n,o){e.o(t,n)||Object.defineProperty(t,n,{configurable:!1,enumerable:!0,get:o})},e.n=function(t){var n=t&&t.__esModule?function(){return t.default}:function(){return t};return e.d(n,"a",n),n},e.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},e.p="",e(e.s=6)}([function(t,e,n){"use strict";function o(t,e,n){var o=arguments.length>3&&void 0!==arguments[3]&&arguments[3];e=e.split(" ");for(var i=0;i<e.length;i++)document.addEventListener?t.addEventListener(e[i],n,o):document.attachEvent&&t.attachEvent("on"+e[i],n)}function i(t,e){return("string"==typeof t?t:s(t)).indexOf(" "+e+" ")>=0}function r(t){t.parentNode&&t.parentNode.removeChild(t)}function s(t){return(" "+(t&&t.className||"")+" ").replace(/\s+/gi," ")}Object.defineProperty(e,"__esModule",{value:!0}),e.css=e.deepExtend=e.animationEndEvents=void 0;var u="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t};e.inArray=function(t,e,n){var o=void 0;if(n){for(o in e)if(e.hasOwnProperty(o)&&e[o]===t)return!0}else for(o in e)if(e.hasOwnProperty(o)&&e[o]===t)return!0;return!1},e.stopPropagation=function(t){void 0!==(t=t||window.event).stopPropagation?t.stopPropagation():t.cancelBubble=!0},e.generateID=function(){return"noty_"+(arguments.length>0&&void 0!==arguments[0]?arguments[0]:"")+"_"+"xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,(function(t){var e=16*Math.random()|0;return("x"===t?e:3&e|8).toString(16)}))},e.outerHeight=function(t){var e=t.offsetHeight,n=window.getComputedStyle(t);return e+(parseInt(n.marginTop)+parseInt(n.marginBottom))},e.addListener=o,e.hasClass=i,e.addClass=function(t,e){var n=s(t),o=n+e;i(n,e)||(t.className=o.substring(1))},e.removeClass=function(t,e){var n=s(t),o=void 0;i(t,e)&&(o=n.replace(" "+e+" "," "),t.className=o.substring(1,o.length-1))},e.remove=r,e.classList=s,e.visibilityChangeFlow=function(){function t(){a.PageHidden?setTimeout((function(){Object.keys(a.Store).forEach((function(t){a.Store.hasOwnProperty(t)&&a.Store[t].options.visibilityControl&&a.Store[t].stop()}))}),100):setTimeout((function(){Object.keys(a.Store).forEach((function(t){a.Store.hasOwnProperty(t)&&a.Store[t].options.visibilityControl&&a.Store[t].resume()})),a.queueRenderAll()}),100)}var e=void 0,n=void 0;void 0!==document.hidden?(e="hidden",n="visibilitychange"):void 0!==document.msHidden?(e="msHidden",n="msvisibilitychange"):void 0!==document.webkitHidden&&(e="webkitHidden",n="webkitvisibilitychange"),n&&o(document,n,(function(){a.PageHidden=document[e],t()})),o(window,"blur",(function(){a.PageHidden=!0,t()})),o(window,"focus",(function(){a.PageHidden=!1,t()}))},e.createAudioElements=function(t){if(t.hasSound){var e=document.createElement("audio");t.options.sounds.sources.forEach((function(t){var n=document.createElement("source");n.src=t,n.type="audio/"+function(t){return t.match(/\.([^.]+)$/)[1]}(t),e.appendChild(n)})),t.barDom?t.barDom.appendChild(e):document.querySelector("body").appendChild(e),e.volume=t.options.sounds.volume,t.soundPlayed||(e.play(),t.soundPlayed=!0),e.onended=function(){r(e)}}};var a=function(t){if(t&&t.__esModule)return t;var e={};if(null!=t)for(var n in t)Object.prototype.hasOwnProperty.call(t,n)&&(e[n]=t[n]);return e.default=t,e}(n(1));e.animationEndEvents="webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend",e.deepExtend=function t(e){e=e||{};for(var n=1;n<arguments.length;n++){var o=arguments[n];if(o)for(var i in o)o.hasOwnProperty(i)&&(Array.isArray(o[i])?e[i]=o[i]:"object"===u(o[i])&&null!==o[i]?e[i]=t(e[i],o[i]):e[i]=o[i])}return e},e.css=function(){function t(t){return t=function(t){return t.replace(/^-ms-/,"ms-").replace(/-([\da-z])/gi,(function(t,e){return e.toUpperCase()}))}(t),o[t]||(o[t]=function(t){var e=document.body.style;if(t in e)return t;for(var o=n.length,i=t.charAt(0).toUpperCase()+t.slice(1),r=void 0;o--;)if((r=n[o]+i)in e)return r;return t}(t))}function e(e,n,o){n=t(n),e.style[n]=o}var n=["Webkit","O","Moz","ms"],o={};return function(t,n){var o=arguments,i=void 0,r=void 0;if(2===o.length)for(i in n)n.hasOwnProperty(i)&&void 0!==(r=n[i])&&n.hasOwnProperty(i)&&e(t,i,r);else e(t,o[1],o[2])}}()},function(t,e,n){"use strict";function o(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"global";if(h.hasOwnProperty(t)){var e=h[t].queue.shift();e&&e.show()}}function i(t){return!(!t.options.buttons||!Object.keys(t.options.buttons).length)}function r(t){t.options.timeout&&(t.options.progressBar&&t.progressDom&&a.css(t.progressDom,{transition:"width "+t.options.timeout+"ms linear",width:"0%"}),clearTimeout(t.closeTimer),t.closeTimer=setTimeout((function(){t.close()}),t.options.timeout))}function s(t){t.options.timeout&&t.closeTimer&&(clearTimeout(t.closeTimer),t.closeTimer=-1,t.options.progressBar&&t.progressDom&&a.css(t.progressDom,{transition:"width 0ms linear",width:"100%"}))}function u(t,e){t.listeners.hasOwnProperty(e)&&t.listeners[e].forEach((function(e){"function"==typeof e&&e.apply(t)}))}Object.defineProperty(e,"__esModule",{value:!0}),e.Defaults=e.Store=e.Queues=e.DefaultMaxVisible=e.docTitle=e.DocModalCount=e.PageHidden=void 0,e.getQueueCounts=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"global",e=0,n=f;return h.hasOwnProperty(t)&&(n=h[t].maxVisible,Object.keys(p).forEach((function(n){p[n].options.queue!==t||p[n].closed||e++}))),{current:e,maxVisible:n}},e.addToQueue=function(t){h.hasOwnProperty(t.options.queue)||(h[t.options.queue]={maxVisible:f,queue:[]}),h[t.options.queue].queue.push(t)},e.removeFromQueue=function(t){if(h.hasOwnProperty(t.options.queue)){var e=[];Object.keys(h[t.options.queue].queue).forEach((function(n){h[t.options.queue].queue[n].id!==t.id&&e.push(h[t.options.queue].queue[n])})),h[t.options.queue].queue=e}},e.queueRender=o,e.queueRenderAll=function(){Object.keys(h).forEach((function(t){o(t)}))},e.ghostFix=function(t){var e=a.generateID("ghost"),n=document.createElement("div");n.setAttribute("id",e),a.css(n,{height:a.outerHeight(t.barDom)+"px"}),t.barDom.insertAdjacentHTML("afterend",n.outerHTML),a.remove(t.barDom),n=document.getElementById(e),a.addClass(n,"noty_fix_effects_height"),a.addListener(n,a.animationEndEvents,(function(){a.remove(n)}))},e.build=function(t){!function(t){if(t.options.container)return void(t.layoutDom=document.querySelector(t.options.container));var e="noty_layout__"+t.options.layout;t.layoutDom=document.querySelector("div#"+e),t.layoutDom||(t.layoutDom=document.createElement("div"),t.layoutDom.setAttribute("id",e),t.layoutDom.setAttribute("role","alert"),t.layoutDom.setAttribute("aria-live","polite"),a.addClass(t.layoutDom,"noty_layout"),document.querySelector("body").appendChild(t.layoutDom))}(t);var e='<div class="noty_body">'+t.options.text+"</div>"+function(t){if(i(t)){var e=document.createElement("div");return a.addClass(e,"noty_buttons"),Object.keys(t.options.buttons).forEach((function(n){e.appendChild(t.options.buttons[n].dom)})),t.options.buttons.forEach((function(t){e.appendChild(t.dom)})),e.outerHTML}return""}(t)+'<div class="noty_progressbar"></div>';t.barDom=document.createElement("div"),t.barDom.setAttribute("id",t.id),a.addClass(t.barDom,"noty_bar noty_type__"+t.options.type+" noty_theme__"+t.options.theme),t.barDom.innerHTML=e,u(t,"onTemplate")},e.hasButtons=i,e.handleModal=function(t){t.options.modal&&(0===c&&function(){var t=document.querySelector("body"),e=document.createElement("div");a.addClass(e,"noty_modal"),t.insertBefore(e,t.firstChild),a.addClass(e,"noty_modal_open"),a.addListener(e,a.animationEndEvents,(function(){a.removeClass(e,"noty_modal_open")}))}(),e.DocModalCount=c+=1)},e.handleModalClose=function(t){if(t.options.modal&&c>0&&(e.DocModalCount=c-=1,c<=0)){var n=document.querySelector(".noty_modal");n&&(a.removeClass(n,"noty_modal_open"),a.addClass(n,"noty_modal_close"),a.addListener(n,a.animationEndEvents,(function(){a.remove(n)})))}},e.queueClose=r,e.dequeueClose=s,e.fire=u,e.openFlow=function(t){u(t,"afterShow"),r(t),a.addListener(t.barDom,"mouseenter",(function(){s(t)})),a.addListener(t.barDom,"mouseleave",(function(){r(t)}))},e.closeFlow=function(t){delete p[t.id],t.closing=!1,u(t,"afterClose"),a.remove(t.barDom),0!==t.layoutDom.querySelectorAll(".noty_bar").length||t.options.container||a.remove(t.layoutDom),(a.inArray("docVisible",t.options.titleCount.conditions)||a.inArray("docHidden",t.options.titleCount.conditions))&&d.decrement(),o(t.options.queue)};var a=function(t){if(t&&t.__esModule)return t;var e={};if(null!=t)for(var n in t)Object.prototype.hasOwnProperty.call(t,n)&&(e[n]=t[n]);return e.default=t,e}(n(0)),c=(e.PageHidden=!1,e.DocModalCount=0),l={originalTitle:null,count:0,changed:!1,timer:-1},d=e.docTitle={increment:function(){l.count++,d._update()},decrement:function(){--l.count<=0?d._clear():d._update()},_update:function(){var t=document.title;l.changed?document.title="("+l.count+") "+l.originalTitle:(l.originalTitle=t,document.title="("+l.count+") "+t,l.changed=!0)},_clear:function(){l.changed&&(l.count=0,document.title=l.originalTitle,l.changed=!1)}},f=e.DefaultMaxVisible=5,h=e.Queues={global:{maxVisible:f,queue:[]}},p=e.Store={};e.Defaults={type:"alert",layout:"topRight",theme:"mint",text:"",timeout:!1,progressBar:!0,closeWith:["click"],animation:{open:"noty_effects_open",close:"noty_effects_close"},id:!1,force:!1,killer:!1,queue:"global",container:!1,buttons:[],callbacks:{beforeShow:null,onShow:null,afterShow:null,onClose:null,afterClose:null,onClick:null,onHover:null,onTemplate:null},sounds:{sources:[],volume:1,conditions:[]},titleCount:{conditions:[]},modal:!1,visibilityControl:!1}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.NotyButton=void 0;var o=function(t){if(t&&t.__esModule)return t;var e={};if(null!=t)for(var n in t)Object.prototype.hasOwnProperty.call(t,n)&&(e[n]=t[n]);return e.default=t,e}(n(0));e.NotyButton=function t(e,n,i){var r=this,s=arguments.length>3&&void 0!==arguments[3]?arguments[3]:{};return function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this.dom=document.createElement("button"),this.dom.innerHTML=e,this.id=s.id=s.id||o.generateID("button"),this.cb=i,Object.keys(s).forEach((function(t){r.dom.setAttribute(t,s[t])})),o.addClass(this.dom,n||"noty_btn"),this}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o=function(){function t(t,e){for(var n=0;n<e.length;n++){var o=e[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(t,o.key,o)}}return function(e,n,o){return n&&t(e.prototype,n),o&&t(e,o),e}}();e.Push=function(){function t(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"/service-worker.js";return function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this.subData={},this.workerPath=e,this.listeners={onPermissionGranted:[],onPermissionDenied:[],onSubscriptionSuccess:[],onSubscriptionCancel:[],onWorkerError:[],onWorkerSuccess:[],onWorkerNotSupported:[]},this}return o(t,[{key:"on",value:function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:function(){};return"function"==typeof e&&this.listeners.hasOwnProperty(t)&&this.listeners[t].push(e),this}},{key:"fire",value:function(t){var e=this,n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:[];this.listeners.hasOwnProperty(t)&&this.listeners[t].forEach((function(t){"function"==typeof t&&t.apply(e,n)}))}},{key:"create",value:function(){console.log("NOT IMPLEMENTED YET")}},{key:"isSupported",value:function(){var t=!1;try{t=window.Notification||window.webkitNotifications||navigator.mozNotification||window.external&&void 0!==window.external.msIsSiteMode()}catch(t){}return t}},{key:"getPermissionStatus",value:function(){var t="default";if(window.Notification&&window.Notification.permissionLevel)t=window.Notification.permissionLevel;else if(window.webkitNotifications&&window.webkitNotifications.checkPermission)switch(window.webkitNotifications.checkPermission()){case 1:t="default";break;case 0:t="granted";break;default:t="denied"}else window.Notification&&window.Notification.permission?t=window.Notification.permission:navigator.mozNotification?t="granted":window.external&&void 0!==window.external.msIsSiteMode()&&(t=window.external.msIsSiteMode()?"granted":"default");return t.toString().toLowerCase()}},{key:"getEndpoint",value:function(t){var e=t.endpoint,n=t.subscriptionId;return n&&-1===e.indexOf(n)&&(e+="/"+n),e}},{key:"isSWRegistered",value:function(){try{return"activated"===navigator.serviceWorker.controller.state}catch(t){return!1}}},{key:"unregisterWorker",value:function(){var t=this;"serviceWorker"in navigator&&navigator.serviceWorker.getRegistrations().then((function(e){var n=!0,o=!1,i=void 0;try{for(var r,s=e[Symbol.iterator]();!(n=(r=s.next()).done);n=!0)r.value.unregister(),t.fire("onSubscriptionCancel")}catch(t){o=!0,i=t}finally{try{!n&&s.return&&s.return()}finally{if(o)throw i}}}))}},{key:"requestSubscription",value:function(){var t=this,e=!(arguments.length>0&&void 0!==arguments[0])||arguments[0],n=this,o=this.getPermissionStatus(),i=function(o){"granted"===o?(t.fire("onPermissionGranted"),"serviceWorker"in navigator?navigator.serviceWorker.register(t.workerPath).then((function(){navigator.serviceWorker.ready.then((function(t){n.fire("onWorkerSuccess"),t.pushManager.subscribe({userVisibleOnly:e}).then((function(t){var e=t.getKey("p256dh"),o=t.getKey("auth");n.subData={endpoint:n.getEndpoint(t),p256dh:e?window.btoa(String.fromCharCode.apply(null,new Uint8Array(e))):null,auth:o?window.btoa(String.fromCharCode.apply(null,new Uint8Array(o))):null},n.fire("onSubscriptionSuccess",[n.subData])})).catch((function(t){n.fire("onWorkerError",[t])}))}))})):n.fire("onWorkerNotSupported")):"denied"===o&&(t.fire("onPermissionDenied"),t.unregisterWorker())};"default"===o?window.Notification&&window.Notification.requestPermission?window.Notification.requestPermission(i):window.webkitNotifications&&window.webkitNotifications.checkPermission&&window.webkitNotifications.requestPermission(i):i(o)}}]),t}()},function(t,e,n){(function(e,o){
/*!
 * @overview es6-promise - a tiny implementation of Promises/A+.
 * @copyright Copyright (c) 2014 Yehuda Katz, Tom Dale, Stefan Penner and contributors (Conversion to ES6 API by Jake Archibald)
 * @license   Licensed under MIT license
 *            See https://raw.githubusercontent.com/stefanpenner/es6-promise/master/LICENSE
 * @version   4.1.1
 */
!function(e,n){t.exports=n()}(0,(function(){"use strict";function t(t){return"function"==typeof t}function i(){var t=setTimeout;return function(){return t(r,1)}}function r(){for(var t=0;t<S;t+=2)(0,q[t])(q[t+1]),q[t]=void 0,q[t+1]=void 0;S=0}function s(t,e){var n=arguments,o=this,i=new this.constructor(a);void 0===i[N]&&w(i);var r=o._state;return r?function(){var t=n[r-1];E((function(){return b(r,i,t,o._result)}))}():m(o,i,t,e),i}function u(t){if(t&&"object"==typeof t&&t.constructor===this)return t;var e=new this(a);return d(e,t),e}function a(){}function c(t){try{return t.then}catch(t){return Q.error=t,Q}}function l(e,n,o){n.constructor===e.constructor&&o===s&&n.constructor.resolve===u?function(t,e){e._state===H?h(t,e._result):e._state===W?p(t,e._result):m(e,void 0,(function(e){return d(t,e)}),(function(e){return p(t,e)}))}(e,n):o===Q?(p(e,Q.error),Q.error=null):void 0===o?h(e,n):t(o)?function(t,e,n){E((function(t){var o=!1,i=function(t,e,n,o){try{t.call(e,n,o)}catch(t){return t}}(n,e,(function(n){o||(o=!0,e!==n?d(t,n):h(t,n))}),(function(e){o||(o=!0,p(t,e))}),t._label);!o&&i&&(o=!0,p(t,i))}),t)}(e,n,o):h(e,n)}function d(t,e){t===e?p(t,new TypeError("You cannot resolve a promise with itself")):function(t){var e=typeof t;return null!==t&&("object"===e||"function"===e)}(e)?l(t,e,c(e)):h(t,e)}function f(t){t._onerror&&t._onerror(t._result),v(t)}function h(t,e){t._state===L&&(t._result=e,t._state=H,0!==t._subscribers.length&&E(v,t))}function p(t,e){t._state===L&&(t._state=W,t._result=e,E(f,t))}function m(t,e,n,o){var i=t._subscribers,r=i.length;t._onerror=null,i[r]=e,i[r+H]=n,i[r+W]=o,0===r&&t._state&&E(v,t)}function v(t){var e=t._subscribers,n=t._state;if(0!==e.length){for(var o=void 0,i=void 0,r=t._result,s=0;s<e.length;s+=3)o=e[s],i=e[s+n],o?b(n,o,i,r):i(r);t._subscribers.length=0}}function y(){this.error=null}function b(e,n,o,i){var r=t(o),s=void 0,u=void 0,a=void 0,c=void 0;if(r){if(s=function(t,e){try{return t(e)}catch(t){return V.error=t,V}}(o,i),s===V?(c=!0,u=s.error,s.error=null):a=!0,n===s)return void p(n,new TypeError("A promises callback cannot return that same promise."))}else s=i,a=!0;n._state!==L||(r&&a?d(n,s):c?p(n,u):e===H?h(n,s):e===W&&p(n,s))}function w(t){t[N]=B++,t._state=void 0,t._result=void 0,t._subscribers=[]}function g(t,e){this._instanceConstructor=t,this.promise=new t(a),this.promise[N]||w(this.promise),C(e)?(this.length=e.length,this._remaining=e.length,this._result=new Array(this.length),0===this.length?h(this.promise,this._result):(this.length=this.length||0,this._enumerate(e),0===this._remaining&&h(this.promise,this._result))):p(this.promise,new Error("Array Methods must be provided an Array"))}function _(t){this[N]=B++,this._result=this._state=void 0,this._subscribers=[],a!==t&&("function"!=typeof t&&function(){throw new TypeError("You must pass a resolver function as the first argument to the promise constructor")}(),this instanceof _?function(t,e){try{e((function(e){d(t,e)}),(function(e){p(t,e)}))}catch(e){p(t,e)}}(this,t):function(){throw new TypeError("Failed to construct 'Promise': Please use the 'new' operator, this object constructor cannot be called as a function.")}())}var k;k=Array.isArray?Array.isArray:function(t){return"[object Array]"===Object.prototype.toString.call(t)};var C=k,S=0,D=void 0,x=void 0,E=function(t,e){q[S]=t,q[S+1]=e,2===(S+=2)&&(x?x(r):j())},P="undefined"!=typeof window?window:void 0,T=P||{},O=T.MutationObserver||T.WebKitMutationObserver,A="undefined"==typeof self&&void 0!==e&&"[object process]"==={}.toString.call(e),M="undefined"!=typeof Uint8ClampedArray&&"undefined"!=typeof importScripts&&"undefined"!=typeof MessageChannel,q=new Array(1e3),j=void 0;j=A?function(){return e.nextTick(r)}:O?function(){var t=0,e=new O(r),n=document.createTextNode("");return e.observe(n,{characterData:!0}),function(){n.data=t=++t%2}}():M?function(){var t=new MessageChannel;return t.port1.onmessage=r,function(){return t.port2.postMessage(0)}}():void 0===P?function(){try{var t=n(9);return void 0!==(D=t.runOnLoop||t.runOnContext)?function(){D(r)}:i()}catch(t){return i()}}():i();var N=Math.random().toString(36).substring(16),L=void 0,H=1,W=2,Q=new y,V=new y,B=0;return g.prototype._enumerate=function(t){for(var e=0;this._state===L&&e<t.length;e++)this._eachEntry(t[e],e)},g.prototype._eachEntry=function(t,e){var n=this._instanceConstructor,o=n.resolve;if(o===u){var i=c(t);if(i===s&&t._state!==L)this._settledAt(t._state,e,t._result);else if("function"!=typeof i)this._remaining--,this._result[e]=t;else if(n===_){var r=new n(a);l(r,t,i),this._willSettleAt(r,e)}else this._willSettleAt(new n((function(e){return e(t)})),e)}else this._willSettleAt(o(t),e)},g.prototype._settledAt=function(t,e,n){var o=this.promise;o._state===L&&(this._remaining--,t===W?p(o,n):this._result[e]=n),0===this._remaining&&h(o,this._result)},g.prototype._willSettleAt=function(t,e){var n=this;m(t,void 0,(function(t){return n._settledAt(H,e,t)}),(function(t){return n._settledAt(W,e,t)}))},_.all=function(t){return new g(this,t).promise},_.race=function(t){var e=this;return new e(C(t)?function(n,o){for(var i=t.length,r=0;r<i;r++)e.resolve(t[r]).then(n,o)}:function(t,e){return e(new TypeError("You must pass an array to race."))})},_.resolve=u,_.reject=function(t){var e=new this(a);return p(e,t),e},_._setScheduler=function(t){x=t},_._setAsap=function(t){E=t},_._asap=E,_.prototype={constructor:_,then:s,catch:function(t){return this.then(null,t)}},_.polyfill=function(){var t=void 0;if(void 0!==o)t=o;else if("undefined"!=typeof self)t=self;else try{t=Function("return this")()}catch(t){throw new Error("polyfill failed because global object is unavailable in this environment")}var e=t.Promise;if(e){var n=null;try{n=Object.prototype.toString.call(e.resolve())}catch(t){}if("[object Promise]"===n&&!e.cast)return}t.Promise=_},_.Promise=_,_}))}).call(e,n(7),n(8))},function(t,e){},function(t,e,n){"use strict";function o(t){if(t&&t.__esModule)return t;var e={};if(null!=t)for(var n in t)Object.prototype.hasOwnProperty.call(t,n)&&(e[n]=t[n]);return e.default=t,e}Object.defineProperty(e,"__esModule",{value:!0});var i=function(){function t(t,e){for(var n=0;n<e.length;n++){var o=e[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(t,o.key,o)}}return function(e,n,o){return n&&t(e.prototype,n),o&&t(e,o),e}}();n(5);var r=function(t){return t&&t.__esModule?t:{default:t}}(n(4)),s=o(n(0)),u=o(n(1)),a=n(2),c=n(3),l=function(){function t(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this.options=s.deepExtend({},u.Defaults,e),u.Store[this.options.id]?u.Store[this.options.id]:(this.id=this.options.id||s.generateID("bar"),this.closeTimer=-1,this.barDom=null,this.layoutDom=null,this.progressDom=null,this.showing=!1,this.shown=!1,this.closed=!1,this.closing=!1,this.killable=this.options.timeout||this.options.closeWith.length>0,this.hasSound=this.options.sounds.sources.length>0,this.soundPlayed=!1,this.listeners={beforeShow:[],onShow:[],afterShow:[],onClose:[],afterClose:[],onClick:[],onHover:[],onTemplate:[]},this.promises={show:null,close:null},this.on("beforeShow",this.options.callbacks.beforeShow),this.on("onShow",this.options.callbacks.onShow),this.on("afterShow",this.options.callbacks.afterShow),this.on("onClose",this.options.callbacks.onClose),this.on("afterClose",this.options.callbacks.afterClose),this.on("onClick",this.options.callbacks.onClick),this.on("onHover",this.options.callbacks.onHover),this.on("onTemplate",this.options.callbacks.onTemplate),this)}return i(t,[{key:"on",value:function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:function(){};return"function"==typeof e&&this.listeners.hasOwnProperty(t)&&this.listeners[t].push(e),this}},{key:"show",value:function(){var e=this;if(this.showing||this.shown)return this;!0===this.options.killer?t.closeAll():"string"==typeof this.options.killer&&t.closeAll(this.options.killer);var n=u.getQueueCounts(this.options.queue);if(n.current>=n.maxVisible||u.PageHidden&&this.options.visibilityControl)return u.addToQueue(this),u.PageHidden&&this.hasSound&&s.inArray("docHidden",this.options.sounds.conditions)&&s.createAudioElements(this),u.PageHidden&&s.inArray("docHidden",this.options.titleCount.conditions)&&u.docTitle.increment(),this;if(u.Store[this.id]=this,u.fire(this,"beforeShow"),this.showing=!0,this.closing)return this.showing=!1,this;if(u.build(this),u.handleModal(this),this.options.force?this.layoutDom.insertBefore(this.barDom,this.layoutDom.firstChild):this.layoutDom.appendChild(this.barDom),this.hasSound&&!this.soundPlayed&&s.inArray("docVisible",this.options.sounds.conditions)&&s.createAudioElements(this),s.inArray("docVisible",this.options.titleCount.conditions)&&u.docTitle.increment(),this.shown=!0,this.closed=!1,u.hasButtons(this)&&Object.keys(this.options.buttons).forEach((function(t){var n=e.barDom.querySelector("#"+e.options.buttons[t].id);s.addListener(n,"click",(function(n){s.stopPropagation(n),e.options.buttons[t].cb(e)}))})),this.progressDom=this.barDom.querySelector(".noty_progressbar"),s.inArray("click",this.options.closeWith)&&(s.addClass(this.barDom,"noty_close_with_click"),s.addListener(this.barDom,"click",(function(t){s.stopPropagation(t),u.fire(e,"onClick"),e.close()}),!1)),s.addListener(this.barDom,"mouseenter",(function(){u.fire(e,"onHover")}),!1),this.options.timeout&&s.addClass(this.barDom,"noty_has_timeout"),this.options.progressBar&&s.addClass(this.barDom,"noty_has_progressbar"),s.inArray("button",this.options.closeWith)){s.addClass(this.barDom,"noty_close_with_button");var o=document.createElement("div");s.addClass(o,"noty_close_button"),o.innerHTML="×",this.barDom.appendChild(o),s.addListener(o,"click",(function(t){s.stopPropagation(t),e.close()}),!1)}return u.fire(this,"onShow"),null===this.options.animation.open?this.promises.show=new r.default((function(t){t()})):"function"==typeof this.options.animation.open?this.promises.show=new r.default(this.options.animation.open.bind(this)):(s.addClass(this.barDom,this.options.animation.open),this.promises.show=new r.default((function(t){s.addListener(e.barDom,s.animationEndEvents,(function(){s.removeClass(e.barDom,e.options.animation.open),t()}))}))),this.promises.show.then((function(){var t=e;setTimeout((function(){u.openFlow(t)}),100)})),this}},{key:"stop",value:function(){return u.dequeueClose(this),this}},{key:"resume",value:function(){return u.queueClose(this),this}},{key:"setTimeout",value:function(t){function e(e){return t.apply(this,arguments)}return e.toString=function(){return t.toString()},e}((function(t){if(this.stop(),this.options.timeout=t,this.barDom){this.options.timeout?s.addClass(this.barDom,"noty_has_timeout"):s.removeClass(this.barDom,"noty_has_timeout");var e=this;setTimeout((function(){e.resume()}),100)}return this}))},{key:"setText",value:function(t){var e=arguments.length>1&&void 0!==arguments[1]&&arguments[1];return this.barDom&&(this.barDom.querySelector(".noty_body").innerHTML=t),e&&(this.options.text=t),this}},{key:"setType",value:function(t){var e=this,n=arguments.length>1&&void 0!==arguments[1]&&arguments[1];return this.barDom&&(s.classList(this.barDom).split(" ").forEach((function(t){"noty_type__"===t.substring(0,11)&&s.removeClass(e.barDom,t)})),s.addClass(this.barDom,"noty_type__"+t)),n&&(this.options.type=t),this}},{key:"setTheme",value:function(t){var e=this,n=arguments.length>1&&void 0!==arguments[1]&&arguments[1];return this.barDom&&(s.classList(this.barDom).split(" ").forEach((function(t){"noty_theme__"===t.substring(0,12)&&s.removeClass(e.barDom,t)})),s.addClass(this.barDom,"noty_theme__"+t)),n&&(this.options.theme=t),this}},{key:"close",value:function(){var t=this;return this.closed?this:this.shown?(u.fire(this,"onClose"),this.closing=!0,null===this.options.animation.close||!1===this.options.animation.close?this.promises.close=new r.default((function(t){t()})):"function"==typeof this.options.animation.close?this.promises.close=new r.default(this.options.animation.close.bind(this)):(s.addClass(this.barDom,this.options.animation.close),this.promises.close=new r.default((function(e){s.addListener(t.barDom,s.animationEndEvents,(function(){t.options.force?s.remove(t.barDom):u.ghostFix(t),e()}))}))),this.promises.close.then((function(){u.closeFlow(t),u.handleModalClose(t)})),this.closed=!0,this):(u.removeFromQueue(this),this)}}],[{key:"closeAll",value:function(){var t=arguments.length>0&&void 0!==arguments[0]&&arguments[0];return Object.keys(u.Store).forEach((function(e){t?u.Store[e].options.queue===t&&u.Store[e].killable&&u.Store[e].close():u.Store[e].killable&&u.Store[e].close()})),this}},{key:"clearQueue",value:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"global";return u.Queues.hasOwnProperty(t)&&(u.Queues[t].queue=[]),this}},{key:"overrideDefaults",value:function(t){return u.Defaults=s.deepExtend({},u.Defaults,t),this}},{key:"setMaxVisible",value:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:u.DefaultMaxVisible,e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"global";return u.Queues.hasOwnProperty(e)||(u.Queues[e]={maxVisible:t,queue:[]}),u.Queues[e].maxVisible=t,this}},{key:"button",value:function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null,n=arguments[2],o=arguments.length>3&&void 0!==arguments[3]?arguments[3]:{};return new a.NotyButton(t,e,n,o)}},{key:"version",value:function(){return"3.2.0-beta"}},{key:"Push",value:function(t){return new c.Push(t)}},{key:"Queues",get:function(){return u.Queues}},{key:"PageHidden",get:function(){return u.PageHidden}}]),t}();e.default=l,"undefined"!=typeof window&&s.visibilityChangeFlow(),t.exports=e.default},function(t,e){function n(){throw new Error("setTimeout has not been defined")}function o(){throw new Error("clearTimeout has not been defined")}function i(t){if(c===setTimeout)return setTimeout(t,0);if((c===n||!c)&&setTimeout)return c=setTimeout,setTimeout(t,0);try{return c(t,0)}catch(e){try{return c.call(null,t,0)}catch(e){return c.call(this,t,0)}}}function r(){p&&f&&(p=!1,f.length?h=f.concat(h):m=-1,h.length&&s())}function s(){if(!p){var t=i(r);p=!0;for(var e=h.length;e;){for(f=h,h=[];++m<e;)f&&f[m].run();m=-1,e=h.length}f=null,p=!1,function(t){if(l===clearTimeout)return clearTimeout(t);if((l===o||!l)&&clearTimeout)return l=clearTimeout,clearTimeout(t);try{return l(t)}catch(e){try{return l.call(null,t)}catch(e){return l.call(this,t)}}}(t)}}function u(t,e){this.fun=t,this.array=e}function a(){}var c,l,d=t.exports={};!function(){try{c="function"==typeof setTimeout?setTimeout:n}catch(t){c=n}try{l="function"==typeof clearTimeout?clearTimeout:o}catch(t){l=o}}();var f,h=[],p=!1,m=-1;d.nextTick=function(t){var e=new Array(arguments.length-1);if(arguments.length>1)for(var n=1;n<arguments.length;n++)e[n-1]=arguments[n];h.push(new u(t,e)),1!==h.length||p||i(s)},u.prototype.run=function(){this.fun.apply(null,this.array)},d.title="browser",d.browser=!0,d.env={},d.argv=[],d.version="",d.versions={},d.on=a,d.addListener=a,d.once=a,d.off=a,d.removeListener=a,d.removeAllListeners=a,d.emit=a,d.prependListener=a,d.prependOnceListener=a,d.listeners=function(t){return[]},d.binding=function(t){throw new Error("process.binding is not supported")},d.cwd=function(){return"/"},d.chdir=function(t){throw new Error("process.chdir is not supported")},d.umask=function(){return 0}},function(t,e){var n;n=function(){return this}();try{n=n||Function("return this")()||(0,eval)("this")}catch(t){"object"==typeof window&&(n=window)}t.exports=n},function(t,e){}])}));