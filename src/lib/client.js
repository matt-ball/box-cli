const config = require('./config')
const BoxSDK = require('box-node-sdk')

function client () {
  const cfg = config.get()
  const box = new BoxSDK(cfg.clientCreds)
  return box.getPersistentClient(cfg.tokenInfo)
}

module.exports = client()
