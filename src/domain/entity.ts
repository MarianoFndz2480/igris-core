import { PropertiesOnly } from '../types'
import { getDifferences, plainToClassInstance } from '../utils'

export class Entity {
    protected declare originalData: Record<string, any>

    update<T>(props: T) {
        if (!this.originalData) this.originalData = { ...this }
        Object.assign(this, props)
    }

    getChanges(): Partial<this> {
        return getDifferences(this.originalData, this)
    }

    static createInstanceFromPlain<T>(this: new () => T, plainObject: PropertiesOnly<T>): T {
        return plainToClassInstance(this, plainObject as unknown as Partial<T>)
    }
}
