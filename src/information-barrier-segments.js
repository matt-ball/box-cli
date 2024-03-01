const client = require('./lib/client')

const operations = {
  get: async (segmentID) => {
    const segment = await client.shieldInformationBarrierSegments.getById({ segmentID })
    console.log(segment)
  },
  getAll: async () => {
    const segments = await client.shieldInformationBarrierSegments.getAll()
    console.log(segments)
  }
}

function informationBarrierSegments (arg, options, subCommand) {
  const operation = operations[subCommand._name]
  operation(arg, options)
}

module.exports = informationBarrierSegments
