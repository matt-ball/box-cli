const client = require('./lib/client')

const operations = {
  get: async (commentID) => {
    const comment = await client.comments.get(CommentID)
    console.log(comment)
  },
  create: async (message, { fileId }) => {
    const comment = await client.comments.create(fileId, message)
    console.log(comment)
  },
  delete: async (commentID) => {
    await client.comments.delete(commentID)
    console.log('Comment deleted')
  },
  update: async (commentID, { message }) => {
    const comment = await client.comments.update(commentID, message)
    console.log(comment)
  },
  reply: async (commentID, { message }) => {
    const comment = await client.comments.reply(commentID, message)
    console.log(comment)
  }
}

function comments (arg, options, subCommand) {
  const operation = operations[subCommand._name]
  operation(arg, options)
}

module.exports = comments
