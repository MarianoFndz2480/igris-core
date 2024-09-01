export interface EntityClassConstructor {
    new (...args: any[]): any
    _properties?: string[]
    _entities?: string[]
    _oldData: any
}

export function Property(target: any, propertyKey: string) {
    if (!target.constructor._properties) {
        target.constructor._properties = []
    }
    target.constructor._properties.push(propertyKey)
}

export function AdditionalEntity(target: any, propertyKey: string) {
    const constructor = target.constructor as EntityClassConstructor

    if (!constructor._entities) {
        constructor._entities = []
    }

    constructor._entities.push(propertyKey)
}
