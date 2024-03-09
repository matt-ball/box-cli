const comments = require('../src/comments')

let id

test('can create a comment', async () => {
  const result = await comments('test', { file: '1376175577605' }, { _name: 'create' })
  id = result.id
  
  expect(result.message).toBe('test')
})

test('can get a comment', async () => {
  const result = await comments(id, {}, { _name: 'get' })
  
  expect(result.message).toBe('test')
})

test('can update a comment', async () => {
  const result = await comments('test2', { comment: id }, { _name: 'update' })
  
  expect(result.message).toBe('test2')
})

test('can delete a comment', async () => {
  const result = await comments(id, {}, { _name: 'delete' })
  
  expect(result).toBe('Comment deleted')
})
