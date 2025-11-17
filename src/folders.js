const camelize = require('./lib/camelize')
const client = require('./lib/client')
const handleError = require('./lib/handle-error')
const log = require('./lib/logger')

const operations = {
  create: async (name, { parent }) => {
    const parentId = parent || '0'
    const folder = await client.folders.create(parentId, name)
    log(folder)
    return folder
  },
  get: async (folderId) => {
    const folder = await client.folders.get(folderId)
    log(folder)
    return folder
  },
  update: async (folderId, { name, parent }) => {
    const updates = {}

    if (name) updates.name = name
    if (parent) updates.parent = { id: parent }

    const folder = await client.folders.update(folderId, updates)
    log(folder)
    return folder
  },
  delete: async (folderId, { force }) => {
    const options = {}

    if (force) options.recursive = true

    await client.folders.delete(folderId, options)
    log('Folder deleted!')
    return 'Folder deleted!'
  },
  getItems: async (folderId, { limit, offset }) => {
    const options = {}

    if (typeof limit !== 'undefined') options.limit = parseInt(limit, 10)
    if (typeof offset !== 'undefined') options.offset = parseInt(offset, 10)

    const items = await client.folders.getItems(folderId, options)
    log(items)
    return items
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
