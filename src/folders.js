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
    const folder = await client.folders.update(folderId, { parent: { id: parentId } })
    log(folder)
    return folder
  },
  restore: async (folderId, { parent, name }) => {
    const options = {}
    if (parent) options.parent = { id: parent }
    if (name) options.name = name

    const folder = await client.folders.restoreFromTrash(folderId, options)
    log(folder)
    return folder
  },
  share: async (folderId, { access, password, canDownload, canPreview, canEdit }) => {
    const sharedLinkOptions = {}
    if (access) sharedLinkOptions.access = access
    if (password) sharedLinkOptions.password = password

    const permissions = {}
    if (canDownload !== undefined) permissions.can_download = canDownload
    if (canPreview !== undefined) permissions.can_preview = canPreview
    if (canEdit !== undefined) permissions.can_edit = canEdit

    if (Object.keys(permissions).length > 0) {
      sharedLinkOptions.permissions = permissions
    }

    const folder = await client.folders.update(folderId, { shared_link: sharedLinkOptions })
    log(folder)
    return folder
  },
  unshare: async (folderId) => {
    const folder = await client.folders.update(folderId, { shared_link: null })
    log(folder)
    return folder
  },
  collaborate: async (folderId, { email, role, canViewPath }) => {
    const collaborationOptions = {
      item: { id: folderId, type: 'folder' },
      accessible_by: { login: email, type: 'user' },
      role: role || 'viewer'
    }

    if (canViewPath !== undefined) {
      collaborationOptions.can_view_path = canViewPath
    }

    const collaboration = await client.collaborations.create(collaborationOptions)
    log(collaboration)
    return collaboration
  },
  collaborations: async (folderId) => {
    const collaborations = await client.folders.getCollaborations(folderId)
    log(collaborations)
    return collaborations
  },
  watermark: async (folderId) => {
    const watermark = await client.folders.applyWatermark(folderId)
    log(watermark)
    return watermark
  },
  removeWatermark: async (folderId) => {
    await client.folders.removeWatermark(folderId)
    log('Watermark removed!')
    return 'Watermark removed!'
  },
  getMetadata: async (folderId, { scope, template }) => {
    const metadataScope = scope || 'global'
    const metadataTemplate = template || 'properties'

    const metadata = await client.folders.getMetadata(folderId, metadataScope, metadataTemplate)
    log(metadata)
    return metadata
  },
  setMetadata: async (folderId, { scope, template, metadata }) => {
    const metadataScope = scope || 'global'
    const metadataTemplate = template || 'properties'
    const metadataObj = typeof metadata === 'string' ? JSON.parse(metadata) : metadata

    const result = await client.folders.addMetadata(folderId, metadataScope, metadataTemplate, metadataObj)
    log(result)
    return result
  },
  updateMetadata: async (folderId, { scope, template, operations }) => {
    const metadataScope = scope || 'global'
    const metadataTemplate = template || 'properties'
    const ops = typeof operations === 'string' ? JSON.parse(operations) : operations

    const result = await client.folders.updateMetadata(folderId, metadataScope, metadataTemplate, ops)
    log(result)
    return result
  },
  deleteMetadata: async (folderId, { scope, template }) => {
    const metadataScope = scope || 'global'
    const metadataTemplate = template || 'properties'

    await client.folders.deleteMetadata(folderId, metadataScope, metadataTemplate)
    log('Metadata deleted!')
    return 'Metadata deleted!'
  }
}

async function folders (arg, options, subCommand) {
  try {
    const name = subCommand ? subCommand._name : options._name
    const operation = operations[camelize(name)]

    if (!operation) {
      throw new Error(`Unknown folder operation: ${name}`)
    }

    const result = await operation(arg, options)

    return result
  } catch (err) {
    handleError(err)
  }
}

module.exports = folders
