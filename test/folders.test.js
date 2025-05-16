const folders = require('../src/folders')

let folderId

test('can create a folder', async () => {
  const folderName = `Test Folder ${Date.now()}`
  const result = await folders(folderName, { parent: '0' }, { _name: 'create' })
  
  folderId = result.id
  
  expect(result.name).toBe(folderName)
  expect(result.type).toBe('folder')
})

test('can get a folder', async () => {
  const result = await folders(folderId, {}, { _name: 'get' })
  
  expect(result.id).toBe(folderId)
  expect(result.type).toBe('folder')
})

test('can get items in a folder', async () => {
  const result = await folders(folderId, { limit: 100 }, { _name: 'getItems' })
  
  expect(result).toHaveProperty('entries')
  expect(result).toHaveProperty('total_count')
  expect(Array.isArray(result.entries)).toBe(true)
})

test('can update a folder', async () => {
  const newName = `Updated Folder ${Date.now()}`
  const result = await folders(folderId, { name: newName }, { _name: 'update' })
  
  expect(result.name).toBe(newName)
  expect(result.id).toBe(folderId)
})

test('can delete a folder', async () => {
  const result = await folders(folderId, { recursive: true }, { _name: 'delete' })
  
  expect(result).toBe('Folder deleted!')
})
