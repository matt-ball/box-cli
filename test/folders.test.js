const folders = require('../src/folders')

let id

test('can create a folder', async () => {
  const result = await folders('Test Folder', { parentId: '0' }, { _name: 'create' })
  id = result.id
  
  expect(result.name).toBe('Test Folder')
})

test('can get a folder', async () => {
  const result = await folders(id, {}, { _name: 'get' })
  
  expect(result.id).toBe(id)
})

test('can get folder items', async () => {
  const result = await folders(id, { limit: 10 }, { _name: 'getItems' })
  
  expect(result.entries).toBeDefined()
})

test('can update a folder', async () => {
  const result = await folders(id, { name: 'Updated Test Folder' }, { _name: 'update' })
  
  expect(result.name).toBe('Updated Test Folder')
})

test('can delete a folder', async () => {
  const result = await folders(id, { recursive: true }, { _name: 'delete' })
  
  expect(result).toBe('Folder deleted!')
})
