const Room = require('../models/roomModel');


exports.getAllRooms = async function() {
    try {
        const rooms = await Room.findAll();
        return rooms.map(room => room.toJSON());
    } catch(error) {
        throw new Error('Erro ao buscar salas: ' + error.message)
    }
}

exports.createRoom = async function (roomDTO) {
  try {
    const newRoom = await Room.create(roomDTO);
    return newRoom.toJSON();
  } catch (error) {
    throw error;
  }
}

exports.updateRoom = async function(id, roomDTO) {
    try {
        await Room.update(roomDTO, { where: { id: id } });
        const updatedRoom = await Room.findByPk(id);
        return updatedRoom ? updatedRoom.toJSON() : null;
    } catch(error) {
        throw new Error('Erro ao atualizar sala: ' + error.message)
    }
}

exports.deleteRoom = async function(id) {
    try {
        const deleted = await Room.destroy({ where: { id: id } });
        return deleted > 0;
    } catch(error) {
        throw new Error('Erro ao deletar sala: ' + error.message)
    }
}

exports.findRoomById = async function(id) {
    try {
        const room = await Room.findByPk(id);
        return room ? room.toJSON() : null;
    } catch(error) {
        throw new Error('Erro ao buscar sala: ' + error.message)
    }
}

exports.createRoomDTO = function(roomData) {
    return {
        name: roomData.name,
        capacity: roomData.capacity,
        location: roomData.location
    }
}