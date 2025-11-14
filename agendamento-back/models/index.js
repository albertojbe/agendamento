const db = require('../config/db');
const { DataTypes } = require('sequelize');

const Room = require('./roomModel');
const Event = require('./eventModel');
const User = require('./userModel');
const Resource = require('./resourceModel');

Room.hasMany(Resource, {
    foreignKey: 'roomId',
    as: 'resources',
});

Resource.belongsTo(Room, {
    foreignKey: 'roomId',
    as: 'room',
    onDelete: 'CASCADE',
});

Room.hasMany(require('./eventModel'), {
    foreignKey: 'roomId',
    as: 'events',
})

User.hasMany(require('./eventModel'), {
    foreignKey: 'userId',
    as: 'events',
});

Event.belongsTo(require('./roomModel'), {
    foreignKey: 'roomId',
    as: 'room',
    onDelete: 'CASCADE',
});

Event.belongsTo(require('./userModel'), {
    foreignKey: 'userId',
    as: 'user',
    onDelete: 'CASCADE',
});

Event.belongsToMany(Resource, {
    through: 'EventResources',
    as: 'resources',
    foreignKey: 'eventId',
});

Resource.belongsToMany(Event, {
    through: 'EventResources',
    as: 'events',
    foreignKey: 'resourceId',
});

module.exports = { db, Room, Event, User };
