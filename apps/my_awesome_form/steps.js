'use strict';

module.exports = {
    '/': {
        controller: require('../common/controllers/start'),
        next: '/first-page'
    },
    '/first-page': {
        controller: require('./controllers/first_page'),
        template: 'first-page',
        fields: [
            'example-radio',
            'example-dob',
            'example-dob-day',
            'example-dob-month',
            'example-dob-year',
            'example-text',
            'example-email'
        ],
        next: '/second-page'
    },
    '/second-page': {
        controller: require('./controllers/second_page'),
        template: 'second-page',
        fields: [
            'yes-no-radio-toggler',
            'example-toggled-text'
        ],
        next: '/third-page'
    },
    '/third-page': {
        controller: require('./controllers/third_page'),
        template: 'third-page',
        fields: [
            'yes-no-radio',
            'example-depends-on-text'
        ],
        next: '/fourth-page'
    },
    '/fourth-page': {
        controller: require('./controllers/fourth_page'),
        template: 'fourth-page',
        fields: ['multiples-input'],
        next: '/summary'
    }
}
;
