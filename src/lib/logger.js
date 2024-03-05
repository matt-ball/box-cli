const util = require('util')
const opts = { colors: true, depth: null }
const isTest = process.env.NODE_ENV === 'test'

// json is not logged to most terminals gracefully
// this function ensures that we log with color
// and proper indentation, and the we only log
// when being run as a CLI (i.e. not under test)
function log (item) {
  if (isTest) return

  const isJson = typeof item === 'object'

  if (isJson) {
    console.log(util.inspect(item, opts))
  } else {
    console.log(`\n${item}\n`)
  }
}

module.exports = log
