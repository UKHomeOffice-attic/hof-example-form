'use strict';

module.exports = {
  'yes-no-radio-toggler': {
    validate: ['required'],
    className: ['inline', 'form-group'],
    options: [{
      value: 'Yes',
      label: 'Yes',
      toggle: 'example-toggled-text-div'
    }, {
      value: 'No',
      label: 'No'
    }]
  },
  'example-toggled-text': {
    legend: 'fields.toggled-text.legend'
  }
};
