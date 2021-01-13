export function format(date: number) {
  let theDate = new Date(Number(date))
  return {
    date: theDate.toLocaleDateString(),
    time: theDate.toLocaleTimeString(),
  }
}
