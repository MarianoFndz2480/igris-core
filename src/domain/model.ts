import { getDifferences } from '../utils'

export interface PublicModel<T> {
    getPublicData(): T
}

export class Model<Data extends object> {
    declare data: Data
    protected declare oldData: Data
}

export class MutableModel<Data extends object, DataToUpdate extends object> extends Model<Data> {
    getDataToUpdate(): Partial<this['data']> {
        return getDifferences(this.oldData, this.data)
    }

    isValidToUpdate(): boolean {
        const dataToUpdate = this.getDataToUpdate()
        return !!Object.keys(dataToUpdate).length
    }

    update(props: DataToUpdate) {
        this.data = { ...this.data, ...(props || {}) }
    }
}
