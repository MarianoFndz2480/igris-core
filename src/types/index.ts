export type CommonID = string

export interface HandlerInput<T = {}, Q = {}> {
    token: string
    payload: T
    queryParams: Q
}

export type GenericHandlerInput = HandlerInput<{}, {}>

export interface UseCaseInput<T = {}, Q = {}> {
    payload: T
    queryParams: Q
}

export type GenericUseCaseInput = UseCaseInput<{}, {}>

export enum SortEnum {
    DESC = 'DESC',
    ASC = 'ASC',
}

export type CommonResponse<T> = { data: T }
export type CommonListResponse<T> = CommonResponse<T> & { meta: CommonListResponseMeta }
export type CommonListResponseMeta = { total: number; totalPages: number; page: number; currentCount: number }

export interface JWTPayload {
    userId: string
    tenantId: string
}
