export default {
  name: 'Note',
  props: ['note'],
  template: `
    <div :class="'note listitem note-color-'+note.color"
      @click.self="$emit('click')">
      <small>{{note.createdAt || ''}}</small>
      <a class="item-action" @click="$emit('delete')">delete</a>
      <div class="ws">{{note.content}}</div>
    </div>`,
}
