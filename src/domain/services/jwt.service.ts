import jwt from 'jsonwebtoken'
import { InvalidTokenFormatError } from '../../application/responses.usecase'

export default class JWTService {
    static generate(payload: object) {
        return jwt.sign(payload, 'secretKey', { expiresIn: '7 days' })
    }

    static validate<T>(token: string) {
        try {
            return jwt.verify(token, 'secretKey') as T
        } catch {
            throw new InvalidTokenFormatError()
        }
    }
}
