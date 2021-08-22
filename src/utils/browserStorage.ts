class BrowserStorage {
  private readonly storage: Storage

  constructor(storage: Storage) {
    this.storage = storage
  }

  set(key: string, value: unknown) {
    const valueType = typeof value
    let nextValue

    switch (valueType) {
      case 'object':
        nextValue = JSON.stringify(value)
        break
      case 'function':
        throw new TypeError('Functions should not be save in browser storage')
      default:
        nextValue = String(value)
    }

    this.storage.setItem(key, nextValue)
  }

  get<T = string>(key: string): T | null {
    const item = this.storage.getItem(key)

    if (item) {
      try {
        return JSON.parse(item)
      } catch (e) {
        return item as any
      }
    } else {
      return null
    }
  }

  delete(key: string) {
    this.storage.removeItem(key)
  }

  clear() {
    this.storage.clear()
  }

  getKey(index: number): string | null {
    return this.storage.key(index)
  }

  get length(): number {
    return this.storage.length
  }
}

export const LocalStorage = new BrowserStorage(window.localStorage)
export const SessionStorage = new BrowserStorage(window.sessionStorage)
