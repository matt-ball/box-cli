const client = require('./lib/client')

const operations = {
  get: async (collaborationID) => {
    const collaboration = await client.collaborations.get(collaborationID)
    log(collaboration)
    return collaboration
  },
  getPending: async () => {
    const collaborations = await client.collaborations.getPending()
    log(collaborations)
    return collaborations
  },
  update: async (collaborationID, { status }) => {
    const collaboration = await client.collaborations.update(collaborationID, s)
    log(collaboration)
    return collaboration
  },
  delete: async (collaborationID) => {
    await client.collaborations.delete(collaborationID)
    log('Collaboration deleted')
    return 'Collaboration deleted'
  }
}

async function collaborations (arg, options, subCommand) {
  const operation = operations[subCommand._name]
  const result = await operation(arg, options)

  return result
}

module.exports = collaborations
