import { UseCaseRequest, ErrorData } from '../../types'

export class RequestAdapter {
    parseRequest(_: any): UseCaseRequest {
        const useCaseInput: UseCaseRequest = {
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
