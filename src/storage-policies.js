const client = require('./lib/client')
const log = require('./lib/logger')

const operations = {
  get: async (policyID) => {
    const policy = await client.storagePolicies.get(policyID)
    log(policy)
    return policy
  },
  create: async (userID, { policyID }) => {
    const policy = await client.storagePolicies.createAssignment(policyID, userID)
    log(policy)
    return policy
  },
  update: async (policyID, { updates }) => {
    const policy = await client.storagePolicies.updateAssignment(policyID, { updates })
    log(policy)
    return policy
  },
  delete: async (policyID) => {
    await client.storagePolicies.deleteAssignment(policyID)
    log('Policy deleted')
    return 'Policy deleted'
  }
}

async function storagePolicies (arg, options, subCommand) {
  const operation = operations[subCommand._name]
  const result = await operation(arg, options)

  return result
}

module.exports = storagePolicies
