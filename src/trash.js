const client = require('./lib/client')

const operations = {
  get: async (itemID) => {
    const item = await client.trash.get(itemID)
    console.log(item)
  },
  restore: async (itemID) => {
    await client.trash.restore(itemID)
    console.log('Item restored')
  },
  delete: async (itemID) => {
    await client.trash.delete(itemID)
    console.log('Item deleted')
  }
}

function trash (arg, options, subCommand) {
  const operation = operations[subCommand._name]
  operation(arg, options)
}

module.exports = trash
