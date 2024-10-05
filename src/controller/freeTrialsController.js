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
  const {productName,email,name}=postBody;
  const freeTrial = await freeTrialsService.createFreeTrial(postBody);
  let emailSubject = '';
  let emailText = '';
//   const backlink = process.env.BACKLINK || 'http://localhost:5000';
  if (productName === "Cluster Antivirus") {
    emailSubject = 'Cluster Antivirus Free Trial';
    emailText = 
   `
   <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${productName} Trial Installation Guide</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #e0f7fa; 
            margin: 0;
            padding: 0;
        }
        .container {
            max-width: 900px;
            margin: 50px auto;
            background-color: #ffffff; 
            padding: 20px;
            border-radius: 10px;
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
            border: 2px solid #00796b;
        }
        h1 {
            color: #00796b;
            text-align: center;
        }
        h2 {
            color: #004d40;
        }
        .step {
            display: flex;
            align-items: center;
            background-color: #f1f8e9; 
            margin-bottom: 20px;
            padding: 20px;
            border-radius: 8px;
            border: 1px solid #c5e1a5;
            flex-wrap: wrap; 
        }
        
       .cluster-logo {
            display: block; 
            margin: 0 auto 20px; 
            width: 150px; 
            height: auto;
            background-color: #F1F8E9;
            padding: 5px;
        }
        
        .step img {
            width: 150px;
            height: 150px;
            object-fit: cover;
            margin-right: 20px;
            border-radius: 10px;
            display: block; 
            margin: 0 auto 20px; 
            width: 150px; 
            height: auto;
        }
        .step-content {
            flex-grow: 1;
        }
        .license-key {
            background-color: #ffecb3;
            padding: 10px;
            border: 1px solid #ffa000;
            border-radius: 5px;
            font-weight: bold;
            color: #ff6f00;
        }
        a {
            color: #00796b;
            text-decoration: none;
        }
        a:hover {
            text-decoration: underline;
        }
        footer {
            margin-top: 40px;
            text-align: center;
            font-size: 14px;
            color: #555;
        }

        /* Media Queries for responsive design */
        @media (max-width: 768px) {
            .step {
                flex-direction: column; 
                text-align: center;
            }
            .step img {
                margin-bottom: 20px;
                margin-right: 0;
                width: 100%; 
                max-width: 300px;
            }

            .step-content {
                text-align: start;
            }

        }

    </style>
</head>
<body>

<div class="container">
 <img src="https://cluster-project.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Flogo.6ede76a7.png&w=256&q=75" alt="Cluster Antivirus Logo" class="cluster-logo">
<p> <strong>Dear ${name},</strong></p>
<p>
    Thank you for choosing the ${productName} trial to safeguard your devices! We're excited to offer you 30 days of protection with full access to all of our features. Below, you'll find the steps to download, install, and activate your trial version of Cluster Antivirus.
</p>
    <h1>${productName} Trial Installation Guide</h1>

    <div class="step">
       
        <div class="step-content">
            <h2>Step 1: Download Your Antivirus Software</h2>
            <p>Download Cluster Antivirus from our secure server by clicking the link below:</p>
            <p><strong><a href="https://clusterantivirus.com/download/CTS3Setup_3.0.2297.0_en.msi">Download Cluster Antivirus Trial</a></strong></p>
            <p>Once downloaded, you can enjoy full protection throughout your trial period. There is no need for a license key at this time—activation will occur automatically for the trial duration.</p>
        </div>
    </div>

    <div class="step">
       
        <div class="step-content">
            <h2>Step 2: Install the Antivirus Software</h2>
            <p>After downloading, follow these steps to install the software:</p>
            <ul>
                <li><strong>Locate the Installer:</strong> The installer will typically be saved in your "Downloads" folder unless you choose a different location.</li>
                <li><strong>Run the Installer:</strong> Double-click the file to start the installation. You may need to confirm changes to your system by clicking "Yes."</li>
                <li><strong>Follow Instructions:</strong> The installation wizard will guide you through the process. Follow the on-screen instructions to complete the setup.</li>
                <li><strong>Restart if Prompted:</strong> You may need to restart your computer to finalize the installation.</li>
            </ul>
        </div>
    </div>

    

    <div class="step">
       
        <div class="step-content">
            <h2>Need Help?</h2>
            <p>If you encounter any issues during the download, installation, or activation process, our support team is here to help:</p>
            <p>Email: <strong><a href="mailto:support@clusterantivirus.com">support@clusterantivirus.com</a></strong></p>
            <p>We’re committed to ensuring you have a seamless experience and remain fully protected during your trial period.</p>
            <p>Thank you for choosing ${productName}. We hope you enjoy peace of mind with our world-class protection.</p>
        </div>
    </div>

    <footer>
        <p><strong>Cluster Antivirus</strong> | <strong>Phone:</strong> +8809614502010 | <strong>Email:</strong> info@clusterantivirus.com</p>
        <p>&copy; 2024 All rights reserved. <strong><a href="https://cluster-project.vercel.app/">www.clusterantivirus.com</a></strong></p>
    </footer>
</div>

</body>
</html>

   
   `
  } 
  else if (productName === "Cluster Internet Security") {
    emailSubject = `Your 30-Day Trial Edition of ${productName}`;
    emailText = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${productName} Trial Installation Guide</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #e0f7fa; 
            margin: 0;
            padding: 0;
        }
        .container {
            max-width: 900px;
            margin: 50px auto;
            background-color: #ffffff; 
            padding: 20px;
            border-radius: 10px;
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
            border: 2px solid #00796b;
        }
        h1 {
            color: #00796b;
            text-align: center;
        }
        h2 {
            color: #004d40;
        }
        .step {
            display: flex;
            align-items: center;
            background-color: #f1f8e9; 
            margin-bottom: 20px;
            padding: 20px;
            border-radius: 8px;
            border: 1px solid #c5e1a5;
            flex-wrap: wrap; 
        }
        
       .cluster-logo {
            display: block; 
            margin: 0 auto 20px; 
            width: 150px; 
            height: auto;
            background-color: #F1F8E9;
            padding: 5px;
        }
        
        .step img {
            width: 150px;
            height: 150px;
            object-fit: cover;
            margin-right: 20px;
            border-radius: 10px;
            display: block; 
            margin: 0 auto 20px; 
            width: 150px; 
            height: auto;
        }
        .step-content {
            flex-grow: 1;
        }
        .license-key {
            background-color: #ffecb3;
            padding: 10px;
            border: 1px solid #ffa000;
            border-radius: 5px;
            font-weight: bold;
            color: #ff6f00;
        }
        a {
            color: #00796b;
            text-decoration: none;
        }
        a:hover {
            text-decoration: underline;
        }
        footer {
            margin-top: 40px;
            text-align: center;
            font-size: 14px;
            color: #555;
        }

        /* Media Queries for responsive design */
        @media (max-width: 768px) {
            .step {
                flex-direction: column; 
                text-align: center;
            }
            .step img {
                margin-bottom: 20px;
                margin-right: 0;
                width: 100%; 
                max-width: 300px;
            }

            .step-content {
                text-align: start;
            }

        }

    </style>
