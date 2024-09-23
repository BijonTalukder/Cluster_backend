import adminModel from "../model/adminModel.js";

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

export const adminService = {
  createAdmin,
  getAllAdmins,
  getAdminById,
  updateAdmin,
  deleteAdmin,
  getAdminByEmail
};
