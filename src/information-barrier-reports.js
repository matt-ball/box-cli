const client = require('./lib/client')

const operations = {
  get: async (reportID) => {
    const report = await client.informationBarrierReports.get(reportID)
    console.log(report)
  },
  getAll: async () => {
    const reports = await client.informationBarrierReports.getAll()
    console.log(reports)
  }
}

function informationBarrierReports (arg, options, subCommand) {
  const operation = operations[subCommand._name]
  operation(arg, options)
}

module.exports = informationBarrierReports
