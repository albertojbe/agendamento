const db = require('../config/db');
const { DataTypes, Model } = require('sequelize');

class Event extends Model { }

Event.init({
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    start: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    end: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    participantsQuantity: {
        type: DataTypes.INTEGER,
        defaultValue: 1,
        allowNull: false,
    },
    roomId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    }
},
    {
        sequelize: db,
        modelName: 'Event'
    }
);


module.exports = Event;