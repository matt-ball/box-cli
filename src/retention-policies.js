const client = require('./lib/client')

const operations = {
  get: async (policyID) => {
    const policy = await client.retentionPolicies.get(policyID)
    console.log(policy)
  },
  getAll: async () => {
    const policies = await client.retentionPolicies.getAll()
    console.log(policies)
  },
  create: async (policyName, { options }) => {
    const policy = await client.retentionPolicies.create(policyName, options)
    console.log(policy)
  },
  update: async (policyID, { policyName }) => {
    const policy = await client.retentionPolicies.update(policyID, policyName)
    console.log(policy)
  },
  delete: async (policyID) => {
    await client.retentionPolicies.delete(policyID)
    console.log('Policy deleted')
  }
}

function retentionPolicies (arg, options, subCommand) {
  const operation = operations[subCommand._name]
  operation(arg, options)
}

module.exports = retentionPolicies
