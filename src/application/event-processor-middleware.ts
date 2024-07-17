import { RequestEvent } from '../types'

export abstract class EventProcessorMiddleware {
    abstract process(event: any, request: RequestEvent<{}, {}, {}>): Promise<void>
}
