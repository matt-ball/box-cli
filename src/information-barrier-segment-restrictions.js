const client = require('./lib/client')

const operations = {
  get: async (segmentID) => {
    const segment = await client.informationBarrierSegmentRestrictions.get(segmentID)
    console.log(segment)
  },
  getAll: async () => {
    const segments = await client.informationBarrierSegmentRestrictions.getAll()
    console.log(segments)
  }
}

function informationBarrierSegmentRestrictions (arg, options, subCommand) {
  const operation = operations[subCommand._name]
  operation(arg, options)
}

module.exports = informationBarrierSegmentRestrictions
