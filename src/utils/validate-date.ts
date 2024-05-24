export const validateDate = (originalValue: any) => {
    const parsedDate = Date.parse(originalValue)
    if (isNaN(parsedDate)) return
    return new Date(parsedDate)
}
