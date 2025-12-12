const { Schedule } = require('../models');
const { Op } = require('sequelize');

class ScheduleRepository {
    async findAll() {
        return await Schedule.findAll();
    }

    async findById(id) {
        return await Schedule.findByPk(id);
    }

    async create(scheduleData) {
        return await Schedule.create(scheduleData);
    }

    async update(id, scheduleData) {
        const [updated] = await Schedule.update(scheduleData, { where: { id } });
        if (updated === 0) {
            return null;
        }
        return await Schedule.findByPk(id);
    }

    async delete(id) {
        return await Schedule.destroy({ where: { id } });
    }

    async findConflict({ roomId, resourceId, start, end }) {
        return await Schedule.findOne({
            where: {
                [Op.or]: [
                    { roomId },
                    { resourceId }
                ],
                start: { [Op.lt]: end },
                end: { [Op.gt]: start }
            }
        });
    }

    async findByRoomId(roomId) {
        return await Schedule.findAll({ where: { roomId } });
    }

    async findByResourceId(resourceId) {
        return await Schedule.findAll({ where: { resourceId } });
    }

    async findByUserId(userId) {
        return await Schedule.findAll({ where: { userId } });
    }
}

module.exports = new ScheduleRepository();