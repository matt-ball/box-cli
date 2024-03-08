const client = require('./lib/client')
const log = require('./lib/logger')

const operations = {
  get: async (policyID) => {
    const policy = await client.storagePolicies.get(policyID)
    log(policy)
    return policy
  },
  getAll: async () => {
    const policies = await client.storagePolicies.getAll()
    log(policies)
    return policies
  },
  create: async (policyName, { options }) => {
    const policy = await client.storagePolicies.createAssignment(policyName, options)
    log(policy)
    return policy
  },
  update: async (policyID, { policyName }) => {
    const policy = await client.storagePolicies.updateAssignment(policyID, policyName)
    log(policy)
    return policy
  },
  delete: async (policyID) => {
    await client.storagePolicies.deleteAssignment(policyID)
    log('Policy deleted')
    return 'Policy deleted'
  }
}

function storagePolicies (arg, options, subCommand) {
  const operation = operations[subCommand._name]
  operation(arg, options)
}

module.exports = storagePolicies
