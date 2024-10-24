import { UseCaseRequest } from '../../types'

export interface MiddlewareRequests {
    rawRequest: any
    request: UseCaseRequest
}
export interface Middleware {
    process(requests: MiddlewareRequests, session: {}): Promise<void>
}
