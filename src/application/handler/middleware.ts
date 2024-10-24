import { UseCaseRequest } from '../../types'

export interface MiddlewareProps {
    rawRequest: any
    request: UseCaseRequest
    session: {}
}
export interface Middleware {
    process(props: MiddlewareProps): Promise<void>
}
