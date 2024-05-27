import { Repository } from '../repo'
import { Model, MutableModel } from '../model'
import { CommonID } from '../../types'
import { Session } from '../session'
import { NotFoundError } from '../../application'
import { randomUUID } from 'crypto'

export abstract class Service<M extends Model<{}>> {
    protected declare readonly repository: Repository<M['data'], M>
    protected declare session: Session
    protected declare modelIncludeTenant: boolean

    constructor(repository: Repository<M['data'], M>) {
        this.repository = repository
        this.session = new Session()
        this.modelIncludeTenant = true
    }

    injectSession(session: Session) {
        this.session = session
    }

    generateId() {
        return randomUUID()
    }

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

    abstract create(props: Record<keyof M['data'], any>): Promise<M>

    getServiceName() {
        return this.constructor.name.split('Service')[0]
    }
}

export abstract class MutableService<M extends MutableModel<{ id: CommonID }, {}>> extends Service<M> {
    async update(model: M): Promise<M> {
        if (!model.isValidToUpdate()) return model

        const productionPlan = await this.repository.update(
            model.data.id,
            model.getDataToUpdate() as unknown as Partial<M['data']>,
        )

        if (!productionPlan) throw new NotFoundError(this.constructor.name.split('Service')[0])

        return productionPlan
    }
}
