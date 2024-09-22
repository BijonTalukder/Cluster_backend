import express from 'express';
import { productController } from '../controller/productController.js';
import { productKeyController } from '../controller/productKeysController.js';
import { freeTrialsController } from '../controller/freeTrialsController.js';
import { orderController } from '../controller/orderController.js';
import SSLCommerzPayment from 'sslcommerz-lts';
import ApiError from '../error/handleApiError.js';
import orderModel from '../model/orderModel.js';
import productKeyModel from '../model/productKeyModel.js';
import sendResponse from '../shared/sendResponse.js';



const router = express.Router();
//--------------------------product routes--------------------------
router.post("/product/create",productController.createProduct);
router.get("/product/",productController.getProducts);
router.get("/product/:id",productController.getProductById);
router.patch("/product/update/:id",productController.updateProduct);
router .delete("/product/delete/:id",productController.deleteProduct);

//--------------------------product keys routes-----------------------
router.post("/product-key/create",productKeyController.createProductKey);
router.get("/product-key/",productKeyController.getProductKeys);
router.get("/product-key/:id",productKeyController.getProductKeyById);
router.patch("/product-key/update/:id",productKeyController.updateProductKey);
router .delete("/product-key/delete/:id",productKeyController.deleteProductKey);


//--------------------------Free trials routes-----------------------
router.post("/free-trials/create",freeTrialsController.createFreeTrial);
router.get("/free-trials/",freeTrialsController.getFreeTrials);
router.get("/free-trials/:id",freeTrialsController.getFreeTrialById);
router.patch("/free-trials/update/:id",freeTrialsController.updateFreeTrial);
router .delete("/free-trials/delete/:id",freeTrialsController.deleteFreeTrial);

//--------------------------order routes-----------------------
router.post("/orders/create",orderController.createOrder);
router.get("/orders/",orderController.getOrders);
router.get("/orders/:id",orderController.getOrderById);
router.patch("/orders/update/:id",orderController.updateOrder);
router .delete("/orders/delete/:id",orderController.deleteOrder);


//------payment
router.post("/success",async(req,res)=>{
    const { transactionId, status } = req.query;  // SSLCommerz sends the transaction ID and status in the query parameters
    
    if (!transactionId) {
        return next(new ApiError(httpStatus.BAD_REQUEST, 'Invalid payment data'));
      }
  
      // Find one unsold product key
      const unsoldProductKey = await productKeyModel.findOne({
        where: {
          status: 'unsold',
        },
      });
  
      if (!unsoldProductKey) {
        return next(new ApiError(httpStatus.NOT_FOUND, 'No unsold product key found'));
      }
  
      // Update the order with the product key and set payment status to 'successed'
      const updatedOrder = await orderModel.update(
        {
          paymentStatus: 'successed',
          productKeyID: unsoldProductKey.ID,
        },
        {
          where: {
            transactionID: transactionId,
          },
        }
      );
  
      if (!updatedOrder) {
        return next(new ApiError(httpStatus.NOT_FOUND, 'Order not found'));
      }
  
      // Update the product key status to 'sold'
      await productKeyModel.update(
        {
          status: 'sold',
        },
        {
          where: {
            ID: unsoldProductKey.ID,
          },
        }
      );
      
    //   const orderDetails = await orderModel.findOne({
    //     where: {
    //         transactionID: transactionId,
    //     },
    // });

      // const emailSubject = 'Your Product Key';
      // const emailText = `
      //   <h3>Dear Customer,</h3>
      //   <p>Thank you for your purchase! Below is your product key:</p>
      //   <p><strong>Product Key:</strong> ${unsoldProductKey.name}</p>
      //   <p>We hope you enjoy using the product. If you have any questions, feel free to reach out to us.</p>
      // `;
      
      // await SendEmailUtility(orderDetails.email, emailText, emailSubject);
      sendResponse(res,{
        statusCode: httpStatus.OK,
        success: true,
        message: 'purchase successfully',
        data: null,
      })
    
})


export default router;
