const client = require('./lib/client')

const operations = {
  get: async (policyID) => {
    const policy = await client.legalHoldPolicies.get(policyID)
    console.log(policy)
  },
  create: async (policyName, { options }) => {
    const policy = await client.legalHoldPolicies.create(policyName, options)
    console.log(policy)
  },
  update: async (policyID, { policyName }) => {
    const policy = await client.legalHoldPolicies.update(policyID, policyName)
    console.log(policy)
  },
  delete: async (policyID) => {
    await client.legalHoldPolicies.delete(policyID)
    console.log('Policy deleted')
  }
}

function legalHoldPolicies (arg, options, subCommand) {
  const operation = operations[subCommand._name]
  operation(arg, options)
}

module.exports = legalHoldPolicies
