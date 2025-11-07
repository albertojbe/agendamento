const eventService = require('../services/eventService');
const { validateJWT } = require('../middlewares/authMiddleware');

const express = require('express');
const router = express.Router();

router.use(validateJWT);

router.get('/', async (req, res) => {
    try {
        const events = await eventService.getAllEvents();
        res.json(events);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro ao buscar eventos' });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const eventId = req.params.id;
        const event = await eventService.findEventById(eventId);
        if (event) {
            res.json(event);
        } else {
            res.status(404).json({ message: 'Evento não encontrado' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro ao buscar evento' });
    }
});

router.get('/room/:roomId', async (req, res) => {
    try {
        const roomId = req.params.roomId;
        const events = await eventService.findEventByRoomId(roomId);
        res.json(events);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro ao buscar eventos' });
    }
});

router.get('/user/:userId', async (req, res) => {
    try {
        const userId = req.params.userId;
        const events = await eventService.findEventByUserId(userId);
        res.json(events);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro ao buscar eventos' });
    }
});

router.post('/', async (req, res) => {
    try {
        const userId = req.user.id;
        const eventDTO = eventService.createEventDTO(userId, req.body);
        const newEvent = await eventService.createEvent(eventDTO);
        res.status(201).json(newEvent);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro ao criar evento' });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const eventId = req.params.id;
        const userId = req.user.id;
        const eventDTO = eventService.createEventDTO(userId, req.body);
        const updatedEvent = await eventService.updateEvent(eventId, eventDTO);
        if (updatedEvent) {
            res.json(updatedEvent);
        } else {
            res.status(404).json({ message: 'Evento não encontrado' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro ao atualizar evento' });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const eventId = req.params.id;
        const deleted = await eventService.deleteEvent(eventId);
        if (deleted) {
            res.json({ message: 'Evento deletado com sucesso' });
        } else {
            res.status(404).json({ message: 'Evento não encontrado' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro ao deletar evento' });
    }
});

module.exports = router;