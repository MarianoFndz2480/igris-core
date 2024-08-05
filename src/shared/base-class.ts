import { BaseClassClassConstructor } from './base-class.decorators'

export abstract class BaseClass<Dependencies extends Record<string, any> = {}> {
    constructor(dependencies: Dependencies = {} as Dependencies) {
        this.setDependencies(dependencies)
    }

    private setDependencies(dependencies: Dependencies) {
        const constructor = this.constructor as BaseClassClassConstructor
        const constructorDependencies = constructor._dependencies || []

        const dependenciesValues = Object.values(dependencies)

        constructorDependencies.forEach(([prop, dependencyClass]) => {
            const dependencyToSave = dependenciesValues.find((dependency) => dependency instanceof dependencyClass)
            if (dependencyToSave) {
                ;(this as any)[prop] = dependencyToSave
            }
        })
    }
}
