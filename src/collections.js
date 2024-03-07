const client = require('./lib/client')
const log = require('./lib/logger')

const operations = {
  get: async (collectionID) => {
    const collection = await client.collections.get(collectionID)
    log(collection)
    return collection
  },
  getAll: async () => {
    const collections = await client.collections.getAll()
    log(collections)
    return collections
  },
  getItems: async (collectionID, { options }) => {
    const items = await client.collections.getItems(collectionID, options)
    log(items)
    return items
  }
}

function collections (arg, options, subCommand) {
  const operation = operations[subCommand._name]
  operation(arg, options)
}

module.exports = collections
