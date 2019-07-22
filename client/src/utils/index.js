export function sortByDate (a, b) {
  const aNum = Number(a.createdAt)
  const bNum = Number(b.createdAt)

  if (aNum > bNum) {
    return -1
  }
  if (aNum < bNum) {
    return 1
  }
  return 0
}
