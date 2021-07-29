const fs = require('fs')
const chalk=require('chalk')
const getNotes = () => {
    return (chalk.blue.inverse('Your Notes...'))
}

const addNote = (title, body) => {
    const notes=loadNotes()
    
    // const duplicateNotes = notes.filter((note) => note.title === title)
    const duplicateNote = notes.find((note) => note.title === title)

    if (!duplicateNote) {
        notes.push({
            title: title,
            body: body
        })
        saveNotes(notes)
        console.log(chalk.green('New note added!'))    
    } else {
        console.log(chalk.red('Note title taken!'))
    } 
}

const removeNote = (title) => {
    const notes=loadNotes()

    const notesToKeep = notes.filter((note) => note.title!==title 
    )
    
    if(notesToKeep.length==notes.length) {
        console.log(chalk.red.inverse('No note found!'))
    } else {
        saveNotes(notesToKeep)
        console.log(chalk.green.inverse('Note removed!'))
    }
}

const listNotes = () => {
    const hey=getNotes()
    console.log(hey)
    
    const notes=loadNotes()
    
    // notes.filter((note) => console.log(note.title))
    notes.forEach((note) => console.log(note.title))
}

const readNotes = (title) => {
    notes = loadNotes() 
    // const read = notes.filter((note) => {
    //     if(note.title === title) {
    //         console.log(title)
    //         console.log(note.body)
    //     }
    // })
    const note = notes.find((note) => note.title === title
    ) 
    if(note) {
        console.log(chalk.green.inverse(note.title))
        console.log(note.body)
    } else {
        console.log(chalk.red.inverse("Note not found !"))
    }
}

const loadNotes = () => {
    try {
        const dataBuffer = fs.readFileSync('notes.json')
        const dataJSON = dataBuffer.toString()
        return JSON.parse(dataJSON)
    } catch (e) {
        return []
    }
}

const saveNotes = (notes) => {
    const dataJSON= JSON.stringify(notes)
    fs.writeFileSync('notes.json',dataJSON)
}


module.exports = {
    getNotes: getNotes ,
    addNote: addNote, 
    removeNote: removeNote,
    listNotes: listNotes,
    readNotes: readNotes
}