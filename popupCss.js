const css = {
  cssPopup:
    '.popup{background-color:grey;display:relative;position:fixed;min-width:200px;margin:0px;padding:5px;top:0px;left:0px;border-radius:5px;opacity:0;visibility:hidden;-webkit-transform:translateY(-50%);transform:translateY(-50%);-webkit-transition:opacity .2s ease-in, -webkit-transform .2s ease-in;transition:opacity .2s ease-in, -webkit-transform .2s ease-in;transition:opacity .2s ease-in, transform .2s ease-in;transition:opacity .2s ease-in, transform .2s ease-in, -webkit-transform .2s ease-in;-webkit-box-shadow:2px 2px 2px rgba(35,35,35,0.909);box-shadow:2px 2px 2px rgba(35,35,35,0.909);color:white;text-align:center}',
  elseCss:
    '.popup .popupContentWrapper{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-ms-flex-direction:row;flex-direction:row;-ms-flex-pack:distribute;justify-content:space-around}.popup .popupContentWrapper .popupItem:hover{border-bottom:2px solid white;cursor:pointer}.popup .popupContentWrapper .popupItem{width:100%;border-bottom:2px solid transparent;padding-left:5px;padding-right:5px;border-right:1px solid white}.popup .popupContentWrapper .popupItem:last-child{border-right:none}.popup .pointer{width:16px;height:16px;position:absolute;bottom:0px;left:calc(50% - 8px);-webkit-transform:translateY(50%) rotate(45deg);transform:translateY(50%) rotate(45deg);background-color:inherit;z-index:-1}.popupVisible{visibility:visible;-webkit-transform:translateY(calc(-100% - 16px));transform:translateY(calc(-100% - 16px));opacity:1}',
};

module.exports = css;
