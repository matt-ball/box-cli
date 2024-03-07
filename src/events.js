const client = require('./lib/client')
const log = require('./lib/logger')

const operations = {
  get: async (streamPosition) => {
    const stream = await client.events.get(streamPosition)
    log(stream)
    return stream
  },
  getLongPollInfo: async () => {
    const info = await client.events.getLongPollInfo()
    log(info)
    return info
  },
  getEventStream: async (streamPosition, { options }) => {
    const stream = await client.events.getEventStream(streamPosition, options)
    log(stream)
    return stream
  },
  getEnterpriseEventStream: async (options) => {
    const stream = await client.events.getEnterpriseEventStream(options)
    log(stream)
    return stream
  }
}

function events (arg, options, subCommand) {
  const operation = operations[subCommand._name]
  operation(arg, options)
}

module.exports = events
