/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable('notes', function (table) {
        table.increments('id')
        table.text('content').notNullable()
        table.integer('user_id').unsigned()
        table.foreign('user_id').references('users.id')
    })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.dropTable('notes')
}
