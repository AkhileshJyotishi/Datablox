class DeviceUtils {
  /**
   * Check if the device is a mobile device
   * @returns boolean
   * @example
   * ```ts
   * DeviceUtils.isMobileDevice()
   * ```
   */
  static isMobileDevice() {
    if (typeof window === "undefined") {
      return false
    }

    // return true
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
  }
}

export default DeviceUtils
