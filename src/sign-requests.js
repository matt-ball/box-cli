const client = require('./lib/client')
const log = require('./lib/logger')

const operations = {
  get: async (fileID) => {
    const file = await client.signRequests.get(fileID)
    log(file)
    return file
  },
  create: async (name, { parentID }) => {
    const file = await client.signRequests.create(parentID, name)
    log(file)
    return file
  },
  cancel: async (fileID) => {
    await client.signRequests.cancel(fileID)
    log('Sign request cancelled')
    return 'Sign request cancelled'
  },
  resend: async (fileID) => {
    await client.signRequests.resend(fileID)
    log('Sign request resent')
    return 'Sign request resent'
  }
}

async function signRequests (arg, options, subCommand) {
  const operation = operations[subCommand._name]
  const result = await operation(arg, options)

  return result
}

module.exports = signRequests
