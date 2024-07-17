import { CommonListResponse, CommonListResponseMeta, CommonResponse, RequestEvent } from '../types'
import { Session } from '../domain/session'
import { Service } from '../domain/service'
import { Model } from '../domain/model'
import { InternalError, ResponseError, ResponseSuccess } from './responses-usecase'

export class UseCase<AppSession extends Session, AppRequest extends RequestEvent> {
    declare statusCode: number
    declare req: AppRequest
    declare session: Session
    declare serviceList: Service<Model<{}>>[]
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
            console.log('🚀 ~ file: usecase.ts:62 ~ UseCase<Response ~ err:', err)
            if (err instanceof ResponseError) return err
            return new InternalError()
        }
    }

    private addServicesToList() {
        for (const prop in this) {
            if (this[prop] instanceof Service) {
                this.serviceList.push(this[prop] as Service<Model<{}>>)
            }
        }
    }

    private injectSessionToServices() {
        if (!this.session) return
        this.addServicesToList()
        this.serviceList.forEach((service) => service.injectSession(this.session as Session))
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
