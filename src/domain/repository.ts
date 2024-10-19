import { NonFunctionAndRequiredKeys, SortEnum } from '../types'
import { Entity } from './entity'

export interface Repository<T extends Entity = Entity> {
    getBy(props: Partial<{ [K in NonFunctionAndRequiredKeys<T>]: T[K] }>): Promise<T | null>
    create(props: Partial<{ [K in NonFunctionAndRequiredKeys<T>]: T[K] }>): Promise<T>
    update?(
        where: Partial<{ [K in NonFunctionAndRequiredKeys<T>]: T[K] }>,
        dataToUpdate: Partial<{ [K in NonFunctionAndRequiredKeys<T>]: T[K] }>,
    ): Promise<T | null>
    getMany(props: ListEntityProps<T>): Promise<T[]>
    getManyAndCountAll?(props: ListEntityProps<T>): Promise<{ rows: T[]; count: number }>
}

export type ListEntityProps<T> = {
    where?: Partial<{ [K in NonFunctionAndRequiredKeys<T>]: T[K] }>
    filters?: CommonFilters
    sort?: CommonSort
    includeEntities?: boolean
    limit?: number
    offset?: number
}

export type CommonSort = { createdAt?: SortEnum; updatedAt?: SortEnum }
export type CommonFilters = { search?: string }
