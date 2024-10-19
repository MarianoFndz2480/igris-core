import { AdditionalEntitiesTypes } from '../types'
import { getDifferences } from '../utils'
import { Entity } from './entity'
import { EntityClassConstructor } from './entity-decorators'

export class MutableEntity<
    Data extends object,
    DataToUpdate extends object,
    Entities extends AdditionalEntitiesTypes = {},
> extends Entity<Data, Entities> {
    getDataToUpdate() {
        const constructor = this.constructor as EntityClassConstructor
        return getDifferences(constructor._oldData, { ...this })
    }

    isValidToUpdate(): boolean {
        const dataToUpdate = this.getDataToUpdate()
        return !!Object.keys(dataToUpdate).length
    }

    update(props: DataToUpdate) {
        Object.keys(props).forEach((prop) => ((this as any)[prop] = (props as any)[prop]))
    }

    getUpdateCriteria(): object {
        return {}
    }
}
