class Web3Utils {
  /**
   * Converts a Uint8Array to a string.
   *
   * @param uInt8Array - The Uint8Array to convert.
   * @returns The converted string.
   */
  static uINT8ToString(uInt8Array: Uint8Array): string {
    const arr = new Uint8Array(uInt8Array)
    const bin = []
    for (let i = 0; i < arr.length; i++) {
      bin.push(String.fromCharCode(arr[i]))
    }
    return btoa(bin.join(""))
  }
}

export default Web3Utils
