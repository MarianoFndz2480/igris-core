import { ValidatorError } from '../errors'
import { ResponseError } from './responses.usecase'
import { SchemaValidator } from './schema-validator'

export class FunctionUseCase<Payload = object> {
    declare payload: Payload

    async process({ payload }: { payload: Payload }): Promise<void> {
        try {
            const payloadValidator = this.payloadValidator()

            if (payloadValidator) {
                await payloadValidator.validate(payload)
                this.payload = payload
            }

            await this.processData()
        } catch (err) {
            if (err instanceof ResponseError) console.error(err.message)
            if (err instanceof ValidatorError) console.error('Input error: ', err.message)
            console.error('Internal Error: ', err)
        }
    }

    payloadValidator(): SchemaValidator<any> | null {
        return null
    }

    processData(): Promise<void> {
        throw new Error('Must be override')
    }
}
