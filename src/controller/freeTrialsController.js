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
    emailText = 
    `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Antivirus Trial Activation</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                margin: 0;
                padding: 0;
                background-color: #f4f4f4;
                color: #333;
            }
            .container {
                width: 100%;
                max-width: 600px;
                margin: 0 auto;
                background-color: #fff;
                border-radius: 8px;
                box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                overflow: hidden;
            }
            .header {
                background-color: #007bff;
                color: #fff;
                padding: 20px;
                text-align: center;
            }
            .content {
                padding: 20px;
            }
            h1 {
                font-size: 24px;
                margin: 0;
            }
            h2 {
                font-size: 20px;
                color: #007bff;
            }
            p {
                line-height: 1.5;
            }
            ol {
                margin: 15px 0;
            }
            a {
                color: #007bff;
                text-decoration: none;
            }
            .footer {
                padding: 10px;
                text-align: center;
                background-color: #f4f4f4;
                font-size: 12px;
                color: #777;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h1>Cluster Antivirus</h1>
            </div>
            <div class="content">
                <h2>Dear Customer,</h2>
                <p>I hope this email finds you well.</p>
                <p>Thank you for submitting the form to access our antivirus software's 30-day trial edition. We are pleased to provide you with the opportunity to evaluate our software and experience its features firsthand.</p>
    
                <h2>To get started, please follow the instructions below:</h2>
                <ol>
                    <li><strong>Download the Software:</strong>
                        <br>Click on the following link to download the trial edition of our antivirus software:
                        <br><a href="https://clusterantivirus.com/download/CTS3Setup_3.0.2297.0_en.msi" target="_blank">Download Link</a>
                    </li>
                    <li><strong>Install the Software:</strong>
                        <br>After the download is complete, locate the installation file on your computer and double-click it to begin the installation process. Follow the on-screen prompts to complete the installation.
                    </li>
                    <li><strong>Automatic Trial Activation:</strong>
                        <br>Once the installation is complete, the 30-day trial edition will automatically activate. You will be able to use the software immediately and explore all its features during the trial period.
                    </li>
                </ol>
    
                <h2>What to Expect:</h2>
                <ul>
                    <li><strong>Full Access:</strong> During the trial period, you will have access to all the features of the full version of our antivirus software, allowing you to experience its comprehensive protection and functionality.</li>
                    <li><strong>Support:</strong> If you have any questions or need assistance during the trial period, our support team is here to help. You can reach out to us at <a href="mailto:support@example.com">support@example.com</a> or call [Support Phone Number], and we will be happy to assist you.</li>
                </ul>
    
                <p>We are confident that our antivirus software will meet your needs and provide you with the protection you require. We encourage you to take full advantage of the trial period to evaluate its performance and benefits.</p>
    
                <p>Please let us know if you encounter any issues or have any feedback. Your input is invaluable to us as we continuously work to improve our products and services.</p>
    
                <p>Thank you once again for your interest in our antivirus software. We look forward to hearing about your experience and hope that you find our solution to be a valuable asset.</p>
            </div>
            <div class="footer">
                <p>This is an automated message. Please do not reply.</p>
                <p>If you need assistance, feel free to contact our support team at <a href="mailto:support@example.com">support@example.com</a> or visit our Help Center.</p>
                <p>Thank you, <br>Cluster Antivirus<br><a href="https://www.clusterantivirus.com">www.clusterantivirus.com</a></p>
            </div>
        </div>
    </body>
    </html>
    ;`
  } else if (productName === "Cluster Internet Security") {
    emailSubject = 'Your 30-Day Trial Edition of Cluster Antivirus Software';
    emailText = `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Antivirus Trial Activation</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                margin: 0;
                padding: 0;
                background-color: #f4f4f4;
                color: #333;
            }
            .container {
                width: 100%;
                max-width: 600px;
                margin: 0 auto;
                background-color: #fff;
                border-radius: 8px;
                box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                overflow: hidden;
            }
            .header {
                background-color: #007bff;
                color: #fff;
                padding: 20px;
                text-align: center;
            }
            .content {
                padding: 20px;
            }
            h1 {
                font-size: 24px;
                margin: 0;
            }
            h2 {
                font-size: 20px;
                color: #007bff;
            }
            p {
                line-height: 1.5;
            }
            ol {
                margin: 15px 0;
            }
            a {
                color: #007bff;
                text-decoration: none;
            }
            .footer {
                padding: 10px;
                text-align: center;
                background-color: #f4f4f4;
                font-size: 12px;
                color: #777;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h1>Cluster Antivirus</h1>
            </div>
            <div class="content">
                <h2>Dear Customer,</h2>
                <p>I hope this email finds you well.</p>
                <p>Thank you for submitting the form to access our antivirus software's 30-day trial edition. We are pleased to provide you with the opportunity to evaluate our software and experience its features firsthand.</p>
    
                <h2>To get started, please follow the instructions below:</h2>
                <ol>
                    <li><strong>Download the Software:</strong>
                        <br>Click on the following link to download the trial edition of our antivirus software:
                        <br><a href="https://clusterantivirus.com/download/CTS3Setup_3.0.2297.0_en.msi" target="_blank">Download Link</a>
                    </li>
                    <li><strong>Install the Software:</strong>
                        <br>After the download is complete, locate the installation file on your computer and double-click it to begin the installation process. Follow the on-screen prompts to complete the installation.
                    </li>
                    <li><strong>Automatic Trial Activation:</strong>
                        <br>Once the installation is complete, the 30-day trial edition will automatically activate. You will be able to use the software immediately and explore all its features during the trial period.
                    </li>
                </ol>
    
                <h2>What to Expect:</h2>
                <ul>
                    <li><strong>Full Access:</strong> During the trial period, you will have access to all the features of the full version of our antivirus software, allowing you to experience its comprehensive protection and functionality.</li>
                    <li><strong>Support:</strong> If you have any questions or need assistance during the trial period, our support team is here to help. You can reach out to us at <a href="mailto:support@example.com">support@example.com</a> or call [Support Phone Number], and we will be happy to assist you.</li>
                </ul>
    
                <p>We are confident that our antivirus software will meet your needs and provide you with the protection you require. We encourage you to take full advantage of the trial period to evaluate its performance and benefits.</p>
    
                <p>Please let us know if you encounter any issues or have any feedback. Your input is invaluable to us as we continuously work to improve our products and services.</p>
    
                <p>Thank you once again for your interest in our antivirus software. We look forward to hearing about your experience and hope that you find our solution to be a valuable asset.</p>
            </div>
            <div class="footer">
                <p>This is an automated message. Please do not reply.</p>
                <p>If you need assistance, feel free to contact our support team at <a href="mailto:support@example.com">support@example.com</a> or visit our Help Center.</p>
                <p>Thank you, <br>Cluster Antivirus<br><a href="https://www.clusterantivirus.com">www.clusterantivirus.com</a></p>
            </div>
        </div>
    </body>
    </html>
    ;`
  } else if (productName === "Cluster Total Security") {
    emailSubject = 'Your 30-Day Trial Edition of Cluster Antivirus Software';
    emailText =  `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Antivirus Trial Activation</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                margin: 0;
                padding: 0;
                background-color: #f4f4f4;
                color: #333;
            }
            .container {
                width: 100%;
                max-width: 600px;
                margin: 0 auto;
                background-color: #fff;
                border-radius: 8px;
                box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                overflow: hidden;
            }
            .header {
                background-color: #007bff;
                color: #fff;
                padding: 20px;
                text-align: center;
            }
            .content {
                padding: 20px;
            }
            h1 {
                font-size: 24px;
                margin: 0;
            }
            h2 {
                font-size: 20px;
                color: #007bff;
            }
            p {
                line-height: 1.5;
            }
            ol {
                margin: 15px 0;
            }
            a {
                color: #007bff;
                text-decoration: none;
            }
            .footer {
                padding: 10px;
                text-align: center;
                background-color: #f4f4f4;
                font-size: 12px;
                color: #777;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h1>Cluster Antivirus</h1>
            </div>
            <div class="content">
                <h2>Dear Customer,</h2>
                <p>I hope this email finds you well.</p>
                <p>Thank you for submitting the form to access our antivirus software's 30-day trial edition. We are pleased to provide you with the opportunity to evaluate our software and experience its features firsthand.</p>
    
                <h2>To get started, please follow the instructions below:</h2>
                <ol>
                    <li><strong>Download the Software:</strong>
                        <br>Click on the following link to download the trial edition of our antivirus software:
                        <br><a href="https://clusterantivirus.com/download/CTS3Setup_3.0.2297.0_en.msi" target="_blank">Download Link</a>
                    </li>
                    <li><strong>Install the Software:</strong>
                        <br>After the download is complete, locate the installation file on your computer and double-click it to begin the installation process. Follow the on-screen prompts to complete the installation.
                    </li>
                    <li><strong>Automatic Trial Activation:</strong>
                        <br>Once the installation is complete, the 30-day trial edition will automatically activate. You will be able to use the software immediately and explore all its features during the trial period.
                    </li>
                </ol>
    
                <h2>What to Expect:</h2>
                <ul>
                    <li><strong>Full Access:</strong> During the trial period, you will have access to all the features of the full version of our antivirus software, allowing you to experience its comprehensive protection and functionality.</li>
                    <li><strong>Support:</strong> If you have any questions or need assistance during the trial period, our support team is here to help. You can reach out to us at <a href="mailto:support@example.com">support@example.com</a> or call [Support Phone Number], and we will be happy to assist you.</li>
                </ul>
    
                <p>We are confident that our antivirus software will meet your needs and provide you with the protection you require. We encourage you to take full advantage of the trial period to evaluate its performance and benefits.</p>
    
                <p>Please let us know if you encounter any issues or have any feedback. Your input is invaluable to us as we continuously work to improve our products and services.</p>
    
                <p>Thank you once again for your interest in our antivirus software. We look forward to hearing about your experience and hope that you find our solution to be a valuable asset.</p>
            </div>
            <div class="footer">
                <p>This is an automated message. Please do not reply.</p>
                <p>If you need assistance, feel free to contact our support team at <a href="mailto:support@example.com">support@example.com</a> or visit our Help Center.</p>
                <p>Thank you, <br>Cluster Antivirus<br><a href="https://www.clusterantivirus.com">www.clusterantivirus.com</a></p>
            </div>
        </div>
    </body>
    </html>
    ;`
  } else if (productName === "Cluster Antivirus for Business") {
    emailSubject = 'Your 30-Day Trial Edition of Cluster Antivirus Software';
    emailText =  `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Antivirus Trial Activation</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                margin: 0;
                padding: 0;
                background-color: #f4f4f4;
                color: #333;
            }
            .container {
                width: 100%;
                max-width: 600px;
                margin: 0 auto;
                background-color: #fff;
                border-radius: 8px;
                box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                overflow: hidden;
            }
            .header {
                background-color: #007bff;
                color: #fff;
                padding: 20px;
                text-align: center;
            }
            .content {
                padding: 20px;
            }
            h1 {
                font-size: 24px;
                margin: 0;
            }
            h2 {
                font-size: 20px;
                color: #007bff;
            }
            p {
                line-height: 1.5;
            }
            ol {
                margin: 15px 0;
            }
            a {
                color: #007bff;
                text-decoration: none;
            }
            .footer {
                padding: 10px;
                text-align: center;
                background-color: #f4f4f4;
                font-size: 12px;
                color: #777;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h1>Cluster Antivirus</h1>
            </div>
            <div class="content">
                <h2>Dear Customer,</h2>
                <p>I hope this email finds you well.</p>
                <p>Thank you for submitting the form to access our antivirus software's 30-day trial edition. We are pleased to provide you with the opportunity to evaluate our software and experience its features firsthand.</p>
    
                <h2>To get started, please follow the instructions below:</h2>
                <ol>
                    <li><strong>Download the Software:</strong>
                        <br>Click on the following link to download the trial edition of our antivirus software:
                        <br><a href="https://clusterantivirus.com/download/CTS3Setup_3.0.2297.0_en.msi" target="_blank">Download Link</a>
                    </li>
                    <li><strong>Install the Software:</strong>
                        <br>After the download is complete, locate the installation file on your computer and double-click it to begin the installation process. Follow the on-screen prompts to complete the installation.
                    </li>
                    <li><strong>Automatic Trial Activation:</strong>
                        <br>Once the installation is complete, the 30-day trial edition will automatically activate. You will be able to use the software immediately and explore all its features during the trial period.
                    </li>
                </ol>
    
                <h2>What to Expect:</h2>
                <ul>
                    <li><strong>Full Access:</strong> During the trial period, you will have access to all the features of the full version of our antivirus software, allowing you to experience its comprehensive protection and functionality.</li>
                    <li><strong>Support:</strong> If you have any questions or need assistance during the trial period, our support team is here to help. You can reach out to us at <a href="mailto:support@example.com">support@example.com</a> or call [Support Phone Number], and we will be happy to assist you.</li>
                </ul>
    
                <p>We are confident that our antivirus software will meet your needs and provide you with the protection you require. We encourage you to take full advantage of the trial period to evaluate its performance and benefits.</p>
    
                <p>Please let us know if you encounter any issues or have any feedback. Your input is invaluable to us as we continuously work to improve our products and services.</p>
    
                <p>Thank you once again for your interest in our antivirus software. We look forward to hearing about your experience and hope that you find our solution to be a valuable asset.</p>
            </div>
            <div class="footer">
                <p>This is an automated message. Please do not reply.</p>
                <p>If you need assistance, feel free to contact our support team at <a href="mailto:support@example.com">support@example.com</a> or visit our Help Center.</p>
                <p>Thank you, <br>Cluster Antivirus<br><a href="https://www.clusterantivirus.com">www.clusterantivirus.com</a></p>
            </div>
        </div>
    </body>
    </html>
    ;`
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
