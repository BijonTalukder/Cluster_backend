import httpStatus from "http-status";
import ApiError from "../error/handleApiError.js";
import adminModel from "../model/adminModel.js";
import bcrypt from 'bcrypt'
// Create a new admin
const createAdmin = async (adminData) => {
  return await adminModel.create(adminData);
};

// Get all admins
const getAllAdmins = async () => {
  return await adminModel.findAll();
};

// Get an admin by ID
const getAdminById = async (id) => {
  return await adminModel.findByPk(id);
};

// Update an admin
const updateAdmin = async (data, id) => {
  const admin = await adminModel.findByPk(id);
  if (!admin) return null;

  return await admin.update(data);
};

// Delete an admin
const deleteAdmin = async (id) => {
  const admin = await adminModel.findByPk(id);
  if (!admin) return null;

  return await admin.destroy();
};

const getAdminByEmail = async (email) => {
    return await adminModel.findOne({ where: { email } });
  };

  const changePassword = async (adminId, oldPassword, newPassword) => {
    // Find the admin by ID
    const admin = await adminModel.findByPk(adminId);
    if (!admin) {
      throw new ApiError(httpStatus.NOT_FOUND,'Admin not found');
    }
  
    // Check if the old password matches
    const isMatch = await admin.isPasswordValid(oldPassword);
    if (!isMatch) {
      throw new ApiError(httpStatus.BAD_REQUEST,'Old password is incorrect');
      // throw new Error('Old password is incorrect');
    }
  
    // Hash the new password and update the admin
    admin.password = await bcrypt.hash(newPassword, 10);
    await admin.save();
  
    return admin;
  };

export const adminService = {
  createAdmin,
  getAllAdmins,
  getAdminById,
  updateAdmin,
  deleteAdmin,
  getAdminByEmail,
  changePassword
};
