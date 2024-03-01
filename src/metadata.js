const client = require('./lib/client')

const operations = {
  get: async (templateID) => {
    const template = await client.metadata.getTemplateByID(templateID)
    console.log(template)
  },
  create: async (templateName, { fields, options }) => {
    const template = await client.metadata.createTemplate(templateName, fields, options)
    console.log(template)
  },
  update: async (templateID, operations) => {
    const template = await client.metadata.updateTemplate(templateID, operations)
    console.log(template)
  },
  delete: async (templateID) => {
    await client.metadata.deleteTemplate(templateID)
    console.log('Template deleted')
  },
  getCascadePolicies: async (folderID, { options }) => {
    const policies = await client.metadata.getCascadePolicies(folderID, options)
    console.log(policies)
  },
  getCascadePolicy: async (policyID) => {
    const policy = await client.metadata.getCascadePolicy(policyID)
    console.log(policy)
  },
  createCascadePolicy: async (scope, { templateKey, folderID }) => {
    const policy = await client.metadata.createCascadePolicy(scope, templateKey, folderID)
    console.log(policy)
  },
  deleteCascadePolicy: async (policyID) => {
    await client.metadata.deleteCascadePolicy(policyID)
    console.log('Cascade policy deleted')
  },
  forceApplyCascadePolicy: async (policyID, { resolutionMethod }) => {
    await client.metadata.forceApplyCascadePolicy(policyID, resolutionMethod)
    console.log('Cascade policy applied')
  }
}

function metadata (arg, options, subCommand) {
  const operation = operations[subCommand._name]
  operation(arg, options)
}

module.exports = metadata
