import { Session } from '../domain'
import { CommonRequest } from '../types'
import { BaseClass } from '../shared/base-class'
import { UseCase } from './usecase'

export abstract class Middleware<Dependencies extends Record<string, any> = {}> extends BaseClass<Dependencies> {
    declare public: boolean
    abstract process(useCase: UseCase<Session, CommonRequest>): Promise<void>
}
