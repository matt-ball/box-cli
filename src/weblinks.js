const client = require('./lib/client')
const log = require('./lib/logger')

const operations = {
  get: async (weblinkID) => {
    const weblink = await client.weblinks.get(weblinkID)
    log(weblink)
    return weblink
  },
  create: async (name, { parentID, url, description }) => {
    const weblink = await client.weblinks.create(url, parentID, { name, description })
    log(weblink)
    return weblink
  },
  update: async (weblinkID, { name, description }) => {
    const weblink = await client.weblinks.update(weblinkID, { name, description })
    log(weblink)
    return weblink
  },
  delete: async (weblinkID) => {
    await client.weblinks.delete(weblinkID)
    log('Weblink deleted')
    return 'Weblink deleted'
  }
}

async function weblinks (arg, options, subCommand) {
  const operation = operations[subCommand._name]
  const result = await operation(arg, options)

  return result
}

module.exports = weblinks
