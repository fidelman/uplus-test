export const limitText = (
  str,
  { words, characters } = { words: 20, characters: 200 }
) => {
  const strWords = str.split(' ')

  let wordsCount = 0
  let charactersCount = 0
  let result = ''

  smoothlyAddWords()

  function smoothlyAddWords() {
    if (!strWords[wordsCount]) return
    const potentialWord = (wordsCount ? ' ' : '') + strWords[wordsCount] // (wordsCount ? ' ' : '') consider a space before non-first element
    const { length } = potentialWord
    if (charactersCount + length > characters || wordsCount + 1 > words) {
      return
    } else {
      result += potentialWord
      wordsCount += 1
      charactersCount += length
      smoothlyAddWords()
    }
  }

  return result
}

export const convertDate = (str) => {
  const date = new Date(str)
  // format DD/MM/YYYY
  return `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`
}
