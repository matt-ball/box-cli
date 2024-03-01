const client = require('./lib/client')

const operations = {
  get: async (folderID) => {
    const folder = await client.folders.get(folderID)
    console.log(folder)
  },
  getAll: async () => {
    const folders = await client.folders.getAll()
    console.log(folders)
  },
  create: async (name, { parent }) => {
    const folder = await client.folders.create(parent, name)
    console.log(folder)
  },
  delete: async (folderID) => {
    await client.folders.delete(folderID)
    console.log('Folder deleted')
  }
}

function folder (arg, options, subCommand) {
  const operation = operations[subCommand._name]
  operation(arg, options)
}

module.exports = folder
