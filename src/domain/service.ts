import { Session } from './session'
import { MutableEntity } from './entity'
import { CommonID } from '../types'
import { NotFoundError } from '../application'

export abstract class Service {
    protected declare session: Session

    injectSession(session: Session) {
        this.session = session
    }

    abstract generateId(): CommonID

    get createCommonProps() {
        return {
            ...this.createCommonPropsWithoutUpdatedAt,
            updatedAt: new Date().toISOString(),
        }
    }

    get createCommonPropsWithoutUpdatedAt() {
        return {
            createdAt: new Date().toISOString(),
        }
    }

    getServiceName() {
        return this.constructor.name.split('Service')[0]
    }
}

export abstract class MutableService<M extends MutableEntity<{ id: CommonID }, {}>> extends Service {
    async update(entity: M): Promise<M> {
        if (!entity.isValidToUpdate()) return entity

        const updatedEntity = await this.updateEntity(entity)

        if (!updatedEntity) throw new NotFoundError(this.constructor.name.split('Service')[0])

        return updatedEntity
    }

    abstract updateEntity(entity: M): Promise<M | null>
}
