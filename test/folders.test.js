// Mock the Box client before requiring the folders module
jest.mock('../src/lib/client', () => ({
  folders: {
    get: jest.fn(),
    create: jest.fn(),
    delete: jest.fn(),
    update: jest.fn(),
    getItems: jest.fn(),
    copy: jest.fn(),
    move: jest.fn(),
    getCollaborations: jest.fn()
  },
  collaborations: {
    createWithUserEmail: jest.fn()
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
    parent: { id: '123' }
  }
  client.folders.move.mockResolvedValue(mockFolder)

  const result = await folders(folderId, { parent: '123' }, { _name: 'move' })

  expect(client.folders.move).toHaveBeenCalledWith(folderId, '123')
  expect(result.parent.id).toBe('123')
})

test('can share a folder', async () => {
  const mockFolder = {
    id: folderId,
    name: 'test-folder',
    type: 'folder',
    shared_link: {
      url: 'https://app.box.com/s/abc123',
      access: 'open'
    }
  }
  client.folders.update.mockResolvedValue(mockFolder)

  const result = await folders(folderId, { access: 'open' }, { _name: 'share' })

  expect(client.folders.update).toHaveBeenCalledWith(folderId, {
    shared_link: { access: 'open' }
  })
  expect(result.shared_link.access).toBe('open')
})

test('can add collaboration to folder', async () => {
  const mockCollaboration = {
    id: 'collab123',
    type: 'collaboration',
    role: 'viewer',
    accessible_by: {
      type: 'user',
      login: 'test@example.com'
    }
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

test('can list collaborations on folder', async () => {
  const mockCollaborations = {
    entries: [
      {
        id: 'collab123',
        type: 'collaboration',
        role: 'viewer',
        accessible_by: { type: 'user', login: 'user1@example.com' }
      },
      {
        id: 'collab456',
        type: 'collaboration',
        role: 'editor',
        accessible_by: { type: 'user', login: 'user2@example.com' }
      }
    ]
  }
  client.folders.getCollaborations.mockResolvedValue(mockCollaborations)

  const result = await folders(folderId, {}, { _name: 'list-collaborations' })

  expect(client.folders.getCollaborations).toHaveBeenCalledWith(folderId)
  expect(result.entries).toHaveLength(2)
  expect(result.entries[0].role).toBe('viewer')
})
