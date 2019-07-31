export function html(t) {
  //  for (var o = [t[0]], i = 1, l = arguments.length; i < l; i++)
  //    o.push(arguments[i], t[i]);
  //  return o.join('');
  return t[0]
}

export const colors = [ 'yellow', 'green', 'blue', 'pink', 
  'red', 'black']

export function formatDate(date) {

  function prependZero(n) {
    if (n <= 9) {
      return '0' + n
    } else return n
  }

  const now = new Date()
  let rv = ''

  const hr = date.getHours()
  const min = date.getMinutes()
  const dow = date.getDay()
  const day = date.getDate()
  const month = date.getMonth()
  const year = date.getFullYear()


  if (day == now.getDate() 
    && month == now.getMonth()
    && year == now.getYear()
  ) {

    if (hr == now.getHours() && min == now.getMinutes) {
      rv += 'just now'
    } else {
      rv += `${hr}.${prependZero(min)}`
    }

  } else {

    rv += `${hr}.${prependZero(min)}`
    
    if (year != now.getFullYear()) {

      rv += `, ${day} ${month} ${year}`
    } else if (month != now.getMonth()) {
      rv += `, ${day} ${month}`
    } else if (day != now.getDate()) {
      if (now.getDate() - day == 1) {
        rv += ', yesterday'
      } else {
        rv += `, ${day} ${month}`
      }
    }
  }
  return rv
}
