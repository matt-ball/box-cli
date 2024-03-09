const client = require('./lib/client')
const log = require('./lib/logger')

const operations = {
  get: async (policyID) => {
    const policy = await client.retentionPolicies.get(policyID)
    log(policy)
    return policy
  },
  create: async (type, { policyName }) => {
    const policy = await client.retentionPolicies.create(policyName, type)
    log(policy)
    return policy
  },
  update: async (policyID, { updates }) => {
    const policy = await client.retentionPolicies.update(policyID, { updates })
    log(policy)
    return policy
  },
  delete: async (policyID) => {
    await client.retentionPolicies.delete(policyID)
    log('Policy deleted')
    return 'Policy deleted'
  }
}

async function retentionPolicies (arg, options, subCommand) {
  const operation = operations[subCommand._name]
  const result = await operation(arg, options)

  return result
}

module.exports = retentionPolicies
