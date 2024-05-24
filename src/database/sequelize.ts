import { Sequelize } from 'sequelize-typescript'
import { DatabaseConnector } from '../application/database-connector'

export const sequelize = new Sequelize({
    database: 'postgres',
    username: 'postgres',
    password: 'password',
    host: 'localhost',
    port: 5432,
    dialect: 'postgres',
    models: [__dirname + 'src/**/*.db-model.ts'],
})

let connected = false

export default class SequelizeConnector extends DatabaseConnector {
    async connect(): Promise<void> {
        try {
            if (connected) return

            await sequelize.authenticate()

            connected = true

            console.log('Database connection established successfully')
        } catch (error) {
            console.error('Error connecting to the database:', error)
        }
    }
}
