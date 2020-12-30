import { register } from 'timeago.js'

const localeFunc = (
  number: number,
  index: number,
  totalSec?: number,
): [string, string] => {
  // number: the timeago / timein number;
  // index: the index of array below;
  // totalSec: total seconds between date to be formatted and today's date;
  let phrase: [string, string] = [
    ['just now', 'right now'],
    ['%s s', 'in %s seconds'],
    ['1 m', 'in 1 minute'],
    ['%s m', 'in %s minutes'],
    ['1 h', 'in 1 hour'],
    ['%s h', 'in %s hours'],
    ['1 d', 'in 1 day'],
    ['%s d', 'in %s days'],
    ['1 w', 'in 1 week'],
    ['%s w', 'in %s weeks'],
    ['1 m', 'in 1 month'],
    ['%s m', 'in %s months'],
    ['1 y', 'in 1 year'],
    ['%s y', 'in %s years'],
  ][index] as [string, string]
  return phrase
}
// register your locale with timeago
register('short', localeFunc)
