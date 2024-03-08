const client = require('./lib/client')
const log = require('./lib/logger')

const operations = {
  get: async (taskID) => {
    const task = await client.tasks.get(taskID)
    log(task)
    return task
  },
  create: async (fileID, { options }) => {
    const task = await client.tasks.create(fileID, options)
    log(task)
    return task
  },
  update: async (taskID, { name }) => {
    const task = await client.tasks.update(taskID, name)
    log(task)
    return task
  },
  delete: async (taskID) => {
    await client.tasks.delete(taskID)
    log('Task deleted')
    return 'Task deleted'
  }
}

function tasks (arg, options, subCommand) {
  const operation = operations[subCommand._name]
  operation(arg, options)
}

module.exports = tasks
