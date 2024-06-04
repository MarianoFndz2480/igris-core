export class ResponseSuccess<T = object> {
    declare code: number
    declare data: T

    constructor(code: number, data: T) {
        this.code = code
        this.data = data
    }
}

export class ResponseError extends Error {
    declare code: number
    declare name: string

    constructor() {
        super()
        this.name = this.constructor.name
    }
}

export class NotFoundError extends ResponseError {
    declare code: number
    declare entity: string
    constructor(entity: string) {
        super()
        this.message = `${entity} not found`
        this.code = 404
    }
}

export class InternalError extends ResponseError {
    constructor() {
        super()
        this.message = 'Internal error'
        this.code = 500
    }
}

export class InvalidPayloadError extends ResponseError {
    constructor(error: string) {
        super()
        this.message = `Invalid payload: ${error}`
        this.code = 400
    }
}

export class InvalidQueryParamsError extends ResponseError {
    constructor(error: string) {
        super()
        this.message = `Invalid query params: ${error}`
        this.code = 400
    }
}

export class UnauthorizedError extends ResponseError {
    constructor() {
        super()
        this.message = 'Unauthorized'
        this.code = 401
    }
}

export class ForbiddenError extends ResponseError {
    constructor() {
        super()
        this.message = 'ForbiddenError'
        this.code = 403
    }
}
