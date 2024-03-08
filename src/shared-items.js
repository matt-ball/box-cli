const client = require('./lib/client')
const log = require('./lib/logger')

const operations = {
  get: async (itemID) => {
    const item = await client.sharedItems.get(itemID)
    log(item)
    return item
  }
}

function sharedItems (arg, options, subCommand) {
  const operation = operations[subCommand._name]
  operation(arg, options)
}

module.exports = sharedItems
