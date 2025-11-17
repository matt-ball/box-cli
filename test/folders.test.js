const folders = require('../src/folders')

let folderId
const folderName = `test-folder-${Date.now()}`
const updatedFolderName = `updated-test-folder-${Date.now()}`

test('can create a folder', async () => {
  const result = await folders(folderName, { parent: '0' }, { _name: 'create' })

  folderId = result.id

  expect(result.name).toBe(folderName)
})

test('can get a folder', async () => {
  const result = await folders(folderId, {}, { _name: 'get' })

  expect(result.id).toBe(folderId)
})

test('can get folder items', async () => {
  const result = await folders(folderId, { limit: 100, offset: 0 }, { _name: 'get-items' })

  expect(Array.isArray(result.entries)).toBe(true)
})

test('can update a folder', async () => {
  const result = await folders(folderId, { name: updatedFolderName }, { _name: 'update' })

  expect(result.name).toBe(updatedFolderName)
})

test('can delete a folder', async () => {
  const result = await folders(folderId, { force: true }, { _name: 'delete' })

  expect(result).toBe('Folder deleted!')
})
