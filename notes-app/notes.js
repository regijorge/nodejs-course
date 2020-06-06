const fs = require('fs')

const getNotes = () => {
  return 'Your notes...'
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
  getNotes,
  addNote,
  removeNote
}