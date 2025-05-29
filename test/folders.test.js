// Mock the Box client before requiring the folders module
jest.mock('../src/lib/client', () => ({
  folders: {
    get: jest.fn(),
    create: jest.fn(),
    delete: jest.fn(),
    update: jest.fn(),
    getItems: jest.fn(),
    copy: jest.fn()
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
