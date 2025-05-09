const client = require('./lib/client')
const log = require('./lib/logger')

const operations = {
  get: async (folderId) => {
    const folder = await client.folders.get(folderId)
    log(folder)
    return folder
  },
  create: async (name, { parentId }) => {
    const folder = await client.folders.create(parentId, name)
    log(folder)
    return folder
  },
  update: async (folderId, { name, description }) => {
    const updates = {}
    if (name) updates.name = name
    if (description) updates.description = description
    
    const folder = await client.folders.update(folderId, updates)
    log(folder)
    return folder
  },
  delete: async (folderId) => {
    await client.folders.delete(folderId)
    log('Folder deleted!')
    return 'Folder deleted!'
  },
  list: async (folderId, { limit }) => {
    const options = {}
    if (limit) options.limit = limit
    
    const items = await client.folders.getItems(folderId, options)
    log(items)
    return items
  }
}

async function folders(arg, options, subCommand) {
  const operation = operations[subCommand._name]
  const result = await operation(arg, options)

  return result
}

module.exports = folders
