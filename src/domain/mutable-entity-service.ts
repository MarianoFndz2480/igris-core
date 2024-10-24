import { EntityService } from './entity-service'
import { MutableEntity } from './mutable-entity'
import { EntityRepository } from './entity-repository'

export abstract class MutableEntityService<
    T extends MutableEntity = MutableEntity,
    R extends EntityRepository<T> = EntityRepository<T>,
> extends EntityService<T, R> {
    async update(entity: T): Promise<T> {
        if (!entity.isValidToUpdate()) return entity

        const updatedEntity = await this.updateEntity(entity)

        if (!updatedEntity) return entity

        return updatedEntity
    }

    protected async updateEntity(entity: T): Promise<T | null> {
        if (!this.repository.update) {
            throw new Error('Repository.update must be set')
        }

        const updatedEntity = await this.repository.update(entity.getUpdateCriteria(), entity.getDataToUpdate())

        return updatedEntity || null
    }
}
