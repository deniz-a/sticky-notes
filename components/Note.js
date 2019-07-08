import { formatDate } from '../util.js'

export default {
  name: 'Note',
  props: ['note'],
  template: `
    <div :class="'note listitem note-color-'+note.color"
      @click.self="$emit('click')">
      <small>{{date}}</small>
      <a class="item-action" @click="$emit('delete')">delete</a>
      <div class="ws">{{note.content}}</div>
    </div>`,
  computed: {
    date() {
      if (this.note.createdAt instanceof Date) {
        return formatDate(this.note.createdAt)
      } else return ''
    },
  },
  methods: { formatDate },
}
