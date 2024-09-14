import { Session } from '../../domain'
import { CommonRequest, HandlerDependencies } from '../../types'
import { ErrorInterceptor } from './interceptor'
import { Middleware } from './middleware'
import { InternalError, ResponseError } from '../responses-usecase'
import { UseCase } from '../usecase'
import { RequestAdapter } from './request-adapter'
import { BaseClass, Dependency } from '../../shared'

export class Handler extends BaseClass<HandlerDependencies> {
    @Dependency
    private declare readonly useCase: UseCase<Session, CommonRequest>
    @Dependency
    private declare readonly session: Session
    @Dependency
    private declare readonly errorInterceptor: ErrorInterceptor
    @Dependency
    private declare readonly requestAdapter: RequestAdapter
    @Dependency
    private declare middlewares: Middleware[]

    addMiddlewares(middlewares: Middleware[] = []): this {
        this.middlewares = [...this.middlewares, ...middlewares]
        return this
    }

    async process(rawRequest: any): Promise<any> {
        try {
            const request = this.requestAdapter.parseRequest(rawRequest)

            this.useCase.setSession(this.session)

            this.useCase.setRequest(request)

            await this.processMiddlewares(rawRequest, request)

            const useCaseResponse = await this.useCase.process()

            return this.requestAdapter.parseResponse(useCaseResponse)
        } catch (error) {
            return await this.handleError(error as Error)
        }
    }

    private async processMiddlewares(rawRequest: any, request: CommonRequest) {
        const middlewares = [...this.middlewares]

        for (const middleware of middlewares) {
            if (this.useCase.public && !middleware.public) continue
            await middleware.process(rawRequest, request, this.useCase)
        }
    }

    async handleError(error: Error) {
        await this.errorInterceptor.catch(error)

        if (error instanceof ResponseError) {
            return error
        }

        return new InternalError()
    }
}
