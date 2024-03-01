const fs = require('fs')
const { prompt } = require('enquirer')
const BoxSDK = require('box-node-sdk')
const express = require('express')
const config = require('./lib/config')
const app = express()

const questions = [
  {
    type: 'input',
    name: 'clientID',
    message: 'Enter your Box client ID',
  },
  {
    type: 'input',
    name: 'clientSecret',
    message: 'Enter your Box client secret',
  }
]

const authDetails = {
  redirect_uri: 'http://localhost:3000/oauth',
  response_type: 'code'
}

async function auth (req, res, clientCreds, box) {
  const { code } = req.query

  const tokenInfo = await box.getTokensAuthorizationCodeGrant(code)
  const client = box.getPersistentClient(tokenInfo)
  const user = await client.users.get(client.CURRENT_USER_ID)
  const success = `Successfully authenticated as ${user.name} (${user.login}).`
  const html = `<p>${success}</p><p>You can close this window now.</p>`
  
  config.set({ tokenInfo , clientCreds })
  console.log(success)
  res.send(html)
  process.exit()
}

function startServer (clientCreds, box, authUrl) {
  app.get('/oauth', (req, res) => {
    auth(req, res, clientCreds, box)
  })

  app.listen(3000, () => {
    console.log(`Go to ${authUrl} to authorize your Box account`)
  })
}

async function setup () {
  const existingCreds = config.get()
  const clientCreds = existingCreds ? existingCreds.clientCreds : await prompt(questions)
  const box = new BoxSDK(clientCreds)
  const authUrl = box.getAuthorizeURL(authDetails)
  
  startServer(clientCreds, box, authUrl)
}

module.exports = setup
