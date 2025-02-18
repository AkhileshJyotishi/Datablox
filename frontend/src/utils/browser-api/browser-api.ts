class BrowserApiUtils {
  /**
   * Sets a cookie with a specified key and value.
   * @private
   * @param {string} key - The key of the cookie.
   * @param {string} value - The value of the cookie.
   * @param {number} [days=365] - The number of days until the cookie expires.
   */
  private static setCookie(key: string, value: string, days: number = 365): void {
    const expires = new Date()
    expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000)
    document.cookie = `${key}=${value};expires=${expires.toUTCString()};path=/`
  }

  /**
   * Retrieves a cookie value by key.
   * @private
   * @param {string} key - The key of the cookie to retrieve.
   * @returns {string | null} - The value of the cookie, or null if not found.
   */
  private static getCookie(key: string): string | null {
    const name = key + "="
    const decodedCookie = decodeURIComponent(document.cookie)
    const ca = decodedCookie.split(";")
    for (let i = 0; i < ca.length; i++) {
      const c = ca[i].trim()
      if (c.indexOf(name) === 0) {
        return c.substring(name.length, c.length)
      }
    }
    return null
  }

  /**
   * Deletes a specific cookie by key.
   * @private
   * @param {string} key - The key of the cookie to delete.
   */
  private static deleteCookie(key: string): void {
    document.cookie = `${key}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/`
  }

  /**
   * Clears all cookies.
   * @private
   */
  private static clearCookies(): void {
    const cookies = document.cookie.split(";")
    for (const cookie of cookies) {
      const eqPos = cookie.indexOf("=")
      const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie
      document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/`
    }
  }

  /// *** Public API *** ///

  /**
   * Reads a value from the specified storage.
   * @param {string} key - The key to read the value from.
   * @param {'local' | 'session' | 'cookie'} [storage='local'] - The type of storage to read from.
   * @returns {string | null} - The value associated with the key, or null if not found.
   */
  static readStorage(key: string, storage: "local" | "session" | "cookie" = "local"): string | null {
    switch (storage) {
      case "local":
        return localStorage.getItem(key)
      case "session":
        return sessionStorage.getItem(key)
      case "cookie":
        return this.getCookie(key)
      default:
        return null
    }
  }

  /**
   * Writes a value to the specified storage.
   * @param {string} key - The key to write the value to.
   * @param {string} value - The value to write.
   * @param {'local' | 'session' | 'cookie'} [storage='local'] - The type of storage to write to.
   */
  static writeStorage(key: string, value: string, storage: "local" | "session" | "cookie" = "local"): void {
    switch (storage) {
      case "local":
        localStorage.setItem(key, value)
        break
      case "session":
        sessionStorage.setItem(key, value)
        break
      case "cookie":
        this.setCookie(key, value)
        break
    }
  }

  /**
   * Checks if a key exists in the specified storage.
   * @param {string} key - The key to check for.
   * @param {'local' | 'session' | 'cookie'} [storage='local'] - The type of storage to check in.
   * @returns {boolean} - True if the key exists, false otherwise.
   */
  static keyExistsInStorage(key: string, storage: "local" | "session" | "cookie" = "local"): boolean {
    switch (storage) {
      case "local":
        return localStorage.getItem(key) !== null
      case "session":
        return sessionStorage.getItem(key) !== null
      case "cookie":
        return this.getCookie(key) !== null
      default:
        return false
    }
  }

  /**
   * Deletes a key from the specified storage.
   * @param {string} key - The key to delete.
   * @param {'local' | 'session' | 'cookie'} [storage='local'] - The type of storage to delete from.
   */
  static deleteKeyFromStorage(key: string, storage: "local" | "session" | "cookie" = "local"): void {
    switch (storage) {
      case "local":
        localStorage.removeItem(key)
        break
      case "session":
        sessionStorage.removeItem(key)
        break
      case "cookie":
        this.deleteCookie(key)
        break
    }
  }

  /**
   * Clears all keys from the specified storage.
   * @param {'local' | 'session' | 'cookie'} [storage='local'] - The type of storage to clear.
   */
  static clearStorage(storage: "local" | "session" | "cookie" = "local"): void {
    switch (storage) {
      case "local":
        localStorage.clear()
        break
      case "session":
        sessionStorage.clear()
        break
      case "cookie":
        this.clearCookies()
        break
    }
  }
}

export default BrowserApiUtils
