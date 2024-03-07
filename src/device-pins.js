const client = require('./lib/client')
const log = require('./lib/logger')

const operations = {
  get: async (pinID) => {
    const pin = await client.devicePins.get(pinID)
    log(pin)
    return pin
  },
  getAll: async () => {
    const pins = await client.devicePins.getAll()
    log(pins)
    return pins
  },
  delete: async (pinID) => {
    await client.devicePins.delete(pinID)
    log('Device pin deleted')
    return 'Device pin deleted'
  }
}

function devicePins (arg, options, subCommand) {
  const operation = operations[subCommand._name]
  operation(arg, options)
}

module.exports = devicePins
