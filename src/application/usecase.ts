import { UseCaseRequest } from '../types'
import { Session } from '../domain/session'
import { BaseClass } from '../shared/base-class'

export class UseCase<
    AppSession extends Session = Session,
    AppRequest extends UseCaseRequest = UseCaseRequest,
    Dependencies extends Record<string, any> = {},
> extends BaseClass<Dependencies> {
    declare statusCode: number
    declare req: AppRequest
    declare session: AppSession
    declare public: Boolean

    protected setStatusCode(code: number) {
        this.statusCode = code
    }

    setRequest(request: AppRequest) {
        this.req = request
    }

    setSession(session: AppSession) {
        this.session = session
    }

    process(): Promise<object> {
        throw new Error('Must be override')
    }
}
