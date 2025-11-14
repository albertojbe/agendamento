const Resource = require('../models/resourceModel');

exports.getAllResources = async function() {
    try {
        const resources = await Resource.findAll();
        return resources.map(resource => resource.toJSON());
    }
    catch (error) {
        throw new Error('Erro ao buscar recursos: ' + error.message);
    }
};

exports.findResourceById = async function(id) {
    try {
        const resource = await Resource.findByPk(id);
        return resource ? resource.toJSON() : null;
    }
    catch (error) {
        throw new Error('Erro ao buscar recurso: ' + error.message);
    }
}

exports.deleteResource = async function(id) {
    try {
        const deleted = await Resource.destroy({ where: { id: id } });
        return deleted > 0;
    } catch(error) {
        throw new Error('Erro ao deletar recurso: ' + error.message)
    }
}

exports.createResource = async function(resourceDTO) {
    try {
        const newResource = await Resource.create(resourceDTO);
        return newResource.toJSON();
    } catch (error) {
        throw new Error('Erro ao criar recurso: ' + error.message);
    }
}

exports.updateResource = async function(id, resourceDTO) {
    try {
        await Resource.update(resourceDTO, { where: { id: id } });
        const updatedResource = await Resource.findByPk(id);
        return updatedResource ? updatedResource.toJSON() : null;
    } catch(error) {
        throw new Error('Erro ao atualizar recurso: ' + error.message)
    }
}

exports.createResourceDTO = function(resourceData) {
    return {
        name: resourceData.name,
        quantity: resourceData.quantity,
        type: resourceData.type,
        active: resourceData.active
    }
}