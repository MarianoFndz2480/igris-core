import { Entity, Session } from '../domain'
import { ErrorInterceptor, Middleware, UseCase } from '../application'
import { RequestAdapter } from '../application/handler/request-adapter'

export interface CommonRequest<T = {}, Q = {}, W = {}> {
    payload: T
    queryParams: Q
    headers: W
    token: string
}
export type CommonResponse<T> = { data: T }
export type CommonListResponse<T> = CommonResponse<T> & { meta: CommonListResponseMeta }
export type CommonListResponseMeta = { total: number; totalPages: number; page: number; currentCount: number }
export type AdditionalEntitiesTypes = Record<string, Entity<{}, {}> | Entity<{}, {}>[]>
export type HandlerDependencies = {
    useCase: UseCase<Session, CommonRequest>
    session: Session
    errorInterceptor: ErrorInterceptor
    requestAdapter: RequestAdapter
    middlewares: Middleware[]
}
