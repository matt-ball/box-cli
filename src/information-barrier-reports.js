const client = require('./lib/client')
const log = require('./lib/logger')

const operations = {
  get: async (id) => {
    const report = await client.informationBarrierReports.getById({
      shield_information_barrier_report_id: id
    })
    log(report)
    return report
  },
  getAll: async (id) => {
    const reports = await client.informationBarrierReports.getAll({
      shield_information_barrier_id: id
    })
    log(reports)
    return reports
  },
  create: async (id, { type }) => {
    const report = await client.informationBarrierReports.create({
      shield_information_barrier_id: id,
      type
    })
    log(report)
    return report
  }
}

function informationBarrierReports (arg, options, subCommand) {
  const operation = operations[subCommand._name]
  operation(arg, options)
}

module.exports = informationBarrierReports
