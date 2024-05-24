import { ResponseError, ResponseSuccess } from './responses.usecase'
import { GenericHandlerInput } from '../types'

export class ApiController {
    parseInput(_: any): GenericHandlerInput {
        const useCaseInput: GenericHandlerInput = {
            payload: {},
            token: '',
            queryParams: {},
        }

        return useCaseInput
    }

    parseResponse(_: ResponseSuccess | ResponseError) {
        return {}
    }
}
