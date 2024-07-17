import { ResponseError, ResponseSuccess } from './responses-usecase'
import { CommonRequest } from '../types'

export class RequestAdapter {
    parseRequest(_: any): CommonRequest {
        const useCaseInput: CommonRequest = {
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
