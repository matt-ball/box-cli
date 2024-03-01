const client = require('./lib/client')

const operations = {
  get: async () => {
    const terms = await client.termsOfService.get()
    console.log(terms)
  },
  accept: async () => {
    await client.termsOfService.setUserStatus(true)
    console.log('Terms accepted')
  },
  reject: async () => {
    await client.termsOfService.setUserStatus(false)
    console.log('Terms rejected')
  }
}

function termsOfService (arg, options, subCommand) {
  const operation = operations[subCommand._name]
  operation(arg, options)
}

module.exports = termsOfService
