const camelize = require('./lib/camelize')
const client = require('./lib/client')
const handleError = require('./lib/handle-error')
const log = require('./lib/logger')

const operations = {
  get: async (folderId) => {
    const folder = await client.folders.get(folderId)
    log(folder)
    return folder
  },
  create: async (name, { parent }) => {
    const parentId = parent || '0' // Default to root folder
    const folder = await client.folders.create(parentId, name)
    log(folder)
    return folder
  },
  delete: async (folderId) => {
    await client.folders.delete(folderId)
    log('Folder deleted!')
    return 'Folder deleted!'
  },
  update: async (folderId, { name, description }) => {
    const updates = {}
    if (name) updates.name = name
    if (description) updates.description = description
    
    const folder = await client.folders.update(folderId, updates)
    log(folder)
    return folder
  },
  getItems: async (folderId) => {
    const items = await client.folders.getItems(folderId)
    log(items)
    return items
  },
  copy: async (folderId, { parent, name }) => {
    const parentId = parent || '0' // Default to root folder
    const options = {}
    if (name) options.name = name
    
    const folder = await client.folders.copy(folderId, parentId, options)
    log(folder)
    return folder
  }
}

async function folders (arg, options, subCommand) {
  try {
    const name = subCommand ? subCommand._name : options._name
    const operation = operations[camelize(name)]
    const result = await operation(arg, options)

    return result
  } catch (err) {
    handleError(err)
  }
}

module.exports = folders
