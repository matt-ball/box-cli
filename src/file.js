const fs = require('fs')
const client = require('./lib/client')
const log = require('./lib/logger')
const handleError = require('./lib/handle-error')

const operations = {
  get: async (fileId) => {
    const file = await client.files.get(fileId)
    log(file)
    return file
  },
  download: async (fileId, { path }) => {
    const stream = await client.files.getReadStream(fileId)
    const output = fs.createWriteStream(path)
    stream.pipe(output)
    log('Download complete!')
    return stream
  },
  upload: async (path, { folder }) => {
    const stream = fs.createReadStream(path)
    const filename = path.split('/').pop()
    const file = await client.files.uploadFile(folder, filename, stream)
    log('Upload complete!')
    return file
  },
  delete: async (fileId) => {
    const file = await client.files.delete(fileId)
    log('File deleted!')
    return 'File deleted!'
  }
}

async function file (arg, options, subCommand) {
  try {
    const operation = operations[subCommand._name]
    const result = await operation(arg, options)

    return result
  } catch (err) {
    handleError(err)
  }
}

module.exports = file
