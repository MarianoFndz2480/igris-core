import { BaseClass } from '../shared/base-class'
import { AdditionalEntitiesTypes } from '../types'
import { EntityClassConstructor } from './entity-decorators'

export class Entity<Data extends object = {}, Entities extends AdditionalEntitiesTypes = {}> extends BaseClass<{
    data: Data
    entities?: Entities
}> {
    constructor(dependencies: { data: Data; entities?: Entities }) {
        super(dependencies)
        this.setData(dependencies.data)
        this.setOldData()
        if (dependencies.entities) this.setEntities(dependencies.entities)
    }

    setData(data: Data) {
        const constructor = this.constructor as EntityClassConstructor
        const constructorProperties = constructor._properties || []

        constructorProperties.forEach((prop) => {
            if (prop in data) {
                ;(this as any)[prop] = (data as any)[prop]
            }
        })
    }

    setOldData() {
        const constructor = this.constructor as EntityClassConstructor
        constructor._oldData = { ...this }
    }

    getOldData(): Data {
        const constructor = this.constructor as EntityClassConstructor
        return { ...constructor._oldData } as Data
    }

    setEntities(entities: Entities) {
        const constructor = this.constructor as EntityClassConstructor
        const constructorEntities = constructor._entities || []

        constructorEntities.forEach((prop) => {
            if (prop in entities) {
                ;(this as any)[prop] = (entities as any)[prop]
            }
        })
    }

    getPublicData(): any {
        return {}
    }
}
