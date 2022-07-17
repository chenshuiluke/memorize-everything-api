const path = require('path')
require('dotenv').config({
    path: path.relative(
        process.cwd(),
        path.join(__dirname, '..', process.env.ENVFILE)
    ),
})

const config = require('../config')
const knex = require('knex')(config.dbConfig())
const models = require('../database/models')
module.exports = {
    clearTestDb: async () => {
        for (const [modelName, model] of Object.entries(models)) {
            await knex(model.getTableName()).del()
        }
    },
}
