const express = require('express');
const multer = require('multer');

const RoomService = require('../services/RoomService');
const roomRepository = require('../repositories/RoomRepository');
const { validateJWT } = require('../middlewares/authMiddleware');
const errorMiddleware = require('../middlewares/errorMiddleware');

const router = express.Router();
const upload = multer({ dest: './public/images/roomImages/' });

const roomServiceInstance = new RoomService(roomRepository);

router.use(validateJWT);

router.get('/', async (req, res, next) => {
    try {
        const rooms = await roomServiceInstance.getAllRooms();
        res.json(rooms);
    } catch (error) {
        next(error);
    }
});

router.get('/:id', async (req, res, next) => {
    try {
        const room = await roomServiceInstance.findRoomById(req.params.id);
        res.json(room);
    } catch (error) {
        next(error);
    }
});

router.post('/', upload.single('roomImage'), async (req, res, next) => {
    try {
        const roomDTO = roomServiceInstance.createRoomDTO(req.body);
        if (req.file) {
            roomDTO.imagePath = req.file.path;
        }
        const newRoom = await roomServiceInstance.createRoom(roomDTO);
        res.status(201).json(newRoom);
    } catch (error) {
        next(error);
    }
});

router.put('/:id', upload.single('roomImage'), async (req, res, next) => {
    try {
        const roomDTO = roomServiceInstance.createRoomDTO(req.body);
        if (req.file) {
            roomDTO.imagePath = req.file.path;
        }
        const updatedRoom = await roomServiceInstance.updateRoom(req.params.id, roomDTO);
        res.json(updatedRoom);
    } catch (error) {
        next(error);
    }
});

router.delete('/:id', async (req, res, next) => {
    try {
        await roomServiceInstance.deleteRoom(req.params.id);
        res.json({ message: 'Sala excluída com sucesso' });
    } catch (error) {
        next(error);
    }
});

router.use(errorMiddleware);

module.exports = router;