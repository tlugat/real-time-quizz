export const getRandomColor = (index) => {
  const inputCheckboxBgColors = [' --yellow', ' --primary', '--blue']
  const colorIndex = index % inputCheckboxBgColors.length

  return inputCheckboxBgColors[colorIndex]
}
