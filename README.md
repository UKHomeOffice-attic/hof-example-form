[![Build Status](https://travis-ci.org/UKHomeOffice/hof-example-form.svg?branch=master)](https://travis-ci.org/UKHomeOffice/hof-example-form)

# Home Office Forms Example Form

In order to provide a starting point for people using the [home office forms toolkit](https://github.com/UKHomeOffice/hof) this app aims to give a simple example of how to use the module. We encourage users to clone this repository in order to provide a starting point for their own forms.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisities

What things you need to install the software and how to install them
- NodeJS
- npm (version 3 is not yet supported, please use version 2)
- Redis server running on the default port

### Installing

```bash
$ cd hof-example-form
$ npm install
$ npm run dev
```

Go to http://localhost:8080/my-awesome-form

## Running the tests
You will need the server running to run the cucumber tests against.

```bash
$ cd acceptance_tests
$ bundle install
$ cucumber -r features
```

You will need phantomjs installed to run tests. Alternatively you can export IN_BROWSER=true to run the tests in firefox.


## Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct, and the process for submitting pull requests to us.

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/your/project/tags). 

## License

This project is licensed under the GPLv2 License - see the [LICENSE.md](LICENSE.md) file for details
