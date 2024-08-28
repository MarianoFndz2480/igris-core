import { Session } from '../domain'
import { Handler } from './handler'
import { UseCase } from './usecase'
import { Middleware } from './middleware'
import { CommonRequest } from '../types'
import { RequestProcessorConfig } from './request-processor-config'

export class RequestProcessor {
    private declare handler: Handler
    private declare config: RequestProcessorConfig

    constructor(requestProcessorConfig: RequestProcessorConfig) {
        this.config = requestProcessorConfig
    }

    async setMiddlewares(middlewares: Middleware[] = []) {
        if (this.handler) this.handler.addMiddlewares(middlewares)
        return this
    }

    createHandler(useCase: UseCase<Session, CommonRequest>) {
        const handlerClass = this.config.getHandlerClass()

        this.handler = new handlerClass({
            useCase,
            session: this.config.getSession(),
            errorInterceptor: this.config.getErrorInterceptor(),
        })

        return this
    }

    async process(rawRequest: any) {
        const requestAdapter = this.config.getRequestAdapter()

        const request = requestAdapter.parseRequest(rawRequest)

        await this.processMiddlewares(rawRequest, request)

        const response = await this.handler.process(request)

        return requestAdapter.parseResponse(response)
    }

    private async processMiddlewares(rawRequest: any, request: CommonRequest<{}, {}, {}>) {
        for (const middleware of this.config.getMiddlewares()) {
            await middleware.process(rawRequest, request)
        }
    }
}
