(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["common/main"],{"25fa":function(e,t,n){"use strict";(function(e){n("cc10"),n("921b");var t=o(n("66fd")),r=o(n("aece"));function o(e){return e&&e.__esModule?e:{default:e}}function u(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{},r=Object.keys(n);"function"===typeof Object.getOwnPropertySymbols&&(r=r.concat(Object.getOwnPropertySymbols(n).filter(function(e){return Object.getOwnPropertyDescriptor(n,e).enumerable}))),r.forEach(function(t){a(e,t,n[t])})}return e}function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}t.default.config.productionTip=!1,r.default.mpType="app";var i=new t.default(u({},r.default));e(i).$mount()}).call(this,n("a821")["createApp"])},6013:function(e,t,n){"use strict";n.r(t);var r=n("d3d4"),o=n.n(r);for(var u in r)"default"!==u&&function(e){n.d(t,e,function(){return r[e]})}(u);t["default"]=o.a},aece:function(e,t,n){"use strict";n.r(t);var r=n("6013");for(var o in r)"default"!==o&&function(e){n.d(t,e,function(){return r[e]})}(o);n("eafe");var u,a,i=n("2877"),c=Object(i["a"])(r["default"],u,a,!1,null,null,null);t["default"]=c.exports},d3d4:function(e,t,n){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var r=u(n("a34a"));n("3c7d");var o=u(n("528d"));function u(e){return e&&e.__esModule?e:{default:e}}function a(e,t,n,r,o,u,a){try{var i=e[u](a),c=i.value}catch(f){return void n(f)}i.done?t(c):Promise.resolve(c).then(r,o)}function i(e){return function(){var t=this,n=arguments;return new Promise(function(r,o){var u=e.apply(t,n);function i(e){a(u,r,o,i,c,"next",e)}function c(e){a(u,r,o,i,c,"throw",e)}i(void 0)})}}var c={globalData:{userInfo:null,host:"http://2792162wb2.zicp.vip:37952/",apiVersion:"v1.0/"},onLaunch:function(){e.setStorageSync("SundayDate","2019-11-17"),e.setStorageSync("nthWeek","13"),console.log("App Launch");var t=this;t.$options.getUserInfoByAuthorize()},getUserInfoByAuthorize:function(){var e=this;e.globalData.userInfo||e.isAuth()},isAuth:function(){var e=i(r.default.mark(function e(){return r.default.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,o.default.isAuthorize();case 2:if(!e.sent){e.next=5;break}console.log("运行"),this.getUserInfoAndstorage();case 5:case"end":return e.stop()}},e,this)}));function t(){return e.apply(this,arguments)}return t}(),getUserInfoAndstorage:function(){var t=i(r.default.mark(function t(){var n;return r.default.wrap(function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,o.default.getUserInfoFromServer(this);case 2:n=t.sent,this.globalData.userInfo=n,e.setStorageSync("openid",n.openid);case 5:case"end":return t.stop()}},t,this)}));function n(){return t.apply(this,arguments)}return n}(),onShow:function(){console.log("App Show")},onHide:function(){console.log("App Hide")}};t.default=c}).call(this,n("a821")["default"])},d855:function(e,t,n){},eafe:function(e,t,n){"use strict";var r=n("d855"),o=n.n(r);o.a}},[["25fa","common/runtime","common/vendor"]]]);