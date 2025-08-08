const folders = require('../src/folders')

// Mock the client to avoid authentication issues in tests
jest.mock('../src/lib/client', () => ({
  folders: {
    get: jest.fn(),
    getItems: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    copy: jest.fn(),
    delete: jest.fn()
  }
}))

const mockClient = require('../src/lib/client')

describe('Folders CLI', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('should call client.folders.get for get command', async () => {
    const mockFolder = { id: '123', name: 'Test Folder', type: 'folder' }
    mockClient.folders.get.mockResolvedValue(mockFolder)

    const result = await folders('123', {}, { _name: 'get' })

    expect(mockClient.folders.get).toHaveBeenCalledWith('123')
    expect(result).toEqual(mockFolder)
  })

  test('should call client.folders.getItems for list-items command', async () => {
    const mockItems = { entries: [], total_count: 0 }
    mockClient.folders.getItems.mockResolvedValue(mockItems)

    const result = await folders('123', { limit: '10', offset: '0' }, { _name: 'list-items' })

    expect(mockClient.folders.getItems).toHaveBeenCalledWith('123', { limit: 10, offset: 0 })
    expect(result).toEqual(mockItems)
  })

  test('should call client.folders.create for create command', async () => {
    const mockFolder = { id: '456', name: 'New Folder', type: 'folder' }
    mockClient.folders.create.mockResolvedValue(mockFolder)

    const result = await folders('New Folder', { parent: '0', description: 'Test description' }, { _name: 'create' })

    expect(mockClient.folders.create).toHaveBeenCalledWith('0', 'New Folder', { description: 'Test description' })
    expect(result).toEqual(mockFolder)
  })

  test('should call client.folders.update for update command', async () => {
    const mockFolder = { id: '123', name: 'Updated Folder', type: 'folder' }
    mockClient.folders.update.mockResolvedValue(mockFolder)

    const result = await folders('123', { name: 'Updated Folder', description: 'Updated description' }, { _name: 'update' })

    expect(mockClient.folders.update).toHaveBeenCalledWith('123', { name: 'Updated Folder', description: 'Updated description' })
    expect(result).toEqual(mockFolder)
  })

  test('should call client.folders.copy for copy command', async () => {
    const mockFolder = { id: '789', name: 'Copied Folder', type: 'folder' }
    mockClient.folders.copy.mockResolvedValue(mockFolder)

    const result = await folders('123', { parent: '0', name: 'Copied Folder' }, { _name: 'copy' })

    expect(mockClient.folders.copy).toHaveBeenCalledWith('123', '0', { name: 'Copied Folder' })
    expect(result).toEqual(mockFolder)
  })

  test('should call client.folders.delete for delete command', async () => {
    mockClient.folders.delete.mockResolvedValue()

    const result = await folders('123', {}, { _name: 'delete' })

    expect(mockClient.folders.delete).toHaveBeenCalledWith('123', {})
    expect(result).toBe('Folder deleted!')
  })

  test('should handle recursive delete option', async () => {
    mockClient.folders.delete.mockResolvedValue()

    const result = await folders('123', { recursive: 'true' }, { _name: 'delete' })

    expect(mockClient.folders.delete).toHaveBeenCalledWith('123', { recursive: true })
    expect(result).toBe('Folder deleted!')
  })
})
