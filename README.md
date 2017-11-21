# selection-popup [![Build Status](https://travis-ci.org/erdembircan/selection-popup.svg?branch=master)](https://travis-ci.org/erdembircan/selection-popup)

---

A library to add popup menus at text selections.
<br>
[Demo page](https://erdembircan.github.io/selection-popup/)

---

## Installation
`npm install selection-popup`

---

## Usage
```
const selectionPop = require('selection-popup)

selectionPop(['share', '<i class="fa fa-twitter" aria-hidden="true"></i>
', 'log'], [shareFunc, tweetFunc, function(e){
  console.log('selected item: ' + e)
} ],{style: 'background-color:yellow'});
```

---

## API
### selectionPop([items],[funcs] ,[options])
add a popup menu to document

### items (required)
Type: `array`, `String`(for single item)

---
### funcs (required)
Type: `array`, `String`(for single item)
functions for onClick actions of the appropriate items

---

### options (optional)
Type: `object`
<br>
[style]: `String` an override styles for customization

---

## License
Copyright © 2017, Erdem Bircan. Released under the MIT License.
