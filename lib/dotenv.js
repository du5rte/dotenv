'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function splitKeyValuePair(str) {
  const keyValuePairRegex = /^(\w+)\s*=\s*(.+)$/i;
  return str.match(keyValuePairRegex);
}

function splitIntoLines(str) {
  const regexLineBreak = /\n/g;

  return str.split(regexLineBreak);
}

function cleanQuotes(str) {
  const cleanupRegex = /(^['"]|['"]$)/g;
  return str.replace(cleanupRegex, '').trim();
}

function parseDotEnv(raw) {
  const lines = splitIntoLines(raw);

  return lines.reduce((final, line) => {
    try {
      var _splitKeyValuePair = splitKeyValuePair(line),
          _splitKeyValuePair2 = _slicedToArray(_splitKeyValuePair, 3);

      const all = _splitKeyValuePair2[0],
            key = _splitKeyValuePair2[1],
            rawValue = _splitKeyValuePair2[2];


      const value = cleanQuotes(rawValue);

      return _extends({}, final, { [key]: value });
    } catch (err) {
      return final;
    }
  }, {});
}

function tryParseJSON(data) {
  try {
    const json = JSON.parse(data);

    return json;
  } catch (e) {
    return data;
  }
}

function searchDotEnvFile(directory) {
  const fileLocation = _path2.default.join(directory, '.env');

  try {
    const file = _fs2.default.readFileSync(fileLocation, 'utf8');
    const data = parseDotEnv(file);

    return data;
  } catch (e) {
    return {};
  }
}

function searchDotEnvJsonFile(directory) {
  const fileLocation = _path2.default.join(directory, '.env.json');

  try {
    const file = _fs2.default.readFileSync(fileLocation, 'utf8');
    const data = JSON.parse(file);

    return data;
  } catch (e) {
    return {};
  }
}

function searchDotEnvJSFile(directory) {
  const fileLocation = _path2.default.join(directory, '.env.js');

  try {
    const data = require(fileLocation);

    return data;
  } catch (e) {
    return {};
  }
}

function searchAllEnvFiles() {
  return module.paths.reverse().reduce((final, directory) => {
    const currentDirectory = _path2.default.dirname(directory);

    // Ignore `.env` files inside node_modules folders
    if (/node_modules/.test(currentDirectory)) {
      return final;
    }

    return Object.assign({}, final, searchDotEnvFile(currentDirectory), searchDotEnvJsonFile(currentDirectory), searchDotEnvJSFile(currentDirectory));
  }, {});
}

function StoreEnvKeysInProcessEnv(obj) {
  for (const key in obj) {
    process.env[key] = obj[key];
  }
}

StoreEnvKeysInProcessEnv(searchAllEnvFiles());

// binds exports to `process.env`
// https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Functions/get
Object.defineProperty(module, 'exports', {
  get: () => process.env
});