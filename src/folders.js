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
  getItems: async (folderId, { limit = 100 } = {}) => {
    const items = await client.folders.getItems(folderId, { limit })
    log(items)
    return items
  },
  create: async (name, options) => {
    const parentId = options['parent-id'] || '0'
    const folder = await client.folders.create(parentId, name)
    log(folder)
    return folder
  },
  update: async (folderId, options) => {
    const updates = {}
    if (options.name) updates.name = options.name
    if (options.description) updates.description = options.description
    
    const folder = await client.folders.update(folderId, updates)
    log(folder)
    return folder
  },
  delete: async (folderId, { recursive = true } = {}) => {
    await client.folders.delete(folderId, { recursive })
    log('Folder deleted!')
    return 'Folder deleted!'
  },
  copy: async (folderId, options) => {
    const destFolderId = options['dest-folder-id'] || '0'
    const copyOptions = {}
    if (options.name) copyOptions.name = options.name
    
    const folder = await client.folders.copy(folderId, destFolderId, copyOptions)
    log(folder)
    return folder
  },
  move: async (folderId, options) => {
    const destFolderId = options['dest-folder-id'] || '0'
    const folder = await client.folders.move(folderId, destFolderId)
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
