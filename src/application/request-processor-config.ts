import { Session } from 'inspector'
import { Handler } from './handler'
import { RequestProcessorMiddleware } from './request-processor-middleware'
import { ErrorInterceptor } from './interceptor'
import { RequestAdapter } from './request-adapter'

export class RequestProcessorConfig {
    getHandlerClass(): typeof Handler {
        return Handler
    }

    getSession() {
        return new Session()
    }

    getMiddlewares(): RequestProcessorMiddleware[] {
        return []
    }

    getErrorInterceptor(): ErrorInterceptor {
        return new ErrorInterceptor()
    }

    getRequestAdapter(): RequestAdapter {
        return new RequestAdapter()
    }
}
