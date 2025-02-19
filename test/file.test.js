const fs = require('fs')
const file = require('../src/file')
const path = require('path')

let id
const TEST_DOWNLOAD_DIR = path.join(__dirname, 'downloads')
const TEST_FILE_PATH = path.join(__dirname, 'data/img.png')
const DOWNLOAD_PATH = path.join(TEST_DOWNLOAD_DIR, 'downloaded-img.png')

// Setup: ensure test directories exist
beforeAll(() => {
  if (!fs.existsSync(TEST_DOWNLOAD_DIR)) {
    fs.mkdirSync(TEST_DOWNLOAD_DIR, { recursive: true })
  }
})

// Cleanup: remove test files after all tests
afterAll(() => {
  if (fs.existsSync(DOWNLOAD_PATH)) {
    fs.unlinkSync(DOWNLOAD_PATH)
  }
})

test('can upload a file', async () => {
  const result = await file(TEST_FILE_PATH, { folder: '0' }, { _name: 'upload' })
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
  const result = await file(id, { path: DOWNLOAD_PATH }, { _name: 'download' })
  
  expect(fs.existsSync(DOWNLOAD_PATH)).toBe(true)
})

test('can delete a file', async () => {
  const result = await file(id, {}, { _name: 'delete' })
  
  expect(result).toBe('File deleted!')
})
