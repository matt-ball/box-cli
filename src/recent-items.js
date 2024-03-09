const client = require('./lib/client')
const log = require('./lib/logger')

const operations = {
  get: async (limit) => {
    const item = await client.recentItems.get({ limit })
    log(item)
    return item
  }
}

async function recentItems (arg, options, subCommand) {
  const operation = operations[subCommand._name]
  const result = await operation(arg, options)

  return result
}

module.exports = recentItems
