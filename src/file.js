const fs = require('fs')
const client = require('./lib/client')

const operations = {
  get: async (fileId) => {
    const file = await client.files.get(fileId)
    console.log(file)
  },
  download: async (fileId, { path }) => {
    const stream = await client.files.getReadStream(fileId)
    const output = fs.createWriteStream(path)
    stream.pipe(output)
  },
  upload: async (path, { folder }) => {
    const stream = fs.createReadStream(path)
    const filename = path.split('/').pop()
    const file = await client.files.uploadFile(folder, filename, stream)
    console.log('Upload complete')
  },
  delete: async (fileId) => {
    await client.files.delete(fileId)
    console.log('File deleted')
  }
}

function file (arg, options, subCommand) {
  const operation = operations[subCommand._name]
  operation(arg, options)
}

module.exports = file
