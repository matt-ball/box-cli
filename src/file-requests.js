const client = require('./lib/client')
const log = require('./lib/logger')

const operations = {
  get: async (fileRequestId) => {
    const fileRequest = await client.fileRequests.get(fileRequestId)
    log(fileRequest)
    return fileRequest
  },
  copy: async (fileRequestIdToCopy, { copyRequest }) => {
    const fileRequest = await client.fileRequests.copy(fileRequestIdToCopy, copyRequest)
    log(fileRequest)
    return fileRequest
  },
  update: async (fileRequestId, { fileRequestChange }) => {
    const fileRequest = await client.fileRequests.update(fileRequestId, fileRequestChange)
    log(fileRequest)
    return fileRequest
  },
  delete: async (fileRequestId) => {
    await client.fileRequests.delete(fileRequestId)
    log('File request deleted')
    return 'File request deleted'
  }
}

function fileRequests (arg, options, subCommand) {
  const operation = operations[subCommand._name]
  operation(arg, options)
}

module.exports = fileRequests
