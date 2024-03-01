const client = require('./lib/client')

const operations = {
  get: async (policyID) => {
    const policy = await client.storagePolicies.get(policyID)
    console.log(policy)
  },
  getAll: async () => {
    const policies = await client.storagePolicies.getAll()
    console.log(policies)
  },
  create: async (policyName, { options }) => {
    const policy = await client.storagePolicies.createAssignment(policyName, options)
    console.log(policy)
  },
  update: async (policyID, { policyName }) => {
    const policy = await client.storagePolicies.updateAssignment(policyID, policyName)
    console.log(policy)
  },
  delete: async (policyID) => {
    await client.storagePolicies.deleteAssignment(policyID)
    console.log('Policy deleted')
  }
}

function storagePolicies (arg, options, subCommand) {
  const operation = operations[subCommand._name]
  operation(arg, options)
}

module.exports = storagePolicies
