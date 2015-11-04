'use strict';

module.exports = {
  fullname: {
    validate: ['required'],
    label: 'fields.fullname.label'
  },
  'date-of-birth': {
    legend: 'fields.date-of-birth.legend',
    hint: 'fields.date-of-birth.hint'
  },
  'date-of-birth-day': {
    validate: ['required', 'numeric'],
    label: 'fields.date-of-birth-day.label'
  },
  'date-of-birth-month': {
    validate: ['required', 'numeric'],
    label: 'fields.date-of-birth-month.label'
  },
  'date-of-birth-year': {
    validate: ['required', 'numeric'],
    label: 'fields.date-of-birth-year.label'
  },
  nationality: {
    validate: ['required'],
    label: 'fields.nationality.label'
  },
  passport: {
    label: 'fields.passport.label'
  },
  'brp-card': {
    label: 'fields.brp-card.label',
    hint: 'fields.brp-card.hint'
  }
};
