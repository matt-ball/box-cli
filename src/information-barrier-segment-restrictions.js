const client = require('./lib/client')
const log = require('./lib/logger')

const operations = {
  get: async (segmentID) => {
    const segment = await client.shieldInformationBarrierSegmentRestrictions.getById({ 
      shield_information_barrier_segment_restriction_id: segmentID
    })
    log(segment)
    return segment
  },
  create: async (segmentID, { restrictedSegmentID }) => {
    const segment = await client.shieldInformationBarrierSegmentRestrictions.create({
      type: 'shield_information_barrier_segment_restriction',
      shield_information_barrier_segment: {
        id: segmentID,
        type: 'shield_information_barrier_segment'
      },
      restricted_segment: {
        id: restrictedSegmentID,
        type: 'shield_information_barrier_segment'
      }
    })
    log(segment)
    return segment
  },
  delete: async (segmentID) => {
    await client.shieldInformationBarrierSegmentRestrictions.deleteById({
      shield_information_barrier_segment_restriction_id: segmentID
    })
    log('Segment deleted')
    return 'Segment deleted'
  }
}

async function informationBarrierSegmentRestrictions (arg, options, subCommand) {
  const operation = operations[subCommand._name]
  const result = await operation(arg, options)

  return result
}

module.exports = informationBarrierSegmentRestrictions
