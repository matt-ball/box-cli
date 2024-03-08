const client = require('./lib/client')
const log = require('./lib/logger')

const operations = {
  get: async (policyID) => {
    const policy = await client.legalHoldPolicies.get(policyID)
    log(policy)
    return policy
  },
  create: async (policyName, { options }) => {
    const policy = await client.legalHoldPolicies.create(policyName, options)
    log(policy)
    return policy
  },
  update: async (policyID, { policyName }) => {
    const policy = await client.legalHoldPolicies.update(policyID, policyName)
    log(policy)
    return policy
  },
  delete: async (policyID) => {
    await client.legalHoldPolicies.delete(policyID)
    log('Policy deleted')
    return 'Policy deleted'
  }
}

function legalHoldPolicies (arg, options, subCommand) {
  const operation = operations[subCommand._name]
  operation(arg, options)
}

module.exports = legalHoldPolicies
