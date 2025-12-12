const scheduleService = require('../services/scheduleService');
const { validateJWT } = require('../middlewares/authMiddleware');

const express = require('express');
const router = express.Router();

router.use(validateJWT);

router.post('/', async (req, res) => {
    try {
        const userId = req.user.id;
        const scheduleDTO = scheduleService.createScheduleDTO(userId, req.body);
        const newSchedule = await scheduleService.createSchedule(scheduleDTO);
        res.status(201).json(newSchedule);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const scheduleId = req.params.id;
        const userId = req.user.id;
        const scheduleDTO = scheduleService.createScheduleDTO(userId, req.body);
        const updatedSchedule = await scheduleService.updateSchedule(scheduleId, scheduleDTO);
        if (updatedSchedule) {
            res.json(updatedSchedule);
        } else {
            res.status(404).json({ message: 'Agendamento não encontrado' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const deleted = await scheduleService.deleteSchedule(req.params.id);
        if (deleted) {
            res.json({ message: 'Agendamento deletado com sucesso' });
        } else {
            res.status(404).json({ message: 'Agendamento não encontrado' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro ao deletar agendamento' });
    }
});

router.get('/', async (req, res) => {
    try {
        const schedules = await scheduleService.getAllSchedules();
        console.log('Returning schedules: ', schedules);
        res.json(schedules);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const eventId = req.params.id;
        const schedule = await scheduleService.findScheduleById(eventId);
        if (schedule) {
            res.json(schedule);
        } else {
            res.status(404).json({ message: 'Agendamento não encontrado' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
});

router.get('/room/:roomId', async (req, res) => {
    try {
        const roomId = req.params.roomId;
        const schedules = await scheduleService.findByRoomId(roomId);
        res.json(schedules);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro ao buscar agendamentos' });
    }
});

router.get('/resource/:resourceId', async (req, res) => {
    try {
        const resourceId = req.params.resourceId;
        const schedules = await scheduleService.findByResourceId(resourceId);
        res.json(schedules);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
});

router.get('/user/:userId', async (req, res) => {
    try {
        const userId = req.params.userId;
        const schedules = await scheduleService.findByUserId(userId);
        res.json(schedules);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
});



module.exports = router;