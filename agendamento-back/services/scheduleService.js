// services/scheduleService.js
const { Schedule, Room, Resource, User } = require('../models');
const { Op } = require('sequelize');

/**
 * Cria um DTO padronizado
 */
exports.createScheduleDTO = function (userId, eventData) {
  return {
    title: eventData.title,
    start: eventData.start,
    end: eventData.end,
    description: eventData.description,
    participantsQuantity: eventData.participantsQuantity || 1,
    roomId: eventData.roomId || null,
    resourceId: eventData.resourceId || null,
    userId: userId
  };
};

exports.createSchedule = async function (dto) {
  try {
    if (!dto.roomId && !dto.resourceId) {
      throw new Error("Selecione uma sala OU um recurso.");
    }
    if (dto.roomId && dto.resourceId) {
      throw new Error("Não é permitido selecionar sala E recurso ao mesmo tempo.");
    }

    if (dto.roomId) {
      const room = await Room.findByPk(dto.roomId);

      if (!room) {
        throw new Error("Sala não encontrada.");
      }

      if (dto.participantsQuantity > room.capacity) {
        throw new Error("Número de participantes excede a capacidade da sala.");
      }
    }

    const conflict = await Schedule.findOne({
      where: {
        [Op.or]: [
          { roomId: dto.roomId },
          { resourceId: dto.resourceId }
        ],
        start: { [Op.lt]: dto.end },
        end: { [Op.gt]: dto.start }
      }
    });

    if (conflict) {
      throw new Error("Já existe um agendamento no horário selecionado.");
    }

    const newSchedule = await Schedule.create(dto);
    return newSchedule.toJSON();

  } catch (error) {
    throw new Error("Erro ao criar agendamento: " + error.message);
  }
};


exports.updateSchedule = async function (id, dto) {
  try {
    await Schedule.update(dto, { where: { id } });
    const updated = await Schedule.findByPk(id);
    return updated ? updated.toJSON() : null;
  } catch (error) {
    throw new Error("Erro ao atualizar agendamento: " + error.message);
  }
};

exports.deleteSchedule = async function (id) {
  try {
    const deleted = await Schedule.destroy({ where: { id }});
    return deleted > 0;
  } catch (error) {
    throw new Error("Erro ao deletar agendamento: " + error.message);
  }
};

exports.getAllSchedules = async function () {
  try {
    const schedules = await Schedule.findAll();
    console.log('Schedules fetched: ', schedules);
    return schedules.map(s => s.toJSON());
  } catch (error) {
    throw new Error("Erro ao buscar agendamentos: " + error.message);
  }
};

exports.findScheduleById = async function (id) {
  try {
    const schedule = await Schedule.findByPk(id);
    return schedule ? schedule.toJSON() : null;
  } catch (error) {
    throw new Error("Erro ao buscar agendamento: " + error.message);
  }
};

exports.findByRoomId = async function (roomId) {
  try {
    const schedules = await Schedule.findAll({ where: { roomId } });
    return schedules.map(s => s.toJSON());
  } catch (error) {
    throw new Error("Erro ao buscar agendamentos por sala: " + error.message);
  }
};

exports.findByResourceId = async function (resourceId) {
  try {
    const schedules = await Schedule.findAll({ where: { resourceId } });
    return schedules.map(s => s.toJSON());
  } catch (error) {
    throw new Error("Erro ao buscar agendamentos por recurso: " + error.message);
  }
};

exports.findByUserId = async function (userId) {
  try {
    const schedules = await Schedule.findAll({ where: { userId } });
    return schedules.map(s => s.toJSON());
  } catch (error) {
    throw new Error("Erro ao buscar agendamentos por usuário: " + error.message);
  }
};
