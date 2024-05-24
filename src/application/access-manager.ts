import { Session } from '../domain'

export class AccessManager {
    isAuthorized(_: Session): Promise<boolean> {
        return Promise.resolve(true)
    }
}
