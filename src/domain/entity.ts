import { getDifferences } from '../utils'

export class Entity {
    protected declare originalData: Record<string, any>

    update<T>(props: T) {
        if (!this.originalData) this.originalData = { ...this }
        Object.assign(this, props)
    }

    getChanges(): Partial<this> {
        return getDifferences(this.originalData, this)
    }
}
