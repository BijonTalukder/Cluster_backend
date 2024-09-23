import catchAsync from '../shared/catchAsync.js';
import { orderService } from '../service/orderService.js';
import sendResponse from '../shared/sendResponse.js';
import httpStatus from 'http-status';
import ApiError from '../error/handleApiError.js';
import { v4 as uuidv4 } from 'uuid';
import SSLCommerzPayment from 'sslcommerz-lts';
// Create an order
const createOrder = catchAsync(async (req, res, next) => {
    const store_id = 'bijon66efc7e8a6d5e';
    const store_password = 'bijon66efc7e8a6d5e@ssl';
    const is_live = false;
    
    const postBody = req.body;
    const { price, productName, address, name, email, phone } = postBody;
    
    // Generate unique transaction ID
    const tran_id = uuidv4();

    // Create the order first with pending payment status
    const orderData = {
        ...postBody,
        transactionID: tran_id,
        paymentStatus: 'pending',
    };
console.log(orderData);

    const order = await orderService.createOrder(orderData);

    // Prepare SSLCommerz data
    const data = {
        total_amount: price,
        currency: 'BDT',
        tran_id: tran_id, // unique tran_id for each API call
        success_url: `http://localhost:4000/api/v1/success?transactionId=${tran_id}`,
        fail_url: `http://localhost:3030/fail`,
        cancel_url: `http://localhost:3030/cancel`,
        ipn_url: `http://localhost:3030/ipn`,
        shipping_method: 'Courier',
        product_name: productName,
        product_category: 'software',
        product_profile: 'non-physical-goods',
        cus_name: name,
        cus_email: email,
        cus_add1: address,
        cus_phone: phone,
        ship_name: name,
        ship_add1: address,
        ship_city: address,
        ship_postcode: 1000,
        ship_country: 'Bangladesh',
    };

    // Initialize SSLCommerz
    const sslcz = new SSLCommerzPayment(store_id, store_password, is_live);

    // Call SSLCommerz API and handle response
    sslcz.init(data)
    .then(apiResponse => {
        console.log('SSLCommerz Response:', apiResponse); // Log response
        let GatewayPageURL = apiResponse.GatewayPageURL;
        if (GatewayPageURL) {
            res.status(httpStatus.OK).json({
                success: true,
                message: 'Payment gateway initialized successfully',
                GatewayPageURL: GatewayPageURL
            });
        } else {
            throw new ApiError(httpStatus.BAD_REQUEST, 'Unable to initiate payment');
        }
    })
    .catch(err => {
        console.error('SSLCommerz Error:', err); // Log detailed error
        next(new ApiError(httpStatus.INTERNAL_SERVER_ERROR, `Payment initialization failed${err}`));
    });

});
// Get all orders
const getOrders = catchAsync(async (req, res, next) => {
    const orders = await orderService.getAllOrders();

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Orders retrieved successfully',
        data: orders,
    });
});

// Get order by ID
const getOrderById = catchAsync(async (req, res, next) => {
    const { id } = req.params;
    const order = await orderService.getOrderById(id);

    if (order) {
        sendResponse(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: 'Order retrieved successfully',
            data: order,
        });
    } else {
        throw new ApiError(httpStatus.NOT_FOUND, 'Order not found');
    }
});

// Update an order
const updateOrder = catchAsync(async (req, res, next) => {
    const { id } = req.params;
    const updated = await orderService.updateOrder(req.body, id);

    if (updated) {
        sendResponse(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: 'Order updated successfully',
            data: updated,
        });
    } else {
        throw new ApiError(httpStatus.NOT_FOUND,'Order not found')
       
    }
});

// Delete an order
const deleteOrder = catchAsync(async (req, res, next) => {
    const { id } = req.params;
    const deleted = await orderService.deleteOrder(id);

    if (deleted) {
        sendResponse(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: `Order with ID ${id} deleted successfully`,
            data: deleted,
        });
    } else {
        throw new ApiError(httpStatus.NOT_FOUND, `Order with ID ${id} not found`);
    }
});

export const orderController = {
    createOrder,
    getOrders,
    getOrderById,
    updateOrder,
    deleteOrder,
};
