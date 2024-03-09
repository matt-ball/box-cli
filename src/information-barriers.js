const client = require('./lib/client')
const log = require('./lib/logger')

const operations = {
  get: async (barrierID) => {
    const barrier = await client.shieldInformationBarriers.getById({ 
      shield_information_barrier_id: barrierID
    })
    log(barrier)
  },
  create: async (barrierID) => {
    const barrier = await client.shieldInformationBarriers.create({
      enterprise: {
        id: barrierID,
        type: 'enterprise'
      }
    })
    log(barrier)
    return barrier
  },
  update: async (barrierID, { status }) => {
    const barrier = await client.shieldInformationBarriers.update({
      enterprise: {
        id: barrierID,
        status
      }
    })
    log(barrier)
    return barrier
  }
}

async function informationBarriers (arg, options, subCommand) {
  const operation = operations[subCommand._name]
  const result = await operation(arg, options)

  return result
}

module.exports = informationBarriers
