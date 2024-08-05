export interface BaseClassClassConstructor {
    new (...args: any[]): any
    _dependencies?: [string, any][]
}

export function Dependency(target: any, propertyKey: string) {
    const constructor = target.constructor as BaseClassClassConstructor

    if (!constructor._dependencies) {
        constructor._dependencies = []
    }

    constructor._dependencies.push([propertyKey, target[propertyKey].constructor])
}
