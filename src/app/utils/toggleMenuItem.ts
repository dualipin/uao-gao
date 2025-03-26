export const toggleMenuItem = (index: number, currentIndex: number): number => {
  return index === currentIndex ? -1 : index
}
