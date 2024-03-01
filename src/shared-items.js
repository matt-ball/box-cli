const client = require('./lib/client')

const operations = {
  get: async (itemID) => {
    const item = await client.sharedItems.get(itemID)
    console.log(item)
  }
}

function sharedItems (arg, options, subCommand) {
  const operation = operations[subCommand._name]
  operation(arg, options)
}

module.exports = sharedItems
