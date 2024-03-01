const client = require('./lib/client')

const operations = {
  get: async (webhookID) => {
    const webhook = await client.webhooks.get(webhookID)
    console.log(webhook)
  },
  getAll: async () => {
    const webhooks = await client.webhooks.getAll()
    console.log(webhooks)
  },
  create: async (url, { options }) => {
    const webhook = await client.webhooks.create(url, options)
    console.log(webhook)
  },
  update: async (webhookID, { url }) => {
    const webhook = await client.webhooks.update(webhookID, url)
    console.log(webhook)
  },
  delete: async (webhookID) => {
    await client.webhooks.delete(webhookID)
    console.log('Webhook deleted')
  }
}

function webhooks (arg, options, subCommand) {
  const operation = operations[subCommand._name]
  operation(arg, options)
}

module.exports = webhooks
