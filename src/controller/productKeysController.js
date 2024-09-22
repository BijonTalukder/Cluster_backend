import catchAsync from '../shared/catchAsync.js';
import sendResponse from '../shared/sendResponse.js';
import httpStatus from 'http-status';
import ApiError from '../error/handleApiError.js';
import { productKeyService } from '../service/productKeyService.js';

// Create a product key
const createProductKey = catchAsync(async (req, res, next) => {
  const productKey = await productKeyService.createProductKey(req.body);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Product key created successfully',
    data: productKey,
  });
});

// Get all product keys
const getProductKeys = catchAsync(async (req, res, next) => {
  const productKeys = await productKeyService.getAllProductKeys();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Product keys retrieved successfully',
    data: productKeys,
  });
});

// Get product key by ID
const getProductKeyById = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const productKey = await productKeyService.getProductKeyById(id);

  if (productKey) {
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Product key retrieved successfully',
      data: productKey,
    });
  } else {
    throw new ApiError(httpStatus.NOT_FOUND, 'Product key not found');
  }
});

// Update a product key
const updateProductKey = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const updated = await productKeyService.updateProductKey(req.body, id);

  if (updated) {
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Product key updated successfully',
      data: updated,
    });
  } else {
    throw new ApiError(httpStatus.NOT_FOUND,"Product key not found")
    // sendResponse(res, {
    //   statusCode: httpStatus.NOT_FOUND,
    //   success: false,
    //   message: 'Product key not found',
    //   data: null,
    // });
  }
});

// Delete a product key
const deleteProductKey = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const deleted = await productKeyService.deleteProductKey(id);

  if (deleted) {
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: `Product key with ID ${id} deleted successfully`,
      data: deleted,
    });
  } else {
    throw new ApiError(httpStatus.NOT_FOUND, `Product key with ID ${id} not found`);
  }
});

export const productKeyController = {
  createProductKey,
  getProductKeys,
  getProductKeyById,
  updateProductKey,
  deleteProductKey,
};
