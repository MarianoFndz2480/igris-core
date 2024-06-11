import { ResponseError, ResponseSuccess } from './responses-usecase'
import { RequestEvent } from '../types'

export class EventAdapter {
    parseRequest(_: any): RequestEvent {
        const useCaseInput: RequestEvent = {
            payload: {},
            token: '',
            queryParams: {},
            headers: {},
        }

        return useCaseInput
    }

    parseResponse(response: ResponseSuccess | ResponseError): any {
        return response as any
    }
}
