import Note from './Note.js'
import NoteWindow from './NoteWindow.js'

import NoteRepo from '../notes/idb-keyval.js'

const noteRepo = NoteRepo()

let deferredPrompt

window.addEventListener('beforeinstallprompt', (e) => {
  // Prevent Chrome 67 and earlier from automatically showing the prompt
  e.preventDefault()
  // Stash the event so it can be triggered later.
  deferredPrompt = e
  // Update UI to notify the user they can add to home screen

})

export default {
  name: 'App',
  components: {
    Note,
    NoteWindow
  },
  template: `
  <div>
    <a v-if="deferredPrompt !== null" @click="install">install</a>
    <header>
      <h1>sticky notes</h1>
      <button @click="createNote">+ create</button>
      <label for="search">search
      <input id="search" type="text" placeholder="search"
        :value="query" @input="query = $event.target.value"></label>
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
    deferredPrompt: null,
    noteRepo,
    query: '',
    openedNote: null,
    notes: [{
      id: 1,
      color: 'red',
      content: 'Hasselback Potatodmkdkdkk d dmdmmfmfn fnjnenskksksksks skksksksksksm sksksksknsns oeidndneie krnrkeo acqxxfqg ejekoepfp d dkdkdlkrkrkdnn dkkdkfkdmdmdndnd kdkdkrndndkrnnd dkldkcmfndkfokfk dkdkneneekke kdkdkdkdkdkdk kdkdciicuhneo kdkdkdndndndndndmdn kddm'
    }]
  }),
  computed: {
    shownNotes() {
      return this.query === '' ? this.notes :
        this.notes.filter(n =>
          n.content.toLowerCase()
          .includes(this.query.toLowerCase()))
    },
  },
  methods: {
    createNote() {
      this.noteRepo.saveNote({
          color: 'yellow',
          content: '',
          createdAt: new Date()
        })
        .then(note => {
          this.notes.unshift(note)
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
    install(e) {
      // hide our user interface that shows our A2HS button
      // Show the prompt
      this.deferredPrompt.prompt();
      // Wait for the user to respond to the prompt
      this.deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === 'accepted') {
          console.log('User accepted the A2HS prompt');
        } else {
          console.log('User dismissed the A2HS prompt');
        }
        this.deferredPrompt = null;
      })
    },
  },

  created() {
    this.noteRepo.getNotes()
      .then(notes => {
        this.notes = notes
      })

    window.addEventListener('beforeinstallprompt', (e) => {
      // Prevent Chrome 67 and earlier from automatically showing the prompt
      e.preventDefault()
      // Stash the event so it can be triggered later.
      this.deferredPrompt = e
      // Update UI to notify the user they can add to home screen

    })
  }
}