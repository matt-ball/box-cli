const client = require('./lib/client')
const log = require('./lib/logger')

const operations = {
  get: async (folderId) => {
    const folder = await client.folders.get(folderId)
    log(folder)
    return folder
  },
  create: async (name, { parentID }) => {
    const folder = await client.folders.create(parentID, name)
    log(folder)
    return folder
  },
  update: async (folderId, { name, description }) => {
    const folder = await client.folders.update(folderId, { name, description })
    log(folder)
    return folder
  },
  delete: async (folderId) => {
    await client.folders.delete(folderId)
    log('Folder deleted')
    return 'Folder deleted'
  }
}

async function folders (arg, options, subCommand) {
  const operation = operations[subCommand._name]
  const result = await operation(arg, options)

  return result
}

module.exports = folders
