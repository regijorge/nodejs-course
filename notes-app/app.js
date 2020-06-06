const yargs = require('yargs')
const notes = require('./notes')

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
  handler(argv){
    notes.addNote(argv.title, argv.body)
  }
})

yargs.command({
  command: 'remove',
  describe: 'Remove note',
  builder: {
    title: {
      describe: 'Note title',
      demandOption: true,
      type: 'string'
    }
  },
  handler(argv){
    notes.removeNote(argv.title)
  }
})

yargs.command({
  command: 'list',
  describe: 'List all notes',
  handler(){
    console.log('LIST')
  }
})

yargs.command({
  command: 'read',
  describe: 'Read a note',
  handler(){
    console.log('READ')
  }
})

yargs.parse()