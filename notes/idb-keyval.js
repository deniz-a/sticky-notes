import { get, set, del, keys, Store } from 'https://cdn.jsdelivr.net/npm/idb-keyval@3/dist/idb-keyval.mjs'

import { checkNote } from './note.js'

export default function IdbKeyvalNoteRepo() {
  const store = new Store('notes-db', 'notes')

  return {

    getNotes() {
      return keys(store).then(keys => Promise.all(
        keys.map(k => get(k, store))))
    },

    getNoteById(id) {
      return get(id, store)
    },

    saveNote(note) {
      if (checkNote(note)) {
        note.id = String(Math.random())
        return set(note.id, note, store)
          .then(() => note)
      } else return Promise.reject('Invalid note')
    },

    editNote(note) {
      if (checkNote(note)) {
        return set(note.id, note, store)
      } else return Promise.reject('Invalid note')
    },

    deleteNote(id) {
      return del(id, store)
    },
  }
}
