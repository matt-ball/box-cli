const client = require('./lib/client')

const operations = {
  get: async (pinID) => {
    const pin = await client.devicePins.get(pinID)
    console.log(pin)
  },
  getAll: async () => {
    const pins = await client.devicePins.getAll()
    console.log(pins)
  },
  delete: async (pinID) => {
    await client.devicePins.delete(pinID)
    console.log('Device pin deleted')
  }
}

function devicePins (arg, options, subCommand) {
  const operation = operations[subCommand._name]
  operation(arg, options)
}

module.exports = devicePins
