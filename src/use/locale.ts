export function format(date: number) {
  if (!date) return
  let theDate = new Date(Number(date))
  return {
    date: theDate.toLocaleDateString(),
    time: theDate.toLocaleTimeString(),
  }
}
