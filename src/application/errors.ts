export class ErrorResponse {
    declare type: string
    declare message: string
    declare errorCode: string
    declare details: object
    declare httpStatus: number

    constructor() {
        this.type = 'error'
    }
}

export class InternalError extends ErrorResponse {
    constructor() {
        super()
        this.message = 'Internal error'
        this.errorCode = 'INTERNAL_ERROR'
        this.details = {
            message: 'Internal error was ocurred. Try again later',
            suggestion:
                'An unexpected error occurred on our server. Please try again later, and if the issue persists, contact support with the details of your request.',
            timestamp: new Date().toISOString(),
        }
        this.httpStatus = 500
    }
}

export class ForbiddenError extends ErrorResponse {
    constructor() {
        super()
        this.message = 'Access Denied'
        this.errorCode = 'FORBIDDEN_ERROR'
        this.details = {
            message: 'You do not have the necessary permissions to access this resource.',
            suggestion: 'Please verify your credentials and try again. Contact support if the issue persists.',
            timestamp: new Date().toISOString(),
        }
        this.httpStatus = 403
    }
}

export class UnauthorizedError extends ErrorResponse {
    constructor() {
        super()
        this.message = 'Unauthorized'
        this.errorCode = 'UNAUTHORIZED_ERROR'
        this.details = {
            message: 'The provided authentication token is invalid, or the login credentials are incorrect.',
            suggestion:
                'Please check your login credentials and try again. If you are using a token, make sure it is valid and has not expired.',
            timestamp: new Date().toISOString(),
        }
        this.httpStatus = 401
    }
}

export class InvalidRequestError extends ErrorResponse {
    constructor(data: {
        invalidQueryParamsFields: object
        invalidBodyFields: object
        invalidPathParamsFields: object
    }) {
        const { invalidQueryParamsFields, invalidBodyFields, invalidPathParamsFields } = data

        const showQueryParams = !!Object.keys(invalidQueryParamsFields).length
        const showBody = !!Object.keys(invalidBodyFields).length
        const showPathParams = !!Object.keys(invalidPathParamsFields).length

        super()
        this.message = 'Invalid Request'
        this.errorCode = 'INVALID_REQUEST_ERROR'
        this.details = {
            message: 'The request contains invalid or missing fields in the body, query or path parameters.',
            suggestion: 'Please verify the request and ensure all required fields are provided with valid values.',
            invalidFields: {
                ...(showQueryParams && { queryParams: invalidQueryParamsFields }),
                ...(showBody && { body: invalidBodyFields }),
                ...(showPathParams && { pathParams: invalidPathParamsFields }),
            },
            timestamp: new Date().toISOString(),
        }
        this.httpStatus = 400
    }
}
