export interface UseCaseClassConstructor {
    new (...args: any[]): any
    _dependencies?: [string, any][]
}

export const Public = () => {
    return function <T extends { new (...args: any[]): object }>(constructor: T) {
        return class extends constructor {
            public = true
        }
    }
}

export function Dependency(target: any, propertyKey: string) {
    const constructor = target.constructor as UseCaseClassConstructor

    if (!constructor._dependencies) {
        constructor._dependencies = []
    }

    constructor._dependencies.push([propertyKey, target[propertyKey].constructor])
}
