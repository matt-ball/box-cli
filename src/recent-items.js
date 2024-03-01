const client = require('./lib/client')

const operations = {
  get: async (itemID) => {
    const item = await client.recentItems.get(itemID)
    console.log(item)
  }
}

function recentItems (arg, options, subCommand) {
  const operation = operations[subCommand._name]
  operation(arg, options)
}

module.exports = recentItems
