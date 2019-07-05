export default function  LocalStorageNoteRepo() {
  let notes

  // TODO: Move to another file so all providers can use
  const checkNote = note => {
    if (note == null
      || typeof note !== 'object'
      // TODO: Check if note.color is one of the allowed colors
      || typeof note.color !== 'string'
      || typeof note.content !== 'string'
    ) {
      
      throw `Invalid note: ${note}`
    }
  }

  const saveNotes = () => {
    window.localStorage.setItem('notes', JSON.stringify(notes))
  }

  const loadNotes = () => {
    if (!notes) notes = JSON.parse(window.localStorage.notes)
    notes.forEach((note, index) => {
      notes[index].id = notes[index].id || Math.random()
    })
  }
  return {
    getNotes() {
      loadNotes()
      return Promise.resolve(notes)
    },

    getNoteById(id) {
      loadNotes()
      return Promise.resolve(notes.find(note => note.id === id))
    },
    saveNote(note) {
      checkNote(note)
      note.id = Math.random()
      notes.unshift(note)
      saveNotes()
      return Promise.resolve(note)
    },

    editNote(newNote) {
      checkNote(newNote)
      const index = notes.findIndex(note => 
        note.id === newNote.id)
      notes[index] = newNote
      return Promise.resolve(saveNotes())
    },

    deleteNote(id) {
      notes = notes.filter(note => note.id !== id)
      return Promise.resolve(saveNotes())
    }
  }
}
