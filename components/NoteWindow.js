import {
  colors
} from '../util.js'

const ColorDropdown = {
  name: 'ColorDropdown',
  template: `
    <div class="color-dropdown">
      <a>color</a>
      <div class="color-dropdown-content">
        <a v-for="color in colors" :key="color"
          :class="'note-color-'+color"
          @click="$emit('change', { color })"></a>
      </div>
    </div>
  `,
  data: () => ({
    colors
  }),
}

export default {
  name: 'NoteWindow',
  props: ['note'],
  components: {
    ColorDropdown
  },
  template: `
    <div class="bg-tint" @click.self="$emit('close')">
      <article id="note-window" :class="'note page note-color-'+note.color">
        <header>
          <a @click="$emit('close')">close</a>
          <a @click="$emit('delete')">delete</a>
          <a v-if="canShare" @click="share">share</a>
          <color-dropdown @change="changeColor"></color-dropdown>
        </header>
        <main>
          <textarea v-model="note.content"
            @input="$emit('input')"></textarea>
        </main>
      </article>
    </div>`,
  data: () => ({
    canShare: Boolean(window.navigator.share),
  }),
  methods: {
    changeColor({
      color
    }) {
      this.$set(this.note, 'color', color)
      document.querySelector('meta[name=theme-color]').setAttribute('content',
        getComputedStyle(document.getElementById('note-window')).getPropertyValue("--note-rim-color"))
      this.$emit('input')
    },
    share() {
      window.navigator.share({
        text: this.note.content,
        color: this.note.color,
        timestamp: this.note.createdAt
      })
    },
  },
  mounted() {
    document.querySelector('meta[name=theme-color]').setAttribute('content',
      getComputedStyle(document.getElementById('note-window')).getPropertyValue("--note-rim-color"))
  }
}