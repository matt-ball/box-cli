const client = require('./lib/client')

const operations = {
  get: async (collaborationID) => {
    const collaboration = await client.collaborations.get(collaborationID)
    console.log(collaboration)
  },
  getPending: async () => {
    const collaborations = await client.collaborations.getPending()
    console.log(collaborations)
  },
  update: async (collaborationID, { status }) => {
    const collaboration = await client.collaborations.update(collaborationID, { status })
    console.log(collaboration)
  },
  delete: async (collaborationID) => {
    await client.collaborations.delete(collaborationID)
    console.log('Collaboration deleted')
  }
}

function collaborations (arg, options, subCommand) {
  const operation = operations[subCommand._name]
  operation(arg, options)
}

module.exports = collaborations
