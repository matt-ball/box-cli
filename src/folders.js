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
  move: async (folderId, { parent }) => {
    const parentId = parent || '0' // Default to root folder
    const folder = await client.folders.move(folderId, parentId)
    log(folder)
    return folder
  },
  share: async (folderId, { access, password, unsharedAt }) => {
    const sharedLink = { access: access || 'open' }
    if (password) sharedLink.password = password
    if (unsharedAt) sharedLink.unshared_at = unsharedAt

    const folder = await client.folders.update(folderId, { shared_link: sharedLink })
    log(folder)
    return folder
  },
  addCollaboration: async (folderId, { email, role, notify }) => {
    const collaborationRole = role || 'viewer'
    const options = { type: 'folder' }
    if (typeof notify === 'boolean') options.notify = notify

    const collaboration = await client.collaborations.createWithUserEmail(email, folderId, collaborationRole, options)
    log(collaboration)
    return collaboration
  },
  listCollaborations: async (folderId) => {
    const collaborations = await client.folders.getCollaborations(folderId)
    log(collaborations)
    return collaborations
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
