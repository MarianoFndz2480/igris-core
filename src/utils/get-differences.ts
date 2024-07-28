export const getDifferences = (obj1: any, obj2: any) => {
    const diffs = {}
    for (const key in obj1) {
        if (obj1.hasOwnProperty(key) && obj2.hasOwnProperty(key)) {
            if (obj1[key] !== obj2[key]) {
                ;(diffs as any)[key] = obj2[key]
            }
        }
    }
    return diffs
}
