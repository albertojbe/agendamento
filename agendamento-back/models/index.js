const db = require('../config/db');
const { DataTypes } = require('sequelize');

const Room = require('./roomModel')(db, DataTypes);
const Event = require('./eventModel')(db, DataTypes);
const User = require('./userModel')(db, DataTypes);

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

module.exports = { db, Room, Event, User };
