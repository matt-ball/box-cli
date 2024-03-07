const client = require('./lib/client')
const log = require('./lib/logger')

const operations = {
  get: async (id) => {
    const segment = await client.shieldInformationBarrierSegmentMembers.get({
      shield_information_barrier_segment_member_id: id
    })
    log(segment)
    return segment
  },
  getAll: async (segmentID) => {
    const segments = await client.shieldInformationBarrierSegmentMembers.getAll({
      shield_information_barrier_segment_id: segmentID
    })
    log(segments)
  },
  create: async (segmentID, { userID }) => {
    const segment = await client.shieldInformationBarrierSegmentMembers.create({
      shield_information_barrier_segment: {
        id: segmentID,
        type: 'shield_information_barrier_segment'
      },
      user: {
        id: userID,
        type: 'user'
      }
    })
    log(segment)
    return segment
  },
  delete: async (id) => {
    await client.shieldInformationBarrierSegmentMembers.deleteById({
      shield_information_barrier_segment_member_id: id
    })
    log('Segment member deleted')
    return 'Segment member deleted'
  }
}

function informationBarrierSegmentMembers (arg, options, subCommand) {
  const operation = operations[subCommand._name]
  operation(arg, options)
}

module.exports = informationBarrierSegmentMembers
