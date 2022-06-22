const Model = require('./index')

class User extends Model {
    static getTableName() {
        return 'users'
    }

    static get jsonSchema() {
        return {
            type: 'object',
            required: ['username', 'email', 'password'],

            properties: {
                id: { type: 'integer' },
                parentId: { type: ['integer', 'null'] },
                firstName: { type: 'string', minLength: 1, maxLength: 255 },
                lastName: { type: 'string', minLength: 1, maxLength: 255 },
                age: { type: 'number' },

                // Properties defined as objects or arrays are
                // automatically converted to JSON strings when
                // writing to database and back to objects and arrays
                // when reading from database. To override this
                // behaviour, you can override the
                // Model.jsonAttributes property.
                address: {
                    type: 'object',
                    properties: {
                        street: { type: 'string' },
                        city: { type: 'string' },
                        zipCode: { type: 'string' },
                    },
                },
            },
        }
    }
}

export default User
