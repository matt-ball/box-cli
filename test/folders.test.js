// Mock the Box client before requiring the folders module
jest.mock('../src/lib/client', () => ({
  folders: {
    get: jest.fn(),
    create: jest.fn(),
    delete: jest.fn(),
    update: jest.fn(),
    getItems: jest.fn(),
    copy: jest.fn(),
    restoreFromTrash: jest.fn(),
    getCollaborations: jest.fn(),
    applyWatermark: jest.fn(),
    removeWatermark: jest.fn(),
    getMetadata: jest.fn(),
    addMetadata: jest.fn(),
    updateMetadata: jest.fn(),
    deleteMetadata: jest.fn()
  },
  collaborations: {
    create: jest.fn()
  }
}))

const folders = require('../src/folders')
const client = require('../src/lib/client')

let folderId = 'test-folder-id'
let copiedFolderId = 'copied-folder-id'

beforeEach(() => {
  jest.clearAllMocks()
})

test('can create a folder', async () => {
  const mockFolder = {
    id: folderId,
    name: 'test-folder',
    type: 'folder'
  }
  client.folders.create.mockResolvedValue(mockFolder)

  const result = await folders('test-folder', { parent: '0' }, { _name: 'create' })

  expect(client.folders.create).toHaveBeenCalledWith('0', 'test-folder')
  expect(result.name).toBe('test-folder')
  expect(result.type).toBe('folder')
})

test('can get a folder', async () => {
  const mockFolder = {
    id: folderId,
    name: 'test-folder',
    type: 'folder'
  }
  client.folders.get.mockResolvedValue(mockFolder)

  const result = await folders(folderId, {}, { _name: 'get' })

  expect(client.folders.get).toHaveBeenCalledWith(folderId)
  expect(result.id).toBe(folderId)
  expect(result.name).toBe('test-folder')
  expect(result.type).toBe('folder')
})

test('can update a folder', async () => {
  const mockFolder = {
    id: folderId,
    name: 'updated-test-folder',
    description: 'This is a test folder',
    type: 'folder'
  }
  client.folders.update.mockResolvedValue(mockFolder)

  const result = await folders(folderId, {
    name: 'updated-test-folder',
    description: 'This is a test folder'
  }, { _name: 'update' })

  expect(client.folders.update).toHaveBeenCalledWith(folderId, {
    name: 'updated-test-folder',
    description: 'This is a test folder'
  })
  expect(result.name).toBe('updated-test-folder')
  expect(result.description).toBe('This is a test folder')
})

test('can get folder items', async () => {
  const mockItems = {
    entries: [
      { id: 'file1', name: 'test.txt', type: 'file' },
      { id: 'folder1', name: 'subfolder', type: 'folder' }
    ]
  }
  client.folders.getItems.mockResolvedValue(mockItems)

  const result = await folders(folderId, {}, { _name: 'get-items' })

  expect(client.folders.getItems).toHaveBeenCalledWith(folderId)
  expect(result).toHaveProperty('entries')
  expect(Array.isArray(result.entries)).toBe(true)
  expect(result.entries).toHaveLength(2)
})

test('can copy a folder', async () => {
  const mockFolder = {
    id: copiedFolderId,
    name: 'copied-test-folder',
    type: 'folder'
  }
  client.folders.copy.mockResolvedValue(mockFolder)

  const result = await folders(folderId, {
    parent: '0',
    name: 'copied-test-folder'
  }, { _name: 'copy' })

  expect(client.folders.copy).toHaveBeenCalledWith(folderId, '0', { name: 'copied-test-folder' })
  expect(result.name).toBe('copied-test-folder')
  expect(result.type).toBe('folder')
})

test('can delete a folder', async () => {
  client.folders.delete.mockResolvedValue()

  const result = await folders(folderId, {}, { _name: 'delete' })

  expect(client.folders.delete).toHaveBeenCalledWith(folderId)
  expect(result).toBe('Folder deleted!')
})

test('can move a folder', async () => {
  const mockFolder = {
    id: folderId,
    name: 'test-folder',
    type: 'folder',
    parent: { id: '12345' }
  }
  client.folders.update.mockResolvedValue(mockFolder)

  const result = await folders(folderId, { parent: '12345' }, { _name: 'move' })

  expect(client.folders.update).toHaveBeenCalledWith(folderId, { parent: { id: '12345' } })
  expect(result.parent.id).toBe('12345')
})

test('can restore a folder from trash', async () => {
  const mockFolder = {
    id: folderId,
    name: 'restored-folder',
    type: 'folder'
  }
  client.folders.restoreFromTrash.mockResolvedValue(mockFolder)

  const result = await folders(folderId, { parent: '0', name: 'restored-folder' }, { _name: 'restore' })

  expect(client.folders.restoreFromTrash).toHaveBeenCalledWith(folderId, {
    parent: { id: '0' },
    name: 'restored-folder'
  })
  expect(result.name).toBe('restored-folder')
})

