const Model = require('./base')

class User extends Model {
    static getTableName() {
        return 'users'
    }
}

module.exports = User
