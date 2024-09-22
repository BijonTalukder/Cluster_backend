// import httpStatus from "http-status";
// import ApiError from "../error/handleApiError.js";

// import bcrypt from 'bcrypt'
// import { jwtHelpers } from "../helper/jwt/jwtHelpers.js";
// import erpUserModel from "../model/erpUserModel.js";
// const erpUserLogin=async(payload)=>{
//     const {email,password} = payload;
//     const  erpUserExist = await erpUserModel.findOne({
//         where:{
//             erpUserEmail:email
//         }});
//         if(!erpUserExist){
//             throw new ApiError(httpStatus.NOT_FOUND,"user not exist");
//         }

//     const passwordExist =  await bcrypt.compare(password, erpUserExist.erpUserEmail);;

//     if(erpUserExist && !passwordExist)
//         throw new ApiError(httpStatus.UNAUTHORIZED,"password incorrect")

//    const token = await jwtHelpers.createToken({
//     sysAdminId:erpUserExist.erpUserId,
//     role:erpUserExist.erpUserRole
//    },"key123","1d")

   
// return {
//     token
// }
// }
// export default erpUserLogin
import httpStatus from "http-status";
import ApiError from "../error/handleApiError.js";
import bcrypt from 'bcrypt';
import { jwtHelpers } from "../helper/jwt/jwtHelpers.js";
import erpUserModel from "../model/erpUserModel.js";

const erpUserLogin = async (payload) => {
  const { identifier, password } = payload; // identifier can be email, phone, or username

  // Find the user by username first to check verification statuses
  const userByUsername = await erpUserModel.findOne({
    where: { erpUsername: identifier }
  });

  if (!userByUsername) {
    throw new ApiError(httpStatus.NOT_FOUND, "User does not exist");
  }

  // Determine which identifiers are allowed based on verification status
  let searchCondition = {};

  if (userByUsername.erpUserEmailVerified && /^\S+@\S+\.\S+$/.test(identifier)) {
    // If email is verified and identifier is an email
    searchCondition.erpUserEmail = identifier;
  } else if (userByUsername.erpUserPhoneVerified && /^[0-9\-\+\(\) ]+$/.test(identifier)) {
    // If mobile is verified and identifier is a phone number
    searchCondition.erpUserPhone = identifier;
  } else if (
    !userByUsername.erpUserEmailVerified && !userByUsername.erpUserPhoneVerified &&
    identifier === userByUsername.erpUsername
  ) {
    // If neither email nor phone is verified, only allow login via username
    searchCondition.erpUsername = identifier;
  } else if (
    userByUsername.erpUserEmailVerified && identifier === userByUsername.erpUsername
  ) {
    // If email is verified, allow login via username
    searchCondition.erpUsername = identifier;
  } else {
    throw new ApiError(httpStatus.UNAUTHORIZED, "Login not allowed with the provided identifier");
  }

  // Find user based on the determined search condition
  const erpUserExist = await erpUserModel.findOne({
    where: searchCondition,
  });

  if (!erpUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, "User does not exist or is not verified");
  }

  // Validate password
  const passwordExist = await bcrypt.compare(password, erpUserExist.erpUserPassword);
  if (!passwordExist) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "Incorrect password");
  }

  // Generate JWT token
  const token = await jwtHelpers.createToken(
    {
      sysAdminId: erpUserExist.erpUserId,
      role: erpUserExist.erpUserRole,
    },
    "key123",
    "1d"
  );

  // Return response
  return {
    token,
    user: {
      id: erpUserExist.erpUserId,
      role: erpUserExist.erpUserRole,
      email: erpUserExist.erpUserEmail,
    },
  };
};

export default erpUserLogin;
