const client = require('./lib/client')

const operations = {
  get: async (domainID) => {
    const domain = await client.collaborationAllowlist.getAllowlistedDomain(domainID)
    console.log(domain)
  },
  getAll: async () => {
    const domains = await client.collaborationAllowlist.getAllAllowlistedDomains()
    console.log(domains)
  },
  add: async (newDomain, { direction }) => {
    const domain = await client.collaborationAllowlist.addDomain(newDomain, direction)
    console.log(domain)
  },
  remove: async (domainID) => {
    await client.collaborationAllowlist.removeDomain(domainID)
    console.log('Domain removed')
  }
}

function collaborationAllowlist (arg, options, subCommand) {
  const operation = operations[subCommand._name]
  operation(arg, options)
}

module.exports = collaborationAllowlist
