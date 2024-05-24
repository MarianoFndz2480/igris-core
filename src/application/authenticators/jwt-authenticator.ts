import { Authenticator } from './authenticator'
import JWTService from '../../domain/services/jwt.service'
import { InvalidTokenFormatError, TokenMustBeProvidedError } from '../responses.usecase'

const VALID_AUTHORIZATION_SCHEMAS = ['Bearer']

export class JWTAuthenticator extends Authenticator {
    process(token?: string) {
        const tokenValue = this.getTokenValue(token)

        const tokenPayload = JWTService.validate<{}>(tokenValue)

        return Promise.resolve(tokenPayload)
    }

    private getTokenValue(token?: string): string {
        if (!token) {
            throw new TokenMustBeProvidedError()
        }

        const [schema, tokenValue] = token.split(' ')

        if (!VALID_AUTHORIZATION_SCHEMAS.includes(schema)) {
            throw new InvalidTokenFormatError()
        }

        return tokenValue
    }
}
