const folders = require('../src/folders')

// Note: These tests require Box API credentials to be configured
// Run 'box setup' first to configure authentication
// These are integration tests that will make actual API calls

let folderId
let copiedFolderId

// Skip tests if no Box credentials are configured
const hasCredentials = () => {
  try {
    const config = require('../src/lib/config')
    return !!config.get()
  } catch {
    return false
  }
}

const describeOrSkip = hasCredentials() ? describe : describe.skip

describeOrSkip('Folders API Integration Tests', () => {
  test('can create a folder', async () => {
    const result = await folders('Test Folder', { parent: '0' }, { _name: 'create' })
    folderId = result.id

    expect(result.name).toBe('Test Folder')
    expect(result.type).toBe('folder')
  })

  test('can get a folder', async () => {
    const result = await folders(folderId, {}, { _name: 'get' })

    expect(result.id).toBe(folderId)
    expect(result.name).toBe('Test Folder')
    expect(result.type).toBe('folder')
  })

  test('can get folder items', async () => {
    const result = await folders(folderId, {}, { _name: 'get-items' })

    expect(result).toHaveProperty('entries')
    expect(Array.isArray(result.entries)).toBe(true)
  })

  test('can update a folder', async () => {
    const result = await folders(folderId, { name: 'Updated Test Folder', description: 'Test description' }, { _name: 'update' })

    expect(result.name).toBe('Updated Test Folder')
    expect(result.description).toBe('Test description')
  })

  test('can copy a folder', async () => {
    const result = await folders(folderId, { destination: '0', name: 'Copied Test Folder' }, { _name: 'copy' })
    copiedFolderId = result.id

    expect(result.name).toBe('Copied Test Folder')
    expect(result.type).toBe('folder')
    expect(result.id).not.toBe(folderId)
  })

  test('can move a folder', async () => {
    // Create a temporary folder to move into
    const tempFolder = await folders('Temp Folder', { parent: '0' }, { _name: 'create' })

    const result = await folders(copiedFolderId, { destination: tempFolder.id }, { _name: 'move' })

    expect(result.parent.id).toBe(tempFolder.id)

    // Clean up: move it back to root
    await folders(copiedFolderId, { destination: '0' }, { _name: 'move' })

    // Delete temp folder
    await folders(tempFolder.id, { recursive: true }, { _name: 'delete' })
  })

  test('can delete a folder', async () => {
    const result = await folders(copiedFolderId, { recursive: true }, { _name: 'delete' })

    expect(result).toBe('Folder deleted!')
  })

  test('can delete the original folder', async () => {
    const result = await folders(folderId, { recursive: true }, { _name: 'delete' })

    expect(result).toBe('Folder deleted!')
  })
})

// Unit tests that don't require API credentials
describe('Folders Module Unit Tests', () => {
  test('module exports a function', () => {
    expect(typeof folders).toBe('function')
  })

  test('module can be required without errors', () => {
    expect(() => require('../src/folders')).not.toThrow()
  })
})
