const client = require('./lib/client')

const operations = {
  get: async () => {
    const user = await client.users.get(client.CURRENT_USER_ID)
    console.log(`You are logged in as ${user.name} (${user.login})`)
  }
}

function user () {
  operations.get()
}

module.exports = user
