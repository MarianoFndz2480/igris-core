import { CommonRequest, ErrorData } from '../../types'

export class RequestAdapter {
    parseRequest(_: any): CommonRequest {
        const useCaseInput: CommonRequest = {
            payload: {},
            token: '',
            queryParams: {},
            pathParams: {},
            headers: {},
        }

        return useCaseInput
    }

    parseResponse(_: ErrorData): object | string {
        return {}
    }
}
