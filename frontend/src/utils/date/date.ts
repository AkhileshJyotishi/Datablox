export interface IDateUtils {
  staticformatDate(date: Date, format: string): string
  parseDate(dateString: string): Date
  differenceInDays(date1: Date, date2: Date): number
  isPast(date: Date): boolean
  isFuture(date: Date): boolean
  addDays(date: Date, days: number): Date
  startOfDay(date: Date): Date
  endOfDay(date: Date): Date
  now(): Date
  toISOString(date: Date): string
  isSameDay(date1: Date, date2: Date): boolean
  getDaysInMonth(month: number, year: number): number
  getMonthName(month: number): string
  getDayOfWeek(date: Date): number
  getDayName(date: Date): string
  getCurrentTime(): string
  getUTCDate(date: Date): Date

  // Operations
  addMinutes(date: string, minutes: number): Date

  getTimeFromDate(date: Date): string
}

class DateUtils {
  /**
   * Format a date object to a string with a given format.
   * @param date - Date object to format.
   * @param format - Format string (e.g. "YYYY-MM-DD HH:mm:ss").
   * @returns Formatted date string.
   */
  static formatDate(date: Date, format: string): string {
    const pad = (n: number) => (n < 10 ? "0" + n : n)
    return format
      .replace(/YYYY/, date.getFullYear().toString())
      .replace(/MM/, pad(Number(date.getMonth()) + 1).toString())
      .replace(/DD/, pad(Number(date.getDate())).toString())
      .replace(/HH/, pad(Number(date.getHours())).toString())
      .replace(/mm/, pad(Number(date.getMinutes())).toString())
      .replace(/ss/, pad(Number(date.getSeconds())).toString())
  }

  /**
   * Parse a date string to a Date object.
   * @param dateString - Date string to parse.
   * @returns Parsed Date object.
   */
  static parseDate(dateString: string): Date {
    return new Date(dateString)
  }

  /**
   * Get the difference between two dates in days.
   * @param date1 - First date.
   * @param date2 - Second date.
   * @returns Difference in days.
   */
  static differenceInDays(date1: Date, date2: Date): number {
    const timeDiff = Math.abs(date2.getTime() - date1.getTime())
    return Math.ceil(timeDiff / (1000 * 3600 * 24))
  }

  /**
   * Check if a date is in the past.
   * @param date - Date to check.
   * @returns True if the date is in the past, false otherwise.
   */
  static isPast(date: Date): boolean {
    return date.getTime() < new Date().getTime()
  }

  /**
   * Check if a date is in the future.
   * @param date - Date to check.
   * @returns True if the date is in the future, false otherwise.
   */
  static isFuture(date: Date): boolean {
    return date.getTime() > new Date().getTime()
  }

  /**
   * Add days to a date.
   * @param date - Date to add days to.
   * @param days - Number of days to add.
   * @returns New date with added days.
   */
  static addDays(date: Date, days: number): Date {
    const result = new Date(date)
    result.setDate(result.getDate() + days)
    return result
  }

  /**
   * Get the start of the day for a given date.
   * @param date - Date to get the start of the day.
   * @returns Date object representing the start of the day.
   */
  static startOfDay(date: Date): Date {
    const result = new Date(date)
    result.setHours(0, 0, 0, 0)
    return result
  }

  /**
   * Get the end of the day for a given date.
   * @param date - Date to get the end of the day.
   * @returns Date object representing the end of the day.
   */
  static endOfDay(date: Date): Date {
    const result = new Date(date)
    result.setHours(23, 59, 59, 999)
    return result
  }

  /**
   * Get the current date and time.
   * @returns Current date and time as a Date object.
   */
  static now(): Date {
    return new Date()
  }

  /**
   * Convert a date to ISO string.
   * @param date - Date to convert.
   * @returns ISO string representation of the date.
   */
  static toISOString(date: Date): string {
    return date.toISOString()
  }

  /**
   * Check if two dates are the same day.
   * @param date1 - First date.
   * @param date2 - Second date.
   * @returns True if the dates are the same day, false otherwise.
   */
  static isSameDay(date1: Date, date2: Date): boolean {
    return (
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate()
    )
  }

  /**
   * Get the number of days in a month for a given year.
   * @param month - Month (0-11).
   * @param year - Year.
   * @returns Number of days in the month.
   */
  static getDaysInMonth(month: number, year: number): number {
    return new Date(year, month + 1, 0).getDate()
  }

  /**
   * Get the name of the month.
   * @param month - Month (0-11).
   * @returns Name of the month.
   */
  static getMonthName(month: number): string {
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ]
    return monthNames[month]
  }

  /**
   * Get the day of the week for a given date.
   * @param date - Date to get the day of the week.
   * @returns Day of the week (0-6, where 0 is Sunday).
   */
  static getDayOfWeek(date: Date): number {
    return date.getDay()
  }

  /**
   * Get the name of the day of the week for a given date.
   * @param date - Date to get the name of the day of the week.
   * @returns Name of the day of the week.
   */
  static getDayName(date: Date): string {
    const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
    return dayNames[date.getDay()]
  }

  /**
   * Get the current time
   * @returns Current time as a string in the format "HH:mm:ss"
   */
  static getCurrentTime(): string {
    const date = new Date()
    return `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
  }

  /**
   * Get the UTC date from a date.
   * @param date - Date to get the UTC date from.
   * @returns UTC date.
   */
  static getUTCDate(date: Date): Date {
    return new Date(
      Date.UTC(
        date.getFullYear(),
        date.getMonth(),
        date.getDate(),
        date.getHours(),
        date.getMinutes(),
        date.getSeconds()
      )
    )
  }

  /**
   * Add minutes to a date.
   * @param date - Date to add minutes to.
   * @param minutes - Number of minutes to add.
   * @returns New date with added minutes.
   */
  static addMinutes(date: string, minutes: number): Date {
    const result = new Date(date)
    result.setMinutes(result.getMinutes() + minutes)
    return result
  }

  /**
   * Get the time from a date.
   * @param date - Date to get the time from.
   * @returns Time as a string in the format "HH:mm:ss".
   */
  static getTimeFromDate(date: Date): string {
    return `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
  }
}

export default DateUtils
