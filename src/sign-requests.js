const client = require('./lib/client')

const operations = {
  get: async (fileID) => {
    const file = await client.signRequests.get(fileID)
    console.log(file)
  },
  getAll: async () => {
    const files = await client.signRequests.getAll()
    console.log(files)
  },
  create: async (name, { parent }) => {
    const file = await client.signRequests.create(parent, name)
    console.log(file)
  },
  cancel: async (fileID) => {
    await client.signRequests.cancel(fileID)
    console.log('Sign request cancelled')
  },
  resend: async (fileID) => {
    await client.signRequests.resend(fileID)
    console.log('Sign request resent')
  }
}

function signRequests (arg, options, subCommand) {
  const operation = operations[subCommand._name]
  operation(arg, options)
}