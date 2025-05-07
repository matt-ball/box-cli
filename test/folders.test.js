const folders = require('../src/folders')

let id

test('can create a folder', async () => {
  const result = await folders('Test Folder', { 'parent-id': '0' }, { _name: 'create' })
  id = result.id
  
  expect(result.name).toBe('Test Folder')
})

test('can get a folder', async () => {
  const result = await folders(id, {}, { _name: 'get' })
  
  expect(result.id).toBe(id)
  expect(result.name).toBe('Test Folder')
})

test('can get folder items', async () => {
  const result = await folders(id, { limit: 100 }, { _name: 'getItems' })
  
  expect(result.entries).toBeDefined()
})

test('can update a folder', async () => {
  const result = await folders(id, { name: 'Updated Test Folder' }, { _name: 'update' })
  
  expect(result.name).toBe('Updated Test Folder')
})

test('can copy a folder', async () => {
  const result = await folders(id, { 'dest-folder-id': '0', name: 'Copied Test Folder' }, { _name: 'copy' })
  
  expect(result.name).toBe('Copied Test Folder')
  
  // Clean up the copied folder
  await folders(result.id, {}, { _name: 'delete' })
})

test('can move a folder', async () => {
  // First create a temporary folder to move into
  const tempFolder = await folders('Temp Folder', { 'parent-id': '0' }, { _name: 'create' })
  
  // Move our test folder into the temp folder
  const result = await folders(id, { 'dest-folder-id': tempFolder.id }, { _name: 'move' })
  
  expect(result.parent.id).toBe(tempFolder.id)
  
  // Move it back to root for cleanup
  await folders(id, { 'dest-folder-id': '0' }, { _name: 'move' })
  
  // Clean up the temp folder
  await folders(tempFolder.id, {}, { _name: 'delete' })
})

test('can delete a folder', async () => {
  const result = await folders(id, {}, { _name: 'delete' })
  
  expect(result).toBe('Folder deleted!')
})
