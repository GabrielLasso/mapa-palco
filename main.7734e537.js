parcelRequire=function(e,r,t,n){var i,o="function"==typeof parcelRequire&&parcelRequire,u="function"==typeof require&&require;function f(t,n){if(!r[t]){if(!e[t]){var i="function"==typeof parcelRequire&&parcelRequire;if(!n&&i)return i(t,!0);if(o)return o(t,!0);if(u&&"string"==typeof t)return u(t);var c=new Error("Cannot find module '"+t+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[t][1][r]||r},p.cache={};var l=r[t]=new f.Module(t);e[t][0].call(l.exports,p,l,l.exports,this)}return r[t].exports;function p(e){return f(p.resolve(e))}}f.isParcelRequire=!0,f.Module=function(e){this.id=e,this.bundle=f,this.exports={}},f.modules=e,f.cache=r,f.parent=o,f.register=function(r,t){e[r]=[function(e,r){r.exports=t},{}]};for(var c=0;c<t.length;c++)try{f(t[c])}catch(e){i||(i=e)}if(t.length){var l=f(t[t.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=l:"function"==typeof define&&define.amd?define(function(){return l}):n&&(this[n]=l)}if(parcelRequire=f,i)throw i;return f}({"vqFm":[function(require,module,exports) {
"use strict";var e;function r(r){exports.map=e=r}Object.defineProperty(exports,"__esModule",{value:!0}),exports.setMap=r,exports.meter=exports.shaku=exports.map=void 0,exports.map=e;var t=20;exports.shaku=t;var s=3.3*t;exports.meter=s;
},{}],"oCye":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.selectElement=s,exports.clearSelection=c,exports.initSelection=r;var e,t,n=require("./global"),o=!1;function i(e,t){return e.left+e.width>=t.left&&e.left<=t.left+t.width&&e.top+e.height>=t.top&&e.top<=t.top+t.height}function l(e,t){var o=n.map.querySelectorAll(e),l=[];return o.forEach(function(e){i(e.getBoundingClientRect(),t)&&l.push(e)}),l}function s(e){e.classList.add("selected")}function c(){for(var e=0;e<n.map.children.length;e++)n.map.children.item(e).classList.remove("selected")}function r(){var i=document.getElementById("selection");n.map.onmousedown=function(n){function r(n){var o=Math.abs(e-n.clientX),r=Math.abs(t-n.clientY);i.style.left=Math.min(e,n.clientX)+"px",i.style.top=Math.min(t,n.clientY)+"px",i.style.height=r+"px",i.style.width=o+"px",c(),l(".taiko",i.getBoundingClientRect()).forEach(s)}"map"==n.target.id&&(c(),o=!0,e=n.clientX,t=n.clientY,i.style.display="block",i.style.left=e+"px",i.style.top=t+"px",i.style.height="0px",i.style.width="0px",document.addEventListener("mousemove",r),document.addEventListener("mouseup",function e(t){o=!1,i.style.display="none",document.removeEventListener("mouseup",e),document.removeEventListener("mousemove",r)}))}}
},{"./global":"vqFm"}],"VlHH":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.makeDraggable=n;var e=require("./selection"),t=require("./global");function n(n){n.onmousedown=function(o){o.preventDefault();var i=o.clientX-n.getBoundingClientRect().left,u=o.clientY-n.getBoundingClientRect().top;function l(e){var o=e.clientX-i,l=e.clientY-u;o<t.map.getBoundingClientRect().left&&(o=t.map.getBoundingClientRect().left),l<t.map.getBoundingClientRect().top&&(l=t.map.getBoundingClientRect().top);var c=t.map.getBoundingClientRect().left+t.map.offsetWidth-n.offsetWidth;o>c&&(o=c);var r=t.map.getBoundingClientRect().top+t.map.offsetHeight-n.offsetHeight;l>r&&(l=r),n.style.left=o+window.pageXOffset+"px",n.style.top=l+window.pageYOffset+"px"}(0,e.clearSelection)(),(0,e.selectElement)(n),document.addEventListener("mousemove",l),document.addEventListener("mouseup",function e(){document.removeEventListener("mouseup",e),document.removeEventListener("mousemove",l)})},n.ondragstart=function(){return!1}}
},{"./selection":"oCye","./global":"vqFm"}],"wt7G":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.createInstrument=s,exports.InstrumentType=void 0;var e,t=require("./draggable");function s(e,s,r,o){var a=document.createElement("div");a.classList.add(e),a.classList.add("taiko"),a.setAttribute("data-type",e),(0,t.makeDraggable)(a),s.append(a),a.style.left=s.offsetWidth/2-a.offsetWidth/2+r+"px",a.style.top=s.offsetHeight/2-a.offsetHeight/2+o+"px"}exports.InstrumentType=e,function(e){e.Okedo="okedo"}(e||(exports.InstrumentType=e={}));
},{"./draggable":"VlHH"}],"E4rt":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.initMap=t;var e=require("./global");function t(t,r){(0,e.setMap)(document.getElementById("map")),e.map.querySelectorAll(".taiko").forEach(function(e){e.remove()}),e.map.style.height=t*e.meter+"px",e.map.style.width=r*e.meter+"px"}
},{"./global":"vqFm"}],"ien9":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.save=r,exports.load=o;var t=require("./global"),e=require("./map"),n=require("./instruments");function r(){var e={map:{height:8,width:12},instruments:Array()};t.map.querySelectorAll(".taiko").forEach(function(n){e.instruments.push({type:n.getAttribute("data-type"),x:n.offsetLeft+n.offsetWidth/2-t.map.offsetWidth/2,y:n.offsetTop+n.offsetHeight/2-t.map.offsetHeight/2})}),document.getElementById("json").textContent=JSON.stringify(e)}function o(){var r=document.getElementById("json").textContent,o=JSON.parse(r);(0,e.initMap)(o.map.height,o.map.width),o.instruments.forEach(function(e){(0,n.createInstrument)(e.type,t.map,e.x,e.y)})}
},{"./global":"vqFm","./map":"E4rt","./instruments":"wt7G"}],"jP6t":[function(require,module,exports) {
"use strict";var e=require("./global"),n=require("./selection"),t=require("./instruments"),i=require("./map"),o=require("./storage");window.onload=function(){(0,i.initMap)(8,12),(0,n.initSelection)()},document.getElementById("add").onclick=function(n){(0,t.createInstrument)(t.InstrumentType.Okedo,e.map,0,0)},document.getElementById("export").onclick=function(e){(0,o.save)()},document.getElementById("import").onclick=function(e){(0,o.load)()};
},{"./global":"vqFm","./selection":"oCye","./instruments":"wt7G","./map":"E4rt","./storage":"ien9"}]},{},["jP6t"], null)
//# sourceMappingURL=main.7734e537.js.map