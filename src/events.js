const client = require('./lib/client')

const operations = {
  get: async (streamPosition) => {
    const stream = await client.events.get(streamPosition)
    console.log(stream)
  },
  getLongPollInfo: async () => {
    const info = await client.events.getLongPollInfo()
    console.log(info)
  },
  getEventStream: async (streamPosition, { options }) => {
    const stream = await client.events.getEventStream(streamPosition, options)
    console.log(stream)
  },
  getEnterpriseEventStream: async (options) => {
    const stream = await client.events.getEnterpriseEventStream(options)
    console.log(stream)
  }
}

function events (arg, options, subCommand) {
  const operation = operations[subCommand._name]
  operation(arg, options)
}

module.exports = events
