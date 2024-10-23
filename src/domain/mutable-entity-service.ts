import { EntityService } from './entity-service'
import { MutableEntity } from './mutable-entity'
import { Repository } from './repository'

export abstract class MutableEntityService<
    T extends MutableEntity = MutableEntity,
    R extends Repository<T> = Repository<T>,
> extends EntityService<T, R> {
    async update(entity: T): Promise<T> {
        if (!entity.isValidToUpdate()) return entity

        const updatedEntity = await this.updateEntity(entity)

        if (!updatedEntity) return entity

        return updatedEntity
    }

    async updateEntity(entity: T): Promise<T | null> {
        if (!this.repository.update) {
            throw new Error('Repository.update must be set')
        }

        const updatedEntity = await this.repository.update(entity.getUpdateCriteria(), entity.getDataToUpdate())

        return updatedEntity || null
    }
}
