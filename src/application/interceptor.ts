import { BaseClass } from '../shared/base-class'

export class ErrorInterceptor<Dependencies extends Record<string, any> = {}> extends BaseClass<Dependencies> {
    async catch(_: Error): Promise<void> {}
}
