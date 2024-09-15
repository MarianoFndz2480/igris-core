import { BaseClass } from '../../shared'
import { ErrorData } from '../../types'

export class ErrorInterceptor<Dependencies extends Record<string, any> = {}> extends BaseClass<Dependencies> {
    async catch(_: Error): Promise<ErrorData> {
        return {
            statusCode: 500,
            response: {},
        }
    }
}
