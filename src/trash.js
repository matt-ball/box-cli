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

async function trash (arg, options, subCommand) {
  const operation = operations[subCommand._name]
  const result = await operation(arg, options)

  return result
}

module.exports = trash
