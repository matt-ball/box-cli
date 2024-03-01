const client = require('./lib/client')

const operations = {
  get: async (taskID) => {
    const task = await client.tasks.get(taskID)
    console.log(task)
  },
  create: async (fileID, { options }) => {
    const task = await client.tasks.create(fileID, options)
    console.log(task)
  },
  update: async (taskID, { name }) => {
    const task = await client.tasks.update(taskID, name)
    console.log(task)
  },
  delete: async (taskID) => {
    await client.tasks.delete(taskID)
    console.log('Task deleted')
  }
}

function tasks (arg, options, subCommand) {
  const operation = operations[subCommand._name]
  operation(arg, options)
}

module.exports = tasks
