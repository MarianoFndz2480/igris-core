import { Session } from '../domain'
import { RequestEvent } from '../types'
import { UseCase } from './usecase'

export abstract class Middleware {
    declare public: boolean
    abstract process(useCase: UseCase<Session, RequestEvent>): Promise<void>
}
