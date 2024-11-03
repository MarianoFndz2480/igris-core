import { Middleware, UseCase } from '../application'

export interface UseCaseRequest<Payload = {}, QueryParams = {}, Headers = {}, PathParams = {}> {
    payload: Payload
    queryParams: QueryParams
    headers: Headers
    pathParams: PathParams
    token: string
}

export type CommonResponse<T> = { data: T }

export type CommonListResponse<T> = CommonResponse<T> & { meta: CommonListResponseMeta }

export type CommonListResponseMeta = { total: number; totalPages: number; page: number; currentCount: number }

export type ObjectsWithServices = UseCase | Middleware

export type ErrorData = { statusCode: number; response: object }

export type FirstParameter<T extends (...args: any) => any> = T extends (arg1: infer P, ...args: any) => any ? P : never

export type NonFunctionKeys<T> = {
    [K in keyof T]: T[K] extends Function ? never : K
}[keyof T]

export type RequiredKeys<T> = {
    [K in keyof T]: undefined extends T[K] ? never : K
}[keyof T]

export type NonFunctionAndRequiredKeys<T> = Extract<NonFunctionKeys<T>, RequiredKeys<T>>

export type EntityProperties<T> = Partial<{ [K in NonFunctionAndRequiredKeys<T>]: T[K] }>

export enum SortEnum {
    DESC = 'DESC',
    ASC = 'ASC',
}
