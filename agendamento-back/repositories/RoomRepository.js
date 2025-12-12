const Room = require('../models/roomModel');

class RoomRepository {
    async findAll() {
        return await Room.findAll();
    }

    async findById(id) {
        return await Room.findByPk(id);
    }

    async create(roomData) {
        return await Room.create(roomData);
    }

    async update(id, roomData) {
        const [updated] = await Room.update(roomData, { where: { id } });
        if (updated === 0) {
            return null;
        }
        return await Room.findByPk(id);
    }

    async delete(id) {
        return await Room.destroy({ where: { id } });
    }
}

module.exports = new RoomRepository();