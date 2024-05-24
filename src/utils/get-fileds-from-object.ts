interface GenericObject {
    [key: string]: any
}

export const getFieldsFromObject = <T extends GenericObject>(
    obj: GenericObject,
    fields: Array<keyof T>,
): T => {
    return fields.reduce((accum, current) => {
        accum[current] = obj[current as keyof GenericObject]
        return accum
    }, {} as T)
}
