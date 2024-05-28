import { CommonListResponse, CommonListResponseMeta, CommonResponse, GenericUseCaseInput } from '../types'
import { Session } from '../domain/session'
import { Service } from '../domain/services/service'
import { Model } from '../domain/model'
import { SchemaValidator } from './schema-validator'
import { InternalError, ResponseError, ResponseSuccess } from './responses.usecase'

export class UseCase<
    AppSession extends Session,
    UseCaseInput extends GenericUseCaseInput = { queryParams: {}; payload: {} },
> {
    declare public: boolean
    declare statusCode: number
    declare payload: UseCaseInput['payload']
    declare queryParams: UseCaseInput['queryParams']
    declare session?: Session
    declare serviceList: Service<Model<{}>>[]

    protected setStatusCode(code: number) {
        this.statusCode = code
    }

    setUseCaseInput(data: UseCaseInput) {
        this.payload = data.payload
        this.queryParams = data.queryParams
    }

    setSession(session: AppSession) {
        this.session = session
    }

    public getQueryParamsValidator(): SchemaValidator<any> | null {
        return null
    }

    public getPayloadValidator(): SchemaValidator<any> | null {
        return null
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

    protected processData(): Promise<Response> {
        throw new Error('Must be override')
    }

    protected formatResponse<T>(data: T): CommonResponse<T> {
        return { data }
    }

    protected formatListResponse<T>(data: T, meta: CommonListResponseMeta): CommonListResponse<T> {
        return { data, meta }
    }
}
