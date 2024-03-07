const client = require('./lib/client')
const log = require('./lib/logger')

const operations = {
  get: async (barrierID) => {
    const barrier = await client.shieldInformationBarriers.getById({ 
      shield_information_barrier_id: barrierID
    })
    log(barrier)
  },
  getAll: async () => {
    const barriers = await client.shieldInformationBarriers.getAll()
    log(barriers)
    return barriers
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

function informationBarriers (arg, options, subCommand) {
  const operation = operations[subCommand._name]
  operation(arg, options)
}

module.exports = informationBarriers
