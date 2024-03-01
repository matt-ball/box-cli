const client = require('./lib/client')

const operations = {
  get: async (segmentID) => {
    const segment = await client.informationBarrierSegmentMembers.get(segmentID)
    console.log(segment)
  },
  getAll: async () => {
    const segments = await client.informationBarrierSegmentMembers.getAll()
    console.log(segments)
  }
}

function informationBarrierSegmentMembers (arg, options, subCommand) {
  const operation = operations[subCommand._name]
  operation(arg, options)
}

module.exports = informationBarrierSegmentMembers
