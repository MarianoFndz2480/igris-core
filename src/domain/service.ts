import { Session } from './session'
import { Entity, MutableEntity } from './entity'
import { NotFoundError } from '../application'

export abstract class Service {
    protected declare session: Session

    injectSession(session: Session) {
        this.session = session
    }

    getServiceName() {
        return this.constructor.name.split('Service')[0]
    }
}

export abstract class EntityService<T extends Entity> extends Service {
    async update(entity: T): Promise<T> {
        if (!(entity instanceof MutableEntity)) return entity

        if (!entity.isValidToUpdate()) return entity

        const updatedEntity = await this.updateEntity(entity)

        if (!updatedEntity) throw new NotFoundError(this.constructor.name.split('Service')[0])

        return updatedEntity
    }

    async updateEntity(entity: T): Promise<T | null> {
        return entity
    }
}
