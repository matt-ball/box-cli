const client = require('./lib/client')
const log = require('./lib/logger')

const operations = {
  get: async (commentID) => {
    const comment = await client.comments.get(commentID)
    log(comment)
    return comment
  },
  create: async (message, { fileID }) => {
    const comment = await client.comments.create(fileID, message)
    log(comment)
    return comment
  },
  delete: async (commentID) => {
    await client.comments.delete(commentID)
    log('Comment deleted')
    return 'Comment deleted'
  },
  update: async (message, { commentID }) => {
    const comment = await client.comments.update(commentID, { message })
    log(comment)
    return comment
  },
  reply: async (message, { commentID }) => {
    const comment = await client.comments.reply(commentID, message)
    log(comment)
    return comment
  }
}

async function comments (arg, options, subCommand) {
  const operation = operations[subCommand._name]
  const result = await operation(arg, options)

  return result
}

module.exports = comments
