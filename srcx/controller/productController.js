
import httpStatus from 'http-status';
import catchAsync from '../shared/catchAsync.js';
import sendResponse from '../shared/sendResponse.js';
import { productService } from '../service/productService.js';


const createProduct = catchAsync(async (req, res, next) => {


  // Create product
  const product = await productService.createProduct(req.body);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Product created successfully',
    data: product
  });
});

const getProducts = catchAsync(async (req, res, next) => {
  const data = await productService.getProducts();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Products retrieved successfully',
    data: data
  });
});

const updateProduct = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  // Update product
  const updated = await productService.updateProduct(req.body, id);

  if (updated) {
    const updatedProduct = await ProductModel.findByPk(id);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Product updated successfully',
      data: updatedProduct
    });
  } else {
    sendResponse(res, {
      statusCode: httpStatus.NOT_FOUND,
      success: false,
      message: 'Product not found',
      data: null
    });
  }
});

const getProductById = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  // Retrieve product
  const data = await productService.getProductById(id);

  if (data) {
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Product retrieved successfully',
      data: data
    });
  } else {
    sendResponse(res, {
      statusCode: httpStatus.NOT_FOUND,
      success: false,
      message: 'Product not found',
      data: null
    });
  }
});

const deleteProduct = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  // Delete product
  const deleted = await productService.deleteProduct(id);

  if (deleted) {
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Product deleted successfully.',
      data: null
    });
  } else {
    sendResponse(res, {
      statusCode: httpStatus.NOT_FOUND,
      success: false,
      message: 'Product not found',
      data: null
    });
  }
});

export const productController = { createProduct, getProducts, getProductById, updateProduct, deleteProduct };
