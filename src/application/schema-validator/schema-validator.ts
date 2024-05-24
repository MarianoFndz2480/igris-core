export abstract class SchemaValidator {
    declare schema: any
    abstract validate(value: any): Promise<any>
    abstract setSchema(schema: any): any
}
