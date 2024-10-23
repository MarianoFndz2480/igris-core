export class SuccessResponse<T = {}> {
    declare type: string
    declare message: string
    declare data: T
    declare httpStatus: number
    declare metadata?: Metadata

    constructor(props: { message: string; data: T; httpStatus?: number; metadata?: Metadata }) {
        this.type = 'success'
        this.message = props.message
        this.data = props.data
        this.httpStatus = props.httpStatus || 200
        if (props.metadata) this.metadata = props.metadata
    }
}

export interface Metadata {
    countItems: number
    currentPage: number
    totalPages: number
    totalItems: number
}
