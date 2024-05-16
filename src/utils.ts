export const formatTimeSpend = (timeSpendInMs: number) => {
    const timeSpendInSeconds = Math.floor(timeSpendInMs / 1000)
    if (timeSpendInSeconds === 0) return "Not started"
    if (timeSpendInSeconds < 60) return "Less than a minute"
    if (timeSpendInSeconds === 60) return "1 minute"

    const minutes = Math.floor(timeSpendInSeconds / 60)
    const seconds = timeSpendInSeconds % 60
    if (minutes < 60) return `${minutes}m ${seconds}s`

    const hours = Math.floor(minutes / 60)
    const minutesLeft = minutes % 60
    return `${hours}h ${minutesLeft}m ${seconds}s`
}
