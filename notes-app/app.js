const yargs = require('yargs')
const getNotes = require('./notes')

yargs.command({
  command: 'add',
  describe: 'Add new note',
  builder: {
    title: {
      describe: 'Note title',
      demandOption: true,
      type: 'string'
    },
    body: {
      describe: 'Note description',
      demandOption: true,
      type: 'string'
    }
  },
  handler: (argv) => {
    console.log(`title: ${argv.title}`)
    console.log(`body: ${argv.body}`)
  }
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

yargs.parse()