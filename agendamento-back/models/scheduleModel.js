const db = require('../config/db');
const { DataTypes, Model } = require('sequelize');

class Schedule extends Model { }

Schedule.init(
    {
        title: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [3, 255],
            },
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
            allowNull: false,
            defaultValue: 1,
            validate: {
                min: 1,
            },
        },

        roomId: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },

        resourceId: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },

        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    },
    {
        sequelize: db,
        modelName: 'Schedule',
        tableName: 'schedules',
        timestamps: true,
        validate: {
            endAfterStart() {
                if (this.end <= this.start) {
                    throw new Error("End date must be after start date");
                }
            },

            roomOrResource() {
                if (!this.roomId && !this.resourceId) {
                    throw new Error("Select either a room or a resource.");
                }

                if (this.roomId && this.resourceId) {
                    throw new Error("You cannot select both a room and a resource.");
                }
            },
        },
    }
);

module.exports = Schedule;