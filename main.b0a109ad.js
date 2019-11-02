// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"node_modules/parcel-bundler/src/builtins/bundle-url.js":[function(require,module,exports) {
var bundleURL = null;

function getBundleURLCached() {
  if (!bundleURL) {
    bundleURL = getBundleURL();
  }

  return bundleURL;
}

function getBundleURL() {
  // Attempt to find the URL of the current script and use that as the base URL
  try {
    throw new Error();
  } catch (err) {
    var matches = ('' + err.stack).match(/(https?|file|ftp|chrome-extension|moz-extension):\/\/[^)\n]+/g);

    if (matches) {
      return getBaseURL(matches[0]);
    }
  }

  return '/';
}

function getBaseURL(url) {
  return ('' + url).replace(/^((?:https?|file|ftp|chrome-extension|moz-extension):\/\/.+)\/[^/]+$/, '$1') + '/';
}

exports.getBundleURL = getBundleURLCached;
exports.getBaseURL = getBaseURL;
},{}],"node_modules/parcel-bundler/src/builtins/css-loader.js":[function(require,module,exports) {
var bundle = require('./bundle-url');

function updateLink(link) {
  var newLink = link.cloneNode();

  newLink.onload = function () {
    link.remove();
  };

  newLink.href = link.href.split('?')[0] + '?' + Date.now();
  link.parentNode.insertBefore(newLink, link.nextSibling);
}

var cssTimeout = null;

function reloadCSS() {
  if (cssTimeout) {
    return;
  }

  cssTimeout = setTimeout(function () {
    var links = document.querySelectorAll('link[rel="stylesheet"]');

    for (var i = 0; i < links.length; i++) {
      if (bundle.getBaseURL(links[i].href) === bundle.getBundleURL()) {
        updateLink(links[i]);
      }
    }

    cssTimeout = null;
  }, 50);
}

module.exports = reloadCSS;
},{"./bundle-url":"node_modules/parcel-bundler/src/builtins/bundle-url.js"}],"style/ui-components.less":[function(require,module,exports) {
var reloadCSS = require('_css_loader');

module.hot.dispose(reloadCSS);
module.hot.accept(reloadCSS);
},{"_css_loader":"node_modules/parcel-bundler/src/builtins/css-loader.js"}],"style/selection.less":[function(require,module,exports) {
var reloadCSS = require('_css_loader');

module.hot.dispose(reloadCSS);
module.hot.accept(reloadCSS);
},{"_css_loader":"node_modules/parcel-bundler/src/builtins/css-loader.js"}],"src/selection.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.selectedElements = selectedElements;
exports.selectElement = selectElement;
exports.clearSelection = clearSelection;
exports.initSelection = initSelection;

require("../style/selection.less");

var startingX;
var startingY;

function interscts(r1, r2) {
  if (r1.left + r1.width >= r2.left && r1.left <= r2.left + r2.width && r1.top + r1.height >= r2.top && r1.top <= r2.top + r2.height) {
    return true;
  }

  return false;
}

function querySelectorRect(query, r) {
  var elements = document.querySelectorAll(query);
  var filteredList = [];
  elements.forEach(function (element) {
    if (interscts(element.getBoundingClientRect(), r)) {
      filteredList.push(element);
    }
  });
  return filteredList;
}

function selectedElements(parent) {
  return parent.querySelectorAll('.selected');
}

function selectElement(element) {
  element.classList.add('selected');
}

function clearSelection(parent) {
  for (var index = 0; index < parent.children.length; index++) {
    parent.children.item(index).classList.remove('selected');
  }
}

function initSelection(parent) {
  var selection = document.createElement("selection-area");
  parent.append(selection);

  parent.onmousedown = function (mouseDown) {
    if (mouseDown.target != parent) {
      return;
    }

    clearSelection(parent);
    startingX = mouseDown.clientX - parent.offsetLeft + window.pageXOffset;
    startingY = mouseDown.clientY - parent.offsetTop + window.pageYOffset;
    selection.style.display = 'block';
    selection.style.left = startingX + 'px';
    selection.style.top = startingY + 'px';
    selection.style.height = '0px';
    selection.style.width = '0px';

    function onMouseMove(mouseMove) {
      var x = mouseMove.clientX - parent.offsetLeft + window.pageXOffset;
      var y = mouseMove.clientY - parent.offsetTop + window.pageYOffset;

      if (x < 0) {
        x = 0;
      }

      if (y < 0) {
        y = 0;
      }

      if (x > parent.offsetWidth) {
        x = parent.offsetWidth;
      }

      if (y > parent.offsetHeight) {
        y = parent.offsetHeight;
      }

      var width = Math.abs(startingX - x);
      var height = Math.abs(startingY - y);
      selection.style.left = Math.min(startingX, x) + 'px';
      selection.style.top = Math.min(startingY, y) + 'px';
      selection.style.height = height + 'px';
      selection.style.width = width + 'px';
      clearSelection(parent);
      querySelectorRect('.selectable', selection.getBoundingClientRect()).forEach(selectElement);
    }

    function onMouseUp(mouseUp) {
      selection.style.display = 'none';
      document.removeEventListener('mouseup', onMouseUp);
      document.removeEventListener('mousemove', onMouseMove);
    }

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };
}
},{"../style/selection.less":"style/selection.less"}],"src/draggable.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.makeDraggable = makeDraggable;

