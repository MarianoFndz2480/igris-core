import { Session } from './session'
import { BaseClass } from '../shared/base-class'

export abstract class Service<Dependencies extends Record<string, any> = {}> extends BaseClass<Dependencies> {
    protected declare session: Session

    injectSession(session: Session) {
        this.session = session
    }

    getServiceName() {
        return this.constructor.name.split('Service')[0]
    }
}
