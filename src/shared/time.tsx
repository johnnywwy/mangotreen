/* example

    const time = time()
    time.format('YYYY-MM-DD HH:mm:ss SSS')
    time.format('YYYY-MM-DD')
    time.firstDayOfMonth() // 本月第一天
    time.lastDayOfMonth()  // 本月最后一天

    time.firstDayOfYear() // 上个年第一天
    time.lastDayOfYear()  // 上个年最后一天

    time.add(1, 'month')
    time.subtract(1, 'month')

*/

export class Time {
    date: Date
    constructor(date?: string | Date) {
        // this.date = date
        if (date === undefined) {
            this.date = new Date()
        } else if (typeof date === 'string') {
            this.date = new Date(date)
        } else {
            this.date = date
        }
    }

    format(pattern = 'YYYY-MM-DD HH:mm:ss') {
        // 目前支持的格式有 YYYY MM DD HH mm ss SSS
        const year = this.date.getFullYear()
        const month = this.date.getMonth() + 1
        const day = this.date.getDate()
        const hour = this.date.getHours()
        const minute = this.date.getMinutes()
        const second = this.date.getSeconds()
        const msecond = this.date.getMilliseconds()
        return pattern.replace(/YYYY/g, year.toString())
            .replace(/MM/, month.toString().padStart(2, '0'))
            .replace(/DD/, day.toString().padStart(2, '0'))
            .replace(/HH/, hour.toString().padStart(2, '0'))
            .replace(/mm/, minute.toString().padStart(2, '0'))
            .replace(/ss/, second.toString().padStart(2, '0'))
            .replace(/SSS/, msecond.toString().padStart(3, '0'))
    }
    firstDayOfMonth() {
        return new Time(new Date(this.date.getFullYear(), this.date.getMonth(), 1, 0, 0, 0))
    }

    lastDayOfMonth() {
        return new Time(new Date(this.date.getFullYear(), this.date.getMonth() + 1, 0, 0, 0, 0))
    }

    firstDayOfYear() {
        return new Time(new Date(this.date.getFullYear(), 0, 1, 0, 0, 0))
    }

    lastDayOfYear() {
        return new Time(new Date(this.date.getFullYear() + 1, 0, 0, 0, 0, 0))
    }
    getRaw() {
        return this.date
    }
    add(number: number, unit: 'year' | 'month' | 'day' | 'hour' | 'minute' | 'second' | 'millisecond') {
        // return new time but not change this.time
        const date = new Date(this.date.getTime())
        switch (unit) {
            case 'year':
                date.setFullYear(date.getFullYear() + number)
                break
            case 'month':
                const d = date.getDate() // 1.31
                date.setDate(1) // 1.1
                date.setMonth(date.getMonth() + number) //2.1
                const d2 = new Date(date.getFullYear(), date.getMonth() + 1, 0, 0, 0, 0).getDate()
                date.setDate(Math.min(d, d2))
                break
            case 'day':
                date.setDate(date.getDate() + number)
                break
            case 'hour':
                date.setHours(date.getHours() + number)
                break
            case 'minute':
                date.setMinutes(date.getMinutes() + number)
                break
            case 'second':
                date.setSeconds(date.getSeconds() + number)
                break
            case 'millisecond':
                date.setMilliseconds(date.getMilliseconds() + number)
                break
            default:
                throw new Error('unit is not supported')
        }
        return new Time(date)
    }


}


