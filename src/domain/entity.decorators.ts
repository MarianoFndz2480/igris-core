export interface ClassConstructor {
    new (...args: any[]): any
    _properties?: string[]
    _entities?: [string, any][]
    _oldData: any
}

export function Property(target: any, propertyKey: string) {
    if (!target.constructor._properties) {
        target.constructor._properties = []
    }
    target.constructor._properties.push(propertyKey)
}

export function AdditionalEntity(target: any, propertyKey: string) {
    const constructor = target.constructor as ClassConstructor

    if (!constructor._entities) {
        constructor._entities = []
    }

    constructor._entities.push([propertyKey, target[propertyKey].constructor])
}

export function AdditionalEntities(elementType: any) {
    return function (target: any, propertyKey: string) {
        const constructor = target.constructor as ClassConstructor

        if (!constructor._entities) {
            constructor._entities = []
        }

        constructor._entities.push([propertyKey, elementType])
    }
}
