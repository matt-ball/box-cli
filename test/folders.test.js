// Mock the Box client before requiring the folders module
jest.mock('../src/lib/client', () => ({
  folders: {
    get: jest.fn(),
    create: jest.fn(),
    delete: jest.fn(),
    update: jest.fn(),
    getItems: jest.fn(),
    copy: jest.fn(),
    getCollaborations: jest.fn(),
    applyWatermark: jest.fn(),
    removeWatermark: jest.fn(),
    restoreFromTrash: jest.fn()
  },
  collaborations: {
    createWithUserEmail: jest.fn(),
    delete: jest.fn()
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
    parent: { id: 'new-parent-id' }
  }
  client.folders.update.mockResolvedValue(mockFolder)

  const result = await folders(folderId, { parent: 'new-parent-id' }, { _name: 'move' })

  expect(client.folders.update).toHaveBeenCalledWith(folderId, { parent: { id: 'new-parent-id' } })
  expect(result.parent.id).toBe('new-parent-id')
})

test('move folder handles error without parent', async () => {
  const result = await folders(folderId, {}, { _name: 'move' })
  expect(result).toBeUndefined()
})

test('can share a folder', async () => {
  const mockFolder = {
    id: folderId,
    name: 'test-folder',
    type: 'folder',
    shared_link: {
      url: 'https://box.com/shared/test',
      access: 'open'
    }
  }
  client.folders.update.mockResolvedValue(mockFolder)

  const result = await folders(folderId, {
    access: 'open',
    canDownload: true
  }, { _name: 'share' })

  expect(client.folders.update).toHaveBeenCalledWith(folderId, {
    shared_link: {
      access: 'open',
      permissions: { can_download: true }
    }
  })
  expect(result.shared_link.access).toBe('open')
})

test('can add collaboration to folder', async () => {
  const mockCollaboration = {
    id: 'collaboration-id',
    type: 'collaboration',
    accessible_by: { login: 'test@example.com' },
    role: 'viewer'
  }
  client.collaborations.createWithUserEmail.mockResolvedValue(mockCollaboration)

  const result = await folders(folderId, {
    email: 'test@example.com',
    role: 'viewer'
  }, { _name: 'add-collaboration' })

  expect(client.collaborations.createWithUserEmail).toHaveBeenCalledWith(
    'test@example.com',
    folderId,
    'viewer',
    { type: 'folder' }
  )
  expect(result.accessible_by.login).toBe('test@example.com')
})

test('add collaboration handles error without email', async () => {
  const result = await folders(folderId, { role: 'viewer' }, { _name: 'add-collaboration' })
  expect(result).toBeUndefined()
})

test('add collaboration handles error without role', async () => {
  const result = await folders(folderId, { email: 'test@example.com' }, { _name: 'add-collaboration' })
  expect(result).toBeUndefined()
})

test('can list folder collaborations', async () => {
  const mockCollaborations = {
    entries: [
      { id: 'collab1', accessible_by: { login: 'user1@example.com' }, role: 'viewer' },
      { id: 'collab2', accessible_by: { login: 'user2@example.com' }, role: 'editor' }
    ]
  }
  client.folders.getCollaborations.mockResolvedValue(mockCollaborations)

  const result = await folders(folderId, {}, { _name: 'list-collaborations' })

  expect(client.folders.getCollaborations).toHaveBeenCalledWith(folderId)
  expect(result.entries).toHaveLength(2)
})

test('can remove collaboration', async () => {
  const collaborationId = 'collaboration-id'
  client.collaborations.delete.mockResolvedValue()

  const result = await folders(collaborationId, {}, { _name: 'remove-collaboration' })

  expect(client.collaborations.delete).toHaveBeenCalledWith(collaborationId)
  expect(result).toBe('Collaboration removed!')
})

test('can add watermark to folder', async () => {
  const mockWatermark = {
    watermark: {
      created_at: '2023-01-01T00:00:00Z',
      modified_at: '2023-01-01T00:00:00Z'
    }
  }
  client.folders.applyWatermark.mockResolvedValue(mockWatermark)

  const result = await folders(folderId, {}, { _name: 'add-watermark' })

  expect(client.folders.applyWatermark).toHaveBeenCalledWith(folderId)
  expect(result.watermark).toBeDefined()
})

test('can remove watermark from folder', async () => {
  client.folders.removeWatermark.mockResolvedValue()

  const result = await folders(folderId, {}, { _name: 'remove-watermark' })

  expect(client.folders.removeWatermark).toHaveBeenCalledWith(folderId)
  expect(result).toBe('Watermark removed!')
})

test('can restore folder from trash', async () => {
  const mockFolder = {
    id: folderId,
    name: 'restored-folder',
    type: 'folder'
  }
  client.folders.restoreFromTrash.mockResolvedValue(mockFolder)

  const result = await folders(folderId, {
    parent: 'new-parent-id',
    name: 'restored-folder'
  }, { _name: 'restore' })

  expect(client.folders.restoreFromTrash).toHaveBeenCalledWith(folderId, {
    parent: { id: 'new-parent-id' },
    name: 'restored-folder'
  })
  expect(result.name).toBe('restored-folder')
})

test('can restore folder from trash without options', async () => {
  const mockFolder = {
    id: folderId,
    name: 'test-folder',
    type: 'folder'
  }
  client.folders.restoreFromTrash.mockResolvedValue(mockFolder)

  const result = await folders(folderId, {}, { _name: 'restore' })

  expect(client.folders.restoreFromTrash).toHaveBeenCalledWith(folderId, {})
  expect(result.name).toBe('test-folder')
})
