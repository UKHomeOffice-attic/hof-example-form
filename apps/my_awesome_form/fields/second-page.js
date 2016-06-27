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
  },
  'child-toggler': {
    validate: 'required',
    options: [{
      value: 'first-option',
      label: 'Using a mixin',
      toggle: 'first-toggled-child',
      child: 'input-text'
    }, {
      value: 'second-option',
      label: 'Using a template string',
      toggle: 'second-toggled-child',
      child: `<div id="second-toggled-child-panel" class="reveal">
        <div class="panel-indent">
          {{#t}}fields.second-toggled-child.label{{/t}}
        </div>
      </div>`
    }, {
      value: 'third-option',
      label: 'Using a partial',
      toggle: 'third-toggled-child',
      child: 'partials/toggle-partial'
    }]
  }
};
