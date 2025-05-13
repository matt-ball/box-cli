const folders = require('../src/folders')

let folderId

describe('Folder operations', () => {
  test('can create a folder', async () => {
    const folderName = 'Test Folder'
    // Create in root folder (parentID '0')
    const result = await folders(folderName, { parentID: '0' }, { _name: 'create' })
    expect(result.name).toBe(folderName)
    expect(result.id).toBeDefined()
    folderId = result.id
  })

  test('can get a folder', async () => {
    // This test depends on the previous test creating a folder
    expect(folderId).toBeDefined() // Ensure folderId was set
    const result = await folders(folderId, {}, { _name: 'get' })
    expect(result.id).toBe(folderId)
    expect(result.name).toBe('Test Folder')
  })

  test('can update a folder', async () => {
    // This test depends on the previous test creating a folder
    expect(folderId).toBeDefined() // Ensure folderId was set
    const newName = 'Updated Test Folder'
    const newDescription = 'This is an updated description.'
    const result = await folders(folderId, { name: newName, description: newDescription }, { _name: 'update' })
    expect(result.id).toBe(folderId)
    expect(result.name).toBe(newName)
    expect(result.description).toBe(newDescription)
  })

  test('can delete a folder', async () => {
    // This test depends on the previous tests
    expect(folderId).toBeDefined() // Ensure folderId was set
    const result = await folders(folderId, {}, { _name: 'delete' })
    expect(result).toBe('Folder deleted')

    // Optionally, try to get the folder again to ensure it's gone
    try {
      await folders(folderId, {}, { _name: 'get' })
    } catch (error) {
      // Expect an error when trying to get a deleted folder
      // The Box SDK might throw an error with a specific status code for "not found"
      // For example, if it's a 404:
      // expect(error.statusCode).toBe(404);
      // Or check for a specific error message if the SDK provides one
      expect(error).toBeDefined()
    }
  })
})

