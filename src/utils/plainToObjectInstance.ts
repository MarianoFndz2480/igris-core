export function plainToClassInstance<T>(cls: new () => T, plainObject: Partial<T>): T {
    const instance = new cls()
    ;(Object.keys(plainObject) as Array<keyof T>).forEach((key) => {
        if (plainObject[key] !== undefined) {
            instance[key] = plainObject[key] as T[keyof T]
        }
    })
    return instance
}