</head>
<body>

<div class="container">
 <img src="https://cluster-project.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Flogo.6ede76a7.png&w=256&q=75" alt="Cluster Antivirus Logo" class="cluster-logo">
<p> <strong>Dear ${name},</strong></p>
<p>
    Thank you for choosing the  trial to safeguard your devices! We're excited to offer you 30 days of protection with full access to all of our features. Below, you'll find the steps to download, install, and activate your trial version of Cluster Antivirus.
</p>
    <h1>${productName} Trial Installation Guide</h1>

    <div class="step">
     
        <div class="step-content">
            <h2>Step 1: Download Your Antivirus Software</h2>
            <p>Download Cluster Antivirus from our secure server by clicking the link below:</p>
            <p><strong><a href="https://clusterantivirus.com/download/CTS3Setup_3.0.2297.0_en.msi">Download Cluster Antivirus Trial</a></strong></p>
            <p>Once downloaded, you can enjoy full protection throughout your trial period. There is no need for a license key at this time—activation will occur automatically for the trial duration.</p>
        </div>
    </div>

    <div class="step">
     
        <div class="step-content">
            <h2>Step 2: Install the Antivirus Software</h2>
            <p>After downloading, follow these steps to install the software:</p>
            <ul>
                <li><strong>Locate the Installer:</strong> The installer will typically be saved in your "Downloads" folder unless you choose a different location.</li>
                <li><strong>Run the Installer:</strong> Double-click the file to start the installation. You may need to confirm changes to your system by clicking "Yes."</li>
                <li><strong>Follow Instructions:</strong> The installation wizard will guide you through the process. Follow the on-screen instructions to complete the setup.</li>
                <li><strong>Restart if Prompted:</strong> You may need to restart your computer to finalize the installation.</li>
            </ul>
        </div>
    </div>

    

    <div class="step">
       
        <div class="step-content">
            <h2>Need Help?</h2>
            <p>If you encounter any issues during the download, installation, or activation process, our support team is here to help:</p>
            <p>Email: <strong><a href="mailto:support@clusterantivirus.com">support@clusterantivirus.com</a></strong></p>
            <p>We’re committed to ensuring you have a seamless experience and remain fully protected during your trial period.</p>
            <p>Thank you for choosing ${productName}. We hope you enjoy peace of mind with our world-class protection.</p>
        </div>
    </div>

    <footer>
        <p><strong>Cluster Antivirus</strong> | <strong>Phone:</strong> +8809614502010 | <strong>Email:</strong> info@clusterantivirus.com</p>
        <p>&copy; 2024 All rights reserved. <strong><a href="https://cluster-project.vercel.app/">www.clusterantivirus.com</a></strong></p>
    </footer>
