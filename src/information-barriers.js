const client = require('./lib/client')

const operations = {
  get: async (barrierID) => {
    const barrier = await client.shieldInformationBarriers.getById({ barrierID })
    console.log(barrier)
  },
  getAll: async () => {
    const barriers = await client.shieldInformationBarriers.getAll()
    console.log(barriers)
  }
}

function informationBarriers (arg, options, subCommand) {
  const operation = operations[subCommand._name]
  operation(arg, options)
}

module.exports = informationBarriers
