import { html, colors } from '/util.js'

const ColorDropdown = {
  name: 'ColorDropdown',
  template: html`
    <div class="color-dropdown">
      <a>color</a>
      <div class="color-dropdown-content">
        <a v-for="color in colors" :key="color"
          :class="'note-color-'+color"
          @click="$emit('change', { color })"></a>
      </div>
    </div>
  `,
  data: () => ({ colors }),
}

export default {
  name: 'NoteWindow',
  props: ['note'],
  components: { ColorDropdown },
  template: html`
    <div :class="'note page note-color-'+note.color">
      <header>
        <a @click="$emit('close')">back</a>
        <a @click="$emit('delete')">delete</a>
        <color-dropdown @change="changeColor"></color-dropdown>
      </header>
      <main>
        <textarea v-model="note.content"
          @input="$emit('input')"></textarea>
      </main>
    </div>`,
  methods: {
    changeColor({ color }) {
      this.$set(this.note, 'color', color)
      this.$emit('input')
    },
  },
}
