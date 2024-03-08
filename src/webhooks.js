const client = require('./lib/client')
const log = require('./lib/logger')

const operations = {
  get: async (webhookID) => {
    const webhook = await client.webhooks.get(webhookID)
    log(webhook)
    return webhook
  },
  getAll: async () => {
    const webhooks = await client.webhooks.getAll()
    log(webhooks)
    return webhooks
  },
  create: async (url, { options }) => {
    const webhook = await client.webhooks.create(url, options)
    log(webhook)
    return webhook
  },
  update: async (webhookID, { url }) => {
    const webhook = await client.webhooks.update(webhookID, url)
    log(webhook)
    return webhook
  },
  delete: async (webhookID) => {
    await client.webhooks.delete(webhookID)
    log('Webhook deleted')
    return 'Webhook deleted'
  }
}

function webhooks (arg, options, subCommand) {
  const operation = operations[subCommand._name]
  operation(arg, options)
}

module.exports = webhooks
