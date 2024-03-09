const client = require('./lib/client')
const log = require('./lib/logger')

const operations = {
  get: async (templateID) => {
    const template = await client.signTemplates.getById({ template_id: templateID })
    log(template)
    return template
  },
  getAll: async () => {
    const templates = await client.signTemplates.getAll()
    log(templates)
    return templates
  }
}

async function signTemplates (arg, options, subCommand) {
  const operation = operations[subCommand._name]
  const result = await operation(arg, options)

  return result
}

module.exports = signTemplates
