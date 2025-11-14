const { Model } = require('sequelize');
const db = require('../config/db');

class Resource extends Model { };

Resource.init({
    name: {
        type: db.Sequelize.STRING,
        allowNull: false,
    },
    quantity: {
        type: db.Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 1,
    },
    type: {
        type: db.Sequelize.STRING,
        allowNull: false,
    },
    active: {
        type: db.Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true,
    },
},
    {
        sequelize: db,
        modelName: 'Resource'
    }
);

module.exports = Resource;