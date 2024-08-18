import { BaseClassClassConstructor } from './base-class.decorators'

export abstract class BaseClass<Dependencies extends Record<string, any> = {}> {
    constructor(dependencies: Dependencies = {} as Dependencies) {
        this.setDependencies(dependencies)
    }

    private setDependencies(dependencies: Dependencies) {
        const constructor = this.constructor as BaseClassClassConstructor
        const constructorDependencies = constructor._dependencies || []

        constructorDependencies.forEach((prop) => {
            if (prop in dependencies) {
                ;(this as any)[prop] = (dependencies as any)[prop]
            }
        })
    }
}
