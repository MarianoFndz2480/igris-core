import { Session } from '../domain'
import { RequestEvent } from '../types'
import { RequestAdapter } from './request-adapter'
import { ErrorInterceptor } from './interceptor'
import { Middleware } from './middleware'
import { InternalError, ResponseError } from './responses-usecase'
import { UseCase } from './usecase'

export class Handler {
    constructor(
        private readonly useCase: UseCase<Session, RequestEvent>,
        private readonly session: Session,
        private readonly middlewares: Middleware[],
        private readonly errorInterceptor: ErrorInterceptor,
        private readonly requestAdapter: RequestAdapter,
    ) {}

    async process(externalRequest: any): Promise<{}> {
        try {
            const request = this.requestAdapter.parseInput(externalRequest)

            await this.useCase.setSession(this.session)

            await this.useCase.setRequest(request)

            await this.processMiddlewares()

            const response = await this.useCase.process()

            return this.requestAdapter.parseResponse(response)
        } catch (error) {
            return await this.handleError(error as Error)
        }
    }

    private async processMiddlewares() {
        const middlewares = [...this.middlewares, ...this.useCase.middlewares]

        for (const middleware of middlewares) {
            await this.processMiddleware(middleware)
        }
    }

    private async processMiddleware(middleware: Middleware) {
        if (this.useCase.public && !middleware.public) return
        await middleware.process(this.useCase)
    }

    async handleError(error: Error) {
        await this.errorInterceptor.catch(error)

        if (error instanceof ResponseError) {
            return this.requestAdapter.parseResponse(error)
        }

        return this.requestAdapter.parseResponse(new InternalError())
    }
}
