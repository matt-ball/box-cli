const client = require('./lib/client')
const log = require('./lib/logger')

const operations = {
  get: async (policyID) => {
    const policy = await client.retentionPolicies.get(policyID)
    log(policy)
    return policy
  },
  getAll: async () => {
    const policies = await client.retentionPolicies.getAll()
    log(policies)
    return policies
  },
  create: async (policyName, { options }) => {
    const policy = await client.retentionPolicies.create(policyName, options)
    log(policy)
    return policy
  },
  update: async (policyID, { policyName }) => {
    const policy = await client.retentionPolicies.update(policyID, policyName)
    log(policy)
    return policy
  },
  delete: async (policyID) => {
    await client.retentionPolicies.delete(policyID)
    log('Policy deleted')
    return 'Policy deleted'
  }
}

function retentionPolicies (arg, options, subCommand) {
  const operation = operations[subCommand._name]
  operation(arg, options)
}

module.exports = retentionPolicies
