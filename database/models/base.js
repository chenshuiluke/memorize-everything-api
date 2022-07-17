const { Model } = require('objection')
const config = require('../../config')
const knex = require('knex')(config.dbConfig())

Model.knex(knex)

module.exports = Model
