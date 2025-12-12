const express = require('express');
const router = express.Router();

const errorMiddleware = require('../middlewares/errorMiddleware');
const ResourceService = require('../services/ResourceService');
const resourceRepository = require('../repositories/ResourceRepository');

const resourceServiceInstance = new ResourceService(resourceRepository);

const createResourceDTO = (resourceData) => {
    return {
        name: resourceData.name,
        quantity: resourceData.quantity,
        isActive: resourceData.isActive
    };
}

router.get('/', async (req, res, next) => {
    try {
        const resources = await resourceServiceInstance.getAllResources();
        res.json(resources);
    } catch (error) {
        next(error);
    }
});

router.get('/:id', async (req, res, next) => {
    try {
        const resource = await resourceServiceInstance.findResourceById(req.params.id);
        res.json(resource);
    } catch (error) {
        next(error);
    }
});

router.post('/', async (req, res, next) => {
    try {
        const resourceDTO = createResourceDTO(req.body);
        const newResource = await resourceServiceInstance.createResource(resourceDTO);
        res.status(201).json(newResource);
    } catch (error) {
        next(error);
    }
});

router.put('/:id', async (req, res, next) => {
    try {
        const resourceDTO = createResourceDTO(req.body);
        const updatedResource = await resourceServiceInstance.updateResource(req.params.id, resourceDTO);
        res.json(updatedResource);
    } catch (error) {
        next(error);
    }
});

router.delete('/:id', async (req, res, next) => {
    try {
        await resourceServiceInstance.deleteResource(req.params.id);
        res.json({ message: 'Recurso excluído com sucesso.' });
    } catch (error) {
        next(error);
    }
});

router.use(errorMiddleware);

module.exports = router;