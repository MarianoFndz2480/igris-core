import { BaseClass } from '../../shared'

export class ErrorInterceptor<Dependencies extends Record<string, any> = {}> extends BaseClass<Dependencies> {
    async catch(_: Error): Promise<object> {
        return {}
    }
}
