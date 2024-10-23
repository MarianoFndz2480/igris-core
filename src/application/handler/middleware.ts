import { UseCaseRequest } from '../../types'
import { UseCase } from '../usecase'

export interface Middleware {
    process(rawRequest: any, request: UseCaseRequest, useCase: UseCase): Promise<void>
}
