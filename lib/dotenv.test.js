'use strict';

var _dotenv = require('./dotenv');

var _dotenv2 = _interopRequireDefault(_dotenv);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('import', () => {
  test('process.env', () => {
    expect(process.env).toHaveProperty('NODE_ENV');
  });

  test('import default', () => {
    expect(_dotenv2.default).toHaveProperty('NODE_ENV');
  });

  test('import destructuring', () => {
    expect(_dotenv.NODE_ENV).toEqual(expect.any(String));
  });
});

describe('get/set', () => {
  // `dotenv` is only a getter for `process.env`
  // so added, uodates or removed entries to `process.env`
  // should be reflected by `dotenv`
  // https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Functions/get
  test('get process.env', () => {
    expect(process.env.NODE_ENV).toEqual('development');
  });

  test('get dotenv', () => {
    expect(_dotenv.NODE_ENV).toEqual('development');
  });

  test('set process.env', () => {
    process.env.NODE_ENV = 'production';

    expect(_dotenv.NODE_ENV).toEqual('production');
  });

  test('set dotenv', () => {
    _dotenv2.default.NODE_ENV = 'development';

    expect(process.env.NODE_ENV).toEqual('development');
  });
});

describe('.env', () => {
  // regex caoture tests
  test('key value', () => {
    expect(_dotenv2.default).toHaveProperty('BASIC', 'basic');
  });

  test('after skipped line', () => {
    expect(_dotenv2.default).toHaveProperty('AFTER_LINE', 'after_line');
  });

  test('no empty key', () => {
    expect(_dotenv2.default).not.toHaveProperty('EMPTY');
  });

  test('no comments', () => {
    expect(_dotenv2.default).not.toHaveProperty('COMMENTS');
  });

  test('single quotes', () => {
    expect(_dotenv2.default).toHaveProperty('SINGLE_QUOTES', 'single_quotes');
  });

  test('double quotes', () => {
    expect(_dotenv2.default).toHaveProperty('DOUBLE_QUOTES', 'double_quotes');
  });

  test('spaced out', () => {
    expect(_dotenv2.default).toHaveProperty('SPACED_OUT', 'spaced_out');
  });

  test('super spaced out', () => {
    expect(_dotenv2.default).toHaveProperty('SUPER_SPACED_OUT', 'super_spaced_out');
  });

  test('tabbed out', () => {
    expect(_dotenv2.default).toHaveProperty('TABBED_OUT', 'tabbed_out');
  });

  // test('newline', () => {
  //   expect(dotenv).toHaveProperty('NEWLINE', 'expand\nnewlines')
  // })

  test('dashes', () => {
    expect(_dotenv2.default).toHaveProperty('DASHES', 'http://google.com/');
  });

  test('equal sign', () => {
    // Retain Inner Quotes
    expect(_dotenv2.default).toHaveProperty('EQUAL_SIGNS', 'equals==');
  });

  test('include spaces', () => {
    // Retain Inner Quotes
    expect(_dotenv2.default).toHaveProperty('INCLUDE_SPACES', 'some spaced out string');
  });

  test('include spaces quoted', () => {
    // Retain Inner Quotes
    expect(_dotenv2.default).toHaveProperty('INCLUDE_SPACES_QUOTED', 'some spaced out string');
  });

  test('username', () => {
    // Retain Inner Quotes
    expect(_dotenv2.default).toHaveProperty('USERNAME', 'therealnerdybeast@example.tld');
  });

  test('json', () => {
    // Retain Inner Quotes
    expect(_dotenv2.default).toHaveProperty('JSON', '{"foo": "bar"}');
  });

  test('quoted json', () => {
    // Retain Inner Quotes
    expect(_dotenv2.default).toHaveProperty('JSON_QUOTED', '{"foo": "bar"}');
  });

  // test('not undefined env variable', () => {
  //   expect(dotenv).not.toHaveProperty('UNDEFINED_EXPAND')
  // })
});

describe('.env.json', () => {
  test('value key', () => {
    expect(_dotenv2.default).toHaveProperty('JSON_BASIC', 'json_basic');
  });
});

describe('.env.js', () => {
  test('value key', () => {
    expect(_dotenv2.default).toHaveProperty('JS_BASIC', 'js_basic');
  });
});