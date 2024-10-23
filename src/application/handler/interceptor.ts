import { ErrorResponse } from '../errors'

export interface ErrorInterceptor {
    catch(_: Error): Promise<ErrorResponse>
}
