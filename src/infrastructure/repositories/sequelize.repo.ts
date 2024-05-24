import { Model } from '../../domain/model'
import { CommonID } from '../../types'
import { SequelizeModelWrapper } from '../wrappers/sequelize-model.wrapper'

export abstract class SequelizeRepository<T, M extends Model<{}>> {
    protected abstract get sequelizeModelWrapper(): SequelizeModelWrapper<T>

    protected abstract modelCreator(props: T): M

    async create(props: Omit<T, 'id'>): Promise<M> {
        const entity = await this.sequelizeModelWrapper.create(props)
        return this.modelCreator(entity)
    }

    async getBy(props: Partial<T>): Promise<M | null> {
        const entity = await this.sequelizeModelWrapper.findOne(props)
        return entity && this.modelCreator(entity)
    }

    async update(id: CommonID, dataToUpdate: Record<string, any>): Promise<M | null> {
        const entity = await this.sequelizeModelWrapper.update(id, dataToUpdate)
        return entity && this.modelCreator(entity)
    }
}
