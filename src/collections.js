const client = require('./lib/client')

const operations = {
  get: async (collectionID) => {
    const collection = await client.collections.get(collectionID)
    console.log(collection)
  },
  getAll: async () => {
    const collections = await client.collections.getAll()
    console.log(collections)
  },
  getItems: async (collectionID, { options }) => {
    const items = await client.collections.getItems(collectionID, options)
    console.log(items)
  }
}

function collections (arg, options, subCommand) {
  const operation = operations[subCommand._name]
  operation(arg, options)
}

module.exports = collections
