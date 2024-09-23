import catchAsync from '../shared/catchAsync.js';

import sendResponse from '../shared/sendResponse.js';
import httpStatus from 'http-status';
import ApiError from '../error/handleApiError.js';
import { freeTrialsService } from '../service/freeTrialsService.js';
import SendEmailUtility from '../shared/sendEmail.js';

// Create Free Trial
const createFreeTrial = catchAsync(async (req, res, next) => {
  // Create free trial entry
  const postBody = req.body
  const {productName,email}=postBody;
  const freeTrial = await freeTrialsService.createFreeTrial(postBody);
  let emailSubject = '';
  let emailText = '';

  if (productName === "Cluster Antivirus") {
    emailSubject = 'Cluster Antivirus Free Trial';
    emailText = `
      <h3>Dear Customer,</h3>
      <p>Thank you for choosing Cluster Antivirus. Click the link below to download your free trial:</p>
      <a href="download-link-antivirus">Download Cluster Antivirus</a>
    `;
  } else if (productName === "Cluster Internet Security") {
    emailSubject = 'Cluster Internet Security Free Trial';
    emailText = `
      <h3>Dear Customer,</h3>
      <p>Thank you for choosing Cluster Internet Security. Click the link below to download your free trial:</p>
      <a href="download-link-internet-security">Download Cluster Internet Security</a>
    `;
  } else if (productName === "Cluster Total Security") {
    emailSubject = 'Cluster Total Security Free Trial';
    emailText = `
      <h3>Dear Customer,</h3>
      <p>Thank you for choosing Cluster Total Security. Click the link below to download your free trial:</p>
      <a href="download-link-total-security">Download Cluster Total Security</a>
    `;
  } else if (productName === "Cluster Antivirus for Business") {
    emailSubject = 'Cluster Antivirus for Business Free Trial';
    emailText = `
      <h3>Dear Customer,</h3>
      <p>Thank you for choosing Cluster Antivirus for Business. Click the link below to download your free trial:</p>
      <a href="download-link-antivirus-business">Download Cluster Antivirus for Business</a>
    `;
  }

  // Send the email
  const res1 = await SendEmailUtility(email, emailText, emailSubject);
  console.log(res1);
  
  sendResponse(res, {
    statusCode: httpStatus.CREATED, 
    success: true,
    message: 'Submission Successful Please Check your email for download link',
    data: freeTrial,
  });
});

// Get All Free Trials
const getFreeTrials = catchAsync(async (req, res, next) => {
  const freeTrials = await freeTrialsService.getAllFreeTrials();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Free trials retrieved successfully',
    data: freeTrials,
  });
});

// Get Free Trial By ID
const getFreeTrialById = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const freeTrial = await freeTrialsService.getFreeTrialById(id);

  if (freeTrial) {
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Free trial retrieved successfully',
      data: freeTrial,
    });
  } else {
    throw new ApiError(httpStatus.NOT_FOUND, 'Free trial not found');
  }
});

// Update Free Trial
const updateFreeTrial = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const updatedTrial = await freeTrialsService.updateFreeTrial(id, req.body);

  if (updatedTrial) {
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Free trial updated successfully',
      data: updatedTrial,
    });
  } else {
    throw new ApiError(httpStatus.NOT_FOUND,'Free trial not found')
  
  }
});

// Delete Free Trial
const deleteFreeTrial = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const result = await freeTrialsService.deleteFreeTrial(id);

  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, `Free trial with ID ${id} not found`);
  }

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: `Free trial with ID ${id} deleted successfully`,
    data: result,
  });
});

export const freeTrialsController = { 
  createFreeTrial, 
  getFreeTrials, 
  getFreeTrialById, 
  updateFreeTrial, 
  deleteFreeTrial 
};
