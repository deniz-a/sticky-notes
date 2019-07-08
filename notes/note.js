export const Note = (color, content, createdAt) => 
  ({ color, content, createdAt }) 

export const checkNote = note => {
  return !(
    note == null
      || typeof note !== 'object'
      || !colors.includes(note.color)
      || typeof note.content !== 'string'
    )
  }

export const colors = [
  'red', 'green', 'yellow', 'blue', 'black', 'pink']
