class BrowserStorage {
  private readonly storage: Storage

  constructor(storage: Storage = window.localStorage) {
    this.storage = storage
  }

  set(key: string, value: string | number | boolean | object | undefined) {
    switch (typeof value) {
      case 'function':
        throw new TypeError(
          `Values of type function cannot be stored! Try to store an string identifier instead.`
        )
      case 'string':
        this.storage.setItem(key, value)
        break
      default:
        this.storage.setItem(key, JSON.stringify(value))
        break
    }
  }

  get<T extends unknown>(key: string): T | null {
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

export const LocalStorage = new BrowserStorage()
export const SessionStorage = new BrowserStorage(window.sessionStorage)
