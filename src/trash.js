const client = require('./lib/client')
const log = require('./lib/logger')

const operations = {
  get: async (itemID) => {
    const item = await client.trash.get(itemID)
    log(item)
    return item
  },
  restore: async (itemID) => {
    await client.trash.restore(itemID)
    log('Item restored')
    return 'Item restored'
  },
  delete: async (itemID) => {
    await client.trash.delete(itemID)
    log('Item deleted')
    return 'Item deleted'
  }
}

function trash (arg, options, subCommand) {
  const operation = operations[subCommand._name]
  operation(arg, options)
}

module.exports = trash
