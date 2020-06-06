const yargs = require('yargs')
const getNotes = require('./notes')

yargs.command({
  command: 'add',
  describe: 'Add new note',
  handler: () => console.log('ADD')
})

yargs.command({
  command: 'remove',
  describe: 'Remove note',
  handler: () => console.log('REMOVE')
})

yargs.command({
  command: 'list',
  describe: 'List all notes',
  handler: () => console.log('LIST')
})

yargs.command({
  command: 'read',
  describe: 'Read a note',
  handler: () => console.log('READ')
})

console.log(yargs.argv)