</div>

</body>
</html>
`
  } else if (productName === "Cluster Total Security") {
    emailSubject = `Your 30-Day Trial Edition of ${productName} Software`;
    emailText =  `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${productName} Trial Installation Guide</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #e0f7fa; 
            margin: 0;
            padding: 0;
        }
        .container {
            max-width: 900px;
            margin: 50px auto;
            background-color: #ffffff; 
            padding: 20px;
            border-radius: 10px;
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
            border: 2px solid #00796b;
        }
        h1 {
            color: #00796b;
            text-align: center;
        }
        h2 {
            color: #004d40;
        }
        .step {
            display: flex;
            align-items: center;
            background-color: #f1f8e9; 
            margin-bottom: 20px;
            padding: 20px;
            border-radius: 8px;
            border: 1px solid #c5e1a5;
            flex-wrap: wrap; 
        }
        
       .cluster-logo {
            display: block; 
            margin: 0 auto 20px; 
            width: 150px; 
            height: auto;
            background-color: #F1F8E9;
            padding: 5px;
        }
        
        .step img {
            width: 150px;
            height: 150px;
            object-fit: cover;
            margin-right: 20px;
            border-radius: 10px;
            display: block; 
            margin: 0 auto 20px; 
            width: 150px; 
            height: auto;
        }
        .step-content {
            flex-grow: 1;
        }
        .license-key {
            background-color: #ffecb3;
            padding: 10px;
            border: 1px solid #ffa000;
            border-radius: 5px;
            font-weight: bold;
            color: #ff6f00;
        }
        a {
            color: #00796b;
            text-decoration: none;
        }
        a:hover {
            text-decoration: underline;
        }
        footer {
            margin-top: 40px;
            text-align: center;
            font-size: 14px;
            color: #555;
        }

        /* Media Queries for responsive design */
        @media (max-width: 768px) {
            .step {
                flex-direction: column; 
                text-align: center;
            }
            .step img {
                margin-bottom: 20px;
                margin-right: 0;
                width: 100%; 
                max-width: 300px;
            }

            .step-content {
                text-align: start;
            }

        }

    </style>
