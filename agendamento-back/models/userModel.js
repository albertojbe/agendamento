const { DataTypes, Model } = require('sequelize')
const db = require('../config/db')

class User extends Model { };

User.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        role: {
            type: DataTypes.ENUM,
            values: ['common', 'admin', 'staff'],
            allowNull: false,
            defaultValue: 'common'
        }
    },
    {
        sequelize: db,
        modelName: 'User'
    }
);

module.exports = User