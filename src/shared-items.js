const client = require('./lib/client')
const log = require('./lib/logger')

const operations = {
  get: async (itemID) => {
    const item = await client.sharedItems.get(itemID)
    log(item)
    return item
  }
}

async function sharedItems (arg, options, subCommand) {
  const operation = operations[subCommand._name]
  const result = await operation(arg, options)

  return result
}

module.exports = sharedItems
