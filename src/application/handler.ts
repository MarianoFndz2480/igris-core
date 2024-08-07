import { Session } from '../domain'
import { CommonRequest } from '../types'
import { ErrorInterceptor } from './interceptor'
import { Middleware } from './middleware'
import { InternalError, ResponseError, ResponseSuccess } from './responses-usecase'
import { UseCase } from './usecase'

export class Handler {
    private readonly useCase: UseCase<Session, CommonRequest>
    private readonly session: Session
    private readonly errorInterceptor: ErrorInterceptor
    private middlewares: Middleware[] = []

    constructor(data: {
        useCase: UseCase<Session, CommonRequest>
        session: Session
        errorInterceptor: ErrorInterceptor
    }) {
        this.useCase = data.useCase
        this.session = data.session
        this.errorInterceptor = data.errorInterceptor
    }

    static getMiddlewares(): Middleware[] {
        return []
    }

    addMiddlewares(middlewares: Middleware[] = []) {
        this.middlewares = [...this.middlewares, ...middlewares]
    }

    async process(request: any): Promise<ResponseSuccess | ResponseError> {
        try {
            await this.useCase.setSession(this.session)

            await this.useCase.setRequest(request)

            await this.processMiddlewares()

            return await this.useCase.process()
        } catch (error) {
            return await this.handleError(error as Error)
        }
    }

    private async processMiddlewares() {
        const middlewares = [...this.middlewares, ...Handler.getMiddlewares()]

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
            return error
        }

        return new InternalError()
    }
}
