export const deleteObjectProperties = <T extends object>(
    obj: T,
    propertiesToDelete: (keyof T)[],
): Omit<T, (typeof propertiesToDelete)[number]> => {
    return Object.keys(obj)
        .filter((key) => !propertiesToDelete.includes(key as keyof T))
        .reduce<Omit<T, (typeof propertiesToDelete)[number]>>(
            (acc, key) => ({ ...acc, [key]: obj[key as keyof T] }),
            {} as Omit<T, (typeof propertiesToDelete)[number]>,
        )
}
