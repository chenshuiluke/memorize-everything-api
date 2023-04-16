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
        await knex.raw('SET FOREIGN_KEY_CHECKS=0;')
        for (const [modelName, model] of Object.entries(models)) {
            console.log('Deleting', model.getTableName())
            await knex(model.getTableName()).del()
        }
        await knex.raw('SET FOREIGN_KEY_CHECKS=1;')
    },
}
