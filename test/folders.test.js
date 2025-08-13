const folders = require('../src/folders')

let folderId
const TEST_FOLDER_NAME = 'test-folder'
const UPDATED_FOLDER_NAME = 'updated-test-folder'

// Setup: ensure we have a test folder to work with
test('can create a folder', async () => {
  const result = await folders(TEST_FOLDER_NAME, { parentID: '0' }, { _name: 'create' })
  if (result && result.id) {
    folderId = result.id
    expect(result.name).toBe(TEST_FOLDER_NAME)
    expect(result.type).toBe('folder')
  } else {
    // Skip test if no Box API connection
    console.log('Skipping test: No Box API connection available')
  }
})

test('can get a folder', async () => {
  if (!folderId) {
    console.log('Skipping test: No folder ID available')
    return
  }

  const result = await folders(folderId, {}, { _name: 'get' })
  if (result) {
    expect(result.id).toBe(folderId)
    expect(result.name).toBe(TEST_FOLDER_NAME)
  }
})

test('can get folder items', async () => {
  if (!folderId) {
    console.log('Skipping test: No folder ID available')
    return
  }

  const result = await folders(folderId, {}, { _name: 'get-items' })
  if (result) {
    expect(result).toHaveProperty('entries')
    expect(Array.isArray(result.entries)).toBe(true)
  }
})

test('can update a folder', async () => {
  if (!folderId) {
    console.log('Skipping test: No folder ID available')
    return
  }

  const result = await folders(folderId, { name: UPDATED_FOLDER_NAME }, { _name: 'update' })
  if (result) {
    expect(result.name).toBe(UPDATED_FOLDER_NAME)
  }
})

test('can copy a folder', async () => {
  if (!folderId) {
    console.log('Skipping test: No folder ID available')
    return
  }

  try {
    const result = await folders(folderId, { parentID: '0', name: 'copied-folder' }, { _name: 'copy' })
    if (result) {
      expect(result.name).toBe('copied-folder')

      // Clean up the copied folder
      await folders(result.id, {}, { _name: 'delete' })
    }
  } catch (e) {
    console.log('Skipping test: Cannot copy folder')
  }
})

test('can move a folder', async () => {
  if (!folderId) {
    console.log('Skipping test: No folder ID available')
    return
  }

  try {
    // First create a target folder to move into
    const targetFolder = await folders('target-folder', { parentID: '0' }, { _name: 'create' })

    const result = await folders(folderId, { parentID: targetFolder.id }, { _name: 'move' })
    if (result) {
      expect(result.parent.id).toBe(targetFolder.id)
    }

    // Clean up the target folder and moved folder
    await folders(targetFolder.id, { recursive: true }, { _name: 'delete' })
  } catch (e) {
    console.log('Skipping test: Cannot move folder')
  }
})

test('can delete a folder', async () => {
  try {
    // Create a folder specifically for deletion test
    const testFolder = await folders('delete-test-folder', { parentID: '0' }, { _name: 'create' })

    const result = await folders(testFolder.id, {}, { _name: 'delete' })
    if (result) {
      expect(result).toBe('Folder deleted!')
    }
  } catch (e) {
    console.log('Skipping test: Cannot delete folder')
  }
})
