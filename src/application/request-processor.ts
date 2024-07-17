import { Session } from '../domain'
import { RequestAdapter } from './request-adapter'
import { Handler } from './handler'
import { UseCase } from './usecase'
import { ErrorInterceptor } from './interceptor'
import { Middleware } from './middleware'
import { CommonRequest } from '../types'
import { RequestProcessorMiddleware } from './request-processor-middleware'

export class RequestProcessor {
    private declare readonly handler: Handler

    constructor(useCase: UseCase<Session, CommonRequest>) {
        const handlerClass = RequestProcessor.getHandlerClass()

        this.handler = new handlerClass({
            useCase,
            session: RequestProcessor.getSession(),
            errorInterceptor: RequestProcessor.getErrorInterceptor(),
        })
    }

    static getHandlerClass(): typeof Handler {
        return Handler
    }

    static getSession() {
        return new Session()
    }

    static getMiddlewares(): RequestProcessorMiddleware[] {
        return []
    }

    static getErrorInterceptor(): ErrorInterceptor {
        return new ErrorInterceptor()
    }

    static getRequestAdapter(): RequestAdapter {
        return new RequestAdapter()
    }

    static createInstance(useCase: UseCase<Session, CommonRequest>): RequestProcessor {
        return new RequestProcessor(useCase)
    }

    async setMiddlewares(middlewares: Middleware[] = []) {
        this.handler.addMiddlewares(middlewares)
    }

    async process(rawRequest: any) {
        const requestAdapter = RequestProcessor.getRequestAdapter()

        const request = requestAdapter.parseRequest(rawRequest)

        await this.processMiddlewares(rawRequest, request)

        const response = await this.handler.process(request)

        return requestAdapter.parseResponse(response)
    }

    private async processMiddlewares(rawRequest: any, request: CommonRequest<{}, {}, {}>) {
        for (const middleware of RequestProcessor.getMiddlewares()) {
            await middleware.process(rawRequest, request)
        }
    }
}
