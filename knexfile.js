const path = require('path')
require('dotenv').config({
    path: path.relative(
        process.cwd(),
        path.join(__dirname, process.env.ENVFILE)
    ),
})
const config = require('./config')

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */

// console.log("@@@", config.dbConfig())
module.exports = {
    development: config.dbConfig(),

    staging: {
        client: 'postgresql',
        connection: {
            database: 'my_db',
            user: 'username',
            password: 'password',
        },
        pool: {
            min: 2,
            max: 10,
        },
        migrations: {
            tableName: 'knex_migrations',
        },
    },

    production: {
        client: 'postgresql',
        connection: {
            database: 'my_db',
            user: 'username',
            password: 'password',
        },
        pool: {
            min: 2,
            max: 10,
        },
        migrations: {
            tableName: 'knex_migrations',
        },
    },
}
