import catchAsync from '../shared/catchAsync.js';
import sendResponse from '../shared/sendResponse.js';
import httpStatus from 'http-status';
import ApiError from '../error/handleApiError.js';
import { adminService } from '../service/adminService.js';
import adminModel from '../model/adminModel.js';
import { jwtHelpers } from '../helper/jwt/jwtHelpers.js';


// Create an admin
const createAdmin = catchAsync(async (req, res, next) => {
  const admin = await adminService.createAdmin(req.body);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Admin created successfully',
    data: admin,
  });
});

// Get all admins
const getAdmins = catchAsync(async (req, res, next) => {
  const admins = await adminService.getAllAdmins();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Admins retrieved successfully',
    data: admins,
  });
});

// Get admin by ID
const getAdminById = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const admin = await adminService.getAdminById(id);

  if (admin) {
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Admin retrieved successfully',
      data: admin,
    });
  } else {
    throw new ApiError(httpStatus.NOT_FOUND, 'Admin not found');
  }
});

// Update an admin
const updateAdmin = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const updatedAdmin = await adminService.updateAdmin(req.body, id);

  if (updatedAdmin) {
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Admin updated successfully',
      data: updatedAdmin,
    });
  } else {
    throw new ApiError(httpStatus.NOT_FOUND, 'Admin not found');
  }
});

// Delete an admin
const deleteAdmin = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const deletedAdmin = await adminService.deleteAdmin(id);

  if (deletedAdmin) {
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: `Admin with ID ${id} deleted successfully`,
      data: deletedAdmin,
    });
  } else {
    throw new ApiError(httpStatus.NOT_FOUND, `Admin with ID ${id} not found`);
  }
});
 
//login admin
const loginAdmin = catchAsync(async(req,res,next)=>{
    const { email, password } = req.body;
    if (!email || !password) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'Email and password are required');
      }

    const admin = await adminService.getAdminByEmail(email);
      if (!admin) {
        throw new ApiError(httpStatus.UNAUTHORIZED, 'Invalid email or password');
      }  
    //   console.log(adminModel.isPasswordValid)
    
  const isMatch = await admin.isPasswordValid(password);
    
      if (!isMatch) {
        throw new ApiError(httpStatus.UNAUTHORIZED, 'Invalid email or password');
       }
       const token = jwtHelpers.createToken(
        { id: admin.ID, email: admin.email }, // Payload
       'hello123', // Secret key from environment variables
        '5d' // Token expiration
      );
      sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Admin logged in successfully',
        data: { adminId: admin.ID, name: admin.name, email: admin.email, token }, // Include the token
      });

})

//change [passsword]
const changePassword = catchAsync(async (req, res, next) => {
  const { oldPassword, newPassword } = req.body;
  const { id } = req.user; 

  // Validate input
  if (!oldPassword || !newPassword) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Old password and new password are required');
  }
  try {
    const admin = await adminService.changePassword(id, oldPassword, newPassword);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Password changed successfully',
      data: { adminId: admin.ID, name: admin.name, email: admin.email },
    });
  } catch (error) {
    next(new ApiError(httpStatus.BAD_REQUEST, error.message));
  }
});
export const adminController = {
  createAdmin,
  getAdmins,
  getAdminById,
  updateAdmin,
  deleteAdmin,
  loginAdmin,
  changePassword
};
