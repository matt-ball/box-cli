#!/usr/bin/env node

const { Command } = require('commander')
const program = new Command()

program
  .command('setup')
  .description('setup box cli')
  .action(cmd('setup'))

const file = program
  .command('file')
  .description('file commands')
file
  .command('get <fileId>')
  .description('get file')
  .action(cmd('file'))
file
  .command('download <fileId>')
  .description('download file')
  .option('-p, --path <path>', 'path to save file, including filename')
  .action(cmd('file'))
file
  .command('upload <path>')
  .description('upload file')
  .option('-f, --folder <folderId>', 'folder to upload file to')
  .action(cmd('file'))
file
  .command('delete <fileId>')
  .description('delete file')
  .action(cmd('file'))

program
  .command('user')
  .description('user commands')
  .action(cmd('user'))

program.parse()

function cmd (action) {
  return require(`./src/${action}`)
}