function makeDraggable(element, limit) {
  element.onmousedown = function (event) {
    event.preventDefault();
    var shiftX = event.clientX - element.offsetLeft;
    var shiftY = event.clientY - element.offsetTop;

    function onMouseMove(event) {
      var newLeft = event.clientX - shiftX;
      var newTop = event.clientY - shiftY;

      if (newLeft < 0) {
        newLeft = 0;
      }

      if (newTop < 0) {
        newTop = 0;
      }

      var rightEdge = limit.clientWidth - element.clientWidth;

      if (newLeft > rightEdge) {
        newLeft = rightEdge;
      }

      var bottomEdge = limit.clientHeight - element.clientHeight;

      if (newTop > bottomEdge) {
        newTop = bottomEdge;
      }

      element.style.left = newLeft + 'px';
      element.style.top = newTop + 'px';
    }

    function onMouseUp() {
      document.removeEventListener('mouseup', onMouseUp);
      document.removeEventListener('mousemove', onMouseMove);
    }

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };

  element.ondragstart = function () {
    return false;
  };
}
},{}],"src/constants.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.meter = exports.shaku = void 0;
var shaku = 20; // px

exports.shaku = shaku;
var meter = 3.3 * shaku; // px

exports.meter = meter;
},{}],"style/instruments.less":[function(require,module,exports) {
var reloadCSS = require('_css_loader');

module.hot.dispose(reloadCSS);
module.hot.accept(reloadCSS);
},{"_css_loader":"node_modules/parcel-bundler/src/builtins/css-loader.js"}],"src/instruments.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createInstrument = createInstrument;
exports.clearInstruments = clearInstruments;
exports.deleteSelectedInstruments = deleteSelectedInstruments;
exports.InstrumentType = void 0;

var _draggable = require("./draggable");

var _constants = require("./constants");

var _selection = require("./selection");

require("../style/instruments.less");

var InstrumentType;
exports.InstrumentType = InstrumentType;

(function (InstrumentType) {
  InstrumentType["Okedo"] = "okedo";
  InstrumentType["Shime"] = "shime";
  InstrumentType["Nagado"] = "nagado";
  InstrumentType["Oodaiko"] = "oodaiko";
})(InstrumentType || (exports.InstrumentType = InstrumentType = {}));

function createInstrument(instrument, map) {
  var newInstrument = document.createElement("e-taiko");
  newInstrument.classList.add(instrument.type);
  newInstrument.classList.add('selectable');
  newInstrument.setAttribute('data-type', instrument.type);
  newInstrument.style.height = instrument.diameter * _constants.shaku + 'px';
  newInstrument.style.width = instrument.diameter * _constants.shaku + 'px';
  newInstrument.style.left = map.clientWidth / 2 - instrument.diameter * _constants.shaku / 2 + instrument.x + 'px';
  newInstrument.style.top = map.clientHeight / 2 - instrument.diameter * _constants.shaku / 2 + instrument.y + 'px';

  newInstrument.onclick = function (event) {
    (0, _selection.clearSelection)(map);
    (0, _selection.selectElement)(newInstrument);
  };

  (0, _draggable.makeDraggable)(newInstrument, map);
  map.append(newInstrument);
}

function clearInstruments(map) {
  map.querySelectorAll('e-taiko').forEach(function (element) {
    element.remove();
  });
}

function deleteSelectedInstruments(map) {
  (0, _selection.selectedElements)(map).forEach(function (element) {
    element.remove();
  });
}
},{"./draggable":"src/draggable.ts","./constants":"src/constants.ts","./selection":"src/selection.ts","../style/instruments.less":"style/instruments.less"}],"style/sidemenu.less":[function(require,module,exports) {
var reloadCSS = require('_css_loader');

module.hot.dispose(reloadCSS);
module.hot.accept(reloadCSS);
},{"_css_loader":"node_modules/parcel-bundler/src/builtins/css-loader.js"}],"style/map.less":[function(require,module,exports) {
var reloadCSS = require('_css_loader');

module.hot.dispose(reloadCSS);
module.hot.accept(reloadCSS);
},{"_css_loader":"node_modules/parcel-bundler/src/builtins/css-loader.js"}],"src/map.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.initMap = initMap;

