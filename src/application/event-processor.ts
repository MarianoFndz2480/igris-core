import { Session } from '../domain'
import { EventAdapter } from './event-adapter'
import { Handler } from './handler'
import { UseCase } from './usecase'
import { ErrorInterceptor } from './interceptor'
import { Middleware } from './middleware'
import { RequestEvent } from '../types'

export class EventProcessor {
    private declare readonly handler: Handler

    constructor(useCase: UseCase<Session, RequestEvent>) {
        this.handler = new Handler({
            useCase,
            session: EventProcessor.getSession(),
            middlewares: EventProcessor.getMiddlewares(),
            errorInterceptor: EventProcessor.getErrorInterceptor(),
        })
    }

    static getSession() {
        return new Session()
    }

    static getMiddlewares(): Middleware[] {
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

        const response = await this.handler.process(request)

        return eventAdapter.parseResponse(response)
    }
}
