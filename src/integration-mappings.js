const client = require('./lib/client')
const log = require('./lib/logger')

const operations = {
  get: async (mappingID) => {
    const mapping = await client.integrationMappings.getSlackIntegrationMappings()
    log(mapping)
    return mapping
  },
  create: async (boxFolderID, { partnerID, slackOrgID }) => {
    const mapping = await client.integrationMappings.createSlackIntegrationMapping({
      partner_item: {
        type: 'channel',
        id: partnerID,
        slack_org_id: slackOrgID
      }, 
      box_item: {
        type: 'folder',
        id: boxFolderID
      }
    })
    log(mapping)
    return mapping
  },
  update: async (boxFolderID, { mappingID, accessManagementDisabled }) => {
    const mapping = await client.integrationMappings.updateSlackIntegrationMapping({
      box_item: {
        type: 'folder',
        id: boxFolderID
      },
      options: {
        is_access_management_disabled: accessManagementDisabled
      }
    }, {
      integration_mapping_id: mappingID
    })
    log(mapping)
    return mapping
  },
  delete: async (mappingID) => {
    await client.integrationMappings.deleteSlackIntegrationMappingById({
      integration_mapping_id: mappingID
    })
    log('Mapping deleted')
    return 'Mapping deleted'
  }
}

async function integrationMappings (arg, options, subCommand) {
  const operation = operations[subCommand._name]
  const result = await operation(arg, options)

  return result
}

module.exports = integrationMappings
