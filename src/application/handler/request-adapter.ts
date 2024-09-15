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

    parseSuccessResponse(response: ResponseSuccess): object | string {
        return response as object | string
    }

    parseErrorResponse(response: ResponseError): object | string {
        return response as object | string
    }
}
