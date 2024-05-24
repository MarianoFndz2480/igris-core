export const floatToInteger = (num: number): number => {
    const numberAsText = num.toString()
    const splitNumber = numberAsText.split('.')
    return Number(splitNumber[0])
}
