const fs = require('fs')
const file = require('../src/file')
const path = require('path')

let id

test('can upload a file', async () => {
  const filepath = path.join(__dirname, './data/logo.png')
  const result = await file(filepath, { folder: '0' }, { _name: 'upload' })
  const data = result.entries[0]
  id = data.id
  
  expect(data.name).toBe('logo.png')
})

test('can get a file', async () => {
  const result = await file(id, {}, { _name: 'get' })
  
  expect(result.id).toBe(id)
})

test('can download a file', async () => {
  const result = await file(id, { path: '/tmp/logo.png' }, { _name: 'download' })
  
  expect(fs.existsSync('/tmp/logo.png')).toBe(true)
})

test('can delete a file', async () => {
  const result = await file(id, {}, { _name: 'delete' })
  
  expect(result).toBe('File deleted!')
})
