import productKeyModel from '../model/productKeyModel.js';

// Create a new product key
const createProductKey = async (postBody) => {
    return productKeyModel.create(postBody);
};

// Get all product keys
const getAllProductKeys = async () => {
    return productKeyModel.findAll();
};

// Update a product key
const updateProductKey = async (postBody, id) => {
    const [updated] = await productKeyModel.update(postBody, {
        where: { ID: id },
    });
    return updated > 0; // Returns true if any row was updated
};

// Get a product key by ID
const getProductKeyById = async (id) => {
    return productKeyModel.findByPk(id);
};

// Delete a product key
const deleteProductKey = async (id) => {
    const deleted = await productKeyModel.destroy({
        where: { ID: id },
    });
    return deleted > 0; // Returns true if any row was deleted
};

export const productKeyService = {
    createProductKey,
    getAllProductKeys,
    updateProductKey,
    getProductKeyById,
    deleteProductKey,
};
