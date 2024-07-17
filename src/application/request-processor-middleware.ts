import { CommonRequest } from '../types'

export abstract class RequestProcessorMiddleware {
    abstract process(rawRequest: any, request: CommonRequest<{}, {}, {}>): Promise<void>
}
