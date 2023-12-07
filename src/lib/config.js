const fs = require('fs')
const path = require('path')
const os = require('os')
const filePath = path.join(os.homedir(), '.box.json')

module.exports = {
  get: () => {
    const config = fs.readFileSync(filePath)
    return JSON.parse(config)
  },
  set: (config) => {
    fs.writeFileSync(filePath, JSON.stringify(config, null, 2))
  }
}
