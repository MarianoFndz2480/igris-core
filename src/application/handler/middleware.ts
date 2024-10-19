import { Session } from '../../domain'
import { BaseClass } from '../../shared'
import { UseCaseRequest } from '../../types'
import { UseCase } from '../usecase'

export abstract class Middleware<Dependencies extends Record<string, any> = {}> extends BaseClass<Dependencies> {
    declare public: boolean
    abstract process(data: {
        rawRequest: any
        request: UseCaseRequest
        useCase: UseCase<Session, UseCaseRequest>
    }): Promise<void>
}
