import { CommonID, SortEnum } from '../types'

export interface Repository<Props, Model> {
    getBy(props: Partial<Props>): Promise<Model | null>
    create(props: Omit<Props, 'id'>): Promise<Model>
    update(id: CommonID, dataToUpdate: Partial<Props>): Promise<Model | null>
    getMany(props: ListEntityProps<Props>): Promise<Model[]>
}

export type ListEntityProps<T> = {
    where?: Partial<T>
    filters?: CommonFilters
    sort?: CommonSort
}

export type CommonSort = { createdAt?: SortEnum; updatedAt?: SortEnum; name?: SortEnum }
export type CommonFilters = { search?: string; ids?: CommonID[] }
