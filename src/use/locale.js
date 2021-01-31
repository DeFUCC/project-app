export function format(date) {
  if (!date) return
  let theDate = new Date(Number(date))
  return {
    date: theDate.toLocaleDateString(),
    time: theDate.toLocaleTimeString(),
  }
}
