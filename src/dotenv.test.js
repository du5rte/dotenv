import dotenv, { NODE_ENV } from './dotenv'

describe('import', () => {
  test('process.env', () => {
    expect(process.env).toHaveProperty('NODE_ENV')
  })

  test('import default', () => {
    expect(dotenv).toHaveProperty('NODE_ENV')
  })

  test('import destructuring', () => {
    expect(NODE_ENV).toEqual(expect.any(String))
  })
})

describe('get/set', () => {
  // `dotenv` is only a getter for `process.env`
  // so added, uodates or removed entries to `process.env`
  // should be reflected by `dotenv`
  // https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Functions/get
  test('get process.env', () => {
    expect(process.env.NODE_ENV).toEqual('development')
  })

  test('get dotenv', () => {
    expect(NODE_ENV).toEqual('development')
  })

  test('set process.env', () => {
    process.env.NODE_ENV = 'production'

    expect(NODE_ENV).toEqual('production')
  })

  test('set dotenv', () => {
    dotenv.NODE_ENV = 'development'

    expect(process.env.NODE_ENV).toEqual('development')
  })
})

describe('.env', () => {
  // regex caoture tests
  test('key value', () => {
    expect(dotenv).toHaveProperty('BASIC', 'basic')
  })

  test('after skipped line', () => {
    expect(dotenv).toHaveProperty('AFTER_LINE', 'after_line')
  })

  test('no empty key', () => {
    expect(dotenv).not.toHaveProperty('EMPTY')
  })

  test('no comments', () => {
    expect(dotenv).not.toHaveProperty('COMMENTS')
  })

  test('single quotes', () => {
    expect(dotenv).toHaveProperty('SINGLE_QUOTES', 'single_quotes')
  })

  test('double quotes', () => {
    expect(dotenv).toHaveProperty('DOUBLE_QUOTES', 'double_quotes')
  })

  test('spaced out', () => {
    expect(dotenv).toHaveProperty('SPACED_OUT', 'spaced_out')
  })

  test('super spaced out', () => {
    expect(dotenv).toHaveProperty('SUPER_SPACED_OUT', 'super_spaced_out')
  })

  test('tabbed out', () => {
    expect(dotenv).toHaveProperty('TABBED_OUT', 'tabbed_out')
  })

  test('newline', () => {
    expect(dotenv).toHaveProperty('NEWLINE', 'expand\nnewlines')
  })

  test('dashes', () => {
    expect(dotenv).toHaveProperty('DASHES', 'http://google.com/')
  })

  test('equal sign', () => {
    // Retain Inner Quotes
    expect(dotenv).toHaveProperty('EQUAL_SIGNS', 'equals==')
  })

  test('include spaces', () => {
    // Retain Inner Quotes
    expect(dotenv).toHaveProperty('INCLUDE_SPACES', 'some spaced out string')
  })

  test('include spaces quoted', () => {
    // Retain Inner Quotes
    expect(dotenv).toHaveProperty('INCLUDE_SPACES_QUOTED', 'some spaced out string')
  })

  test('username', () => {
    // Retain Inner Quotes
    expect(dotenv).toHaveProperty('USERNAME', 'therealnerdybeast@example.tld')
  })

  test('json', () => {
    // Retain Inner Quotes
    expect(dotenv).toHaveProperty('JSON', '{"foo": "bar"}')
  })

  test('quoted json', () => {
    // Retain Inner Quotes
    expect(dotenv).toHaveProperty('JSON_QUOTED', '{"foo": "bar"}')
  })

  // test('not undefined env variable', () => {
  //   expect(dotenv).not.toHaveProperty('UNDEFINED_EXPAND')
  // })
})

describe('.env.json', () => {
  test('value key', () => {
    expect(dotenv).toHaveProperty('JSON_BASIC', 'json_basic')
  })
})

describe('.env.js', () => {
  test('value key', () => {
    expect(dotenv).toHaveProperty('JS_BASIC', 'js_basic')
  })
})
