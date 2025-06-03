// Mock the Box client before requiring the folders module
jest.mock('../src/lib/client', () => ({
  folders: {
    get: jest.fn(),
    create: jest.fn(),
    delete: jest.fn(),
    update: jest.fn(),
    getItems: jest.fn(),
    copy: jest.fn(),
    getCollaborations: jest.fn()
  },
  search: {
    query: jest.fn()
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

test('can list all folders', async () => {
  const mockResults = {
    entries: [
      { id: 'folder1', name: 'Documents', type: 'folder' },
      { id: 'folder2', name: 'Photos', type: 'folder' }
    ]
  }
  client.search.query.mockResolvedValue(mockResults)

  const result = await folders(null, {}, { _name: 'list-all' })

  expect(client.search.query).toHaveBeenCalledWith('type:folder', { limit: 200 })
  expect(result).toHaveProperty('entries')
  expect(Array.isArray(result.entries)).toBe(true)
  expect(result.entries).toHaveLength(2)
})

test('can search for folders', async () => {
  const mockResults = {
    entries: [
      { id: 'folder1', name: 'Project Documents', type: 'folder' }
    ]
  }
  client.search.query.mockResolvedValue(mockResults)

  const result = await folders('project', {}, { _name: 'search' })

  expect(client.search.query).toHaveBeenCalledWith('project type:folder', { limit: 100 })
  expect(result).toHaveProperty('entries')
  expect(Array.isArray(result.entries)).toBe(true)
  expect(result.entries).toHaveLength(1)
  expect(result.entries[0].name).toBe('Project Documents')
})

test('can move a folder', async () => {
  const mockFolder = {
    id: folderId,
    name: 'test-folder',
    type: 'folder',
    parent: { id: '123' }
  }
  client.folders.update.mockResolvedValue(mockFolder)

  const result = await folders(folderId, { parent: '123' }, { _name: 'move' })

  expect(client.folders.update).toHaveBeenCalledWith(folderId, { parent: { id: '123' } })
  expect(result.parent.id).toBe('123')
})

test('can get folder collaborations', async () => {
  const mockCollaborations = {
    entries: [
      { id: 'collab1', accessible_by: { name: 'John Doe' }, role: 'editor' }
    ]
  }
  client.folders.getCollaborations.mockResolvedValue(mockCollaborations)

  const result = await folders(folderId, {}, { _name: 'get-collaborations' })

  expect(client.folders.getCollaborations).toHaveBeenCalledWith(folderId)
  expect(result).toHaveProperty('entries')
  expect(Array.isArray(result.entries)).toBe(true)
  expect(result.entries).toHaveLength(1)
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
    shared_link: {
      access: 'open'
    }
  })
  expect(result.shared_link).toBeDefined()
  expect(result.shared_link.access).toBe('open')
})
