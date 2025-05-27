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
  getItems: async (folderId, options = {}) => {
    const items = await client.folders.getItems(folderId, options)
    log(items)
    return items
  },
  create: async (name, { parent = '0' }) => {
    const folder = await client.folders.create(parent, name)
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
  copy: async (folderId, { destination, name }) => {
    const options = {}
    if (name) options.name = name
    
    const folder = await client.folders.copy(folderId, destination, options)
    log(folder)
    return folder
  },
  move: async (folderId, { destination }) => {
    const folder = await client.folders.move(folderId, destination)
    log(folder)
    return folder
  },
  delete: async (folderId, { recursive = false }) => {
    await client.folders.delete(folderId, { recursive })
    log('Folder deleted!')
    return 'Folder deleted!'
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
