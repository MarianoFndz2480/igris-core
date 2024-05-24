import { DatabaseConnector } from './database-connector'
import { Session } from '../domain'
import { ApiController } from './api-controller'
import { AccessManager } from './access-manager'
import { Authenticator } from './authenticators/authenticator'
import { Handler } from './handler'
import { InternalError } from './responses.usecase'
import { UseCase } from './usecase'

export class Module {
    declare handler: Handler
    declare dbConnector: DatabaseConnector
    declare apiController: ApiController

    constructor(data: {
        session: Session
        accessManager: AccessManager
        authenticators: Authenticator[]
        dbConnector: DatabaseConnector
        apiController: ApiController
    }) {
        this.handler = new Handler(data.session, data.accessManager, data.authenticators)
        this.apiController = new ApiController()
        this.dbConnector = data.dbConnector
    }

    async processUseCase(useCase: UseCase<Session>, event: any) {
        try {
            await this.dbConnector.connect()

            const input = this.apiController.parseInput(event)

            const response = await this.handler.process(useCase, input)

            return this.apiController.parseResponse(response)
        } catch (err) {
            console.log(err)
            return this.apiController.parseResponse(new InternalError())
        }
    }
}
