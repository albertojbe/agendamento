const errors = require("../errors");

class RoomService {
    constructor(roomRepository) {
        this.roomRepository = roomRepository;
    }

    async getAllRooms() {
        const rooms = await this.roomRepository.findAll();
        return rooms.map(room => room.toJSON());
    }

    async createRoom(roomDTO) {
        const newRoom = await this.roomRepository.create(roomDTO);
        return newRoom.toJSON();
    }

    async updateRoom(id, roomDTO) {
        const updatedRoom = await this.roomRepository.update(id, roomDTO);
        if (!updatedRoom) {
            throw new errors.NotFoundError('Sala não encontrada');
        }
        return updatedRoom.toJSON();
    }

    async deleteRoom(id) {
        const deleted = await this.roomRepository.delete(id);
        if (!deleted) {
            throw new errors.NotFoundError('Sala não encontrada');
        }
        return true;
    }

    async findRoomById(id) {
        const room = await this.roomRepository.findById(id);
        if (!room) {
            throw new errors.NotFoundError('Sala não encontrada');
        }
        return room.toJSON();
    }

    createRoomDTO(roomData) {
        const roomDTO = {
            name: roomData.name,
            capacity: roomData.capacity,
            location: roomData.location
        };
        if (roomData.detail !== undefined) {
            roomDTO.detail = roomData.detail;
        }
        return roomDTO;
    }
}

module.exports = RoomService;