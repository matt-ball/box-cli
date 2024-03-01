const client = require('./lib/client')

const operations = {
  get: async (templateID) => {
    const template = await client.signTemplates.getById({ template_id: templateID })
    console.log(template)
  },
  getAll: async () => {
    const templates = await client.signTemplates.getAll()
    console.log(templates)
  }
}

function signTemplates (arg, options, subCommand) {
  const operation = operations[subCommand._name]
  operation(arg, options)
}

module.exports = signTemplates
