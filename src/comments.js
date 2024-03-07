const client = require('./lib/client')
const log = require('./lib/logger')

const operations = {
  get: async (commentID) => {
    const comment = await client.comments.get(CommentID)
    log(comment)
    return comment
  },
  create: async (message, { fileId }) => {
    const comment = await client.comments.create(fileId, message)
    log(comment)
    return comment
  },
  delete: async (commentID) => {
    await client.comments.delete(commentID)
    log('Comment deleted')
    return 'Comment deleted'
  },
  update: async (commentID, { message }) => {
    const comment = await client.comments.update(commentID, message)
    log(comment)
    return comment
  },
  reply: async (commentID, { message }) => {
    const comment = await client.comments.reply(commentID, message)
    log(comment)
    return comment
  }
}

function comments (arg, options, subCommand) {
  const operation = operations[subCommand._name]
  operation(arg, options)
}

module.exports = comments
