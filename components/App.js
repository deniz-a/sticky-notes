import Note from './Note.js'
import NoteWindow from './NoteWindow.js'

import NoteRepo from '../notes/idb-keyval.js'

import { html } from '../util.js'

const noteRepo = NoteRepo()

export default {
  name: 'App',
  components: { Note, NoteWindow },
  template: html`
  <div>
    <header>
      <h1>sticky notes</h1>
      <button @click="createNote">+ create</button>
      <input id="search" type="text" placeholder="search"
        :value="query" @input="query = $event.target.value">
    </header>
    <main>
      <note v-for="note in shownNotes" :key="note.id"
        :note="note" @click="openedNote = note"
        @delete="deleteNote(note.id)"
        @share="share(note.id)"></note>
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

  data: () => ({
    noteRepo,
    query: '',
    openedNote: null,
    notes: [
      { id: 1, color: 'red', content: 'Hasselback Potatodmkdkdkk d dmdmmfmfn fnjnenskksksksks skksksksksksm sksksksknsns oeidndneie krnrkeo acqxxfqg ejekoepfp d dkdkdlkrkrkdnn dkkdkfkdmdmdndnd kdkdkrndndkrnnd dkldkcmfndkfokfk dkdkneneekke kdkdkdkdkdkdk kdkdciicuhneo kdkdkdndndndndndmdn kddm' }
    ]
  }),
  computed: {
    shownNotes() {
      return this.query === '' ? this.notes
        : this.notes.filter(n => 
          n.content.toLowerCase()
          .includes(this.query.toLowerCase()))
    },
  },
  methods: {
    createNote() {
      this.noteRepo.saveNote(
        { color: 'yellow', content: '', createdAt: Date.now() })
        .then(note => {
          this.openedNote = note
        })
    },
    saveOpenedNote() {
      this.noteRepo.editNote(this.openedNote)
    },
    deleteNote(id) {
      this.noteRepo.deleteNote(id)
        .then(() => {
          this.notes = this.notes.filter(n => n.id !== id)
          this.openedNote = null
        })
    },
    shareNote(id) {
      this.noteRepo.getNoteById(id)
        .then(note => {
          window.navigator.share({
            text: note.content,
            color: note.color,
            timestamp: note.createdAt,
          })
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
