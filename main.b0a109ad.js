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
})({"src/global.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setMap = setMap;
exports.meter = exports.shaku = exports.map = void 0;
var map;
exports.map = map;

function setMap(element) {
  exports.map = map = element;
}

var shaku = 20; // px

exports.shaku = shaku;
var meter = 3.3 * shaku; // px

exports.meter = meter;
},{}],"src/selection.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.selectElement = selectElement;
exports.clearSelection = clearSelection;
exports.initSelection = initSelection;

var _global = require("./global");

var startingX;
var startingY;
var isSelecting = false;

function interscts(r1, r2) {
  if (r1.left + r1.width >= r2.left && r1.left <= r2.left + r2.width && r1.top + r1.height >= r2.top && r1.top <= r2.top + r2.height) {
    return true;
  }

  return false;
}

function querySelectorRect(query, r) {
  var elements = _global.map.querySelectorAll(query);

  var filteredList = [];
  elements.forEach(function (element) {
    if (interscts(element.getBoundingClientRect(), r)) {
      filteredList.push(element);
    }
  });
  return filteredList;
}

function selectElement(element) {
  element.classList.add('selected');
}

function clearSelection() {
  for (var index = 0; index < _global.map.children.length; index++) {
    _global.map.children.item(index).classList.remove('selected');
  }
}

function initSelection() {
  var selection = document.getElementById("selection");

  _global.map.onmousedown = function (mouseDown) {
    if (mouseDown.target.id != 'map') {
      return;
    }

    clearSelection();
    isSelecting = true;
    startingX = mouseDown.clientX - _global.map.offsetLeft;
    startingY = mouseDown.clientY - _global.map.offsetTop;
    selection.style.display = 'block';
    selection.style.left = startingX + 'px';
    selection.style.top = startingY + 'px';
    selection.style.height = '0px';
    selection.style.width = '0px';

    function onMouseMove(mouseMove) {
      var x = mouseMove.clientX - _global.map.offsetLeft;
      var y = mouseMove.clientY - _global.map.offsetTop;

      if (x < 0) {
        x = 0;
      }

      if (y < 0) {
        y = 0;
      }

      if (x > _global.map.offsetWidth) {
        x = _global.map.offsetWidth;
      }

      if (y > _global.map.offsetHeight) {
        y = _global.map.offsetHeight;
      }

      var width = Math.abs(startingX - x);
      var height = Math.abs(startingY - y);
      selection.style.left = Math.min(startingX, x) + 'px';
      selection.style.top = Math.min(startingY, y) + 'px';
      selection.style.height = height + 'px';
      selection.style.width = width + 'px';
      clearSelection();
      querySelectorRect('.taiko', selection.getBoundingClientRect()).forEach(selectElement);
    }

    function onMouseUp(mouseUp) {
      isSelecting = false;
      selection.style.display = 'none';
      document.removeEventListener('mouseup', onMouseUp);
      document.removeEventListener('mousemove', onMouseMove);
    }

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };
}
},{"./global":"src/global.ts"}],"src/draggable.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.makeDraggable = makeDraggable;

var _selection = require("./selection");

var _global = require("./global");

