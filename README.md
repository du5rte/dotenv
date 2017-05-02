# dotenv

<img src="https://raw.githubusercontent.com/motdotla/dotenv/master/dotenv.png" alt="dotenv" align="right" />

Dotenv is a zero-dependency module that loads environment variables from a `.env` file into [`process.env`](https://nodejs.org/docs/latest/api/process.html#process_process_env). Storing configuration in the environment separate from code is based on [The Twelve-Factor App](http://12factor.net/config) methodology.

[![BuildStatus](https://img.shields.io/travis/motdotla/dotenv/master.svg?style=flat-square)](https://travis-ci.org/motdotla/dotenv)
[![NPM version](https://img.shields.io/npm/v/dotenv.svg?style=flat-square)](https://www.npmjs.com/package/dotenv)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat-square)](https://github.com/feross/standard)
[![Coverage Status](https://img.shields.io/coveralls/motdotla/dotenv/master.svg?style=flat-square)](https://coveralls.io/github/motdotla/dotenv?branch=coverall-intergration)

## Install

```bash
npm install dotenv --save
```

## Usage
Create a `.env` file in the root directory of your project.
It supports 3 types of `.env` files `.env.json` and `.env.js`

`.env` supports entries in the form of `NAME=VALUE`.
```sh
NODE_ENV=development
PORT=3000
SECRET=my_super_secret
```

`.env.json` supports JSON
```json
{
  "NODE_ENV": "development",
  "PORT": 3000,
  "SECRET": "my_super_secret"
}
```

`.env.js` supports JavaScript
```js
module.exports = {
  NODE_ENV: "development",
  PORT: 3000,
  SECRET: "my_super_secret"
}
```



That's it. As early as possible in your application, require dotenv. `process.env` should have the keys and values you defined in your `.env` file.


```javascript
// setups entries in process.env
require('dotenv')

...

// which can be access anywhere in your code
app.listen(process.env.PORT, function () {
  console.log('Server running on localhost:' + process.env.PORT)
})
```

In ES6
```javascript
// setups entries in process.env
import 'dotenv'
// bind process.env to exports
import { PORT } from 'dotenv'

...

app.listen(PORT, () => {
  console.log(`Server running on localhost:${PORT}`)
});
```

## Location
`dotenv` should be place in the root of the project but it searches for `.env` files the same way node searches for `node_modules` folders, the closer to the root the higher the priority.
```
/Users/myUser/myProjects/myAwesomeProject/.env
/Users/myUser/myProjects/.env
/Users/myUser/.env
/Users/.env
```

### Rules

The parsing engine currently supports the following rules:
- `BASIC=basic` becomes `{BASIC: 'basic'}`
- empty lines are skipped
- lines beginning with `#` are treated as comments
- empty values become empty strings (`EMPTY=` becomes `{EMPTY: ''}`)
- single and double quoted values are escaped (`SINGLE_QUOTE='quoted'` becomes `{SINGLE_QUOTE: "quoted"}`)
- new lines are expanded if in double quotes (`MULTILINE="new\nline"` becomes

```
{MULTILINE: 'new
line'}
```
- inner quotes are maintained (think JSON) (`JSON={"foo": "bar"}` becomes `{JSON:"{\"foo\": \"bar\"}"`)

## FAQ

### Should I commit my `.env` file?

No. We **strongly** recommend against committing your `.env` file to version
control. It should only include environment-specific values such as database
passwords or API keys. Your production database should have a different
password than your development database.

### Should I have multiple `.env` files?

No. We **strongly** recommend against having a "main" `.env` file and an "environment" `.env` file like `.env.test`. Your config should vary between deploys, and you should not be sharing values between environments.

> In a twelve-factor app, env vars are granular controls, each fully orthogonal to other env vars. They are never grouped together as “environments”, but instead are independently managed for each deploy. This is a model that scales up smoothly as the app naturally expands into more deploys over its lifetime.
>
> – [The Twelve-Factor App](http://12factor.net/config)

## Contributing Guide

See [CONTRIBUTING.md](CONTRIBUTING.md)

## Change Log

See [CHANGELOG.md](CHANGELOG.md)

## License

See [LICENSE](LICENSE)

## Who's using dotenv

Here's just a few of many repositories using dotenv:

* [jaws](https://github.com/jaws-framework/jaws-core-js)
* [node-lambda](https://github.com/motdotla/node-lambda)
* [resume-cli](https://www.npmjs.com/package/resume-cli)
* [phant](https://www.npmjs.com/package/phant)
* [adafruit-io-node](https://github.com/adafruit/adafruit-io-node)
* [mockbin](https://www.npmjs.com/package/mockbin)
* [and many more...](https://www.npmjs.com/browse/depended/dotenv)

## Go well with dotenv

Here's some projects that expand on dotenv. Check them out.

* [require-environment-variables](https://github.com/bjoshuanoah/require-environment-variables)
* [dotenv-safe](https://github.com/rolodato/dotenv-safe)
* [envalid](https://github.com/af/envalid)
