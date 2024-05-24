export class InvalidPermissionsError extends Error {
    constructor(serviceName: string, action: string) {
        super()
        this.message = `Must not ${action} ${serviceName} without authenticate with user associated with tenant`
    }
}

export class ValidatorError extends Error {
    declare message: string

    constructor(message: string) {
        super()
        this.message = message
        this.name = 'ValidatorError'
    }
}
