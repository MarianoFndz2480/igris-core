export abstract class Service {
    protected declare session: {}

    injectSession(session: {}) {
        this.session = session
    }

    getServiceName() {
        return this.constructor.name.split('Service')[0]
    }
}
