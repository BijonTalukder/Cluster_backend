import productModel from "../model/productModel.js";


// Create product
const createProduct = async (postBody) => {
    return productModel.create(postBody);
};

// Get all products
const getProducts = async () => {
    return productModel.findAll();
};

// Update product
const updateProduct = async (postBody, id) => {
    const [updated] = await productModel.update(postBody, {
        where: { productId: id },
    });
    return updated > 0; // Check if any row was updated
};

// Get single product by ID
const getProductById = async (id) => {
    return productModel.findByPk(id);
};

// Delete product
const deleteProduct = async (id) => {
    const deleted = await productModel.destroy({
        where: { productId: id },
    });
    return deleted > 0;
};

export const productService = {
    createProduct,
    getProducts,
    updateProduct,
    getProductById,
    deleteProduct,
};