test('can share a folder', async () => {
  const mockFolder = {
    id: folderId,
    name: 'test-folder',
    type: 'folder',
    shared_link: {
      url: 'https://example.com/shared',
      access: 'company'
    }
  }
  client.folders.update.mockResolvedValue(mockFolder)

  const result = await folders(folderId, {
    access: 'company',
    password: 'secret',
    canDownload: true
  }, { _name: 'share' })

  expect(client.folders.update).toHaveBeenCalledWith(folderId, {
    shared_link: {
      access: 'company',
      password: 'secret',
      permissions: {
        can_download: true
      }
    }
  })
  expect(result.shared_link.access).toBe('company')
})

test('can unshare a folder', async () => {
  const mockFolder = {
    id: folderId,
    name: 'test-folder',
    type: 'folder',
    shared_link: null
  }
  client.folders.update.mockResolvedValue(mockFolder)

  const result = await folders(folderId, {}, { _name: 'unshare' })

  expect(client.folders.update).toHaveBeenCalledWith(folderId, { shared_link: null })
  expect(result.shared_link).toBeNull()
})

test('can add collaborator to folder', async () => {
  const mockCollaboration = {
    id: 'collab-123',
    type: 'collaboration',
    role: 'editor',
    accessible_by: {
      login: 'user@example.com',
      type: 'user'
    }
  }
  client.collaborations.create.mockResolvedValue(mockCollaboration)

  const result = await folders(folderId, {
    email: 'user@example.com',
    role: 'editor',
    canViewPath: true
  }, { _name: 'collaborate' })

  expect(client.collaborations.create).toHaveBeenCalledWith({
    item: { id: folderId, type: 'folder' },
    accessible_by: { login: 'user@example.com', type: 'user' },
    role: 'editor',
    can_view_path: true
  })
  expect(result.role).toBe('editor')
})

test('can get folder collaborations', async () => {
  const mockCollaborations = {
    entries: [
      { id: 'collab-1', role: 'editor' },
      { id: 'collab-2', role: 'viewer' }
    ]
  }
  client.folders.getCollaborations.mockResolvedValue(mockCollaborations)

  const result = await folders(folderId, {}, { _name: 'collaborations' })

  expect(client.folders.getCollaborations).toHaveBeenCalledWith(folderId)
  expect(result.entries).toHaveLength(2)
})

test('can apply watermark to folder', async () => {
  const mockWatermark = {
    watermark: {
      created_at: '2023-01-01T00:00:00Z',
      modified_at: '2023-01-01T00:00:00Z'
    }
  }
  client.folders.applyWatermark.mockResolvedValue(mockWatermark)

  const result = await folders(folderId, {}, { _name: 'watermark' })

  expect(client.folders.applyWatermark).toHaveBeenCalledWith(folderId)
  expect(result.watermark).toBeDefined()
})

test('can remove watermark from folder', async () => {
  client.folders.removeWatermark.mockResolvedValue()

  const result = await folders(folderId, {}, { _name: 'remove-watermark' })

  expect(client.folders.removeWatermark).toHaveBeenCalledWith(folderId)
  expect(result).toBe('Watermark removed!')
})

test('can get folder metadata', async () => {
  const mockMetadata = {
    department: 'Engineering',
    project: 'Box CLI'
  }
  client.folders.getMetadata.mockResolvedValue(mockMetadata)

  const result = await folders(folderId, { scope: 'global', template: 'properties' }, { _name: 'get-metadata' })

  expect(client.folders.getMetadata).toHaveBeenCalledWith(folderId, 'global', 'properties')
  expect(result.department).toBe('Engineering')
})

test('can set folder metadata', async () => {
  const mockMetadata = {
    department: 'Engineering',
    project: 'Box CLI'
  }
  client.folders.addMetadata.mockResolvedValue(mockMetadata)

  const result = await folders(folderId, {
    scope: 'global',
    template: 'properties',
    metadata: '{"department": "Engineering", "project": "Box CLI"}'
  }, { _name: 'set-metadata' })

  expect(client.folders.addMetadata).toHaveBeenCalledWith(folderId, 'global', 'properties', {
    department: 'Engineering',
    project: 'Box CLI'
  })
  expect(result.department).toBe('Engineering')
})

test('can update folder metadata', async () => {
  const mockMetadata = {
    department: 'Engineering',
    project: 'Updated Box CLI'
  }
  client.folders.updateMetadata.mockResolvedValue(mockMetadata)

  const operations = [
    { op: 'replace', path: '/project', value: 'Updated Box CLI' }
  ]

  const result = await folders(folderId, {
    scope: 'global',
    template: 'properties',
    operations: JSON.stringify(operations)
  }, { _name: 'update-metadata' })

  expect(client.folders.updateMetadata).toHaveBeenCalledWith(folderId, 'global', 'properties', operations)
  expect(result.project).toBe('Updated Box CLI')
})

test('can delete folder metadata', async () => {
  client.folders.deleteMetadata.mockResolvedValue()

  const result = await folders(folderId, { scope: 'global', template: 'properties' }, { _name: 'delete-metadata' })

  expect(client.folders.deleteMetadata).toHaveBeenCalledWith(folderId, 'global', 'properties')
  expect(result).toBe('Metadata deleted!')
})
