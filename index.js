const cssImp = require('./popupCss');

let actions;

/**
 * @typedef _options - options
 * @prop {string} [style = ''] - custom style
 */
const _options = {
  style: '',
};

/**
 * add popup menu to text selections
 * @param {string} items - menu items
 * @param {function} callbacks - click callbacks for items
 * @param {_options} [options] - options 
 */
function selectionPopup(items, callbacks, options) {
  let css = cssImp.cssPopup + cssImp.elseCss;
  if (options && options.style) css = _parseCss(cssImp.cssPopup, options.style) + cssImp.elseCss;

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
    _hidePopup();
    return;
  }
  const parent = _parentNodeCheck(e.target, 'popupItem');
  if (parent) actions[parent.dataset.action](document.getSelection());
  _hidePopup();
}
function _parentNodeCheck(node, className) {
  const parent = node.parentNode;
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
