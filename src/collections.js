const client = require('./lib/client')
const log = require('./lib/logger')

const operations = {
  get: async (collectionID) => {
    const collection = await client.collections.get(collectionID)
    log(collection)
    return collection
  },
  getItems: async (collectionID, { options }) => {
    const items = await client.collections.getItems(collectionID, options)
    log(items)
    return items
  }
}

async function collections (arg, options, subCommand) {
  const operation = operations[subCommand._name]
  const result = await operation(arg, options)

  return result
}

module.exports = collections
