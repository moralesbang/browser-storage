import {LocalStorage} from '../utils/browserStorage'

afterEach(() => {
  localStorage.clear()
})

interface IData {
  data: any
}

const testingData: IData = {data: 'test'}

test('set item', () => {
  LocalStorage.set('1st', 'first')
  LocalStorage.set('2nd', testingData)
  LocalStorage.set('3rd', '123')
  LocalStorage.set('4th', 'false')

  expect(localStorage.getItem('1st')).toBe('first')
  expect(localStorage.getItem('2nd')).toEqual(JSON.stringify({data: 'test'}))
  expect(localStorage.getItem('3rd')).toBe('123')
  expect(localStorage.getItem('4th')).toBe('false')
  expect(() => LocalStorage.set('my-fn', console.log)).toThrow(TypeError)
})

test('get item', () => {
  localStorage.setItem('1st', 'first')
  localStorage.setItem('2nd', JSON.stringify(testingData))
  localStorage.setItem('3rd', '123')
  localStorage.setItem('4th', 'false')
  localStorage.setItem('5th', '["bar"')

  expect(LocalStorage.get('1st')).toBe('first')
  expect(LocalStorage.get<IData>('2nd')).toEqual({data: 'test'})
  expect(LocalStorage.get<number>('3rd')).toBe(123)
  expect(LocalStorage.get<boolean>('4th')).toBe(false)
  expect(LocalStorage.get<boolean>('5th')).toBe('["bar"')
})
