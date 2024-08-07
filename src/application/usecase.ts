import { CommonListResponse, CommonListResponseMeta, CommonResponse, CommonRequest } from '../types'
import { Session } from '../domain/session'
import { Service } from '../domain/service'
import { InternalError, ResponseError, ResponseSuccess } from './responses-usecase'
import { BaseClass } from '../shared/base-class'

export class UseCase<
    AppSession extends Session = Session,
    AppRequest extends CommonRequest = CommonRequest,
    Dependencies extends Record<string, any> = {},
> extends BaseClass<Dependencies> {
    declare statusCode: number
    declare req: AppRequest
    declare session: AppSession
    declare serviceList: Service[]
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

    async process(): Promise<ResponseSuccess | ResponseError> {
        try {
            if (this.session) this.injectSessionToServices()

            const response = await this.processData()

            return new ResponseSuccess(this.statusCode, response) as ResponseSuccess
        } catch (err) {
            if (err instanceof ResponseError) return err
            return new InternalError()
        }
    }

    private injectSessionToServices() {
        if (!this.session) return
        this.addServicesToList()
        this.serviceList.forEach((service) => service.injectSession(this.session as Session))
    }

    private addServicesToList() {
        for (const prop in this) {
            if (this[prop] instanceof Service) {
                this.serviceList.push(this[prop] as Service)
            }
        }
    }

    protected processData(): Promise<CommonResponse<{}> | CommonListResponseMeta> {
        throw new Error('Must be override')
    }

    protected formatResponse<T>(data: T): CommonResponse<T> {
        return { data }
    }

    protected formatListResponse<T>(data: T, meta: CommonListResponseMeta): CommonListResponse<T> {
        return { data, meta }
    }
}
