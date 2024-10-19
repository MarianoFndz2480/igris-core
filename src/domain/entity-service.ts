import { ListEntityProps, Repository } from './repository'
import { Session } from './session'
import { Entity } from './entity'
import { Service } from './service'
import { FirstParameter } from '../types'
import { MutableEntity } from './mutable-entity'

export abstract class EntityService<
    AppSession extends Session,
    T extends Entity,
    R extends Repository<T>,
    CreationProps extends Record<keyof T, any>,
> extends Service<T> {
    protected declare readonly repository: R
    protected declare readonly public: boolean
    protected declare session: AppSession

    constructor(repository: R) {
        super()
        this.repository = repository
    }

    injectSession(session: AppSession): void {
        this.session = session
    }

    async create(props: CreationProps): Promise<T> {
        return this.repository.create(props)
    }

    async getMany(data: {
        props: FirstParameter<R['getMany']>
        pagination?: { page: number; pageSize: number }
    }): Promise<T[]> {
        const query = this.buildQuery(data.props)
        this.applyPagination(query, data.pagination)
        return this.repository.getMany(query)
    }

    async getManyAndCountAll(data: {
        props: FirstParameter<R['getMany']>
        pagination?: { page: number; pageSize: number }
    }): Promise<{ rows: T[]; count: number; totalPages: number }> {
        const query = this.buildQuery(data.props)

        this.applyPagination(query, data.pagination)

        if (!this.repository.getManyAndCountAll) {
            throw new Error('Repository.getManyAndCountAll must be set')
        }

        const response = await this.repository.getManyAndCountAll(query)

        const totalPages = data.pagination ? Math.ceil(response.count / data.pagination.pageSize) : 1

        return { ...response, totalPages }
    }

    protected buildQuery(props: FirstParameter<R['getMany']>): ListEntityProps<T> {
        return { ...props }
    }

    protected applyPagination(query: ListEntityProps<T>, pagination?: { page: number; pageSize: number }): void {
        if (pagination?.page && pagination?.pageSize) {
            query.offset = (pagination.page - 1) * pagination.pageSize
            query.limit = pagination.pageSize
        }
    }

    async update<M extends MutableEntity<{}, {}, {}>>(entity: M): Promise<M> {
        if (!(entity instanceof MutableEntity)) return entity

        if (!entity.isValidToUpdate()) return entity

        const updatedEntity = await this.updateEntity(entity)

        if (!updatedEntity) return entity

        return updatedEntity
    }

    async updateEntity<M extends MutableEntity<{}, {}, {}>>(entity: M): Promise<M | null> {
        if (!(entity instanceof MutableEntity)) return null

        if (!this.repository.update) {
            throw new Error('Repository.update must be set')
        }

        const updatedEntity = (await this.repository.update(
            entity.getUpdateCriteria(),
            entity.getDataToUpdate(),
        )) as unknown as M

        return updatedEntity || null
    }
}
