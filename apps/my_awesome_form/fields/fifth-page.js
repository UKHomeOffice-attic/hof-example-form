'use strict';

module.exports = {
  'auto-text': {
    mixin: 'input-text'
  },
  'auto-radio': {
    mixin: 'radio-group',
    className: ['inline', 'form-group'],
    options: [{
      value: 'Yes',
      label: 'Yes'
    }, {
      value: 'No',
      label: 'No'
    }]
  },
  'auto-textarea': {
    mixin: 'textarea',
    // default formatters strip whitepace and replace with single spaces
    // so line breaks are lost in textareas. Add the following
    // lines to remove default formatters and reapply any that are desired
    'ignore-defaults': true,
    formatter: ['trim', 'hyphens']
  }
};
