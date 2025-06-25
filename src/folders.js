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
    if (!parent) {
      throw new Error('Parent folder ID is required for move operation')
    }

    const folder = await client.folders.update(folderId, { parent: { id: parent } })
    log(folder)
    return folder
  },
  share: async (folderId, { access, password, canDownload, canPreview }) => {
    const sharedLinkOptions = {}
    if (access) sharedLinkOptions.access = access
    if (password) sharedLinkOptions.password = password

    const permissions = {}
    if (canDownload !== undefined) permissions.can_download = canDownload
    if (canPreview !== undefined) permissions.can_preview = canPreview
    if (Object.keys(permissions).length > 0) {
      sharedLinkOptions.permissions = permissions
    }

    const folder = await client.folders.update(folderId, {
      shared_link: sharedLinkOptions
    })
    log(folder)
    return folder
  },
  addCollaboration: async (folderId, { email, role }) => {
    if (!email) {
      throw new Error('Email is required for adding collaboration')
    }
    if (!role) {
      throw new Error('Role is required for adding collaboration')
    }

    const collaboration = await client.collaborations.createWithUserEmail(
      email,
      folderId,
      role,
      { type: 'folder' }
    )
    log(collaboration)
    return collaboration
  },
  listCollaborations: async (folderId) => {
    const collaborations = await client.folders.getCollaborations(folderId)
    log(collaborations)
    return collaborations
  },
  removeCollaboration: async (collaborationId) => {
    await client.collaborations.delete(collaborationId)
    log('Collaboration removed!')
    return 'Collaboration removed!'
  },
  addWatermark: async (folderId) => {
    const watermark = await client.folders.applyWatermark(folderId)
    log(watermark)
    return watermark
  },
  removeWatermark: async (folderId) => {
    await client.folders.removeWatermark(folderId)
    log('Watermark removed!')
    return 'Watermark removed!'
  },
  restore: async (folderId, { parent, name }) => {
    const options = {}
    if (parent) options.parent = { id: parent }
    if (name) options.name = name

    const folder = await client.folders.restoreFromTrash(folderId, options)
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
