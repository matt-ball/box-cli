const client = require('./lib/client')
const log = require('./lib/logger')

const operations = {
  get: async (folderID) => {
    const folder = await client.folders.get(folderID)
    log(folder)
    return folder
  },
  create: async (name, { parentID }) => {
    const folder = await client.folders.create(parentID, name)
    log(folder)
    return folder
  },
  delete: async (folderID) => {
    await client.folders.delete(folderID)
    log('Folder deleted')
    return 'Folder deleted'
  },
  update: async (folderID, { name }) => {
    const folder = await client.folders.update(folderID, { name })
    log(folder)
    return folder
  }
}

async function folders (arg, options, subCommand) {
  try {
    const operation = operations[subCommand._name]
    const result = await operation(arg, options)
    return result
  } catch (err) {
    handleError(err)
  }
}

module.exports = folders
