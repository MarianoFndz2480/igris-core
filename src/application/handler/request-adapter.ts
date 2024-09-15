import { CommonRequest } from '../../types'

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

    parseResponse(response: object): object | string {
        return response as object | string
    }
}
