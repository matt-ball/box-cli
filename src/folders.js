const client = require('./lib/client')
const handleError = require('./lib/handle-error')
const log = require('./lib/logger')

const operations = {
  get: async (folderId) => {
    const folder = await client.folders.get(folderId)
    log(folder)
    return folder
  },
  getItems: async (folderId, { limit, offset, fields }) => {
    const options = {}
    if (limit) options.limit = limit
    if (offset) options.offset = offset
    if (fields) options.fields = fields.split(',')
    
    const items = await client.folders.getItems(folderId, options)
    log(items)
    return items
  },
  create: async (name, { parentId }) => {
    const folder = await client.folders.create(parentId, name)
    log(folder)
    return folder
  },
  update: async (folderId, { name, description }) => {
    const options = {}
    if (name) options.name = name
    if (description) options.description = description
    
    const folder = await client.folders.update(folderId, options)
    log(folder)
    return folder
  },
  delete: async (folderId, { recursive }) => {
    await client.folders.delete(folderId, { recursive })
    log('Folder deleted!')
    return 'Folder deleted!'
  },
  copy: async (folderId, { destFolderId, name }) => {
    const options = {}
    if (name) options.name = name
    
    const folder = await client.folders.copy(folderId, destFolderId, options)
    log(folder)
    return folder
  }
}

async function folders(arg, options, subCommand) {
  try {
    const operation = operations[subCommand._name]
    const result = await operation(arg, options)

    return result
  } catch (err) {
    handleError(err)
  }
}

module.exports = folders
