import { Service } from '../../domain'
import { UseCaseRequest, ObjectsWithServices } from '../../types'
import { ErrorInterceptor } from './interceptor'
import { Middleware } from './middleware'
import { UseCase } from '../usecase'
import { RequestAdapter } from './request-adapter'
import { ErrorResponse, InternalError } from '../errors'

export class Handler {
    declare serviceList: Service[]

    constructor(
        private readonly useCase: UseCase,
        private readonly session: {},
        private readonly errorInterceptor: ErrorInterceptor | null,
        private readonly requestAdapter: RequestAdapter,
        private middlewares: Middleware[],
    ) {}

    addMiddlewares(middlewares: Middleware[] = []): this {
        this.middlewares = [...this.middlewares, ...middlewares]
        return this
    }

    async process(rawRequest: any): Promise<object | string> {
        try {
            const request = this.requestAdapter.parseRequest(rawRequest)

            this.injectSessionToServices()

            await this.processMiddlewares(rawRequest, request)

            const useCaseResponse = await this.useCase.process(request, this.session)

            return this.requestAdapter.parseResponse(useCaseResponse)
        } catch (error) {
            const errorResponse = await this.catchError(error)
            return this.requestAdapter.parseResponse(errorResponse)
        }
    }

    private injectSessionToServices() {
        if (!this.session) return
        this.addServicesToList([this.useCase, ...this.middlewares])
        this.serviceList.forEach((service) => service.injectSession(this.session))
    }

    private addServicesToList(objects: ObjectsWithServices[]) {
        objects.forEach((obj: { [key: string]: any }) => {
            for (const prop in obj) {
                if (obj[prop] instanceof Service) {
                    if (!this.serviceList) this.serviceList = []
                    this.serviceList.push(obj[prop] as Service)
                }
            }
        })
    }

    private async processMiddlewares(rawRequest: object, request: UseCaseRequest) {
        const middlewares = [...this.middlewares]

        for (const middleware of middlewares) {
            if ('public' in this.useCase && !('public' in middleware)) {
                console.log(
                    `Middleware ${middleware.constructor.name} has not been processed because useCase ${this.useCase.constructor.name} is public`,
                )
                continue
            }
            await middleware.process({ rawRequest, request, session: this.session })
        }
    }

    catchError(error: any): Promise<ErrorResponse> {
        if (this.errorInterceptor) {
            return this.errorInterceptor.catch(error as Error)
        }
        return Promise.resolve(new InternalError())
    }
}
