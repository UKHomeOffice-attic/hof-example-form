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
    validate: ['required'],
    legend: 'fields.example-dob.legend',
    hint: 'fields.example-dob.hint'
  },
  'example-dob-day': {
    validate: ['numeric'],
    label: 'fields.example-dob-day.label'
  },
  'example-dob-month': {
    validate: ['numeric'],
    label: 'fields.example-dob-month.label'
  },
  'example-dob-year': {
    validate: ['numeric'],
    label: 'fields.example-dob-year.label'
  }
};