function makeDraggable(element) {
  element.onmousedown = function (event) {
    event.preventDefault();
    var shiftX = event.clientX - element.offsetLeft;
    var shiftY = event.clientY - element.offsetTop;
    (0, _selection.clearSelection)();
    (0, _selection.selectElement)(element);

    function onMouseMove(event) {
      var newLeft = event.clientX - shiftX;
      var newTop = event.clientY - shiftY;

      if (newLeft < 0) {
        newLeft = 0;
      }

      if (newTop < 0) {
        newTop = 0;
      }

      var rightEdge = _global.map.offsetWidth - element.offsetWidth;

      if (newLeft > rightEdge) {
        newLeft = rightEdge;
      }

      var bottomEdge = _global.map.offsetHeight - element.offsetHeight;

      if (newTop > bottomEdge) {
        newTop = bottomEdge;
      }

      element.style.left = newLeft + window.pageXOffset + 'px';
      element.style.top = newTop + window.pageYOffset + 'px';
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
},{"./selection":"src/selection.ts","./global":"src/global.ts"}],"src/instruments.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createInstrument = createInstrument;
exports.InstrumentType = void 0;

var _draggable = require("./draggable");

var InstrumentType;
exports.InstrumentType = InstrumentType;

(function (InstrumentType) {
  InstrumentType["Okedo"] = "okedo";
})(InstrumentType || (exports.InstrumentType = InstrumentType = {}));

function createInstrument(instrument, map, x, y) {
  var newInstrument = document.createElement("div");
  newInstrument.classList.add(instrument);
  newInstrument.classList.add('taiko');
  newInstrument.setAttribute('data-type', instrument);
  (0, _draggable.makeDraggable)(newInstrument);
  map.append(newInstrument);
  newInstrument.style.left = map.offsetWidth / 2 - newInstrument.offsetWidth / 2 + x + 'px';
  newInstrument.style.top = map.offsetHeight / 2 - newInstrument.offsetHeight / 2 + y + 'px';
}
},{"./draggable":"src/draggable.ts"}],"src/map.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.initMap = initMap;

var _global = require("./global");

function initMap(height, width) {
  (0, _global.setMap)(document.getElementById("map"));

  _global.map.querySelectorAll('.taiko').forEach(function (element) {
    element.remove();
  });

  _global.map.style.height = height * _global.meter + 'px';
  _global.map.style.width = width * _global.meter + 'px';
  _global.map.style.backgroundPositionX = Math.round(width * _global.meter / 2) + 'px';
  _global.map.style.backgroundPositionY = Math.round(height * _global.meter / 2) + 'px';

  _global.map.setAttribute('data-height', height.toString());

  _global.map.setAttribute('data-width', width.toString());
}
},{"./global":"src/global.ts"}],"src/storage.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.save = save;
exports.load = load;

var _global = require("./global");

var _map = require("./map");

var _instruments = require("./instruments");

function save() {
  var height = parseInt(_global.map.getAttribute('data-height'));
  var width = parseInt(_global.map.getAttribute('data-width'));
  var data = {
    map: {
      height: height,
      width: width
    },
    instruments: Array()
  };

  _global.map.querySelectorAll('.taiko').forEach(function (element) {
    data.instruments.push({
      type: element.getAttribute('data-type'),
      x: element.offsetLeft + element.offsetWidth / 2 - _global.map.offsetWidth / 2,
      y: element.offsetTop + element.offsetHeight / 2 - _global.map.offsetHeight / 2
    });
  });

  document.getElementById('json').value = JSON.stringify(data);
}

function load() {
  var json = document.getElementById('json').value;
  var data = JSON.parse(json);
  (0, _map.initMap)(data.map.height, data.map.width);
  data.instruments.forEach(function (instrument) {
    (0, _instruments.createInstrument)(instrument.type, _global.map, instrument.x, instrument.y);
  });
}
},{"./global":"src/global.ts","./map":"src/map.ts","./instruments":"src/instruments.ts"}],"src/main.ts":[function(require,module,exports) {
"use strict";

var _global = require("./global");

var _selection = require("./selection");

var _instruments = require("./instruments");

var _map = require("./map");

var _storage = require("./storage");

window.onload = function () {
  (0, _map.initMap)(8, 12);
  (0, _selection.initSelection)();
};

document.getElementById('add').onclick = function (event) {
  (0, _instruments.createInstrument)(_instruments.InstrumentType.Okedo, _global.map, 0, 0);
};

document.getElementById('export').onclick = function (event) {
  (0, _storage.save)();
};

document.getElementById('import').onclick = function (event) {
  (0, _storage.load)();
};

document.getElementById('new').onclick = function (event) {
  var height = parseInt(document.getElementById('height').value);
  var width = parseInt(document.getElementById('width').value);
  (0, _map.initMap)(height, width);
};
},{"./global":"src/global.ts","./selection":"src/selection.ts","./instruments":"src/instruments.ts","./map":"src/map.ts","./storage":"src/storage.ts"}],"node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
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
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "46453" + '/');

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