var _constants = require("./constants");

require("../style/map.less");

var _instruments = require("./instruments");

function initMap(height, width, map) {
  (0, _instruments.clearInstruments)(map);
  map.style.display = 'block';
  map.style.height = height * _constants.meter + 'px';
  map.style.width = width * _constants.meter + 'px';
  map.style.backgroundPositionX = Math.round(width * _constants.meter / 2) + 'px';
  map.style.backgroundPositionY = Math.round(height * _constants.meter / 2) + 'px';
  map.setAttribute('data-height', height.toString());
  map.setAttribute('data-width', width.toString());
  var corner = document.getElementById('corner');
  corner.style.top = height * _constants.meter - 1 + 'px';
  corner.style.left = width * _constants.meter - 1 + 'px';
}
},{"./constants":"src/constants.ts","../style/map.less":"style/map.less","./instruments":"src/instruments.ts"}],"src/storage.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mapToJson = mapToJson;
exports.load = load;

var _constants = require("./constants");

var _map = require("./map");

var _instruments = require("./instruments");

function mapToJson(map) {
  var height = parseInt(map.getAttribute('data-height'));
  var width = parseInt(map.getAttribute('data-width'));
  var data = {
    map: {
      height: height,
      width: width
    },
    instruments: Array()
  };
  map.querySelectorAll('e-taiko').forEach(function (element) {
    data.instruments.push({
      type: element.getAttribute('data-type'),
      x: element.offsetLeft + element.clientWidth / 2 - map.clientWidth / 2,
      y: element.offsetTop + element.clientHeight / 2 - map.clientHeight / 2,
      alpha: 0,
      diameter: element.clientWidth / _constants.shaku
    });
  });
  return JSON.stringify(data);
}

function load(map, data) {
  (0, _map.initMap)(data.map.height, data.map.width, map);
  data.instruments.forEach(function (instrument) {
    (0, _instruments.createInstrument)(instrument, map);
  });
}
},{"./constants":"src/constants.ts","./map":"src/map.ts","./instruments":"src/instruments.ts"}],"src/sidemenu.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.initSideMenuListeners = initSideMenuListeners;

require("../style/sidemenu.less");

var _instruments = require("./instruments");

var _map = require("./map");

var _storage = require("./storage");

function initSideMenuListeners(map) {
  var selectedInstrument;

  document.getElementById('add').onclick = function (event) {
    if (selectedInstrument != null) {
      (0, _instruments.createInstrument)(selectedInstrument, map);
    }
  };

  document.getElementById('save').onclick = function (event) {
    var anchor = document.getElementById("download");
    anchor.download = "mapa.taiko";
    anchor.href = "data:text/json;charset=utf-8," + encodeURIComponent((0, _storage.mapToJson)(map));
    anchor.click();
  };

  document.getElementById('load').onchange = function (event) {
    var file = event.target.files[0];
    var reader = new FileReader();
    reader.readAsText(file);

    reader.onload = function (loadEvent) {
      var data = JSON.parse(loadEvent.target.result.toString());
      (0, _storage.load)(map, data);
    };
  };

  document.getElementById('new').onclick = function (event) {
    var height = parseInt(document.getElementById('height').value);
    var width = parseInt(document.getElementById('width').value);
    (0, _map.initMap)(height, width, map);
  };

  document.querySelectorAll('list-item').forEach(function (item) {
    item.onclick = function (event) {
      document.querySelectorAll('list-item').forEach(function (item) {
        item.classList.remove('selected-item');
      });
      item.classList.add('selected-item');
      selectedInstrument = {
        type: item.getAttribute('data-type'),
        x: 0,
        y: 0,
        alpha: 0,
        diameter: parseFloat(item.getAttribute('data-diameter'))
      };
    };
  });
}
},{"../style/sidemenu.less":"style/sidemenu.less","./instruments":"src/instruments.ts","./map":"src/map.ts","./storage":"src/storage.ts"}],"src/main.ts":[function(require,module,exports) {
"use strict";

require("../style/ui-components.less");

var _selection = require("./selection");

var _instruments = require("./instruments");

var _sidemenu = require("./sidemenu");

var map = document.getElementById('map');

window.onload = function () {
  (0, _sidemenu.initSideMenuListeners)(map);
  (0, _selection.initSelection)(map);
};

document.onkeydown = function (event) {
  if (event.key == "Delete") {
    (0, _instruments.deleteSelectedInstruments)(map);
  }
};
},{"../style/ui-components.less":"style/ui-components.less","./selection":"src/selection.ts","./instruments":"src/instruments.ts","./sidemenu":"src/sidemenu.ts"}],"node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "40951" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["node_modules/parcel-bundler/src/builtins/hmr-runtime.js","src/main.ts"], null)
//# sourceMappingURL=/main.b0a109ad.js.map