const client = require('./lib/client')

const operations = {
  get: async (fileRequestId) => {
    const fileRequest = await client.fileRequests.get(fileRequestId)
    console.log(fileRequest)
  },
  getAll: async () => {
    const fileRequests = await client.fileRequests.getAll()
    console.log(fileRequests)
  },
  create: async (name, { parent }) => {
    const fileRequest = await client.fileRequests.create(parent, name)
    console.log(fileRequest)
  },
  copy: async (fileRequestIdToCopy, { copyRequest }) => {
    const fileRequest = await client.fileRequests.copy(fileRequestIdToCopy, copyRequest)
    console.log(fileRequest)
  },
  update: async (fileRequestId, { fileRequestChange }) => {
    const fileRequest = await client.fileRequests.update(fileRequestId, fileRequestChange)
    console.log(fileRequest)
  },
  delete: async (fileRequestId) => {
    await client.fileRequests.delete(fileRequestId)
    console.log('File request deleted')
  }
}

function fileRequests (arg, options, subCommand) {
  const operation = operations[subCommand._name]
  operation(arg, options)
}

module.exports = fileRequests
