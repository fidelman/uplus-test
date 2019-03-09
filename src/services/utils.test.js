import { convertDate, limitText, getAvatarSrc } from './utils'

describe('limitText', () => {
  it('should return up to 20 words', () => {
    const word = 'lorem'
    const maxWords = 20
    const maxCharacters = 200
    const length = 30
    const text = Array.from({ length }, () => word).join(' ')
    const actual = limitText(text)
    expect(actual.split(' ')).toHaveLength(maxWords)
    expect(actual.length).toEqual((word.length + 1) * maxWords - 1)
    expect(actual.length).toBeLessThanOrEqual(maxCharacters)
  })

  it('should return up to 200 characters', () => {
    const word = 'lorempo'
    const maxWords = 20
    const length = 180
    const text = Array.from({ length }, () => word).join(' ')
    const actual = limitText(text)
    expect(actual.split(' ')).toHaveLength(maxWords)
    expect(actual.length).toEqual((word.length + 1) * maxWords - 1)
  })
})

describe('convertDate', () => {
  it('should return 9/03/2019', () => {
    const dateString = '2019-03-09T16:17:39.032+01:00'
    const actual = convertDate(dateString)
    const expected = '9/3/2019'
    expect(actual).toEqual(expected)
  })
})

describe('getPhotoImage', () => {
  it('should return absolute path from absolute', () => {
    expect(getAvatarSrc('https://api.zonky.cz/photo.jpg')).toEqual(
      'https://api.zonky.cz/photo.jpg'
    )
  })

  it('should return absolute path from relative', () => {
    expect(getAvatarSrc('/photo.jpg')).toEqual('https://api.zonky.cz/photo.jpg')
  })
})
