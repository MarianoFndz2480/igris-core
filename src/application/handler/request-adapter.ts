import { UseCaseRequest } from '../../types'
import { ErrorResponse } from '../errors'
import { SuccessResponse } from '../response'

export interface RequestAdapter {
    parseRequest(_: any): UseCaseRequest
    parseResponse(_: SuccessResponse | ErrorResponse): object | string
}
