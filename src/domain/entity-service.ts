import { ListEntityProps, EntityRepository } from './entity-repository'
import { Service } from './service'
import { EntityProperties } from '../types'
import { Entity } from './entity'

export abstract class EntityService<
    T extends Entity = Entity,
    R extends EntityRepository<T> = EntityRepository<T>,
> extends Service {
    constructor(protected readonly repository: R) {
        super()
    }

    create(props: EntityProperties<T>): Promise<T> {
        if (!this.repository.create) {
            throw new Error('Repository.create must be set')
        }
        return this.repository.create(props)
    }

    getBy(props: EntityProperties<T>, includeEntities = false) {
        if (!this.repository.getBy) {
            throw new Error('Repository.getMany must be set')
        }
        return this.repository.getBy(props, includeEntities)
    }

    async getMany(data: { props: ListEntityProps<T>; pagination?: { page: number; pageSize: number } }): Promise<T[]> {
        if (!this.repository.getMany) {
            throw new Error('Repository.getMany must be set')
        }

        const query = this.buildQuery(data.props)

        this.applyPagination(query, data.pagination)

        return this.repository.getMany(query)
    }

    async getManyAndCountAll(data: {
        props: ListEntityProps<T>
        pagination?: { page: number; pageSize: number }
    }): Promise<{ rows: T[]; count: number; totalPages: number }> {
        if (!this.repository.getManyAndCountAll) {
            throw new Error('Repository.getManyAndCountAll must be set')
        }

        const query = this.buildQuery(data.props)

        this.applyPagination(query, data.pagination)

        const response = await this.repository.getManyAndCountAll(query)

        const totalPages = data.pagination ? Math.ceil(response.count / data.pagination.pageSize) : 1

        return { ...response, totalPages }
    }

    protected buildQuery(props: ListEntityProps<T>): ListEntityProps<T> {
        return { ...props }
    }

    protected applyPagination(query: ListEntityProps<T>, pagination?: { page: number; pageSize: number }): void {
        if (pagination?.page && pagination?.pageSize) {
            query.offset = (pagination.page - 1) * pagination.pageSize
            query.limit = pagination.pageSize
        }
    }

    async update(where: EntityProperties<T>, props: EntityProperties<T>): Promise<boolean> {
        if (!!Object.keys(props).length) return false

        if (!this.repository.update) {
            throw new Error('Repository.update must be set')
        }

        const updatedEntity = await this.repository.update(where, props)

        return !!updatedEntity
    }
}