</head>
<body>

<div class="container">
 <img src="https://cluster-project.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Flogo.6ede76a7.png&w=256&q=75" alt="Cluster Antivirus Logo" class="cluster-logo">
<p> <strong>Dear ${name},</strong></p>
<p>
    Thank you for choosing the ${productName} trial to safeguard your devices! We're excited to offer you 30 days of protection with full access to all of our features. Below, you'll find the steps to download, install, and activate your trial version of Cluster Antivirus.
</p>
    <h1>${productName} Trial Installation Guide</h1>

    <div class="step">
      
        <div class="step-content">
            <h2>Step 1: Download Your Antivirus Software</h2>
            <p>Download Cluster Antivirus from our secure server by clicking the link below:</p>
            <p><strong><a href="https://clusterantivirus.com/download/CTS3Setup_3.0.2297.0_en.msi">Download Cluster Antivirus Trial</a></strong></p>
            <p>Once downloaded, you can enjoy full protection throughout your trial period. There is no need for a license key at this time—activation will occur automatically for the trial duration.</p>
        </div>
    </div>

    <div class="step">
      
        <div class="step-content">
            <h2>Step 2: Install the Antivirus Software</h2>
            <p>After downloading, follow these steps to install the software:</p>
            <ul>
                <li><strong>Locate the Installer:</strong> The installer will typically be saved in your "Downloads" folder unless you choose a different location.</li>
                <li><strong>Run the Installer:</strong> Double-click the file to start the installation. You may need to confirm changes to your system by clicking "Yes."</li>
                <li><strong>Follow Instructions:</strong> The installation wizard will guide you through the process. Follow the on-screen instructions to complete the setup.</li>
                <li><strong>Restart if Prompted:</strong> You may need to restart your computer to finalize the installation.</li>
            </ul>
        </div>
    </div>

    

    <div class="step">
      
        <div class="step-content">
            <h2>Need Help?</h2>
            <p>If you encounter any issues during the download, installation, or activation process, our support team is here to help:</p>
            <p>Email: <strong><a href="mailto:support@clusterantivirus.com">support@clusterantivirus.com</a></strong></p>
            <p>We’re committed to ensuring you have a seamless experience and remain fully protected during your trial period.</p>
            <p>Thank you for choosing ${productName}. We hope you enjoy peace of mind with our world-class protection.</p>
        </div>
    </div>

    <footer>
        <p><strong>Cluster Antivirus</strong> | <strong>Phone:</strong> +8809614502010 | <strong>Email:</strong> info@clusterantivirus.com</p>
        <p>&copy; 2024 All rights reserved. <strong><a href="https://cluster-project.vercel.app/">www.clusterantivirus.com</a></strong></p>
    </footer>
</div>

