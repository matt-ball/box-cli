const client = require('./lib/client')
const log = require('./lib/logger')

const operations = {
  getUsers: async (options) => {
    const users = await client.enterprise.getUsers({ options })
    log(users)
    return users
  },
  inviteUser: async (enterpriseID, { email }) => {
    const invite = await client.enterprise.inviteUser(enterpriseID, email)
    log(invite)
    return invite
  },
  createUser: async (name, { email }) => {
    const user = await client.enterprise.addUser(email, name)
    log(user)
    return user
  },
  createAppUser: async (name, { options }) => {
    const user = await client.enterprise.addAppUser(name, options)
    log(user)
    return user
  },
  transferUserContent: async (sourceUserID, { destUserID }) => {
    const folder = await client.enterprise.transferUserContent(sourceUserID, destUserID)
    log(folder)
    return folder
  }
}

async function enterprise (arg, options, subCommand) {
  const operation = operations[subCommand._name]
  const result = await operation(arg, options)

  return result
}

module.exports = enterprise
