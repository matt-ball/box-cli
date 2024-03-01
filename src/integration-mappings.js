const client = require('./lib/client')

const operations = {
  get: async (mappingID) => {
    const mapping = await client.integrationMappings.getSlackIntegrationMappings({ integration_mapping_id: mappingID })
    console.log(mapping)
  },
  create: async (body) => {
    const mapping = await client.integrationMappings.createSlackIntegrationMapping(body)
    console.log(mapping)
  },
  update: async (mappingID, body) => {
    const mapping = await client.integrationMappings.updateSlackIntegrationMapping(body, { integration_mapping_id: mappingID })
    console.log(mapping)
  },
  delete: async (mappingID) => {
    await client.integrationMappings.deleteSlackIntegrationMappingById({ integration_mapping_id: mappingID })
    console.log('Mapping deleted')
  }
}

function integrationMappings (arg, options, subCommand) {
  const operation = operations[subCommand._name]
  operation(arg, options)
}

module.exports = integrationMappings
