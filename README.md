# IdP Spoofing Provider

## Install

Install IdP Spoofing Provider in your project using npm or Yarn

```sh
$ npm i idp-spoofing-provider
# Or using Yarn with
$ yarn add idp-spoofing-provider
```

## Usage

```
import { createResponse } from 'idp-spoofing-provider';

const response = createResponse(samlOptions);
```

## Table of contents

- [IdP Spoofing Provider](#idp-spoofing-provider)
  - [Install](#install)
  - [Usage](#usage)
  - [Table of contents](#table-of-contents)
    - [Prerequisites](#prerequisites)
  - [Demo](#demo)
  - [Contributing](#contributing)

### Prerequisites

This project requires NodeJS (version 10 or later), NPM and Yarn.
[Yarn](https://yarnpkg.com/), [Node](http://nodejs.org/) and [NPM](https://npmjs.org/)
are really easy to install.
To make sure you have them available on your machine,
try running the following command.

```sh
$ yarn -v && npm -v && node -v
1.22.10
6.14.12
v12.22.1
```

## Demo

Use the demo applications inside the `demo/` and `demo-mjs/` folders to see a real implementation.
You will first need to install the dependencies with `yarn install`, then generate a key and certificate to be used by the demo app.

Use the following command to generate the keys:

```sh
$ openssl req -x509 -new -newkey rsa:2048 -nodes -subj '/C=US/ST=California/L=San Francisco/O=JankyCo/CN=Test Identity Provider' -keyout ./demo/key.pem -out ./demo/cert.pem -days 7300
```

**NOTE:** The `demo-mjs` is a demo app created with JavaScript Modules. You will need at least Node v12 to make use of that project.

Then run the demo application with

```sh
$ npm start
```

## Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct, and the process for submitting pull requests to us.

1.  Fork it!
2.  Create your feature branch: `git checkout -b my-new-feature`
3.  Add your changes: `git add .`
4.  Commit your changes: `git commit -am 'Add some feature'`
5.  Push to the branch: `git push origin my-new-feature`
6.  Submit a pull request :sunglasses:
