const chalk = require('chalk')
const log = require('./logger')

function determineError (err) {
  const { statusCode } = err

  switch (statusCode) {
    case 401:
      return `${chalk.red.bold('⛔️ Unauthorized!')} You may need to run ${chalk.blue.bold('box setup')} again.`
    case 404:
      return `${chalk.red.bold('🤷 Not Found!')} The specified file or folder could not be found.`
    case 409:
      return `${chalk.red.bold('🤺 Conflict!')} A file or folder with that name already exists.`
  }

  return `${chalk.red.bold('❌ Something went wrong, check your command and try again.')} \n ${err.message}`
}

function handleError (err) {
  const errorMessage = determineError(err)
  log(errorMessage)
}

module.exports = handleError
