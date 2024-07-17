import { Session } from '../domain'
import { EventAdapter } from './event-adapter'
import { Handler } from './handler'
import { UseCase } from './usecase'
import { ErrorInterceptor } from './interceptor'
import { Middleware } from './middleware'
import { RequestEvent } from '../types'
import { EventProcessorMiddleware } from './event-processor-middleware'

export class EventProcessor {
    private declare readonly handler: Handler

    constructor(useCase: UseCase<Session, RequestEvent>) {
        const handlerClass = EventProcessor.getHandlerClass()

        this.handler = new handlerClass({
            useCase,
            session: EventProcessor.getSession(),
            errorInterceptor: EventProcessor.getErrorInterceptor(),
        })
    }

    static getHandlerClass(): typeof Handler {
        return Handler
    }

    static getSession() {
        return new Session()
    }

    static getMiddlewares(): EventProcessorMiddleware[] {
        return []
    }

    static getErrorInterceptor(): ErrorInterceptor {
        return new ErrorInterceptor()
    }

    static getEventAdapter(): EventAdapter {
        return new EventAdapter()
    }

    static createInstance(useCase: UseCase<Session, RequestEvent>): EventProcessor {
        return new EventProcessor(useCase)
    }

    async setMiddlewares(middlewares: Middleware[] = []) {
        this.handler.addMiddlewares(middlewares)
    }

    async process(event: any) {
        const eventAdapter = EventProcessor.getEventAdapter()

        const request = eventAdapter.parseRequest(event)

        await this.processMiddlewares(event, request)

        const response = await this.handler.process(request)

        return eventAdapter.parseResponse(response)
    }

    private async processMiddlewares(event: any, request: RequestEvent<{}, {}, {}>) {
        for (const middleware of EventProcessor.getMiddlewares()) {
            await middleware.process(event, request)
        }
    }
}
