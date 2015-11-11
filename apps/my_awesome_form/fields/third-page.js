'use strict';

module.exports = {
  'yes-no-radio': {
    validate: ['required'],
    className: ['inline', 'form-group'],
    options: [{
      value: 'Yes',
      label: 'Yes'
    }, {
      value: 'No',
      label: 'No'
    }]
  },
  'example-depends-on-text': {
    validate: ['required'],
    legend: 'fields.toggled-text.legend',
    dependent: {
      field: 'yes-no-radio',
      value: 'Yes'
    }
  }
};
