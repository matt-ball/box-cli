const client = require('./lib/client')

const operations = {
  getUsers: async (options) => {
    const users = await client.enterprise.getUsers(options)
    console.log(users)
  },
  inviteUser: async (enterpriseID, { email }) => {
    const invite = await client.enterprise.inviteUser(enterpriseID, email)
    console.log(invite)
  },
  createUser: async (login, { name }) => {
    const user = await client.enterprise.addUser(login, name)
    console.log(user)
  },
  createAppUser: async (name, { options }) => {
    const user = await client.enterprise.addAppUser(name, options)
    console.log(user)
  },
  transferUserContent: async (sourceUserID, { destUserID }) => {
    const folder = await client.enterprise.transferUserContent(sourceUserID, destUserID)
    console.log(folder)
  }
}

function enterprise (arg, options, subCommand) {
  const operation = operations[subCommand._name]
  operation(arg, options)
}

module.exports = enterprise
