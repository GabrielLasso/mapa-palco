parcelRequire=function(e,r,t,n){var i,o="function"==typeof parcelRequire&&parcelRequire,u="function"==typeof require&&require;function f(t,n){if(!r[t]){if(!e[t]){var i="function"==typeof parcelRequire&&parcelRequire;if(!n&&i)return i(t,!0);if(o)return o(t,!0);if(u&&"string"==typeof t)return u(t);var c=new Error("Cannot find module '"+t+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[t][1][r]||r},p.cache={};var l=r[t]=new f.Module(t);e[t][0].call(l.exports,p,l,l.exports,this)}return r[t].exports;function p(e){return f(p.resolve(e))}}f.isParcelRequire=!0,f.Module=function(e){this.id=e,this.bundle=f,this.exports={}},f.modules=e,f.cache=r,f.parent=o,f.register=function(r,t){e[r]=[function(e,r){r.exports=t},{}]};for(var c=0;c<t.length;c++)try{f(t[c])}catch(e){i||(i=e)}if(t.length){var l=f(t[t.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=l:"function"==typeof define&&define.amd?define(function(){return l}):n&&(this[n]=l)}if(parcelRequire=f,i)throw i;return f}({"vqFm":[function(require,module,exports) {
"use strict";var e;function r(r){exports.map=e=r}Object.defineProperty(exports,"__esModule",{value:!0}),exports.setMap=r,exports.meter=exports.shaku=exports.map=void 0,exports.map=e;var t=20;exports.shaku=t;var s=3.3*t;exports.meter=s;
},{}],"oCye":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.selectElement=l,exports.clearSelection=a,exports.initSelection=p;var e,t,o=require("./global"),n=!1;function i(e,t){return e.left+e.width>=t.left&&e.left<=t.left+t.width&&e.top+e.height>=t.top&&e.top<=t.top+t.height}function s(e,t){var n=o.map.querySelectorAll(e),s=[];return n.forEach(function(e){i(e.getBoundingClientRect(),t)&&s.push(e)}),s}function l(e){e.classList.add("selected")}function a(){for(var e=0;e<o.map.children.length;e++)o.map.children.item(e).classList.remove("selected")}function p(){var i=document.getElementById("selection");o.map.onmousedown=function(p){function c(n){var p=n.clientX-o.map.offsetLeft,c=n.clientY-o.map.offsetTop;p<0&&(p=0),c<0&&(c=0),p>o.map.offsetWidth&&(p=o.map.offsetWidth),c>o.map.offsetHeight&&(c=o.map.offsetHeight);var f=Math.abs(e-p),r=Math.abs(t-c);i.style.left=Math.min(e,p)+"px",i.style.top=Math.min(t,c)+"px",i.style.height=r+"px",i.style.width=f+"px",a(),s(".taiko",i.getBoundingClientRect()).forEach(l)}"map"==p.target.id&&(a(),n=!0,e=p.clientX-o.map.offsetLeft,t=p.clientY-o.map.offsetTop,i.style.display="block",i.style.left=e+"px",i.style.top=t+"px",i.style.height="0px",i.style.width="0px",document.addEventListener("mousemove",c),document.addEventListener("mouseup",function e(t){n=!1,i.style.display="none",document.removeEventListener("mouseup",e),document.removeEventListener("mousemove",c)}))}}
},{"./global":"vqFm"}],"VlHH":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.makeDraggable=o;var e=require("./selection"),t=require("./global");function o(o){o.onmousedown=function(n){n.preventDefault();var r=n.clientX-o.offsetLeft,s=n.clientY-o.offsetTop;function f(e){var n=e.clientX-r,f=e.clientY-s;n<0&&(n=0),f<0&&(f=0);var i=t.map.offsetWidth-o.offsetWidth;n>i&&(n=i);var u=t.map.offsetHeight-o.offsetHeight;f>u&&(f=u),o.style.left=n+window.pageXOffset+"px",o.style.top=f+window.pageYOffset+"px"}(0,e.clearSelection)(),(0,e.selectElement)(o),document.addEventListener("mousemove",f),document.addEventListener("mouseup",function e(){document.removeEventListener("mouseup",e),document.removeEventListener("mousemove",f)})},o.ondragstart=function(){return!1}}
},{"./selection":"oCye","./global":"vqFm"}],"wt7G":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.createInstrument=s,exports.InstrumentType=void 0;var e,t=require("./draggable");function s(e,s,r,o){var a=document.createElement("div");a.classList.add(e),a.classList.add("taiko"),a.setAttribute("data-type",e),(0,t.makeDraggable)(a),s.append(a),a.style.left=s.offsetWidth/2-a.offsetWidth/2+r+"px",a.style.top=s.offsetHeight/2-a.offsetHeight/2+o+"px"}exports.InstrumentType=e,function(e){e.Okedo="okedo"}(e||(exports.InstrumentType=e={}));
},{"./draggable":"VlHH"}],"E4rt":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.initMap=e;var t=require("./global");function e(e,r){(0,t.setMap)(document.getElementById("map")),t.map.querySelectorAll(".taiko").forEach(function(t){t.remove()}),t.map.style.height=e*t.meter+"px",t.map.style.width=r*t.meter+"px",t.map.style.backgroundPositionX=Math.round(r*t.meter/2)+"px",t.map.style.backgroundPositionY=Math.round(e*t.meter/2)+"px",t.map.setAttribute("data-height",e.toString()),t.map.setAttribute("data-width",r.toString())}
},{"./global":"vqFm"}],"ien9":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.save=r,exports.load=i;var t=require("./global"),e=require("./map"),a=require("./instruments");function r(){var e={map:{height:parseInt(t.map.getAttribute("data-height")),width:parseInt(t.map.getAttribute("data-width"))},instruments:Array()};t.map.querySelectorAll(".taiko").forEach(function(a){e.instruments.push({type:a.getAttribute("data-type"),x:a.offsetLeft+a.offsetWidth/2-t.map.offsetWidth/2,y:a.offsetTop+a.offsetHeight/2-t.map.offsetHeight/2})}),document.getElementById("json").value=JSON.stringify(e)}function i(){var r=document.getElementById("json").value,i=JSON.parse(r);(0,e.initMap)(i.map.height,i.map.width),i.instruments.forEach(function(e){(0,a.createInstrument)(e.type,t.map,e.x,e.y)})}
},{"./global":"vqFm","./map":"E4rt","./instruments":"wt7G"}],"jP6t":[function(require,module,exports) {
"use strict";var e=require("./global"),t=require("./selection"),n=require("./instruments"),i=require("./map"),o=require("./storage");window.onload=function(){(0,i.initMap)(8,12),(0,t.initSelection)()},document.getElementById("add").onclick=function(t){(0,n.createInstrument)(n.InstrumentType.Okedo,e.map,0,0)},document.getElementById("export").onclick=function(e){(0,o.save)()},document.getElementById("import").onclick=function(e){(0,o.load)()},document.getElementById("new").onclick=function(e){var t=parseInt(document.getElementById("height").value),n=parseInt(document.getElementById("width").value);(0,i.initMap)(t,n)};
},{"./global":"vqFm","./selection":"oCye","./instruments":"wt7G","./map":"E4rt","./storage":"ien9"}]},{},["jP6t"], null)
//# sourceMappingURL=main.d12e6768.js.map