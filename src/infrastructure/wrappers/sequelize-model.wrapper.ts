import { FindOptions, IncludeOptions, Model, ModelStatic, Optional, WhereOptions } from 'sequelize'
import { CommonID } from '../../types'

export class SequelizeModelWrapper<T> {
    constructor(private readonly model: ModelStatic<Model>) {}

    async create(data: object) {
        const entity = await this.model.create(data as Optional<any, string>)
        return this.formatEntity(entity) as T
    }

    async createMany(data: object[]) {
        const entity = await this.model.bulkCreate(data as Optional<any, string>[])
        return this.formatEntityList(entity) as T[]
    }

    async findOne(props: object, options?: { include?: IncludeOptions[] }) {
        const entity = await this.model.findOne({
            where: props as WhereOptions<any>,
            ...(options?.include && { include: options.include }),
        })

        if (!entity) return null

        return this.formatEntity(entity) as T
    }

    async findAll({ where, include, order }: FindOptions) {
        const query: FindOptions = { order: order || [['createdAt', 'DESC']] }

        if (where) query.where = where

        if (include) query.include = include

        const entities = await this.model.findAll(query)

        if (!entities) return []

        return entities.map((entity) => this.formatEntity(entity) as T)
    }

    async update(id: CommonID, props: object) {
        const [affectedCount, affectedRows] = await this.model.update(props, {
            where: {
                id,
            },
            returning: true,
        })

        if (!affectedCount) return null

        return this.formatEntity(affectedRows[0]) as T
    }

    formatEntity(entity: Model) {
        return entity.get({ plain: true })
    }

    formatEntityList(entity: Model[]) {
        return entity.map((value) => value.get({ plain: true }))
    }

    async raw(query: string) {
        const response = await this.model.sequelize?.query(query)
        return response
    }
}
