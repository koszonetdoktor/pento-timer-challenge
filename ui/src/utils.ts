export const formatTime = (time: number): string => {
    const hour = Math.floor(time / 60 / 60)
    const min = Math.floor(time / 60) - 60 * hour
    const sec = time - min * 60 - hour * 60 * 60

    return `${addLeadingZero(hour)} : ${addLeadingZero(min)} : ${addLeadingZero(
        sec
    )}`
}

const addLeadingZero = (num: number): string => {
    if (num < 10) {
        return "0" + num
    } else {
        return `${num}`
    }
}

export const formatReadableTime = (time: number): string => {
    const hour = Math.floor(time / 60 / 60)
    const min = Math.floor(time / 60) - 60 * hour

    return `${hour !== 0 ? `${hour}h` : ""} ${min}m`
}

export const formatDate = (ts: number): string => {
    return new Date(ts).toDateString()
}
