/*! For license information please see forum.js.LICENSE.txt */
(()=>{var t={24:(t,e,r)=>{var n=r(735).default;function o(){"use strict";t.exports=o=function(){return r},t.exports.__esModule=!0,t.exports.default=t.exports;var e,r={},a=Object.prototype,i=a.hasOwnProperty,s=Object.defineProperty||function(t,e,r){t[e]=r.value},c="function"==typeof Symbol?Symbol:{},u=c.iterator||"@@iterator",l=c.asyncIterator||"@@asyncIterator",p=c.toStringTag||"@@toStringTag";function h(t,e,r){return Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}),t[e]}try{h({},"")}catch(e){h=function(t,e,r){return t[e]=r}}function m(t,e,r,n){var o=e&&e.prototype instanceof k?e:k,a=Object.create(o.prototype),i=new O(n||[]);return s(a,"_invoke",{value:T(t,r,i)}),a}function f(t,e,r){try{return{type:"normal",arg:t.call(e,r)}}catch(t){return{type:"throw",arg:t}}}r.wrap=m;var d="suspendedStart",v="suspendedYield",x="executing",y="completed",g={};function k(){}function w(){}function _(){}var b={};h(b,u,(function(){return this}));var N=Object.getPrototypeOf,L=N&&N(N(F([])));L&&L!==a&&i.call(L,u)&&(b=L);var E=_.prototype=k.prototype=Object.create(b);function P(t){["next","throw","return"].forEach((function(e){h(t,e,(function(t){return this._invoke(e,t)}))}))}function S(t,e){function r(o,a,s,c){var u=f(t[o],t,a);if("throw"!==u.type){var l=u.arg,p=l.value;return p&&"object"==n(p)&&i.call(p,"__await")?e.resolve(p.__await).then((function(t){r("next",t,s,c)}),(function(t){r("throw",t,s,c)})):e.resolve(p).then((function(t){l.value=t,s(l)}),(function(t){return r("throw",t,s,c)}))}c(u.arg)}var o;s(this,"_invoke",{value:function(t,n){function a(){return new e((function(e,o){r(t,n,e,o)}))}return o=o?o.then(a,a):a()}})}function T(t,r,n){var o=d;return function(a,i){if(o===x)throw Error("Generator is already running");if(o===y){if("throw"===a)throw i;return{value:e,done:!0}}for(n.method=a,n.arg=i;;){var s=n.delegate;if(s){var c=C(s,n);if(c){if(c===g)continue;return c}}if("next"===n.method)n.sent=n._sent=n.arg;else if("throw"===n.method){if(o===d)throw o=y,n.arg;n.dispatchException(n.arg)}else"return"===n.method&&n.abrupt("return",n.arg);o=x;var u=f(t,r,n);if("normal"===u.type){if(o=n.done?y:v,u.arg===g)continue;return{value:u.arg,done:n.done}}"throw"===u.type&&(o=y,n.method="throw",n.arg=u.arg)}}}function C(t,r){var n=r.method,o=t.iterator[n];if(o===e)return r.delegate=null,"throw"===n&&t.iterator.return&&(r.method="return",r.arg=e,C(t,r),"throw"===r.method)||"return"!==n&&(r.method="throw",r.arg=new TypeError("The iterator does not provide a '"+n+"' method")),g;var a=f(o,t.iterator,r.arg);if("throw"===a.type)return r.method="throw",r.arg=a.arg,r.delegate=null,g;var i=a.arg;return i?i.done?(r[t.resultName]=i.value,r.next=t.nextLoc,"return"!==r.method&&(r.method="next",r.arg=e),r.delegate=null,g):i:(r.method="throw",r.arg=new TypeError("iterator result is not an object"),r.delegate=null,g)}function D(t){var e={tryLoc:t[0]};1 in t&&(e.catchLoc=t[1]),2 in t&&(e.finallyLoc=t[2],e.afterLoc=t[3]),this.tryEntries.push(e)}function M(t){var e=t.completion||{};e.type="normal",delete e.arg,t.completion=e}function O(t){this.tryEntries=[{tryLoc:"root"}],t.forEach(D,this),this.reset(!0)}function F(t){if(t||""===t){var r=t[u];if(r)return r.call(t);if("function"==typeof t.next)return t;if(!isNaN(t.length)){var o=-1,a=function r(){for(;++o<t.length;)if(i.call(t,o))return r.value=t[o],r.done=!1,r;return r.value=e,r.done=!0,r};return a.next=a}}throw new TypeError(n(t)+" is not iterable")}return w.prototype=_,s(E,"constructor",{value:_,configurable:!0}),s(_,"constructor",{value:w,configurable:!0}),w.displayName=h(_,p,"GeneratorFunction"),r.isGeneratorFunction=function(t){var e="function"==typeof t&&t.constructor;return!!e&&(e===w||"GeneratorFunction"===(e.displayName||e.name))},r.mark=function(t){return Object.setPrototypeOf?Object.setPrototypeOf(t,_):(t.__proto__=_,h(t,p,"GeneratorFunction")),t.prototype=Object.create(E),t},r.awrap=function(t){return{__await:t}},P(S.prototype),h(S.prototype,l,(function(){return this})),r.AsyncIterator=S,r.async=function(t,e,n,o,a){void 0===a&&(a=Promise);var i=new S(m(t,e,n,o),a);return r.isGeneratorFunction(e)?i:i.next().then((function(t){return t.done?t.value:i.next()}))},P(E),h(E,p,"Generator"),h(E,u,(function(){return this})),h(E,"toString",(function(){return"[object Generator]"})),r.keys=function(t){var e=Object(t),r=[];for(var n in e)r.push(n);return r.reverse(),function t(){for(;r.length;){var n=r.pop();if(n in e)return t.value=n,t.done=!1,t}return t.done=!0,t}},r.values=F,O.prototype={constructor:O,reset:function(t){if(this.prev=0,this.next=0,this.sent=this._sent=e,this.done=!1,this.delegate=null,this.method="next",this.arg=e,this.tryEntries.forEach(M),!t)for(var r in this)"t"===r.charAt(0)&&i.call(this,r)&&!isNaN(+r.slice(1))&&(this[r]=e)},stop:function(){this.done=!0;var t=this.tryEntries[0].completion;if("throw"===t.type)throw t.arg;return this.rval},dispatchException:function(t){if(this.done)throw t;var r=this;function n(n,o){return s.type="throw",s.arg=t,r.next=n,o&&(r.method="next",r.arg=e),!!o}for(var o=this.tryEntries.length-1;o>=0;--o){var a=this.tryEntries[o],s=a.completion;if("root"===a.tryLoc)return n("end");if(a.tryLoc<=this.prev){var c=i.call(a,"catchLoc"),u=i.call(a,"finallyLoc");if(c&&u){if(this.prev<a.catchLoc)return n(a.catchLoc,!0);if(this.prev<a.finallyLoc)return n(a.finallyLoc)}else if(c){if(this.prev<a.catchLoc)return n(a.catchLoc,!0)}else{if(!u)throw Error("try statement without catch or finally");if(this.prev<a.finallyLoc)return n(a.finallyLoc)}}}},abrupt:function(t,e){for(var r=this.tryEntries.length-1;r>=0;--r){var n=this.tryEntries[r];if(n.tryLoc<=this.prev&&i.call(n,"finallyLoc")&&this.prev<n.finallyLoc){var o=n;break}}o&&("break"===t||"continue"===t)&&o.tryLoc<=e&&e<=o.finallyLoc&&(o=null);var a=o?o.completion:{};return a.type=t,a.arg=e,o?(this.method="next",this.next=o.finallyLoc,g):this.complete(a)},complete:function(t,e){if("throw"===t.type)throw t.arg;return"break"===t.type||"continue"===t.type?this.next=t.arg:"return"===t.type?(this.rval=this.arg=t.arg,this.method="return",this.next="end"):"normal"===t.type&&e&&(this.next=e),g},finish:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var r=this.tryEntries[e];if(r.finallyLoc===t)return this.complete(r.completion,r.afterLoc),M(r),g}},catch:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var r=this.tryEntries[e];if(r.tryLoc===t){var n=r.completion;if("throw"===n.type){var o=n.arg;M(r)}return o}}throw Error("illegal catch attempt")},delegateYield:function(t,r,n){return this.delegate={iterator:F(t),resultName:r,nextLoc:n},"next"===this.method&&(this.arg=e),g}},r}t.exports=o,t.exports.__esModule=!0,t.exports.default=t.exports},735:t=>{function e(r){return t.exports=e="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},t.exports.__esModule=!0,t.exports.default=t.exports,e(r)}t.exports=e,t.exports.__esModule=!0,t.exports.default=t.exports},183:(t,e,r)=>{var n=r(24)();t.exports=n;try{regeneratorRuntime=n}catch(t){"object"==typeof globalThis?globalThis.regeneratorRuntime=n:Function("r","regeneratorRuntime = r")(n)}}},e={};function r(n){var o=e[n];if(void 0!==o)return o.exports;var a=e[n]={exports:{}};return t[n](a,a.exports,r),a.exports}r.n=t=>{var e=t&&t.__esModule?()=>t.default:()=>t;return r.d(e,{a:e}),e},r.d=(t,e)=>{for(var n in e)r.o(e,n)&&!r.o(t,n)&&Object.defineProperty(t,n,{enumerable:!0,get:e[n]})},r.o=(t,e)=>Object.prototype.hasOwnProperty.call(t,e),(()=>{"use strict";const t=flarum.core.compat["common/app"];r.n(t)().initializers.add("lewuocvi/knoxextchecker",(function(){console.log("[lewuocvi/knoxextchecker] Hello, forum and admin!")}));const e=flarum.core.compat["forum/app"];var n=r.n(e);function o(t,e,r,n,o,a,i){try{var s=t[a](i),c=s.value}catch(t){return void r(t)}s.done?e(c):Promise.resolve(c).then(n,o)}function a(t){return function(){var e=this,r=arguments;return new Promise((function(n,a){var i=t.apply(e,r);function s(t){o(i,n,a,s,c,"next",t)}function c(t){o(i,n,a,s,c,"throw",t)}s(void 0)}))}}function i(t,e){return i=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(t,e){return t.__proto__=e,t},i(t,e)}function s(t,e){t.prototype=Object.create(e.prototype),t.prototype.constructor=t,i(t,e)}var c=r(183),u=r.n(c);const l=flarum.core.compat["components/Page"];var p=r.n(l);const h=flarum.core.compat["components/Button"];var f=r.n(h);const d=flarum.core.compat["utils/Stream"];var v=r.n(d);const x=flarum.core.compat["components/LoadingIndicator"];var y=r.n(x);const g=flarum.core.compat.Component;var k=function(t){function e(){return t.apply(this,arguments)||this}s(e,t);var r=e.prototype;return r.oninit=function(e){t.prototype.oninit.call(this,e),this.canvas=null,this.ctx=null,this.chars="ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",this.fontSize=10,this.columns=0,this.drops=[]},r.oncreate=function(e){t.prototype.oncreate.call(this,e),this.canvas=this.element,this.ctx=this.canvas.getContext("2d"),this.initializeMatrix(),this.animate(),window.addEventListener("resize",this.resizeCanvas.bind(this))},r.onremove=function(){t.prototype.onremove.call(this),window.removeEventListener("resize",this.resizeCanvas.bind(this))},r.resizeCanvas=function(){this.initializeMatrix()},r.initializeMatrix=function(){this.canvas.width=this.element.offsetWidth,this.canvas.height=this.element.offsetHeight,this.columns=Math.floor(this.canvas.width/this.fontSize),this.drops=new Array(this.columns).fill(1)},r.animate=function(){this.ctx.fillStyle="rgba(0, 0, 0, 0.05)",this.ctx.fillRect(0,0,this.canvas.width,this.canvas.height),this.ctx.fillStyle="#4D698E",this.ctx.font=this.fontSize+"px monospace";for(var t=0;t<this.drops.length;t++){var e=this.chars[Math.floor(Math.random()*this.chars.length)];this.ctx.fillText(e,t*this.fontSize,this.drops[t]*this.fontSize),this.drops[t]*this.fontSize>this.canvas.height&&Math.random()>.975&&(this.drops[t]=0),this.drops[t]++}requestAnimationFrame(this.animate.bind(this))},r.view=function(){return m("canvas",null)},e}(r.n(g)()),w=function(t){function e(){return t.apply(this,arguments)||this}s(e,t);var r=e.prototype;return r.oninit=function(e){t.prototype.oninit.call(this,e),this.imei=v()(""),this.loading=v()(!1),this.result=v()(null)},r.oncreate=function(e){t.prototype.oncreate.call(this,e),document.title=app.translator.trans("lewuocvi-knoxextchecker.forum.page_title"),this.updateMetaTag("description",app.translator.trans("lewuocvi-knoxextchecker.forum.page_description")),this.updateMetaTag("keywords","IMEI, Knox, Warranty, Check")},r.updateMetaTag=function(t,e){var r=document.querySelector('meta[name="'+t+'"]');r||((r=document.createElement("meta")).name=t,document.head.appendChild(r)),r.content=e},r.initLoadingText=function(){var t=this.element.querySelector(".LoadingText");if(t){var e=app.translator.trans("lewuocvi-knoxextchecker.forum.exploiting"),r=0;!function n(){r<e.length?(t.textContent+=e[r],r++,setTimeout(n,100)):setTimeout((function(){t.textContent="",r=0,n()}),1e3)}()}},r.checkImei=function(){var t=a(u().mark((function t(e){var r,n=this;return u().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(e.preventDefault(),app.session.user){t.next=5;break}return this.result({status:"error",message:app.translator.trans("lewuocvi-knoxextchecker.forum.login_required")}),m.redraw(),t.abrupt("return");case 5:return this.result(null),this.loading(!0),setTimeout((function(){n.initLoadingText()}),3),t.prev=8,t.next=11,app.request({method:"POST",url:app.forum.attribute("apiUrl")+"/knox-checker",body:{imei:this.imei()}});case 11:r=t.sent,this.result(r),console.log("API response:",r),r&&r.id?location.href=app.forum.attribute("baseUrl")+"/d/"+r.id:location.reload(),t.next=23;break;case 17:t.prev=17,t.t0=t.catch(8),console.error("Error:",t.t0),this.result({status:"error",message:app.translator.trans("lewuocvi-knoxextchecker.forum.error_title")}),this.loading(!1),m.redraw();case 23:case"end":return t.stop()}}),t,this,[[8,17]])})));return function(e){return t.apply(this,arguments)}}(),r.view=function(){return m("div",{className:"CheckImeiPage"},this.loading()&&m("div",{className:"LoadingOverlay"},m("div",{className:"MatrixEffectContainer"},m(k,null)),m("div",{className:"LoadingContent"},m(y(),{size:"large"}),m("div",{className:"LoadingText"},app.translator.trans("lewuocvi-knoxextchecker.forum.exploiting")))),m("div",{className:"container"},!1===this.loading()&&null===this.result()&&m("div",{className:"containerForm"},m("h2",null,app.translator.trans("lewuocvi-knoxextchecker.forum.title")),m("form",{onsubmit:this.checkImei.bind(this),className:"ImeiForm"},m("div",{className:"FormMainGroup"},m("div",{className:"FormGroup"},m("input",{className:"FormControl ImeiInput",placeholder:app.translator.trans("lewuocvi-knoxextchecker.forum.imei_input"),bidi:this.imei,type:"text",maxlength:"15"}),m(f(),{type:"submit",className:"Button Button--primary",disabled:15!==this.imei().length}," ",app.translator.trans("lewuocvi-knoxextchecker.forum.check_button")," "))))),this.result()&&m("div",{className:"containerResult"},m("div",{className:"Result"},"error"===this.result().status&&m("div",{className:"ResultError"},m("h2",null,app.translator.trans("lewuocvi-knoxextchecker.forum.error_title")),m("p",null,this.result().message))))))},e}(p()),_=function(t){function e(){return t.apply(this,arguments)||this}s(e,t);var r=e.prototype;return r.oninit=function(e){t.prototype.oninit.call(this,e),this.loading=v()(!0),this.user=null,this.error=null,this.baseUrl=app.forum.attribute("baseUrl"),app.session.user?this.loadUserData():location.href=this.baseUrl},r.oncreate=function(e){t.prototype.oncreate.call(this,e),document.title=app.translator.trans("lewuocvi-knoxextchecker.forum.user_page_title"),this.updateMetaTag("description",app.translator.trans("lewuocvi-knoxextchecker.forum.user_page_description"))},r.updateMetaTag=function(t,e){var r=document.querySelector('meta[name="'+t+'"]');r||((r=document.createElement("meta")).name=t,document.head.appendChild(r)),r.content=e},r.loadUserData=function(){var t=a(u().mark((function t(){return u().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,app.request({method:"POST",url:app.forum.attribute("apiUrl")+"/knox-checker/user"});case 3:this.user=t.sent,this.loading(!1),t.next=12;break;case 7:t.prev=7,t.t0=t.catch(0),this.error=app.translator.trans("lewuocvi-knoxextchecker.forum.error_loading_user_data"),this.loading(!1),console.error("Error loading user data:",t.t0);case 12:return t.prev=12,m.redraw(),t.finish(12);case 15:case"end":return t.stop()}}),t,this,[[0,7,12,15]])})));return function(){return t.apply(this,arguments)}}(),r.formatCurrency=function(t){return new Intl.NumberFormat("vi-VN",{style:"currency",currency:"VND",minimumFractionDigits:0,maximumFractionDigits:0}).format(t)},r.formatTimeAgo=function(t){var e=new Date,r=Math.floor((e-t)/1e3);if(r<60)return app.translator.trans("lewuocvi-knoxextchecker.forum.just_now");var n=Math.floor(r/60);if(n<60)return app.translator.trans("lewuocvi-knoxextchecker.forum.minutes_ago",{count:n});var o=Math.floor(n/60);return o<24?app.translator.trans("lewuocvi-knoxextchecker.forum.hours_ago",{count:o}):t.toLocaleString()},r.view=function(){if(this.loading())return m(y(),null);if(this.error)return m("div",{className:"UserPage"},this.error);if(!this.user||!this.user.user)return m("div",{className:"UserPage"},app.translator.trans("lewuocvi-knoxextchecker.forum.no_user_data"));var t=this.user,e=t.user,r=(t.status,e.wallet);return m("div",{className:"UserPage"},m("div",{className:"container"},m("h2",null,app.translator.trans("lewuocvi-knoxextchecker.forum.user_page_title")),m("div",{className:"UserInfo"},m("table",{className:"UserDetails"},m("thead",null,m("tr",null,m("th",{colSpan:"2"},app.translator.trans("lewuocvi-knoxextchecker.forum.user_profile")))),m("tbody",null,m("tr",null,m("td",null,app.translator.trans("lewuocvi-knoxextchecker.forum.name")),m("td",null,e.name)),m("tr",null,m("td",null,app.translator.trans("lewuocvi-knoxextchecker.forum.email")),m("td",null,e.email)),m("tr",null,m("td",null,app.translator.trans("lewuocvi-knoxextchecker.forum.user_id")),m("td",null,e.id)),m("tr",null,m("td",null,app.translator.trans("lewuocvi-knoxextchecker.forum.created_at")),m("td",null,this.formatTimeAgo(new Date(e.created_at)))),m("tr",null,m("td",null,app.translator.trans("lewuocvi-knoxextchecker.forum.updated_at")),m("td",null,this.formatTimeAgo(new Date(e.updated_at)))))),m("table",{className:"WalletDetails"},m("thead",null,m("tr",null,m("th",{colSpan:"2"},m("div",{className:"WalletDetailTitle"},m("p",null,app.translator.trans("lewuocvi-knoxextchecker.forum.wallet_info")),m("a",{href:this.baseUrl+"/knox-checker/deposit"}," ",m("i",{class:"fas fa-dollar-sign"})," ",app.translator.trans("lewuocvi-knoxextchecker.forum.deposit_money")))))),m("tbody",null,m("tr",null,m("td",null,app.translator.trans("lewuocvi-knoxextchecker.forum.total_deposited")),m("td",null,this.formatCurrency(r.total_deposited))),m("tr",null,m("td",null,app.translator.trans("lewuocvi-knoxextchecker.forum.total_used")),m("td",null,this.formatCurrency(r.total_used))),m("tr",null,m("td",null,app.translator.trans("lewuocvi-knoxextchecker.forum.balance")),m("td",null,this.formatCurrency(r.balance))),m("tr",null,m("td",null,app.translator.trans("lewuocvi-knoxextchecker.forum.wallet_updated_at")),m("td",null,this.formatTimeAgo(new Date(r.updated_at)))))))))},e}(p()),b=function(t){function e(){return t.apply(this,arguments)||this}s(e,t);var r=e.prototype;return r.oninit=function(e){t.prototype.oninit.call(this,e),this.depositAmount=v()("100000"),this.loading=v()(!0),this.deposit=v()({}),this.depositHistory=v()([]),this.currentPage=v()(1),this.lastPage=v()(1),this.baseUrl=app.forum.attribute("baseUrl"),app.session.user?(this.generateQRCode(),this.loadDepositHistory()):location.href=this.baseUrl},r.oncreate=function(e){t.prototype.oncreate.call(this,e),document.title=app.translator.trans("lewuocvi-knoxextchecker.forum.deposit_page_title"),this.updateMetaTag("description",app.translator.trans("lewuocvi-knoxextchecker.forum.deposit_page_description"))},r.updateMetaTag=function(t,e){var r=document.querySelector('meta[name="'+t+'"]');r||((r=document.createElement("meta")).name=t,document.head.appendChild(r)),r.content=e},r.formatCurrency=function(t){return new Intl.NumberFormat("vi-VN",{style:"currency",currency:"VND",minimumFractionDigits:0,maximumFractionDigits:0}).format(t)},r.submitHandler=function(){var t=a(u().mark((function t(e){return u().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:e.preventDefault(),this.generateQRCode();case 2:case"end":return t.stop()}}),t,this)})));return function(e){return t.apply(this,arguments)}}(),r.generateQRCode=function(){var t=a(u().mark((function t(){var e,r,n,o,a,i;return u().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(app.session.user){t.next=6;break}return this.loading(!1),this.error=app.translator.trans("lewuocvi-knoxextchecker.forum.not_logged_in"),m.redraw(),t.abrupt("return");case 6:return t.prev=6,t.next=9,app.request({method:"POST",url:app.forum.attribute("apiUrl")+"/knox-checker/deposit",body:{action:"generate",deposit_amount:this.depositAmount()}});case 9:if("success"!==(e=t.sent).status){t.next=15;break}r=e.deposit,n=r.qrcode_url,o=r.content,a=r.message,i=r.amount,this.deposit({qrcode_url:n,content:o,message:a,amount:i}),t.next=16;break;case 15:throw new Error(e.message||"Unknown error occurred");case 16:t.next=22;break;case 18:t.prev=18,t.t0=t.catch(6),console.error("Error generating QR code:",t.t0),app.alerts.show({type:"error"},app.translator.trans("lewuocvi-knoxextchecker.forum.qr_generation_error"));case 22:return t.prev=22,this.loading(!1),m.redraw(),t.finish(22);case 26:case"end":return t.stop()}}),t,this,[[6,18,22,26]])})));return function(){return t.apply(this,arguments)}}(),r.loadDepositHistory=function(){var t=a(u().mark((function t(){var e,r=this;return u().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,app.request({method:"POST",url:app.forum.attribute("apiUrl")+"/knox-checker/deposit",body:{action:"history",page:this.currentPage(),limit:10}});case 3:"success"===(e=t.sent).status?(this.depositHistory(e.data.map((function(t){return{id:t.id,date:r.formatTimeAgo(new Date(t.created_at)),amount:t.amount,detail:t.description}}))),this.currentPage(e.current_page),this.lastPage(e.last_page)):(console.error("Error in response:",e.message),app.alerts.show({type:"error"},app.translator.trans("lewuocvi-knoxextchecker.forum.deposit_history_load_error"))),t.next=11;break;case 7:t.prev=7,t.t0=t.catch(0),console.error("Error loading deposit history:",t.t0),app.alerts.show({type:"error"},app.translator.trans("lewuocvi-knoxextchecker.forum.deposit_history_load_error"));case 11:return t.prev=11,this.loading(!1),m.redraw(),t.finish(11);case 15:case"end":return t.stop()}}),t,this,[[0,7,11,15]])})));return function(){return t.apply(this,arguments)}}(),r.formatTimeAgo=function(t){var e=new Date,r=Math.floor((e-t)/1e3);if(r<60)return app.translator.trans("lewuocvi-knoxextchecker.forum.just_now");var n=Math.floor(r/60);if(n<60)return app.translator.trans("lewuocvi-knoxextchecker.forum.minutes_ago",{count:n});var o=Math.floor(n/60);return o<24?app.translator.trans("lewuocvi-knoxextchecker.forum.hours_ago",{count:o}):t.toLocaleString()},r.changePage=function(t){t>0&&t<=this.lastPage()&&(this.currentPage(t),this.loading(!0),this.loadDepositHistory())},r.view=function(){var t=this;return console.log("Deposit history:",this.depositHistory()),m("div",{className:"DepositPage"},this.loading()&&m("div",{className:"LoadingOverlay"},m(y(),{size:"large"})),m("div",{className:"container"},m("div",{className:"containerForm"},m("h2",null,app.translator.trans("lewuocvi-knoxextchecker.forum.deposit_title")),m("form",{onsubmit:this.submitHandler.bind(this),className:"DepositForm"},m("div",{className:"FormGroup"},m("div",{className:"PresetButtons"},[1e5,15e4,2e5,3e5,5e5].map((function(e){return m(f(),{key:e,className:"Button Button--secondary PresetButton",onclick:function(){return t.depositAmount(e.toString())}},e.toLocaleString())}))),m("div",{className:"InputButtonGroup"},m("input",{className:"FormControl AmountInput",placeholder:app.translator.trans("lewuocvi-knoxextchecker.forum.deposit_amount_input"),bidi:this.depositAmount,type:"number",min:"1"}),m(f(),{type:"submit",className:"Button Button--primary",disabled:!this.depositAmount()||this.depositAmount()<=99e3},app.translator.trans("lewuocvi-knoxextchecker.forum.generate_qr_button"))))),this.deposit().qrcode_url&&m("div",{className:"QRCodeContainer"},m("img",{src:this.deposit().qrcode_url,alt:"QR Code for deposit"}),m("h4",null,app.translator.trans("lewuocvi-knoxextchecker.forum.qr_code_title")),m("div",{className:"DepositContainer"},m("p",{className:"DepositContent"},app.translator.trans("lewuocvi-knoxextchecker.forum.deposit_content"),": ",this.deposit().content),m("p",{className:"depositAmount"},app.translator.trans("lewuocvi-knoxextchecker.forum.deposit_amount"),": ",this.formatCurrency(this.deposit().amount))),m("p",{className:"DepositMessage"},this.deposit().message))),m("div",{className:"DepositHistory"},m("h2",null,app.translator.trans("lewuocvi-knoxextchecker.forum.deposit_history_title")),m("table",{className:"DepositHistoryTable"},m("thead",null,m("tr",null,m("th",null,app.translator.trans("lewuocvi-knoxextchecker.forum.deposit_history_date")),m("th",null,app.translator.trans("lewuocvi-knoxextchecker.forum.deposit_history_amount")),m("th",null,app.translator.trans("lewuocvi-knoxextchecker.forum.deposit_history_detail")))),m("tbody",null,0===this.depositHistory().length?m("tr",null,m("td",{colSpan:"3"},app.translator.trans("lewuocvi-knoxextchecker.forum.no_deposit_history"))):this.depositHistory().map((function(e){return m("tr",{key:e.id},m("td",null,e.date),m("td",null,t.formatCurrency(e.amount)),m("td",null,e.detail))})))),m("div",{className:"Pagination"},Array.from({length:this.lastPage()},(function(t,e){return e+1})).map((function(e){return m(f(),{key:e,className:"Button "+(t.currentPage()===e?"Button--primary":"Button--secondary"),onclick:function(){return t.changePage(e)}},e)}))))))},e}(p());n().initializers.add("lewuocvi/flarum-knox-checker",(function(){n().routes["knox-checker-page"]={path:"/knox-checker",component:w},n().routes["knox-checker/user-page"]={path:"/knox-checker/user",component:_},n().routes["knox-checker/deposit-page"]={path:"/knox-checker/deposit",component:b}}))})(),module.exports={}})();
//# sourceMappingURL=forum.js.map