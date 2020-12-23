export const addLeadingZero = (num: number): string => {
    if (num < 10) {
        return "0" + num
    } else {
        return `${num}`
    }
}
