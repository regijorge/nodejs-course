const fs = require('fs')

const readNote = (title) => {
  const notes = loadNotes()
  const note = notes.find(note => note.title === title)

  if (!note) {
    console.log('Note not found')
    return
  }

  console.log(`title: ${note.title}`)
  console.log(`body: ${note.body}`)
}

const addNote = (title, body) => {
  const notes = loadNotes()
  const duplicateNotes = notes.filter(note => note.title === title)

  if (duplicateNotes.length) {
    console.log('Note alrady added!')
    return
  }

  const note = {
    title,
    body
  }

  notes.push(note)
  saveNotes(notes)
  console.log('Note added!')
}

const removeNote = (title) => {
  const notes = loadNotes()
  const notesToKeep = notes.filter(note => note.title !== title)

  if (notes.length === notesToKeep.length) {
    console.log('Note not found')
    return
  }

  saveNotes(notesToKeep)
  console.log('Note was removed successfully')
}

const listNotes = () => {
  const notes = loadNotes()

  console.log('Your notes:')

  notes.forEach(note => {
    console.log(note.title)
  })
}

const saveNotes = (notes) => {
  const dataJSON = JSON.stringify(notes, null, 2)
  fs.writeFileSync('notes.json', dataJSON)
}

const loadNotes = () => {
  try {
    const dataBuffer = fs.readFileSync('notes.json')
    const dataJSON = dataBuffer.toString()
    return JSON.parse(dataJSON)
  } catch(error) {
    return []
  }
}

module.exports = {
  addNote,
  removeNote,
  listNotes,
  readNote
}