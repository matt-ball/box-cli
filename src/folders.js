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
  },
  listAll: async () => {
    // Get all folders by searching for type:folder
    const results = await client.search.query('type:folder', { limit: 200 })
    log(results)
    return results
  },
  search: async (query) => {
    // Search for folders with the given query
    const searchQuery = `${query} type:folder`
    const results = await client.search.query(searchQuery, { limit: 100 })
    log(results)
    return results
  },
  move: async (folderId, { parent }) => {
    const parentId = parent || '0' // Default to root folder
    const folder = await client.folders.update(folderId, { parent: { id: parentId } })
    log(folder)
    return folder
  },
  getCollaborations: async (folderId) => {
    const collaborations = await client.folders.getCollaborations(folderId)
    log(collaborations)
    return collaborations
  },
  share: async (folderId, { access = 'open' }) => {
    const sharedLink = await client.folders.update(folderId, {
      shared_link: {
        access: access
      }
    })
    log(sharedLink)
    return sharedLink
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
