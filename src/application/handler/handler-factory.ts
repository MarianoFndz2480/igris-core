import { Handler } from './handler'
import { ErrorInterceptor } from './interceptor'
import { UseCase } from '../usecase'
import { Middleware } from './middleware'
import { RequestAdapter } from './request-adapter'

export class HandlerFactory {
    createInstance(useCase: UseCase): Handler {
        return new Handler(
            useCase,
            this.getSession(),
            this.getErrorInterceptor(),
            this.getRequestAdapter(),
            this.getMiddlewares(),
        )
    }

    getSession(): {} {
        return {}
    }

    getRequestAdapter(): RequestAdapter {
        throw new Error('RequestAdapter must be override')
    }

    getErrorInterceptor(): ErrorInterceptor | null {
        return null
    }

    getMiddlewares(): Middleware[] {
        return []
    }
}
