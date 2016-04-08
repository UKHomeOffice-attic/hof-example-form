'use strict';

module.exports = {
  'example-radio': {
    validate: ['required'],
    className: ['inline', 'form-group'],
    options: [{
      value: 'superman',
      label: 'fields.example-radio.options.superman.label'
    }, {
      value: 'batman',
      label: 'fields.example-radio.options.batman.label'
    }, {
      value: 'spiderman',
      label: 'fields.example-radio.options.spiderman.label'
    }]
  },
  'example-dob': {
    legend: 'fields.example-dob.legend',
    hint: 'fields.example-dob.hint'
  },
  'example-dob-day': {
    validate: ['required', 'numeric'],
    label: 'fields.example-dob-day.label'
  },
  'example-dob-month': {
    validate: ['required', 'numeric'],
    label: 'fields.example-dob-month.label'
  },
  'example-dob-year': {
    validate: ['required', 'numeric'],
    label: 'fields.example-dob-year.label'
  },
  'example-text': {
    validate: ['required'],
    label: 'fields.example-text.label'
  },
  'example-email': {
    validate: ['required', 'email'],
    type: 'email',
    label: 'fields.example-email.label',
    dependent: {
      value: '',
      field: 'no-email'
    }
  },
  'example-checkbox': {
    label: 'fields.example-checkbox.label'
  }
};
