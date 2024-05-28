export abstract class SchemaValidator<T> {
    declare schema: any

    abstract validate(value: any): Promise<any>

    setSchema<K extends T>(schema: K) {
        this.schema = schema
    }
}
