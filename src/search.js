const client = require('./lib/client')
const log = require('./lib/logger')

const operations = {
  query: async (searchString, { options }) => {
    const results = await client.search.query(searchString, options)
    log(results)
    return results
  }
}

async function search (arg, options, subCommand) {
  const operation = operations[subCommand._name]
  const result = await operation(arg, options)

  return result
}

module.exports = search
