const client = require('./lib/client')
const log = require('./lib/logger')

const operations = {
  get: async (weblinkID) => {
    const weblink = await client.weblinks.get(weblinkID)
    log(weblink)
    return weblink
  },
  create: async (parentID, { url, name, description }) => {
    const weblink = await client.weblinks.create(url, parentID, { name, description })
    log(weblink)
    return weblink
  },
  update: async (weblinkID, { name, description }) => {
    const weblink = await client.weblinks.update(weblinkID, { name, description })
    log(weblink)
    return weblink
  },
  copy: async (weblinkID, { parentID }) => {
    const weblink = await client.weblinks.copy(weblinkID, parentID)
    log(weblink)
    return weblink
  },
  move: async (weblinkID, { parentID }) => {
    const weblink = await client.weblinks.move(weblinkID, parentID)
    log(weblink)
    return weblink
  },
  delete: async (weblinkID) => {
    await client.weblinks.delete(weblinkID)
    log('Weblink deleted')
    return 'Weblink deleted'
  }
}

function weblinks (arg, options, subCommand) {
  const operation = operations[subCommand._name]
  operation(arg, options)
}

module.exports = weblinks
