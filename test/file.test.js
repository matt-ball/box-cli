const fs = require('fs')
const file = require('../src/file')
const path = require('path')

let id

test('can upload a file', async () => {
  const filepath = path.join(__dirname, './data/img.png')
  const result = await file(filepath, { folder: '0' }, { _name: 'upload' })
  // only files have entries that we must inspect
  // other methods can do result.id for example
  const data = result.entries[0]
  id = data.id
  
  expect(data.name).toBe('img.png')
})

test('can get a file', async () => {
  const result = await file(id, {}, { _name: 'get' })
  
  expect(result.id).toBe(id)
})

test('can download a file', async () => {
  const result = await file(id, { path: '/tmp/img.png' }, { _name: 'download' })
  
  expect(fs.existsSync('/tmp/img.png')).toBe(true)
})

test('can delete a file', async () => {
  const result = await file(id, {}, { _name: 'delete' })
  
  expect(result).toBe('File deleted!')
})
