const client = require('./lib/client')
const log = require('./lib/logger')

const operations = {
  get: async (policyID) => {
    const policy = await client.legalHoldPolicies.get(policyID)
    log(policy)
    return policy
  },
  create: async (description, { policyName }) => {
    const policy = await client.legalHoldPolicies.create(policyName, description)
    log(policy)
    return policy
  },
  update: async (policyID, { description }) => {
    const policy = await client.legalHoldPolicies.update(policyID, { description })
    log(policy)
    return policy
  },
  delete: async (policyID) => {
    await client.legalHoldPolicies.delete(policyID)
    log('Policy deleted')
    return 'Policy deleted'
  }
}

async function legalHoldPolicies (arg, options, subCommand) {
  const operation = operations[subCommand._name]
  const result = await operation(arg, options)

  return result
}

module.exports = legalHoldPolicies
