class Web3DecimalUtils {
  /**
   * Insert a decimal point into string of digits at a specified index.
   */
  static insertDecimal(value: string, decimalIndex: number): string {
    if (value.length <= decimalIndex) {
      return `0.${"0".repeat(decimalIndex - value.length)}${value}`
    }
    return `${value.slice(0, -decimalIndex)}.${value.slice(-decimalIndex)}`
  }
}

export default Web3DecimalUtils
