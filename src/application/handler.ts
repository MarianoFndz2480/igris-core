import { Session } from '../domain'
import { ValidatorError } from '../errors/common.errors'
import { GenericUseCaseInput, HandlerInput } from '../types'
import { AccessManager } from './access-manager'
import { Authenticator } from './authenticators/authenticator'
import {
    ForbiddenError,
    InternalError,
    InvalidPayloadError,
    InvalidQueryParamsError,
    ResponseError,
    ResponseSuccess,
} from './responses.usecase'
import { UseCase } from './usecase'

export class Handler {
    private declare session: Session
    private declare accessManager: AccessManager
    private declare authenticators: Authenticator[]
    private declare useCase: UseCase<Session>

    constructor(session: Session, accessManager: AccessManager, authenticators: Authenticator[]) {
        this.session = session
        this.accessManager = accessManager
        this.authenticators = authenticators
    }

    async process(useCase: UseCase<Session>, input: HandlerInput<{}, {}>): Promise<ResponseSuccess | ResponseError> {
        try {
            this.useCase = useCase

            await this.setUseCaseInput({
                payload: input.payload,
                queryParams: input.queryParams,
            })

            if (useCase.public) {
                return useCase.process()
            }

            const authenticatedData = this.authenticators[0].process(input.token) as Parameters<
                (typeof this.session)['setData']
            >[0]

            this.session.setData(authenticatedData)

            const isAuthorized = this.accessManager.isAuthorized(this.session)

            if (!isAuthorized) {
                return new ForbiddenError()
            }

            useCase.setSession(this.session)

            return useCase.process()
        } catch (error) {
            if (error instanceof ResponseError) {
                return error
            }
            return new InternalError()
        }
    }

    private async setUseCaseInput(useCaseInput: GenericUseCaseInput) {
        await this.validateUseCaseInput(useCaseInput)
        this.useCase.setUseCaseInput(useCaseInput)
    }

    private async validateUseCaseInput(useCaseInput: GenericUseCaseInput) {
        const payloadValidator = this.useCase.getPayloadValidator()

        if (payloadValidator) {
            try {
                await payloadValidator.validate(useCaseInput.payload)
            } catch (err) {
                if (err instanceof ValidatorError) throw new InvalidPayloadError(err.message)
                throw err
            }
        }

        const queryParamsValidator = this.useCase.getPayloadValidator()

        if (queryParamsValidator) {
            try {
                await queryParamsValidator.validate(useCaseInput.queryParams)
            } catch (err) {
                if (err instanceof ValidatorError) throw new InvalidQueryParamsError(err.message)
                throw err
            }
        }
    }
}
