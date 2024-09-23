import express from 'express';
import { productController } from '../controller/productController.js';
import { productKeyController } from '../controller/productKeysController.js';
import { freeTrialsController } from '../controller/freeTrialsController.js';
import { orderController } from '../controller/orderController.js';
import ApiError from '../error/handleApiError.js';
import orderModel from '../model/orderModel.js';
import productKeyModel from '../model/productKeyModel.js';
import sendResponse from '../shared/sendResponse.js';
import { adminController } from '../controller/adminController.js';
import { dotenvHelper } from '../config/dotenv.js';
import SendEmailUtility from '../shared/sendEmail.js';
import httpStatus from 'http-status';
// import SendEmailUtility from '../';


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


//--------------------------admin routes---------------------------------------
router.post("/admins/create",adminController.createAdmin);
router.post("/admins/login",adminController.loginAdmin)
// router.get("/")



//------------------------------payment routes----------------------------------
// router.post("/success",async(req,res,next)=>{
//     const { transactionId, status } = req.query;  // SSLCommerz sends the transaction ID and status in the query parameters
    
//     if (!transactionId) {
//         return next(new ApiError(httpStatus.BAD_REQUEST, 'Invalid payment data'));
//       }
//   console.log("hello dev");
  
//       // Find one unsold product key
//       const unsoldProductKey = await productKeyModel
//       .findOne({
//         where: {
//           status: 'unsold',
//         },
//       });
//       console.log("hello dev1",unsoldProductKey.dataValues);
//       if (!unsoldProductKey.dataValues) {
//         return next(new ApiError(httpStatus.NOT_FOUND, 'No unsold product key found'));
//       }
  
//       // Update the order with the product key and set payment status to 'successed'
//       const updatedOrder = await orderModel.update(
//         {
//           paymentStatus: 'successed',
//           productKeyID: unsoldProductKey.dataValues.ID,
//         },
//         {
//           where: {
//             transactionID: transactionId,
//           },
//         }
//       );
  
//       if (!updatedOrder) {
//         return next(new ApiError(httpStatus.NOT_FOUND, 'Order not found'));
//       }
  
//       // Update the product key status to 'sold'
//       await productKeyModel.update(
//         {
//           status: 'sold',
//         },
//         {
//           where: {
//             ID: unsoldProductKey.dataValues.ID,
//           },
//         }
//       );
      
//       const orderDetails = await orderModel.findOne({
//         where: {
//             transactionID: transactionId,
//         },
//     });
// console.log(orderDetails,"details");

//       const emailSubject = 'Your Product Key';
//       const emailText = `
//         <h3>Dear Customer,</h3>
//         <p>Thank you for your purchase! Below is your product key:</p>
//         <p><strong>Product Key:</strong> ${unsoldProductKey.dataValues.name}</p>
//         <p>We hope you enjoy using the product. If you have any questions, feel free to reach out to us.</p>
//       `;
      
//       await SendEmailUtility(orderDetails.dataValues.email, emailText, emailSubject);


//     res.redirect(`${dotenvHelper.frontend_url}/Product/success`)
    
// })
router.post("/success", async (req, res, next) => {
  const { transactionId } = req.query; // Assuming the transaction ID comes from query parameters

  if (!transactionId) {
      return next(new ApiError(httpStatus.BAD_REQUEST, 'Invalid payment data'));
  }
  
  console.log("Processing payment success...");

  try {
      // Find one unsold product key
      const unsoldProductKey = await productKeyModel.findOne({
          where: { status: 'unsold' },
      });

      console.log("Unsold product key found:", unsoldProductKey?.dataValues);

      if (!unsoldProductKey) {
          return next(new ApiError(httpStatus.NOT_FOUND, 'No unsold product key found'));
      }

      // Update the order with the product key and set payment status to 'successed'
      const updatedRows = await orderModel.update(
          {
              paymentStatus: 'successed',
              productKeyID: unsoldProductKey.ID,
          },
          {
              where: { transactionID: transactionId },
          }
      );
console.log(updatedRows);

      if (updatedRows === 0) {
          return next(new ApiError(httpStatus.NOT_FOUND, 'Order not found'));
      }

      //Update the product key status to 'sold'
     const pro= await productKeyModel.update(
          { status: 'sold' },
          { where: { ID: unsoldProductKey.ID } }
      );
console.log(pro);

      // // Retrieve order details for sending email
      const orderDetails = await orderModel.findOne({
          where: { transactionID: transactionId },
      });

      if (!orderDetails) {
          return next(new ApiError(httpStatus.NOT_FOUND, 'Order details not found'));
      }

      console.log("Order details retrieved:", orderDetails.dataValues);

      // Prepare and send the email
      const emailSubject = 'Your Product Key';
      const emailText = `
          <h3>Dear Customer,</h3>
          <p>Thank you for your purchase! Below is your product key:</p>
          <p><strong>Product Key:</strong> ${unsoldProductKey.name}</p>
          <p>We hope you enjoy using the product. If you have any questions, feel free to reach out to us.</p>
      `;
      
      await SendEmailUtility(orderDetails.email, emailText, emailSubject);

      // Redirect or respond
      res.redirect(`${dotenvHelper.frontend_url}/Product/success`);

  } catch (error) {
      console.error("Error processing payment success:", error);
      return next(new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'Internal server error'));
  }
});


export default router;
