const express = require('express');
const router = express.Router();
const resourceService = require('../services/resourceService');

// Get all resources
router.get('/', async (req, res) => {
    try {
        const resources = await resourceService.getAllResources();
        res.json(resources);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch resources' });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const resource = await resourceService.findResourceById(req.params.id);
        if (resource) {
            res.json(resource);
        } else {
            res.status(404).json({ message: 'Resource not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch resource' });
    }
});

router.post('/', async (req, res) => {
    try {
        const resourceDTO = resourceService.createResourceDTO(req.body);
        const newResource = await resourceService.createResource(resourceDTO);
        res.status(201).json(newResource);
    } catch (error) {
        res.status(500).json({ message: 'Failed to create resource' });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const resourceDTO = resourceService.createResourceDTO(req.body);
        const updatedResource = await resourceService.updateResource(req.params.id, resourceDTO);
        if (updatedResource) {
            res.json(updatedResource);
        } else {
            res.status(404).json({ message: 'Resource not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Failed to update resource' });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const deleted = await resourceService.deleteResource(req.params.id);
        if (deleted) {
            res.json({ message: 'Resource deleted successfully' });
        } else {
            res.status(404).json({ message: 'Resource not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Failed to delete resource' });
    }
});

module.exports = router;