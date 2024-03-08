const client = require('./lib/client')
const log = require('./lib/logger')

const operations = {
  get: async () => {
    const terms = await client.termsOfService.get()
    log(terms)
    return terms
  },
  accept: async () => {
    await client.termsOfService.setUserStatus(true)
    log('Terms accepted')
    return 'Terms accepted'
  },
  reject: async () => {
    await client.termsOfService.setUserStatus(false)
    log('Terms rejected')
    return 'Terms rejected'
  }
}

function termsOfService (arg, options, subCommand) {
  const operation = operations[subCommand._name]
  operation(arg, options)
}

module.exports = termsOfService
