const client = require('./lib/client')

const operations = {
  get: async (weblinkID) => {
    const weblink = await client.weblinks.get(weblinkID)
    console.log(weblink)
  },
  create: async (url, { options }) => {
    const weblink = await client.weblinks.create(url, options)
    console.log(weblink)
  },
  update: async (weblinkID, { url }) => {
    const weblink = await client.weblinks.update(weblinkID, url)
    console.log(weblink)
  },
  delete: async (weblinkID) => {
    await client.weblinks.delete(weblinkID)
    console.log('Weblink deleted')
  }
}

function weblinks (arg, options, subCommand) {
  const operation = operations[subCommand._name]
  operation(arg, options)
}

module.exports = weblinks
