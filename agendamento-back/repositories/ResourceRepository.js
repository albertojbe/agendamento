const Resource = require('../models/resourceModel');

class ResourceRepository {
    async findAll() {
        return await Resource.findAll();
    }

    async findById(id) {
        return await Resource.findByPk(id);
    }

    async create(resourceData) {
        return await Resource.create(resourceData);
    }

    async update(id, resourceData) {
        const [updated] = await Resource.update(resourceData, { where: { id } });
        if (updated === 0) {
            return null;
        }
        return await Resource.findByPk(id);
    }

    async delete(id) {
        return await Resource.destroy({ where: { id } });
    }
}

module.exports = new ResourceRepository();