import { ObjectSchema, ValidationError } from 'yup'
import { SchemaValidator } from './schema-validator'
import { ValidatorError } from '../../errors'

export class YupValidator extends SchemaValidator {
    validate(value: any) {
        try {
            return this.schema?.validate(value, {
                strict: true,
                abortEarly: false,
            })
        } catch (err) {
            if (err instanceof ValidationError) throw new ValidatorError(err.errors.toString())
            throw err
        }
    }

    setSchema(schema: ObjectSchema<any>) {
        this.schema = schema
    }

    static createInstance(schema: ObjectSchema<any>) {
        const yupValidator = new YupValidator()

        yupValidator.setSchema(schema)

        return yupValidator
    }
}
