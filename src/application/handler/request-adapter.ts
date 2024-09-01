import { CommonRequest } from '../../types'
import { ResponseError, ResponseSuccess } from '../responses-usecase'

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
