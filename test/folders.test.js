const folders = require('../src/folders')

let id

test('can create a folder', async () => {
  const result = await folders('Test Folder', { parentId: '0' }, { _name: 'create' })
  id = result.id
  
  expect(result.name).toBe('Test Folder')
  expect(result.parent.id).toBe('0')
})

test('can get a folder', async () => {
  const result = await folders(id, {}, { _name: 'get' })
  
  expect(result.id).toBe(id)
  expect(result.name).toBe('Test Folder')
})

test('can update a folder', async () => {
  const result = await folders(id, { name: 'Updated Folder', description: 'Test description' }, { _name: 'update' })
  
  expect(result.id).toBe(id)
  expect(result.name).toBe('Updated Folder')
  expect(result.description).toBe('Test description')
})

test('can list folder items', async () => {
  const result = await folders(id, { limit: 100 }, { _name: 'list' })
  
  expect(result.entries).toBeDefined()
  expect(Array.isArray(result.entries)).toBe(true)
})

test('can delete a folder', async () => {
  const result = await folders(id, {}, { _name: 'delete' })
  
  expect(result).toBe('Folder deleted!')
})
