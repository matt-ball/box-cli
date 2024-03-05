const client = require('./lib/client')
const handleError = require('./lib/handle-error')
const log = require('./lib/logger')

const operations = {
  get: async () => {
    const user = await client.users.get(client.CURRENT_USER_ID)
    log(`You are logged in as ${user.name} (${user.login})`)
    return user
  }
}

async function user () {
  try {
    const result = await operations.get()

    return result
  } catch (err) {
    handleError(err)
  }
  
}

module.exports = user
