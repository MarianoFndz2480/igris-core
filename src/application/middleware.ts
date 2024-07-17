import { Session } from '../domain'
import { CommonRequest } from '../types'
import { UseCase } from './usecase'

export abstract class Middleware {
    declare public: boolean
    abstract process(useCase: UseCase<Session, CommonRequest>): Promise<void>
}
