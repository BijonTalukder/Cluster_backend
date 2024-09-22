import orderModel from '../model/orderModel.js';

// Create a new order
const createOrder = async (postBody) => {
    return orderModel.create(postBody);
};

// Get all orders
const getAllOrders = async () => {
    return orderModel.findAll();
};

// Update an order
const updateOrder = async (postBody, id) => {
    const [updated] = await orderModel.update(postBody, {
        where: { ID: id },
    });
    return updated > 0; // Returns true if any row was updated
};

// Get an order by ID
const getOrderById = async (id) => {
    return orderModel.findByPk(id);
};

// Delete an order
const deleteOrder = async (id) => {
    const deleted = await orderModel.destroy({
        where: { ID: id },
    });
    return deleted > 0; // Returns true if any row was deleted
};

export const orderService = {
    createOrder,
    getAllOrders,
    updateOrder,
    getOrderById,
    deleteOrder,
};
