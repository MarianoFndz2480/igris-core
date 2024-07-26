import { Session } from './session'
import { MutableModel } from './model'
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

export abstract class MutableService<M extends MutableModel<{ id: CommonID }, {}>> extends Service {
    async update(model: M): Promise<M> {
        if (!model.isValidToUpdate()) return model

        const updatedModel = await this.updateModel(model)

        if (!updatedModel) throw new NotFoundError(this.constructor.name.split('Service')[0])

        return updatedModel
    }

    abstract updateModel(model: M): Promise<M | null>
}
