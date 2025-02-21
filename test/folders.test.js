const folders = require('../src/folders')

let id

test('can create a folder', async () => {
  const result = await folders('Test Folder', { parentID: '0' }, { _name: 'create' })
  id = result.id
  
  expect(result.name).toBe('Test Folder')
})

test('can get a folder', async () => {
  const result = await folders(id, {}, { _name: 'get' })
  
  expect(result.id).toBe(id)
  expect(result.name).toBe('Test Folder')
})

test('can update a folder', async () => {
  const result = await folders(id, { name: 'Updated Folder' }, { _name: 'update' })
  
  expect(result.name).toBe('Updated Folder')
})

test('can delete a folder', async () => {
  const result = await folders(id, {}, { _name: 'delete' })
  
  expect(result).toBe('Folder deleted')
})
