const chalk = require('chalk')
const { demandOption, argv } = require('yargs')
const yargs = require('yargs')
const notes = require('./notes.js')

// changing yargs version
yargs.version('1.1.0')

//create add command 
yargs.command({
    command: 'add',
    describe: 'add a new note' ,
    builder: {
        title:{
            describe: 'note title',
            demandOption: true,
            type:'string'
        } ,
        body: {
            describe: 'body of note' ,
            demandOption: true ,
            type: 'string'
        }
    },
    handler(argv) {
        notes.addNote(argv.title, argv.body)
    }
})

// Remove a note
yargs.command ({
    command:'remove',
    describe: 'remove a note',
    builder: {
        title : {
        describe : 'title of note' ,
        demandOption: true ,
        type: 'string'
        }
    },
    handler(argv) {
        notes.removeNote(argv.title)
    }
})

// Read a note
yargs.command({
    command:'read',
    describe:'read a note',
    builder: {
        title: {
            describe : 'title of note' ,
            demandOption: true ,
            type: 'string'
        }
    },
    handler(argv) {
        notes.readNotes(argv.title)
    }    
})

// List all the notes
yargs.command ({
    command:'list',
    describe:'list all notes',
    handler() {
        notes.listNotes()
    }
})

yargs.parse()