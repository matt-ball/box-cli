const client = require('./lib/client')
const log = require('./lib/logger')

const operations = {
  get: async (templateID) => {
    const template = await client.metadata.getTemplateByID(templateID)
    log(template)
    return template
  },
  create: async (templateName, { fields, options }) => {
    const template = await client.metadata.createTemplate(templateName, fields, options)
    log(template)
    return template
  },
  update: async (scope, { template, operations }) => {
    const template = await client.metadata.updateTemplate(scope, template, operations)
    log(template)
    return template
  },
  delete: async (templateID) => {
    await client.metadata.deleteTemplate(templateID)
    log('Template deleted')
    return 'Template deleted'
  },
  getCascadePolicies: async (folderID, { options }) => {
    const policies = await client.metadata.getCascadePolicies(folderID, options)
    log(policies)
    return policies
  },
  getCascadePolicy: async (policyID) => {
    const policy = await client.metadata.getCascadePolicy(policyID)
    log(policy)
    return policy
  },
  createCascadePolicy: async (scope, { templateKey, folderID }) => {
    const policy = await client.metadata.createCascadePolicy(scope, templateKey, folderID)
    log(policy)
    return policy
  },
  deleteCascadePolicy: async (policyID) => {
    await client.metadata.deleteCascadePolicy(policyID)
    log('Cascade policy deleted')
    return 'Cascade policy deleted'
  },
  forceApplyCascadePolicy: async (policyID, { resolutionMethod }) => {
    await client.metadata.forceApplyCascadePolicy(policyID, resolutionMethod)
    log('Cascade policy applied')
    return 'Cascade policy applied'
  }
}

async function metadata (arg, options, subCommand) {
  const operation = operations[subCommand._name]
  const result = await operation(arg, options)

  return result
}

module.exports = metadata
