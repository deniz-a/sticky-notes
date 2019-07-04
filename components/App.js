import Note from '/components/Note.js'
import NoteWindow from '/components/NoteWindow.js'

import NoteRepo from '/notes/local-storage.js'

import { html } from '/util.js'

const noteRepo = NoteRepo()

export default {
  name: 'App',
  components: { Note, NoteWindow },
  template: html`
  <div>
    <header>
      <h1>sticky notes</h1>
      <button @click="createNote">+ create</button>
    </header>
    <main>
      <note v-for="note in notes" :key="note.id"
        :note="note" @click="openedNote = note"
        @delete="deleteNote(note.id)"></note>
      <div class="empty-filler" v-if="!notes.length">
        <h4>You have no notes... yet.</h4>
        Press the <code>+ create</code> button to start 
        writing your first note.
      </div>
    </main>
    <note-window v-if="openedNote !== null"
      :note="openedNote"
      @close="openedNote = null"
      @delete="deleteNote(openedNote.id)"
      @input="saveOpenedNote"></note-window>
  </div>`,
  data : () => ({
    noteRepo,
    openedNote: null,
    notes: [
      { id: 1, color: 'red', content: 'Hasselback Potatodmkdkdkk d dmdmmfmfn fnjnenskksksksks skksksksksksm sksksksknsns oeidndneie krnrkeo acqxxfqg ejekoepfp d dkdkdlkrkrkdnn dkkdkfkdmdmdndnd kdkdkrndndkrnnd dkldkcmfndkfokfk dkdkneneekke kdkdkdkdkdkdk kdkdciicuhneo kdkdkdndndndndndmdn kddm' }
    ]
  }),
  methods: {
    createNote() {
      this.noteRepo.saveNote(
        { color: 'yellow', content: '' })
        .then(note => {
          this.notes.unshift(note)
        })
    },
    saveOpenedNote() {
      this.noteRepo.editNote(this.openedNote)
    },
    deleteNote(id) {
      this.noteRepo.deleteNote(id)
        .then(() => {
          this.notes = this.notes.filter(n => n.id !== id)
        })
    },
  },

  created() {
    this.noteRepo.getNotes()
      .then(notes => {
        this.notes = notes
      })
  }
}
