const client = require('./lib/client')
const log = require('./lib/logger')

const operations = {
  get: async (folderId) => {
    const folder = await client.folders.get(folderId)
    log(folder)
    return folder
  },
  
  getItems: async (folderId) => {
    const items = await client.folders.getItems(folderId)
    log(items)
    return items
  },
  
  create: async (name, { parentID }) => {
    const folder = await client.folders.create(parentID || '0', name)
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
  
  delete: async (folderId, { recursive }) => {
    if (recursive) {
      await client.folders.delete(folderId, { recursive: true })
      log('Folder and contents deleted!')
      return 'Folder and contents deleted!'
    } else {
      await client.folders.delete(folderId)
      log('Folder deleted!')
      return 'Folder deleted!'
    }
  },
  
  copy: async (folderId, { parentID, name }) => {
    const options = {}
    if (parentID) options.parent = { id: parentID }
    if (name) options.name = name
    
    const folder = await client.folders.copy(folderId, options)
    log(folder)
    return folder
  },
  
  move: async (folderId, { parentID, name }) => {
    const updates = {}
    if (parentID) updates.parent = { id: parentID }
    if (name) updates.name = name
    
    const folder = await client.folders.update(folderId, updates)
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
    const handleError = require('./lib/handle-error')
    handleError(err)
  }
}

module.exports = folders
