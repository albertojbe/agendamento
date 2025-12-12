const errors = require("../errors");

class ResourceService {
    constructor(resourceRepository) {
        this.resourceRepository = resourceRepository;
    }

    async getAllResources() {
        const resources = await this.resourceRepository.findAll();
        return resources.map(resource => resource.toJSON());
    }

    async findResourceById(id) {
        const resource = await this.resourceRepository.findById(id);
        if (!resource) {
            throw new errors.NotFoundError('Recurso não encontrado');
        }
        return resource.toJSON();
    }

    async createResource(resourceDTO) {
        const newResource = await this.resourceRepository.create(resourceDTO);
        return newResource.toJSON();
    }

    async updateResource(id, resourceDTO) {
        const updatedResource = await this.resourceRepository.update(id, resourceDTO);
        if (!updatedResource) {
            throw new errors.NotFoundError('Recurso não encontrado');
        }
        return updatedResource.toJSON();
    }

    async deleteResource(id) {
        const deleted = await this.resourceRepository.delete(id);
        if (!deleted) {
            throw new errors.NotFoundError('Recurso não encontrado');
        }
        return true;
    }
}

module.exports = ResourceService;