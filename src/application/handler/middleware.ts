import { Session } from '../../domain'
import { BaseClass } from '../../shared'
import { CommonRequest } from '../../types'
import { UseCase } from '../usecase'

export abstract class Middleware<Dependencies extends Record<string, any> = {}> extends BaseClass<Dependencies> {
    declare public: boolean
    abstract process(data: {
        rawRequest: any
        request: CommonRequest
        useCase: UseCase<Session, CommonRequest>
    }): Promise<void>
}
