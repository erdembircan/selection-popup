(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
const cssImp = require('./popupCss');

let actions;

function selectionPopup(items, callbacks, options) {
  let css = cssImp.cssPopup + cssImp.elseCss;
  if (options && options.style) css = _parseCss(cssPopup, options.style) + elseCss;

  const head = document.head || document.getElementsByTagName('head')[0];
  const style = document.createElement('style');

  style.type = 'text/css';
  if (style.styleSheet) {
    style.styleSheet.cssText += css;
  } else {
    style.appendChild(document.createTextNode(css));
  }
  head.appendChild(style);

  const parsedItems = _parseItems(items, callbacks);

  document.body.innerHTML += `<popup class='popup'>
  <div class='popupContentWrapper'>
    ${parsedItems}
  </div>
  <div class='pointer'></div></div>`;

  if (!callbacks.push) callbacks = [callbacks];
  actions = callbacks;

  document.onmouseup = _selectionEndText;
  document.onmousedown = _processSelection;
}

function _parseItems(items, actions) {
  if (!items.push) items = [items];
  let parsed = '';
  for (let i = 0; i < items.length; i++) {
    const item = ` <div class='popupItem' data-action= "${i}">
      ${items[i]}
    </div>`;
    parsed += item;
  }
  return parsed;
}

function _parseCss(main, newOne) {
  const parsed = `${main.slice(0, main.length - 1)};${newOne}}`;
  return parsed;
}

function _processSelection(e) {
  if (e.target.classList.contains('popupItem')) {
    actions[e.target.dataset.action](document.getSelection());
  }
  _hidePopup();
}

function _hidePopup() {
  document.querySelector('popup').classList.remove('popupVisible');
}

function _selectionEndText(e) {
  const t = document.getSelection();
  if (t.toString().length !== 0) {
    const popup = document.querySelector('popup');
    const rangeT = t.getRangeAt(0);
    const rectT = rangeT.getBoundingClientRect();

    popup.style.top = `${rectT.y}px`;
    popup.style.left = `${rectT.x - popup.clientWidth / 2 + rectT.width / 2}px`;
    popup.classList.add('popupVisible');
  }
}

module.exports = selectionPopup;

},{"./popupCss":2}],2:[function(require,module,exports){
const css = {
  cssPopup:
    '.popup{background-color:grey;display:relative;position:fixed;min-width:200px;margin:0px;padding:5px;top:0px;left:0px;border-radius:5px;opacity:0;visibility:hidden;-webkit-transform:translateY(-50%);transform:translateY(-50%);-webkit-transition:opacity .2s ease-in, -webkit-transform .2s ease-in;transition:opacity .2s ease-in, -webkit-transform .2s ease-in;transition:opacity .2s ease-in, transform .2s ease-in;transition:opacity .2s ease-in, transform .2s ease-in, -webkit-transform .2s ease-in;-webkit-box-shadow:2px 2px 2px rgba(35,35,35,0.909);box-shadow:2px 2px 2px rgba(35,35,35,0.909);color:white;text-align:center}',
  elseCss:
    '.popup .popupContentWrapper{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-ms-flex-direction:row;flex-direction:row;-ms-flex-pack:distribute;justify-content:space-around}.popup .popupContentWrapper .popupItem:hover{border-bottom:2px solid white;cursor:pointer}.popup .popupContentWrapper .popupItem{width:100%;border-bottom:2px solid transparent;padding-left:5px;padding-right:5px;border-right:1px solid white}.popup .popupContentWrapper .popupItem:last-child{border-right:none}.popup .pointer{width:16px;height:16px;position:absolute;bottom:0px;left:calc(50% - 8px);-webkit-transform:translateY(50%) rotate(45deg);transform:translateY(50%) rotate(45deg);background-color:inherit;z-index:-1}.popupVisible{visibility:visible;-webkit-transform:translateY(calc(-100% - 16px));transform:translateY(calc(-100% - 16px));opacity:1}',
};

module.exports = css;

},{}],3:[function(require,module,exports){
'use strict';

// all seems working

var pop = require('selection-popup');

function share(e) {
  alert('shared: ' + e);
}

function tweet(e) {
  alert('tweeted: ' + e);
}
function reddit(e) {
  alert('reddit post: ' + e);
}

window.onload = function () {
  var popup = require('./selectionPopup');
  popup(['share', '<i class="fa fa-twitter" aria-hidden="true"></i>', 'reddit'], [share, tweet, reddit]);
};

},{"./selectionPopup":5,"selection-popup":1}],4:[function(require,module,exports){
'use strict';

var css = {
  cssPopup: '.popup{background-color:grey;display:relative;position:fixed;min-width:200px;margin:0px;padding:5px;top:0px;left:0px;border-radius:5px;opacity:0;visibility:hidden;-webkit-transform:translateY(-50%);transform:translateY(-50%);-webkit-transition:opacity .2s ease-in, -webkit-transform .2s ease-in;transition:opacity .2s ease-in, -webkit-transform .2s ease-in;transition:opacity .2s ease-in, transform .2s ease-in;transition:opacity .2s ease-in, transform .2s ease-in, -webkit-transform .2s ease-in;-webkit-box-shadow:2px 2px 2px rgba(35,35,35,0.909);box-shadow:2px 2px 2px rgba(35,35,35,0.909);color:white;text-align:center}',
  elseCss: '.popup .popupContentWrapper{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-ms-flex-direction:row;flex-direction:row;-ms-flex-pack:distribute;justify-content:space-around}.popup .popupContentWrapper .popupItem:hover{border-bottom:2px solid white;cursor:pointer}.popup .popupContentWrapper .popupItem{width:100%;z-index:10;border-bottom:2px solid transparent;padding-left:5px;padding-right:5px;border-right:1px solid white}.popup .popupContentWrapper .popupItem:last-child{border-right:none}.popup .pointer{width:16px;height:16px;position:absolute;bottom:0px;left:calc(50% - 8px);-webkit-transform:translateY(50%) rotate(45deg);transform:translateY(50%) rotate(45deg);background-color:inherit;z-index:-1}.popupVisible{visibility:visible;-webkit-transform:translateY(calc(-100% - 16px));transform:translateY(calc(-100% - 16px));opacity:1}'
};

module.exports = css;

},{}],5:[function(require,module,exports){
'use strict';

var cssImp = require('./popupCss');

var actions = void 0;

function selectionPopup(items, callbacks, options) {
  var css = cssImp.cssPopup + cssImp.elseCss;
  if (options && options.style) css = _parseCss(cssPopup, options.style) + elseCss;

  var head = document.head || document.getElementsByTagName('head')[0];
  var style = document.createElement('style');

  style.type = 'text/css';
  if (style.styleSheet) {
    style.styleSheet.cssText += css;
  } else {
    style.appendChild(document.createTextNode(css));
  }
  head.appendChild(style);

  var parsedItems = _parseItems(items, callbacks);

  document.body.innerHTML += '<popup class=\'popup\'>\n  <div class=\'popupContentWrapper\'>\n    ' + parsedItems + '\n  </div>\n  <div class=\'pointer\'></div></div>';

  if (!callbacks.push) callbacks = [callbacks];
  actions = callbacks;

  document.onmouseup = _selectionEndText;
  document.onmousedown = _processSelection;
}

function _parseItems(items, actions) {
  if (!items.push) items = [items];
  var parsed = '';
  for (var i = 0; i < items.length; i++) {
    var item = ' <div class=\'popupItem\' data-action= "' + i + '">\n      ' + items[i] + '\n    </div>';
    parsed += item;
  }
  return parsed;
}

function _parseCss(main, newOne) {
  var parsed = main.slice(0, main.length - 1) + ';' + newOne + '}';
  return parsed;
}

function _processSelection(e) {
  if (e.target.classList.contains('popupItem')) {
    actions[e.target.dataset.action](document.getSelection());
    _hidePopup();
    return;
  }
  var parent = _parentNodeCheck(e.target, 'popupItem');
  if (parent) actions[parent.dataset.action](document.getSelection());
  _hidePopup();
}
function _parentNodeCheck(node, className) {
  var parent = node.parentNode;
  if (!parent) return undefined;
  if (parent.tagName !== 'BODY') {
    if (parent.classList.contains(className)) return parent;
    _parentNodeCheck(parent, className);
  } else if (parent.tagName === 'BODY') {
    return undefined;
  }
}

function _hidePopup() {
  document.querySelector('popup').classList.remove('popupVisible');
}

function _selectionEndText(e) {
  var t = document.getSelection();
  if (t.toString().length !== 0) {
    var popup = document.querySelector('popup');
    var rangeT = t.getRangeAt(0);
    var rectT = rangeT.getBoundingClientRect();

    popup.style.top = rectT.y + 'px';
    popup.style.left = rectT.x - popup.clientWidth / 2 + rectT.width / 2 + 'px';
    popup.classList.add('popupVisible');
  }
}

module.exports = selectionPopup;

},{"./popupCss":4}]},{},[3])

//# sourceMappingURL=index_bundle.js.map
