const client = require('./lib/client')
const log = require('./lib/logger')

const operations = {
  get: async (limit) => {
    const item = await client.recentItems.get({ limit })
    log(item)
    return item
  }
}

function recentItems (arg, options, subCommand) {
  const operation = operations[subCommand._name]
  operation(arg, options)
}

module.exports = recentItems
