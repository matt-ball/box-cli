const camelize = require('./lib/camelize')
const client = require('./lib/client')
const handleError = require('./lib/handle-error')
const log = require('./lib/logger')

const operations = {
  get: async (commentID) => {
    const comment = await client.comments.get(commentID)
    log(comment)
    return comment
  },
  getComments: async (fileID) => {
    const comments = await client.files.getComments(fileID)
    log(comments)
    return comments
  },
  create: async (message, { file }) => {
    const comment = await client.comments.create(file, message)
    log(comment)
    return comment
  },
  delete: async (commentID) => {
    await client.comments.delete(commentID)
    log('Comment deleted')
    return 'Comment deleted'
  },
  update: async (message, { comment }) => {
    const result = await client.comments.update(comment, { message })
    log(result)
    return result
  },
  reply: async (message, { comment }) => {
    const result = await client.comments.reply(comment, message)
    log(result)
    return result
  }
}

async function comments (arg, options, subCommand) {
  try {
    const operation = operations[camelize(subCommand._name)]
    const result = await operation(arg, options)

    return result
  } catch (err) {
    handleError(err)
  }
}

module.exports = comments
