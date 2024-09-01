import { Handler } from './handler'
import { ErrorInterceptor } from './interceptor'
import { UseCase } from '../usecase'
import { Middleware } from './middleware'
import { RequestAdapter } from './request-adapter'
import { Session } from '../../domain'

export class HandlerFactory {
    createInstance(useCase: UseCase): Handler {
        return new Handler({
            useCase,
            errorInterceptor: this.getErrorInterceptor(),
            session: this.getSession(),
            requestAdapter: this.getRequestAdapter(),
            middlewares: this.getMiddlewares(),
        })
    }

    getSession(): Session {
        return new Session()
    }

    getRequestAdapter(): RequestAdapter {
        return new RequestAdapter()
    }

    getErrorInterceptor(): ErrorInterceptor {
        return new ErrorInterceptor()
    }

    getMiddlewares(): Middleware[] {
        return []
    }
}
