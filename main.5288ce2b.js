parcelRequire=function(e,r,t,n){var i,o="function"==typeof parcelRequire&&parcelRequire,u="function"==typeof require&&require;function f(t,n){if(!r[t]){if(!e[t]){var i="function"==typeof parcelRequire&&parcelRequire;if(!n&&i)return i(t,!0);if(o)return o(t,!0);if(u&&"string"==typeof t)return u(t);var c=new Error("Cannot find module '"+t+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[t][1][r]||r},p.cache={};var l=r[t]=new f.Module(t);e[t][0].call(l.exports,p,l,l.exports,this)}return r[t].exports;function p(e){return f(p.resolve(e))}}f.isParcelRequire=!0,f.Module=function(e){this.id=e,this.bundle=f,this.exports={}},f.modules=e,f.cache=r,f.parent=o,f.register=function(r,t){e[r]=[function(e,r){r.exports=t},{}]};for(var c=0;c<t.length;c++)try{f(t[c])}catch(e){i||(i=e)}if(t.length){var l=f(t[t.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=l:"function"==typeof define&&define.amd?define(function(){return l}):n&&(this[n]=l)}if(parcelRequire=f,i)throw i;return f}({"vqFm":[function(require,module,exports) {
"use strict";var e;function r(r){exports.map=e=r}Object.defineProperty(exports,"__esModule",{value:!0}),exports.setMap=r,exports.meter=exports.shaku=exports.map=void 0,exports.map=e;var t=20;exports.shaku=t;var s=3.3*t;exports.meter=s;
},{}],"iKnQ":[function(require,module,exports) {

},{}],"oCye":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.selectElement=l,exports.clearSelection=f,exports.initSelection=a;var e,t,o=require("./global");require("../style/selection.less");var n=!1;function i(e,t){return e.left+e.width>=t.left&&e.left<=t.left+t.width&&e.top+e.height>=t.top&&e.top<=t.top+t.height}function s(e,t){var n=o.map.querySelectorAll(e),s=[];return n.forEach(function(e){i(e.getBoundingClientRect(),t)&&s.push(e)}),s}function l(e){e.classList.add("selected")}function f(){for(var e=0;e<o.map.children.length;e++)o.map.children.item(e).classList.remove("selected")}function a(){var i=document.getElementById("selection");o.map.onmousedown=function(a){function p(n){var a=n.clientX-o.map.offsetLeft+window.pageXOffset,p=n.clientY-o.map.offsetTop+window.pageYOffset;a<0&&(a=0),p<0&&(p=0),a>o.map.offsetWidth&&(a=o.map.offsetWidth),p>o.map.offsetHeight&&(p=o.map.offsetHeight);var c=Math.abs(e-a),r=Math.abs(t-p);i.style.left=Math.min(e,a)+"px",i.style.top=Math.min(t,p)+"px",i.style.height=r+"px",i.style.width=c+"px",f(),s(".taiko",i.getBoundingClientRect()).forEach(l)}"map"==a.target.id&&(f(),n=!0,e=a.clientX-o.map.offsetLeft+window.pageXOffset,t=a.clientY-o.map.offsetTop+window.pageYOffset,i.style.display="block",i.style.left=e+"px",i.style.top=t+"px",i.style.height="0px",i.style.width="0px",document.addEventListener("mousemove",p),document.addEventListener("mouseup",function e(t){n=!1,i.style.display="none",document.removeEventListener("mouseup",e),document.removeEventListener("mousemove",p)}))}}
},{"./global":"vqFm","../style/selection.less":"iKnQ"}],"VlHH":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.makeDraggable=n;var e=require("./selection"),t=require("./global");function n(n){n.onmousedown=function(o){o.preventDefault();var i=o.clientX-n.offsetLeft,r=o.clientY-n.offsetTop;function c(e){var o=e.clientX-i,c=e.clientY-r;o<0&&(o=0),c<0&&(c=0);var u=t.map.clientWidth-n.clientWidth;o>u&&(o=u);var l=t.map.clientHeight-n.clientHeight;c>l&&(c=l),n.style.left=o+"px",n.style.top=c+"px"}(0,e.clearSelection)(),(0,e.selectElement)(n),document.addEventListener("mousemove",c),document.addEventListener("mouseup",function e(){document.removeEventListener("mouseup",e),document.removeEventListener("mousemove",c)})},n.ondragstart=function(){return!1}}
},{"./selection":"oCye","./global":"vqFm"}],"wt7G":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.createInstrument=r,exports.clearInstruments=a,exports.InstrumentType=void 0;var e=require("./draggable");require("../style/instruments.less");var t,s=require("./global");function r(t,r,a,n,o,i){var u=document.createElement("div");u.classList.add(t),u.classList.add("taiko"),u.setAttribute("data-type",t),u.style.height=i*s.shaku+"px",u.style.width=i*s.shaku+"px",u.style.left=r.clientWidth/2-i*s.shaku/2+a+"px",u.style.top=r.clientHeight/2-i*s.shaku/2+n+"px",(0,e.makeDraggable)(u),r.append(u)}function a(e){e.querySelectorAll(".taiko").forEach(function(e){e.remove()})}exports.InstrumentType=t,function(e){e.Okedo="okedo"}(t||(exports.InstrumentType=t={}));
},{"./draggable":"VlHH","../style/instruments.less":"iKnQ","./global":"vqFm"}],"E4rt":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.initMap=r;var t=require("./global");require("../style/map.less");var e=require("./instruments");function r(r,a){(0,t.setMap)(document.getElementById("map")),(0,e.clearInstruments)(t.map),t.map.style.height=r*t.meter+"px",t.map.style.width=a*t.meter+"px",t.map.style.backgroundPositionX=Math.round(a*t.meter/2)+"px",t.map.style.backgroundPositionY=Math.round(r*t.meter/2)+"px",t.map.setAttribute("data-height",r.toString()),t.map.setAttribute("data-width",a.toString())}
},{"./global":"vqFm","../style/map.less":"iKnQ","./instruments":"wt7G"}],"WXWn":[function(require,module,exports) {
var define;
var e;!function(e){e([],function(){var e=function(e){return"string"!=typeof e?e:e.replace(/[\+ \|\^\%]/g,function(e){return{" ":"+","+":"%2B","|":"%7C","^":"%5E","%":"%25"}[e]})},r=function(e){return"string"!=typeof e?e:e.replace(/\+|%2B|%7C|%5E|%25/g,function(e){return{"+":" ","%2B":"+","%7C":"|","%5E":"^","%25":"%"}[e]})},n=function(e){return Number.prototype.toString.call(e,36).toUpperCase()},t=function(e){return parseInt(e,36)},o=Array.prototype.indexOf||function(e,r){for(var n=r||0,t=this.length;n<t;n++)if(this[n]===e)return n;return-1};return{JSON:JSON,pack:function(r,t){var i=(t=t||{}).verbose||!1;i&&console.log("Normalize the JSON Object"),r="string"==typeof r?this.JSON.parse(r):r,i&&console.log("Creating a empty dictionary");var s={strings:[],integers:[],floats:[]};i&&console.log("Creating the AST");var a=function r(t){i&&console.log("Calling recursiveAstBuilder with "+this.JSON.stringify(t));var a,l=typeof t;if(null===t)return{type:"null",index:-3};if(void 0===t)return{type:"undefined",index:-5};if(t instanceof Array){var u=["@"];for(var f in t)t.hasOwnProperty(f)&&u.push(r(t[f]));return u}if("object"===l){for(var c in u=["$"],t)t.hasOwnProperty(c)&&(u.push(r(c)),u.push(r(t[c])));return u}if(""===t)return{type:"empty",index:-4};if("string"===l)return-1==(a=o.call(s.strings,t))&&(s.strings.push(e(t)),a=s.strings.length-1),{type:"strings",index:a};if("number"===l&&t%1==0)return-1==(a=o.call(s.integers,t))&&(s.integers.push(n(t)),a=s.integers.length-1),{type:"integers",index:a};if("number"===l)return-1==(a=o.call(s.floats,t))&&(s.floats.push(t),a=s.floats.length-1),{type:"floats",index:a};if("boolean"===l)return{type:"boolean",index:t?-1:-2};throw new Error("Unexpected argument of type "+typeof t)}(r),l=s.strings.length,u=s.integers.length;s.floats.length;i&&console.log("Parsing the dictionary");var f=s.strings.join("|");return f+="^"+s.integers.join("|"),f+="^"+s.floats.join("|"),i&&console.log("Parsing the structure"),f+="^"+function e(r){if(i&&console.log("Calling a recursiveParser with "+this.JSON.stringify(r)),r instanceof Array){var t=r.shift();for(var o in r)r.hasOwnProperty(o)&&(t+=e(r[o])+"|");return("|"===t[t.length-1]?t.slice(0,-1):t)+"]"}var s=r.type,a=r.index;if("strings"===s)return n(a);if("integers"===s)return n(l+a);if("floats"===s)return n(l+u+a);if("boolean"===s)return r.index;if("null"===s)return-3;if("undefined"===s)return-5;if("empty"===s)return-4;throw new TypeError("The item is alien!")}(a),i&&console.log("Ending parser"),t.debug?{dictionary:s,ast:a,packed:f}:f},unpack:function(e,n){n=n||{};var o=e.split("^");n.verbose&&console.log("Building dictionary");var i=[],s=o[0];if(""!==s){s=s.split("|"),n.verbose&&console.log("Parse the strings dictionary");for(var a=0,l=s.length;a<l;a++)i.push(r(s[a]))}if(""!==(s=o[1]))for(s=s.split("|"),n.verbose&&console.log("Parse the integers dictionary"),a=0,l=s.length;a<l;a++)i.push(t(s[a]));if(""!==(s=o[2]))for(s=s.split("|"),n.verbose&&console.log("Parse the floats dictionary"),a=0,l=s.length;a<l;a++)i.push(parseFloat(s[a]));s=null,n.verbose&&console.log("Tokenizing the structure");var u="",f=[],c=o[3].length;for(a=0;a<c;a++){var g=o[3].charAt(a);"|"===g||"$"===g||"@"===g||"]"===g?(u&&(f.push(t(u)),u=""),"|"!==g&&f.push(g)):u+=g}var p=f.length,h=0;return n.verbose&&console.log("Starting recursive parser"),function e(){var r=f[h++];if(n.verbose&&console.log("Reading collection type "+("$"===r?"object":"Array")),"@"===r){for(var t=[];h<p;h++){var o=f[h];if(n.verbose&&console.log("Read "+o+" symbol"),"]"===o)return t;if("@"===o||"$"===o)t.push(e());else switch(o){case-1:t.push(!0);break;case-2:t.push(!1);break;case-3:t.push(null);break;case-5:t.push(void 0);break;case-4:t.push("");break;default:t.push(i[o])}}return n.verbose&&console.log("Parsed "+this.JSON.stringify(t)),t}if("$"===r){for(t={};h<p;h++){var s=f[h];if("]"===s)return t;if(s=-4===s?"":i[s],"@"===(o=f[++h])||"$"===o)t[s]=e();else switch(o){case-1:t[s]=!0;break;case-2:t[s]=!1;break;case-3:t[s]=null;break;case-5:t[s]=void 0;break;case-4:t[s]="";break;default:t[s]=i[o]}}return n.verbose&&console.log("Parsed "+this.JSON.stringify(t)),t}throw new TypeError("Bad token "+r+" isn't a type")}()}}})}(void 0!==e&&e.amd?e:function(e,r){var n=r();if("undefined"!=typeof exports)for(var t in n)exports[t]=n[t];else window.jsonpack=n});
},{}],"WGKP":[function(require,module,exports) {
"use strict";var t=function(){};t.prototype.encode=function(t){for(var r,e={},o=(t+"").split(""),n=[],h=o[0],u=256,c=1;c<o.length;c++)null!=e[h+(r=o[c])]?h+=r:(n.push(h.length>1?e[h]:h.charCodeAt(0)),e[h+r]=u,u++,h=r);n.push(h.length>1?e[h]:h.charCodeAt(0));for(c=0;c<n.length;c++)n[c]=String.fromCharCode(n[c]);return n.join("")},t.prototype.decode=function(t){for(var r,e={},o=(t+"").split(""),n=o[0],h=n,u=[n],c=256,l=1;l<o.length;l++){var p=o[l].charCodeAt(0);r=p<256?o[l]:e[p]?e[p]:h+n,u.push(r),n=r.charAt(0),e[c]=h+n,c++,h=r}return u.join("")},module.exports=new t;
},{}],"W2L3":[function(require,module,exports) {
"use strict";var e=require("jsonpack/main"),n=require("node-lzw"),o=function(){};o.prototype.encode=function(o){var r=e.pack(o);return n.encode(r)},o.prototype.decode=function(o){var r=e.unpack(o);return n.decode(r)},module.exports=new o;
},{"jsonpack/main":"WXWn","node-lzw":"WGKP"}],"ien9":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.save=a,exports.load=r;var t=require("./global"),e=require("./map"),i=require("./instruments"),n=require("json-lzw");function a(){var e={map:{height:parseInt(t.map.getAttribute("data-height")),width:parseInt(t.map.getAttribute("data-width"))},instruments:Array()};document.querySelectorAll(".taiko").forEach(function(i){e.instruments.push({type:i.getAttribute("data-type"),x:i.offsetLeft+i.clientWidth/2-t.map.clientWidth/2,y:i.offsetTop+i.clientHeight/2-t.map.clientHeight/2,alpha:0,diameter:i.clientWidth/t.shaku})}),document.getElementById("json").value=JSON.stringify(e),document.getElementById("min-json").value=(0,n.encode)(JSON.stringify(e))}function r(){var n=document.getElementById("json").value,a=JSON.parse(n);(0,e.initMap)(a.map.height,a.map.width),a.instruments.forEach(function(e){(0,i.createInstrument)(e.type,t.map,e.x,e.y,e.alpha,e.diameter)})}
},{"./global":"vqFm","./map":"E4rt","./instruments":"wt7G","json-lzw":"W2L3"}],"jP6t":[function(require,module,exports) {
"use strict";var e=require("./global"),t=require("./selection"),n=require("./instruments"),i=require("./map"),o=require("./storage");window.onload=function(){(0,i.initMap)(8,12),(0,t.initSelection)()},document.getElementById("add").onclick=function(t){(0,n.createInstrument)(n.InstrumentType.Okedo,e.map,0,0,0,1.5)},document.getElementById("export").onclick=function(e){(0,o.save)()},document.getElementById("import").onclick=function(e){(0,o.load)()},document.getElementById("new").onclick=function(e){var t=parseInt(document.getElementById("height").value),n=parseInt(document.getElementById("width").value);(0,i.initMap)(t,n)};
},{"./global":"vqFm","./selection":"oCye","./instruments":"wt7G","./map":"E4rt","./storage":"ien9"}]},{},["jP6t"], null)
//# sourceMappingURL=main.5288ce2b.js.map