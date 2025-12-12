const db = require('../config/db');
const { DataTypes } = require('sequelize');

const Room = require('./roomModel');
const Schedule = require('./scheduleModel');
const User = require('./userModel');
const Resource = require('./resourceModel');

Room.hasMany(Schedule, {
    foreignKey: 'roomId',
    as: 'schedules',
})

Resource.hasMany(Schedule, {
    as: 'schedules',   
    foreignKey: 'resourceId',
});

User.hasMany(Schedule, {
    foreignKey: 'userId',
    as: 'schedules',
});

Schedule.belongsTo(Room, {
    foreignKey: 'roomId',
    as: 'room',
    onDelete: 'CASCADE',
});

Schedule.belongsTo(User, {
    foreignKey: 'userId',
    as: 'user',
    onDelete: 'CASCADE',
});

Schedule.belongsTo(Resource, {
    as: 'resource',
    foreignKey: 'resourceId',
});

module.exports = { db, Room, Schedule, User, Resource };