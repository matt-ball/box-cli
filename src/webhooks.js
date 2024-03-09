const client = require('./lib/client')
const log = require('./lib/logger')

const operations = {
  get: async (webhookID) => {
    const webhook = await client.webhooks.get(webhookID)
    log(webhook)
    return webhook
  },
  create: async (targetType, { targetID }) => {
    const webhook = await client.webhooks.create(targetID, targetType)
    log(webhook)
    return webhook
  },
  update: async (webhookID, { address }) => {
    const webhook = await client.webhooks.update(webhookID, { address })
    log(webhook)
    return webhook
  },
  delete: async (webhookID) => {
    await client.webhooks.delete(webhookID)
    log('Webhook deleted')
    return 'Webhook deleted'
  }
}

async function webhooks (arg, options, subCommand) {
  const operation = operations[subCommand._name]
  const result = await operation(arg, options)

  return result
}

module.exports = webhooks
