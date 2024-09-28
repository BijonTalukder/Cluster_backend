import httpStatus from 'http-status';
import catchAsync from '../shared/catchAsync.js';
import ApiError from '../error/handleApiError.js';
import sequelize from '../model/index.js';
import SendEmailUtility from '../shared/sendEmail.js';
import { dotenvHelper } from '../config/dotenv.js';
import productKeyModel from '../model/productKeyModel.js';
import orderModel from '../model/orderModel.js';
import generateEmail from '../helper/EmailFormat/EmailFormat.js';

// Handle payment success
const handlePaymentSuccess = catchAsync(async (req, res, next) => {
    const { transactionId } = req.query;

    if (!transactionId) {
        return res.redirect(`${dotenvHelper.frontend_url}/Product/notFound?message=Transaction ID is required`);
    }

    const transaction = await sequelize.transaction(); // Start transaction

    try {
        // Find order by transaction ID
        const orderDetails = await orderModel.findOne({
            where: { transactionID: transactionId },
            transaction,
        });

        if (!orderDetails) {
            await transaction.rollback(); // Rollback in case of error

            return res.redirect(`${dotenvHelper.frontend_url}/Product/notFound?message=Order details not found`);
            // return next(new ApiError(httpStatus.NOT_FOUND, 'Order details not found'));
        }

        const { productName } = orderDetails;
        let productKeyName = '';
        // let emailHtml
        // Match the product key name based on the order's product name
        switch (productName) {
            case 'Cluster Antivirus':
                productKeyName = 'Cluster Antivirus';
                // emailHtml = generateEmail(orderDetails.name)(unsoldProductKey.productKey)(productKeyName)
                break;
            case 'Cluster Internet Security':
                productKeyName = 'Cluster Internet Security';
                // emailHtml = generateEmail(orderDetails.name)(unsoldProductKey.productKey)(productKeyName)
                break;
            case 'Cluster Total Security':
                productKeyName = 'Cluster Total Security';
                // emailHtml = generateEmail(orderDetails.name)(unsoldProductKey.productKey)(productKeyName)
                break;
            case 'Cluster Antivirus Business':
                productKeyName = 'Cluster Antivirus Business';
                // emailHtml = generateEmail(orderDetails.name)(unsoldProductKey.productKey)(productKeyName)
                break;
            default:
                await transaction.rollback();
                return res.redirect(`${dotenvHelper.frontend_url}/Product/notFound?message=Invalid product name`);
                // return next(new ApiError(httpStatus.NOT_FOUND, 'Invalid product name'));
        }

        // Find one unsold product key that matches the product key name
        const unsoldProductKey = await productKeyModel.findOne({
            where: {
                status: 'unsold',
                name: productKeyName,
            },
            transaction,
        });

        if (!unsoldProductKey) {
            await transaction.rollback();
            return res.redirect(`${dotenvHelper.frontend_url}/Product/Key`);
        }
        const emailHtml = generateEmail(orderDetails.name)(unsoldProductKey.productKey)(productKeyName);

        // Update the order with the product key and set payment status to 'successed'
        const [updatedRows] = await orderModel.update(
            {
                paymentStatus: 'successed',
                productKeyID: unsoldProductKey.ID,
            },
            {
                where: { transactionID: transactionId },
                transaction,
            }
        );

        if (updatedRows === 0) {
            await transaction.rollback();
            return next(new ApiError(httpStatus.NOT_FOUND, 'Order not found or not updated'));
        }

        // Update the product key status to 'sold'
        const [updatedKeys] = await productKeyModel.update(
            { status: 'sold' },
            { where: { ID: unsoldProductKey.ID }, transaction }
        );

        if (updatedKeys === 0) {
            await transaction.rollback();
            return next(new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'Failed to update product key status'));
        }

        // Commit transaction if all updates are successful
        await transaction.commit();

        // Prepare and send the email
        const emailSubject = 'Your Antivirus Purchase: Download Link, License Key, and Installation Instructions';
        // const emailText = `
        //     <h3>Dear Customer,</h3>
        //     <p>Thank you for your purchase! Below is your product key:</p>
        //     <p><strong>Product Key:</strong> ${unsoldProductKey.productKey}</p>
        //     <p>We hope you enjoy using the product. If you have any questions, feel free to reach out to us.</p>
        // `;

        await SendEmailUtility(orderDetails.email, emailHtml, emailSubject);

        // Redirect to success page
        res.redirect(`${dotenvHelper.frontend_url}/Product/success`);

    } catch (error) {
        // Rollback transaction on error
        await transaction.rollback();
        console.error("Error processing payment success:", error);
        return next(new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'Internal server error'));
    }
});

// Handle payment fail
const handlePaymentFail = catchAsync(async (req, res, next) => {
    const { transactionId } = req.query;

    if (!transactionId) {
        return next(new ApiError(httpStatus.BAD_REQUEST, 'Invalid payment data'));
    }

    console.log('Processing payment failure...');

    try {
        // Update the order's payment status to 'failed'
        const updatedRows = await orderModel.update(
            { paymentStatus: 'failed' },
            { where: { transactionID: transactionId } }
        );

        console.log('Rows updated:', updatedRows);

        if (updatedRows[0] === 0) {
            return next(new ApiError(httpStatus.NOT_FOUND, 'Order not found'));
        }

        // Redirect to the fail page
        res.redirect(`${dotenvHelper.frontend_url}/Product/error?transactionId=${transactionId}`);
    } catch (error) {
        console.error('Error processing payment failure:', error);
        return next(new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'Internal server error'));
    }
});

// Handle payment cancel
const handlePaymentCancel = catchAsync(async (req, res, next) => {
    const { transactionId } = req.query;

    if (!transactionId) {
        return next(new ApiError(httpStatus.BAD_REQUEST, 'Invalid payment data'));
    }

    console.log('Processing payment cancellation...');

    try {
        // Update the order's payment status to 'cancelled'
        const updatedRows = await orderModel.update(
            { paymentStatus: 'cancelled' },
            { where: { transactionID: transactionId } }
        );

        console.log('Rows updated:', updatedRows);

        if (updatedRows[0] === 0) {
            return next(new ApiError(httpStatus.NOT_FOUND, 'Order not found'));
        }

        // Redirect to the cancel page
        res.redirect(`${dotenvHelper.frontend_url}/Product/error?transactionId=${transactionId}`);
    } catch (error) {
        console.error('Error processing payment cancellation:', error);
        return next(new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'Internal server error'));
    }
});

export const paymentController = {
    handlePaymentSuccess,
    handlePaymentFail,
    handlePaymentCancel
};
