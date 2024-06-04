import { ResponseError, ResponseSuccess } from './responses-usecase'
import { RequestEvent } from '../types'

export class RequestAdapter {
    parseInput(_: any): RequestEvent {
        const useCaseInput: RequestEvent = {
            payload: {},
            token: '',
            queryParams: {},
            headers: {},
        }

        return useCaseInput
    }

    parseResponse(_: ResponseSuccess | ResponseError) {
        return {}
    }
}
