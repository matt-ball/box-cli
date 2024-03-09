const client = require('./lib/client')
const log = require('./lib/logger')

const operations = {
  get: async (fileRequestId) => {
    const fileRequest = await client.fileRequests.get(fileRequestId)
    log(fileRequest)
    return fileRequest
  },
  copy: async (options, { fileRequestID }) => {
    const fileRequest = await client.fileRequests.copy(fileRequestID, { options })
    log(fileRequest)
    return fileRequest
  },
  update: async (options, { fileRequestID }) => {
    const fileRequest = await client.fileRequests.update(fileRequestID, { options })
    log(fileRequest)
    return fileRequest
  },
  delete: async (fileRequestId) => {
    await client.fileRequests.delete(fileRequestId)
    log('File request deleted')
    return 'File request deleted'
  }
}

async function fileRequests (arg, options, subCommand) {
  const operation = operations[subCommand._name]
  const result = await operation(arg, options)

  return result
}

module.exports = fileRequests
