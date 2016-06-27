'use strict';

module.exports = {
  'language-radio': {
    mixin: 'radio-group',
    validate: 'required',
    className: 'form-group',
    options: [{
      value: 'en',
      label: 'English'
    }, {
      value: 'fr',
      label: 'French'
    }, {
      value: 'de',
      label: 'German'
    }]
  }
};
