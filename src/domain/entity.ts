import { getDifferences } from '../utils'
import { ClassConstructor } from './entity.decorators'

export class Entity<Data extends object = {}, Entities extends Record<string, Entity<{}, {}>> = {}> {
    constructor(data: Data, entities?: Entities) {
        this.setData(data)
        this.setOldData()
        if (entities) this.setEntities(entities)
    }

    setData(data: Data) {
        const constructor = this.constructor as ClassConstructor
        const constructorProperties = constructor._properties || []

        constructorProperties.forEach((prop) => {
            if (prop in data) {
                ;(this as any)[prop] = (data as any)[prop]
            }
        })
    }

    setOldData() {
        const constructor = this.constructor as ClassConstructor
        constructor._oldData = { ...this }
    }

    getOldData(): Data {
        const constructor = this.constructor as ClassConstructor
        return { ...constructor._oldData } as Data
    }

    setEntities(entities: Entities) {
        const constructor = this.constructor as ClassConstructor
        const constructorEntities = constructor._entities || []

        const entitiesArray = Object.values(entities)

        constructorEntities.forEach(([prop, entityClass]) => {
            const entityInstance = entitiesArray.find((entity) => entity instanceof entityClass)
            if (entityInstance) {
                ;(this as any)[prop] = entityInstance
            }
        })
    }
}

export class MutableEntity<
    Data extends object,
    DataToUpdate extends object,
    Entities extends Record<string, Entity<{}, {}>> = {},
> extends Entity<Data, Entities> {
    getDataToUpdate() {
        const constructor = this.constructor as ClassConstructor
        return getDifferences(constructor._oldData, { ...this })
    }

    isValidToUpdate(): boolean {
        const dataToUpdate = this.getDataToUpdate()
        return !!Object.keys(dataToUpdate).length
    }

    update(props: DataToUpdate) {
        Object.keys(props).forEach((prop) => ((this as any)[prop] = (props as any)[prop]))
    }
}

export interface PublicEntity<T> {
    getPublicData(): T
}
