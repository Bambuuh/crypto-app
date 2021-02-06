const monthNames = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
]

export function getMonthFromDate(date: Date) {
  const d = new Date(date)
  return monthNames[d.getMonth()]
}
