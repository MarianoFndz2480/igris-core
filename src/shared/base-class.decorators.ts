export interface BaseClassClassConstructor {
    new (...args: any[]): any
    _dependencies?: string[]
}

export function Dependency(target: any, propertyKey: string) {
    if (!target.constructor._dependencies) {
        target.constructor._dependencies = []
    }
    target.constructor._dependencies.push(propertyKey)
}
