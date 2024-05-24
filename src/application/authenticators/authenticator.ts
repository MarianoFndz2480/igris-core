export abstract class Authenticator {
    abstract process(_: any): Promise<any>
}
