import { UseCaseRequest } from '../types'
import { SuccessResponse } from './response'

export interface UseCase {
    process(request: UseCaseRequest, session: {}): Promise<SuccessResponse>
}
