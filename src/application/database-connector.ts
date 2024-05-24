export abstract class DatabaseConnector {
    abstract connect(): Promise<void>
}
