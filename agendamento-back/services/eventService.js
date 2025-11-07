const Event = require('../models/Event');

exports.createEvent = async function (eventDTO) {
  try {
    const newEvent = await Event.create(eventDTO);
    return newEvent.toJSON();
  } catch (error) {
    throw error;
  }
}       

exports.updateEvent = async function(id, eventDTO) {
    try {
        await Event.update(eventDTO, { where: { id: id } });
        const updatedEvent = await Event.findByPk(id);
        return updatedEvent ? updatedEvent.toJSON() : null;
    } catch(error) {
        throw new Error('Erro ao atualizar evento: ' + error.message)
    }
}   

exports.deleteEvent = async function(id) {
    try {
        const deleted = await Event.destroy({ where: { id: id } });
        return deleted > 0;
    } catch(error) {
        throw new Error('Erro ao deletar evento: ' + error.message)
    }
}   

exports.findEventById = async function(id) {
    try {
        const event = await Event.findByPk(id);
        return event ? event.toJSON() : null;
    } catch(error) {
        throw new Error('Erro ao buscar evento: ' + error.message)
    }
}   

exports.createEventDTO = function(userId, eventData) {
    return {
        title: eventData.title,
        start: eventData.start,
        end: eventData.end,
        userId: userId,
        roomId: eventData.roomId,
        description: eventData.description
    }
}       