</body>
</html>
`
  } else if (productName === "Cluster Antivirus Business") {
    emailSubject = `Your 30-Day Trial Edition of ${productName}`;
    emailText =  `

    <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${productName} Trial Installation Guide</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #e0f7fa; 
            margin: 0;
            padding: 0;
        }
        .container {
            max-width: 900px;
            margin: 50px auto;
            background-color: #ffffff; 
            padding: 20px;
            border-radius: 10px;
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
            border: 2px solid #00796b;
        }
        h1 {
            color: #00796b;
            text-align: center;
        }
        h2 {
            color: #004d40;
        }
        .step {
            display: flex;
            align-items: center;
            background-color: #f1f8e9; 
            margin-bottom: 20px;
            padding: 20px;
            border-radius: 8px;
            border: 1px solid #c5e1a5;
            flex-wrap: wrap; 
        }
        
       .cluster-logo {
            display: block; 
            margin: 0 auto 20px; 
            width: 150px; 
            height: auto;
            background-color: #F1F8E9;
            padding: 5px;
        }
        
        .step img {
            width: 150px;
            height: 150px;
            object-fit: cover;
            margin-right: 20px;
            border-radius: 10px;
            display: block; 
            margin: 0 auto 20px; 
            width: 150px; 
            height: auto;
        }
        .step-content {
            flex-grow: 1;
        }
        .license-key {
            background-color: #ffecb3;
            padding: 10px;
            border: 1px solid #ffa000;
            border-radius: 5px;
            font-weight: bold;
            color: #ff6f00;
        }
        a {
            color: #00796b;
            text-decoration: none;
        }
        a:hover {
            text-decoration: underline;
        }
        footer {
            margin-top: 40px;
            text-align: center;
            font-size: 14px;
            color: #555;
        }

        /* Media Queries for responsive design */
        @media (max-width: 768px) {
            .step {
                flex-direction: column; 
                text-align: center;
            }
            .step img {
                margin-bottom: 20px;
                margin-right: 0;
                width: 100%; 
                max-width: 300px;
            }

            .step-content {
                text-align: start;
            }

        }

    </style>
</head>
<body>

<div class="container">
 <img src="https://cluster-project.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Flogo.6ede76a7.png&w=256&q=75" alt="Cluster Antivirus Logo" class="cluster-logo">
<p> <strong>Dear ${name},</strong></p>
<p>
    Thank you for choosing the ${productName} trial to safeguard your devices! We're excited to offer you 30 days of protection with full access to all of our features. Below, you'll find the steps to download, install, and activate your trial version of Cluster Antivirus.
</p>
    <h1>${productName} Trial Installation Guide</h1>

    <div class="step">
       
        <div class="step-content">
            <h2>Step 1: Download Your Antivirus Software</h2>
            <p>Download Cluster Antivirus from our secure server by clicking the link below:</p>
            <p><strong><a href="https://clusterantivirus.com/download/CTS3Setup_3.0.2297.0_en.msi">Download Cluster Antivirus Trial</a></strong></p>
            <p>Once downloaded, you can enjoy full protection throughout your trial period. There is no need for a license key at this time—activation will occur automatically for the trial duration.</p>
        </div>
    </div>

    <div class="step">
     
        <div class="step-content">
            <h2>Step 2: Install the Antivirus Software</h2>
            <p>After downloading, follow these steps to install the software:</p>
            <ul>
                <li><strong>Locate the Installer:</strong> The installer will typically be saved in your "Downloads" folder unless you choose a different location.</li>
                <li><strong>Run the Installer:</strong> Double-click the file to start the installation. You may need to confirm changes to your system by clicking "Yes."</li>
                <li><strong>Follow Instructions:</strong> The installation wizard will guide you through the process. Follow the on-screen instructions to complete the setup.</li>
                <li><strong>Restart if Prompted:</strong> You may need to restart your computer to finalize the installation.</li>
            </ul>
        </div>
    </div>

    

    <div class="step">
       
        <div class="step-content">
            <h2>Need Help?</h2>
            <p>If you encounter any issues during the download, installation, or activation process, our support team is here to help:</p>
            <p>Email: <strong><a href="mailto:support@clusterantivirus.com">support@clusterantivirus.com</a></strong></p>
            <p>We’re committed to ensuring you have a seamless experience and remain fully protected during your trial period.</p>
            <p>Thank you for choosing ${productName}. We hope you enjoy peace of mind with our world-class protection.</p>
        </div>
    </div>

    <footer>
        <p><strong>Cluster Antivirus</strong> | <strong>Phone:</strong> +8809614502010 | <strong>Email:</strong> info@clusterantivirus.com</p>
        <p>&copy; 2024 All rights reserved. <strong><a href="https://cluster-project.vercel.app/">www.clusterantivirus.com</a></strong></p>
    </footer>
</div>

</body>
</html>

`
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
