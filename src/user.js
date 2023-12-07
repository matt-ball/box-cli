const client = require('./lib/client')

async function user () {
  const user = await client.users.get(client.CURRENT_USER_ID)
  console.log(`You are logged in as ${user.name} (${user.login})`)
}

module.exports = user
