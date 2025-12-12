const errors = require('../errors')

class ScheduleService {
    constructor(scheduleRepository, roomService, resourceService, userService) {
        this.scheduleRepository = scheduleRepository;
        this.roomService = roomService;
        this.resourceService = resourceService;
        this.userService = userService;
    }

    async getAllSchedules() {
        return (await this.scheduleRepository.findAll()).map(s => s.toJSON());
    }

    async findScheduleById(id) {
        const schedule = await this.scheduleRepository.findById(id);
        if (!schedule) {
            throw new errors.NotFoundError('Agendamento não encontrado');
        }
        return schedule.toJSON();
    }

    async createSchedule(dto) {
        if (!dto.roomId && !dto.resourceId) {
            throw new errors.ValidationError("Selecione uma sala ou um recurso.");
        }
        if (dto.roomId && dto.resourceId) {
            throw new errors.ValidationError("Não é permitido selecionar sala e recurso ao mesmo tempo.");
        }

        const room = await this.roomService.findByRoomId(dto.roomId);
        const resource = await this.resourceService.findByResourceId(dto.resourceId);
        if (!room) throw new errors.NotFoundError("Sala não encontrada.");
        if (!resource) throw new errors.NotFoundError("Recurso não encontrado.");
        if (dto.participantsQuantity > room.capacity) throw new errors.ValidationError("Número de participantes excede a capacidade da sala.");

        const conflict = await this.scheduleRepository.findConflict({ roomId: dto.roomId, resourceId: dto.resourceId, start: dto.start, end: dto.end });
        if (conflict) throw new errors.ValidationError("Já existe um agendamento no horário selecionado.");

        const newSchedule = await this.scheduleRepository.create(dto);
        return newSchedule.toJSON();
    }

    async updateSchedule(id, dto) {
        const conflict = await this.scheduleRepository.findConflict({ roomId: dto.roomId, resourceId: dto.resourceId, start: dto.start, end: dto.end });
        if (conflict && conflict.id !== id) {
            throw new errors.ValidationError("Já existe um agendamento no horário selecionado.");
        }
        
        const updatedSchedule = await this.scheduleRepository.update(id, dto);
        if (!updatedSchedule) {
            throw new errors.NotFoundError('Agendamento não encontrado');
        }

        return updatedSchedule.toJSON();
    }

    async deleteSchedule(id) {
        const deleted = await this.scheduleRepository.deleteSchedule(id);
        if (!deleted) {
            throw new errors.NotFoundError('Agendamento não encontrado');
        }
        return true;
    }

    async findByRoomId(roomId) {
        const schedules = await this.scheduleRepository.findByRoomId(roomId);
        return schedules.map(s => s.toJSON());
    }

    async findByResourceId(resourceId) {
        const schedules = await this.scheduleRepository.findByResourceId(resourceId);
        return schedules.map(s => s.toJSON());
    }

    async findByUserId(userId) {
        const schedules = await this.scheduleRepository.findByUserId(userId);
        return schedules.map(s => s.toJSON());
    }
}

module.exports = ScheduleService;