const camelize = require('./lib/camelize')
const client = require('./lib/client')
const handleError = require('./lib/handle-error')
const log = require('./lib/logger')

const operations = {
  get: async (domainID) => {
    const domain = await client.collaborationAllowlist.getAllowlistedDomain(domainID)
    log(domain)
    return domain
  },
  add: async (newDomain, { direction }) => {
    const domain = await client.collaborationAllowlist.addDomain(newDomain, direction)
    log(domain)
    return domain
  },
  remove: async (domainID) => {
    await client.collaborationAllowlist.removeDomain(domainID)
    log('Domain removed')
    return 'Domain removed'
  },
  getExemption: async (exemptionID) => {
    const exemption = await client.collaborationAllowlist.getExemption(exemptionID)
    log(exemption)
    return exemption
  },
  getAllExemptions: async (limit) => {
    const exemptions = await client.collaborationAllowlist.getAllExemptions({ limit })
    log(exemptions)
    return exemptions
  },
  addExemption: async (userID) => {
    const exemption = await client.collaborationAllowlist.addExemption(userID)
    log(exemption)
    return exemption
  },
  removeExemption: async (exemptionID) => {
    await client.collaborationAllowlist.removeExemption(exemptionID)
    log('Exemption removed')
    return 'Exemption removed'
  }
}

async function collaborationAllowlist (arg, options, subCommand) {
  try {
    const name = subCommand ? subCommand._name : options._name
    const operation = operations[camelize(name)]
    const result = await operation(arg, options)

    return result
  } catch (err) {
    handleError(err)
  }
}

module.exports = collaborationAllowlist
