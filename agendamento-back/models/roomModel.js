const { DataTypes, Model } = require('sequelize')
const db = require('../config/db')

class Room extends Model { };

Room.init({
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    capacity: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    location: {
        type: DataTypes.STRING,
        allowNull: true,
    },
},
    {
        sequelize: db,
        modelName: 'Room'
    }
);

module.exports = Room;