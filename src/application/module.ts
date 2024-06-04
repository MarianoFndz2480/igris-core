import { Session } from '../domain'
import { RequestAdapter } from './request-adapter'
import { Handler } from './handler'
import { UseCase } from './usecase'
import { ErrorInterceptor } from './interceptor'
import { Middleware } from './middleware'
import { RequestEvent } from '../types'

export class Module {
    declare handler: Handler
    declare requestAdapter: RequestAdapter
    declare errorInterceptor: ErrorInterceptor
    declare session: () => Session
    declare middlewares: Middleware[]

    constructor(data: {
        requestAdapter: RequestAdapter
        errorInterceptor: ErrorInterceptor
        middlewares: Middleware[]
        session: () => Session
    }) {
        this.requestAdapter = new RequestAdapter()
        this.errorInterceptor = data.errorInterceptor
        this.middlewares = data.middlewares
        this.session = data.session
    }

    async init() {}

    createHandler(useCase: UseCase<Session, RequestEvent>) {
        return new Handler(useCase, this.session(), this.middlewares, this.errorInterceptor, this.requestAdapter)
    }
}
