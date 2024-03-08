const client = require('./lib/client')
const log = require('./lib/logger')

const operations = {
  get: async (fileID) => {
    const file = await client.signRequests.get(fileID)
    log(file)
    return file
  },
  getAll: async () => {
    const files = await client.signRequests.getAll()
    log(files)
    return files
  },
  create: async (name, { parent }) => {
    const file = await client.signRequests.create(parent, name)
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

function signRequests (arg, options, subCommand) {
  const operation = operations[subCommand._name]
  operation(arg, options)
}

module.exports = signRequests
