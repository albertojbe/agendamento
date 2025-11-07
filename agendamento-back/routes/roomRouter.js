const express = require('express');
const { validateJWT } = require('../middlewares/authMiddleware');

const roomServicee = require('../services/roomService');

const router = express.Router();

router.use(validateJWT);

router.get('/', (req, res) => {
    try {
        roomServicee.getAllRooms()
            .then(rooms => {
                res.json(rooms);
            }); 
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get('/:id', (req, res) => {
    try {
        const roomId = req.params.id;
        roomServicee.findRoomById(roomId)
            .then(room => {
                if (room) {
                    res.json(room);
                } else {
                    res.status(404).json({ message: 'Sala não encontrada' });
                }
            });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.post('/', async (req, res) => {
    try {
        const roomDTO = roomServicee.createRoomDTO(req.body);
        const newRoom = await roomServicee.createRoom(roomDTO);
        res.status(201).json(newRoom);
    } catch (error) {
        if (error.status === 409) {
            res.status(409).json({ message: error.message });
        } else {
            console.error(error);
            res.status(500).json({ message: 'Erro ao criar sala' });
        }
    }
});

router.put('/:id', (req, res) => {
    try {
        const roomId = req.params.id;
        const roomDTO = roomServicee.createRoomDTO(req.body);
        roomServicee.updateRoom(roomId, roomDTO)
            .then(updatedRoom => {
                if (updatedRoom) {
                    res.json(updatedRoom);
                } else {
                    res.status(404).json({ message: 'Sala não encontrada' });
                }
            });     
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.delete('/:id', (req, res) => {
    try {
        const roomId = req.params.id;
        roomServicee.deleteRoom(roomId)
            .then(deleted => {
                if (deleted) {
                    res.json({ message: 'Sala excluida com sucesso' });
                } else {
                    res.status(404).json({ message: 'Sala não encontrada' });
                }
            });     
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;