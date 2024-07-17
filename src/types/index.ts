export type CommonID = string

export interface CommonRequest<T = {}, Q = {}, W = {}> {
    payload: T
    queryParams: Q
    headers: W
    token: string
}

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
