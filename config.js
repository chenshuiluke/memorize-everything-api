module.exports = {
    dbConfig: () => {
        let db = process.env.DB_DATABASE
        if (process.env.TESTING) {
            db = 'test-db'
        }
        return {
            client: 'mysql',
            connection: {
                host: 'db',
                port: 3306,
                user: process.env.DB_USER,
                password: process.env.DB_PASSWORD,
                database: db,
            },
            pool: {
                min: 2,
                max: 10,
            },
            migrations: {
                tableName: 'knex_migrations',
                directory: 'database/migrations',
            },
        }
    },
}
