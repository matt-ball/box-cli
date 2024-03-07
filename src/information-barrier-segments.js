const client = require('./lib/client')
const log = require('./lib/logger')

const operations = {
  get: async (segmentID) => {
    const segment = await client.shieldInformationBarrierSegments.getById({ 
      shield_information_barrier_segment_id: segmentID
    })
    log(segment)
    return segment
  },
  getAll: async (segmentID) => {
    const segments = await client.shieldInformationBarrierSegments.getAll({
      shield_information_barrier_id: segmentID
    })
    log(segments)
    return segments
  },
  create: async (segmentID, { name, description }) => {
    const segment = await client.shieldInformationBarrierSegments.create({
      shield_information_barrier: {
        id: segmentID,
        type: 'shield_information_barrier'
      },
      name,
      description
    })
    log(segment)
    return segment
  },
  update: async (segmentID, { name, description }) => {
    const segment = await client.shieldInformationBarrierSegments.update({
      shield_information_barrier_segment_id: segmentID
    }, {
      name,
      description
    })
    log(segment)
    return segment
  },
  delete: async (segmentID) => {
    await client.shieldInformationBarrierSegments.deleteById({
      shield_information_barrier_segment_id: segmentID
    })
    log('Segment deleted')
    return 'Segment deleted'
  }
}

function informationBarrierSegments (arg, options, subCommand) {
  const operation = operations[subCommand._name]
  operation(arg, options)
}

module.exports = informationBarrierSegments
