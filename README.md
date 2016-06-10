[![Build Status](https://travis-ci.org/UKHomeOffice/hof-example-form.svg?branch=master)](https://travis-ci.org/UKHomeOffice/hof-example-form)[![Dependencies](https://david-dm.org/UKHomeOffice/hof-example-form.svg)](https://david-dm.org/UKHomeOffice/hof-example-form)

# Home Office Forms Example Form

This is an example of a service built with [Home Office Forms](https://github.com/UKHomeOffice/hof), A.K.A HOF. It intends to highlight many of the features available from HOF, but is not exhaustive.

## Items of Note

This is not the only way to configure your HOF service. This service uses a typical Node.JS, Express architecture, with an entry point named `app.js`, which is where the majority of the set up occurs.

The specifics of a form are configured in `apps/`, this is where views, controllers, translations and the steps and fields are defined for each form journey (spolier: there is only one at the moment).

If you wish to use this as a starting point from which to build your own form service, we encourge you to delete the commit history after cloning this repository.

For more info see the [HOF documentation](https://github.com/UKHomeOffice/hof/blob/master/documentation/index.md) or [join the discussion](https://ukgovernmentdigital.slack.com/messages/hof/)

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisities

- [NodeJS](https://nodejs.org/en/) - version 4 and up.
- npm version 3 (bundled with node 5 and up)
- [Redis server](http://redis.io/topics/quickstart) running on the default port
- A healthy understanding of Node.JS

### Installing

```bash
$ git clone git@github.com:UKHomeOffice/hof-example-form.git
$ cd hof-example-form
$ npm install
$ npm run dev
```

Visit: [http://localhost:8080/my-awesome-form](http://localhost:8080/my-awesome-form)

## Running the tests

### Unit tests
```bash
$ npm run test
```

### Functional tests
You will need the server running to run the acceptance tests

```bash
$ npm run test:acceptance
```

It's worth glancing at the `scripts` in `package.json` to see what's happening

## Contributing

We welcome contributions, especially if you have a new "app" to add to `apps/`, but we must insist you first [read the our contribution docs](CONTRIBUTING.md) for details on our code of conduct, and the process for submitting pull requests to us.

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/your/project/tags).

## License

This project is licensed under the GPLv2 License - see the [LICENSE.md](LICENSE.md) file for details
