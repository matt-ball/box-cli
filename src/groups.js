const client = require('./lib/client')
const log = require('./lib/logger')

const operations = {
  get: async (groupID) => {
    const group = await client.groups.get(groupID)
    log(group)
    return group
  },
  getMemberships: async (groupID, { options }) => {
    const memberships = await client.groups.getMemberships(groupID, options)
    log(memberships)
    return memberships
  },
  addUser: async (userID, { groupID }) => {
    const membership = await client.groups.addUser(groupID, userID)
    log(membership)
    return membership
  },
  getCollaborations: async (groupID, { options }) => {
    const collaborations = await client.groups.getCollaborations(groupID, options)
    log(collaborations)
    return collaborations
  }
}

async function groups (arg, options, subCommand) {
  const operation = operations[subCommand._name]
  const result = await operation(arg, options)

  return result
}

module.exports = groups
