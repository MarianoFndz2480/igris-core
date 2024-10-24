import { EntityProperties, SortEnum } from '../types'
import { Entity } from './entity'

export interface EntityRepository<T extends Entity = Entity> {
    getBy?(props: EntityProperties<T>): Promise<T | null>
    create?(props: EntityProperties<T>): Promise<T>
    update?(where: EntityProperties<T>, dataToUpdate: EntityProperties<T>): Promise<T | null>
    getMany?(props: ListEntityProps<T>): Promise<T[]>
    getManyAndCountAll?(props: ListEntityProps<T>): Promise<{ rows: T[]; count: number }>
}

export type ListEntityProps<T> = {
    where?: EntityProperties<T>
    filters?: CommonFilters
    sort?: CommonSort
    includeEntities?: boolean
    limit?: number
    offset?: number
}

export type CommonSort = { createdAt?: SortEnum; updatedAt?: SortEnum }
export type CommonFilters = { search?: string }
