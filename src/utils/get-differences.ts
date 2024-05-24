export const getDifferences = <T extends object>(obj1: T, obj2: T): Partial<T> => {
    const diffs: Record<string, any> = {}
    for (const key in obj1) {
        if (obj1.hasOwnProperty(key) && obj2.hasOwnProperty(key)) {
            if (obj1[key] !== obj2[key]) {
                diffs[key] = obj2[key]
            }
        }
    }
    return diffs as Partial<T>
}
