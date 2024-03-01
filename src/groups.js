const client = require('./lib/client')

const operations = {
  get: async (groupID) => {
    const group = await client.groups.get(groupID)
    console.log(group)
  },
  getAll: async () => {
    const groups = await client.groups.getAll()
    console.log(groups)
  },
  getMemberships: async (groupID, { options }) => {
    const memberships = await client.groups.getMemberships(groupID, options)
    console.log(memberships)
  },
  addUser: async (groupID, { userID }) => {
    const membership = await client.groups.addUser(groupID, userID)
    console.log(membership)
  },
  getCollaborations: async (groupID, { options }) => {
    const collaborations = await client.groups.getCollaborations(groupID, options)
    console.log(collaborations)
  }
}

function groups (arg, options, subCommand) {
  const operation = operations[subCommand._name]
  operation(arg, options)
}

module.exports = groups
