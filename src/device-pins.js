const client = require('./lib/client')
const log = require('./lib/logger')

const operations = {
  get: async (pinID) => {
    const pin = await client.devicePins.get(pinID)
    log(pin)
    return pin
  },
  delete: async (pinID) => {
    await client.devicePins.delete(pinID)
    log('Device pin deleted')
    return 'Device pin deleted'
  }
}

async function devicePins (arg, options, subCommand) {
  const operation = operations[subCommand._name]
  const result = await operation(arg, options)

  return result
}

module.exports = devicePins
