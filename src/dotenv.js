import fs from 'fs'
import path from 'path'

function splitKeyValuePair(str) {
  const keyValuePairRegex = /^(\w+)\s*=\s*(.+)$/i
  return str.match(keyValuePairRegex)
}

function splitIntoLines(str) {
  const regexLineBreak = /\n/g

  return str.split(regexLineBreak)
}

function cleanQuotes(str) {
  const cleanupRegex = /(^['"]|['"]$)/g
  return str.replace(cleanupRegex, '')
            .trim()
}

function parseDotEnv(raw) {
  const lines = splitIntoLines(raw)

  return lines.reduce((final, line) => {
    try {
      const [ all, key, rawValue ] = splitKeyValuePair(line)

      const value = cleanQuotes(rawValue)

      return {...final, [key]: value}
    } catch(err) {
      return final
    }

  }, {})
}

function tryParseJSON(data) {
  try {
    const json = JSON.parse(data)

    return  json
  } catch (e) {
    return data
  }
}

function searchDotEnvFile(directory) {
  const fileLocation = path.join(directory, '.env')

  try {
    const file = fs.readFileSync(fileLocation, 'utf8')
    const data = parseDotEnv(file)

    return data
  } catch(e) {
    return {}
  }
}

function searchDotEnvJsonFile(directory) {
  const fileLocation = path.join(directory, '.env.json')

  try {
    const file = fs.readFileSync(fileLocation, 'utf8')
    const data = JSON.parse(file)

    return data
  } catch(e) {
    return {}
  }
}

function searchDotEnvJSFile(directory) {
  const fileLocation = path.join(directory, '.env.js')

  try {
    const data = require(fileLocation)

    return data
  } catch(e) {
    return {}
  }
}

function searchAllEnvFiles() {
  return module.paths
    .reverse()
    .reduce((final, directory) => {
      const currentDirectory = path.dirname(directory)

      // Ignore `.env` files inside node_modules folders
      if (/node_modules/.test(currentDirectory)) {
        return final
      }

      return Object.assign(
        {},
        final,
        searchDotEnvFile(currentDirectory),
        searchDotEnvJsonFile(currentDirectory),
        searchDotEnvJSFile(currentDirectory),
      )
    }, {})
}

function StoreEnvKeysInProcessEnv(obj) {
  for (const key in obj) {
    process.env[key] = obj[key]
  }
}

StoreEnvKeysInProcessEnv(
  searchAllEnvFiles()
)

// binds exports to `process.env`
// https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Functions/get
Object.defineProperty(module, 'exports', {
  get: () => process.env
})
