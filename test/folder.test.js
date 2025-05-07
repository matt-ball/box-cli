const folder = require('../src/folder')
const fs = require('fs')
const path = require('path')

let id

test('can create a folder', async () => {
  const folderName = 'Test Folder ' + Date.now()
  const result = await folder(folderName, { parentId: '0' }, { _name: 'create' })
  id = result.id
  
  expect(result.name).toBe(folderName)
})

test('can get a folder', async () => {
  const result = await folder(id, {}, { _name: 'get' })
  
  expect(result.id).toBe(id)
})

test('can get folder items', async () => {
  const result = await folder(id, { limit: 100, offset: 0 }, { _name: 'getItems' })
  
  expect(result.entries).toBeDefined()
})

test('can update a folder', async () => {
  const newName = 'Updated Test Folder ' + Date.now()
  const result = await folder(id, { name: newName }, { _name: 'update' })
  
  expect(result.name).toBe(newName)
})

test('can copy a folder', async () => {
  const result = await folder(id, { destFolderId: '0' }, { _name: 'copy' })
  
  expect(result.parent.id).toBe('0')
  
  // Clean up the copied folder
  await folder(result.id, { recursive: true }, { _name: 'delete' })
})

test('can move a folder', async () => {
  // Create a temporary folder to move into
  const tempFolder = await folder('Temp Folder ' + Date.now(), { parentId: '0' }, { _name: 'create' })
  
  // Move our test folder into the temp folder
  const result = await folder(id, { destFolderId: tempFolder.id }, { _name: 'move' })
  
  expect(result.parent.id).toBe(tempFolder.id)
  
  // Move it back to root
  await folder(id, { destFolderId: '0' }, { _name: 'move' })
  
  // Clean up the temp folder
  await folder(tempFolder.id, { recursive: true }, { _name: 'delete' })
})

test('can delete a folder', async () => {
  const result = await folder(id, { recursive: true }, { _name: 'delete' })
  
  expect(result).toBe('Folder deleted!')
})
