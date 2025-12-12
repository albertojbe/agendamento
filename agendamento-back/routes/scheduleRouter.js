const express = require('express');
const router = express.Router();

const ScheduleService = require('../services/ScheduleService');
const scheduleRepository = require('../repositories/ScheduleRepository');
const RoomService = require('../services/RoomService');
const ResourceService = require('../services/ResourceService');
const UserService = require('../services/UserService');
const roomRepository = require('../repositories/RoomRepository');
const resourceRepository = require('../repositories/ResourceRepository');
const userRepository = require('../repositories/UserRepository');
const { validateJWT } = require('../middlewares/authMiddleware');
const errorMiddleware = require('../middlewares/errorMiddleware');

// Instanciar os serviços
const roomServiceInstance = new RoomService(roomRepository);
const resourceServiceInstance = new ResourceService(resourceRepository);
const userServiceInstance = new UserService(userRepository);

// Instanciar o ScheduleService com as instâncias dos serviços
const scheduleServiceInstance = new ScheduleService(
    scheduleRepository,
    roomServiceInstance,
    resourceServiceInstance,
    userServiceInstance
);

const createScheduleDTO = (body, userId) => {
    return {
        userId: userId,
        roomId: body.roomId,
        resourceId: body.resourceId,
        title: body.title,
        description: body.description,
        start: body.start,
        end: body.end,
        participantsQuantity: body.participantsQuantity
    };
};

router.use(validateJWT);

router.get('/', async (req, res, next) => {
    try {
        const schedules = await scheduleServiceInstance.getAllSchedules();
        res.json(schedules);
    } catch (error) {
        next(error);
    }
});

router.get('/:id', async (req, res, next) => {
    try {
        const schedule = await scheduleServiceInstance.findScheduleById(req.params.id);
        res.json(schedule);
    } catch (error) {
        next(error);
    }
});

router.get('/room/:roomId', async (req, res, next) => {
    try {
        const schedules = await scheduleServiceInstance.findByRoomId(req.params.roomId);
        res.json(schedules);
    } catch (error) {
        next(error);
    }
});

router.get('/resource/:resourceId', async (req, res, next) => {
    try {
        const schedules = await scheduleServiceInstance.findByResourceId(req.params.resourceId);
        res.json(schedules);
    } catch (error) {
        next(error);
    }
});

router.get('/user/:userId', async (req, res, next) => {
    try {
        const schedules = await scheduleServiceInstance.findByUserId(req.params.userId);
        res.json(schedules);
    } catch (error) {
        next(error);
    }
});

router.post('/', async (req, res, next) => {
    try {
        const scheduleDTO = createScheduleDTO(req.body, req.user.id);
        const newSchedule = await scheduleServiceInstance.createSchedule(scheduleDTO);
        res.status(201).json(newSchedule);
    } catch (error) {
        next(error);
    }
});

router.put('/:id', async (req, res, next) => {
    try {
        const scheduleDTO = createScheduleDTO(req.body, req.user.id);
        const updatedSchedule = await scheduleServiceInstance.updateSchedule(req.params.id, scheduleDTO);
        res.json(updatedSchedule);
    } catch (error) {
        next(error);
    }
});

router.delete('/:id', async (req, res, next) => {
    try {
        await scheduleServiceInstance.deleteSchedule(req.params.id);
        res.json({ message: 'Agendamento deletado com sucesso' });
    } catch (error) {
        next(error);
    }
});

router.use(errorMiddleware);

module.exports = router;