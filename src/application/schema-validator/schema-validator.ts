export class SchemaValidator<T> {
    declare schema: T

    constructor(schema: T) {
        this.schema = schema
    }

    validate(_: any): Promise<any> {
        throw new Error('Validate method must be override')
    }
}
