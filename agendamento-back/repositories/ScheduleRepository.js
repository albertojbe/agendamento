const Schedule = require('../models/scheduleModel');

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
}

module.exports = new ScheduleRepository();