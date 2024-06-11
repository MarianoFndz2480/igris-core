import { Session } from '../domain'
import { EventAdapter } from './event-adapter'
import { Handler } from './handler'
import { UseCase } from './usecase'
import { ErrorInterceptor } from './interceptor'
import { Middleware } from './middleware'
import { RequestEvent } from '../types'

export class EventProcessor {
    private declare readonly errorInterceptor: ErrorInterceptor
    private declare readonly middlewares: Middleware[]
    private declare readonly session: () => Session
    private declare readonly handler: Handler

    constructor(useCase: UseCase<Session, RequestEvent>, middlewares: Middleware[] = []) {
        this.handler = new Handler({
            useCase: useCase,
            session: this.session(),
            middlewares: [...this.middlewares, ...middlewares],
            errorInterceptor: this.errorInterceptor,
        })
    }

    getSession() {
        return new Session()
    }

    getMiddlewares(): Middleware[] {
        return []
    }

    getErrorInterceptor(): ErrorInterceptor {
        return new ErrorInterceptor()
    }

    getEventAdapter(): EventAdapter {
        throw new Error('Module.getEventAdapterMethod must be override')
    }

    async init(): Promise<this> {
        return this
    }

    static createHandler(useCase: UseCase<Session, RequestEvent>, middlewares: Middleware[] = []): EventProcessor {
        return new EventProcessor(useCase, middlewares)
    }

    async process(event: any) {
        await this.init()

        const eventAdapter = this.getEventAdapter()

        const request = eventAdapter.parseRequest(event)

        const response = await this.handler.process(request)

        return eventAdapter.parseResponse(response)
    }
}
