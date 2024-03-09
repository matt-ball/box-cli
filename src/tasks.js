const client = require('./lib/client')
const log = require('./lib/logger')

const operations = {
  get: async (taskID) => {
    const task = await client.tasks.get(taskID)
    log(task)
    return task
  },
  update: async (taskID, { updates }) => {
    const task = await client.tasks.update(taskID, { updates })
    log(task)
    return task
  },
  delete: async (taskID) => {
    await client.tasks.delete(taskID)
    log('Task deleted')
    return 'Task deleted'
  }
}

async function tasks (arg, options, subCommand) {
  const operation = operations[subCommand._name]
  const result = await operation(arg, options)

  return result
}

module.exports = tasks
